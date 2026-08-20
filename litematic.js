// ============================================
// NBT Writer + Litematic Generator
// ============================================

class NBTWriter {
    constructor() {
        this.buffer = [];
    }

    writeByte(val) { this.buffer.push(val & 0xFF); }

    writeShort(val) {
        this.buffer.push((val >> 8) & 0xFF);
        this.buffer.push(val & 0xFF);
    }

    writeInt(val) {
        this.buffer.push((val >> 24) & 0xFF);
        this.buffer.push((val >> 16) & 0xFF);
        this.buffer.push((val >> 8) & 0xFF);
        this.buffer.push(val & 0xFF);
    }

    writeLong(val) {
        // BigInt support for 64-bit
        const big = BigInt(val);
        for (let i = 56; i >= 0; i -= 8) {
            this.buffer.push(Number((big >> BigInt(i)) & 0xFFn));
        }
    }

    writeString(str) {
        const encoded = new TextEncoder().encode(str);
        this.writeShort(encoded.length);
        for (const byte of encoded) this.buffer.push(byte);
    }

    // Tag types
    static TAG_END = 0;
    static TAG_BYTE = 1;
    static TAG_SHORT = 2;
    static TAG_INT = 3;
    static TAG_LONG = 4;
    static TAG_FLOAT = 5;
    static TAG_DOUBLE = 6;
    static TAG_BYTE_ARRAY = 7;
    static TAG_STRING = 8;
    static TAG_LIST = 9;
    static TAG_COMPOUND = 10;
    static TAG_INT_ARRAY = 11;
    static TAG_LONG_ARRAY = 12;

    writeTagHeader(type, name) {
        this.writeByte(type);
        if (name !== null) this.writeString(name);
    }

    writeCompoundStart(name) {
        this.writeTagHeader(NBTWriter.TAG_COMPOUND, name);
    }

    writeCompoundEnd() {
        this.writeByte(NBTWriter.TAG_END);
    }

    writeStringTag(name, val) {
        this.writeTagHeader(NBTWriter.TAG_STRING, name);
        this.writeString(val);
    }

    writeIntTag(name, val) {
        this.writeTagHeader(NBTWriter.TAG_INT, name);
        this.writeInt(val);
    }

    writeLongTag(name, val) {
        this.writeTagHeader(NBTWriter.TAG_LONG, name);
        this.writeLong(val);
    }

    writeListStart(name, elementType, count) {
        this.writeTagHeader(NBTWriter.TAG_LIST, name);
        this.writeByte(elementType);
        this.writeInt(count);
    }

    writeCompoundInList() {
        // No tag header for list elements (type is declared in list header)
    }

    writeLongArrayTag(name, longs) {
        this.writeTagHeader(NBTWriter.TAG_LONG_ARRAY, name);
        this.writeInt(longs.length);
        for (const l of longs) this.writeLong(l);
    }

    toArrayBuffer() {
        return new Uint8Array(this.buffer).buffer;
    }
}

// ============================================
// Litematic file builder
// ============================================

async function generateLitematic(pixelArtData, orientation) {
    const { blockMap, paletteArr, w, h, skippedCount } = pixelArtData;

    // Determine dimensions based on orientation
    let sizeX, sizeY, sizeZ;
    if (orientation === 'vertical') {
        sizeX = w; sizeY = h; sizeZ = 1;
    } else {
        sizeX = w; sizeY = 1; sizeZ = h;
    }

    const totalVolume = sizeX * sizeY * sizeZ;

    // Build unique palette (block names)
    const uniqueBlocks = new Set();
    for (let i = 0; i < blockMap.length; i++) {
        if (blockMap[i] === -1) continue;
        uniqueBlocks.add(paletteArr[blockMap[i]][3]);
    }

    // Palette: index 0 = air, then unique blocks
    const palette = ['minecraft:air'];
    const blockToIndex = { 'minecraft:air': 0 };
    for (const name of uniqueBlocks) {
        const fullName = `minecraft:${name}`;
        if (!(fullName in blockToIndex)) {
            blockToIndex[fullName] = palette.length;
            palette.push(fullName);
        }
    }

    // Bits per block
    const bitsPerBlock = Math.max(2, Math.ceil(Math.log2(palette.length)));
    const blocksPerLong = Math.floor(64 / bitsPerBlock);
    const totalLongs = Math.ceil(totalVolume / blocksPerLong);
    const mask = (1n << BigInt(bitsPerBlock)) - 1n;

    // Build block array
    // Litematica order: Y (slowest), Z, X (fastest)
    const blockIndices = new Int32Array(totalVolume);
    let totalBlocks = 0;

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const palIdx = blockMap[y * w + x];
            if (palIdx === -1) continue;

            const blockName = `minecraft:${paletteArr[palIdx][3]}`;
            const blockIdx = blockToIndex[blockName];

            let bx, by, bz;
            if (orientation === 'vertical') {
                bx = x;
                by = h - 1 - y; // flip Y so top of image = top of build
                bz = 0;
            } else {
                bx = x;
                by = 0;
                bz = y;
            }

            // Index: y * (zSize * xSize) + z * xSize + x
            const idx = by * (sizeZ * sizeX) + bz * sizeX + bx;
            blockIndices[idx] = blockIdx;
            totalBlocks++;
        }
    }

    // Pack into long array
    const longArray = [];
    for (let i = 0; i < totalLongs; i++) {
        let longVal = 0n;
        for (let j = 0; j < blocksPerLong; j++) {
            const blockIdx = i * blocksPerLong + j;
            if (blockIdx >= totalVolume) break;
            const val = BigInt(blockIndices[blockIdx]) & mask;
            longVal |= val << BigInt(j * bitsPerBlock);
        }
        // Convert to signed 64-bit
        if (longVal >= (1n << 63n)) {
            longVal -= (1n << 64n);
        }
        longArray.push(longVal);
    }

    // Build NBT
    const nbt = new NBTWriter();
    const now = BigInt(Date.now());

    // Root compound (unnamed for litematic — but NBT root needs name)
    nbt.writeCompoundStart('');

    // Metadata
    nbt.writeCompoundStart('Metadata');
    nbt.writeStringTag('Author', '0xMew');
    nbt.writeStringTag('Description', 'Generated by MC Pixel Art Generator');
    nbt.writeCompoundStart('EnclosingSize');
    nbt.writeIntTag('x', sizeX);
    nbt.writeIntTag('y', sizeY);
    nbt.writeIntTag('z', sizeZ);
    nbt.writeCompoundEnd();
    nbt.writeStringTag('Name', 'PixelArt');
    nbt.writeIntTag('RegionCount', 1);
    nbt.writeLongTag('TimeCreated', now);
    nbt.writeLongTag('TimeModified', now);
    nbt.writeIntTag('TotalBlocks', totalBlocks);
    nbt.writeIntTag('TotalVolume', totalVolume);
    nbt.writeIntTag('LitematicVersion', 7);
    nbt.writeCompoundEnd(); // end Metadata

    // Regions
    nbt.writeCompoundStart('Regions');
    nbt.writeCompoundStart('PixelArt');

    // BlockEntities (empty list of compounds)
    nbt.writeListStart('BlockEntities', NBTWriter.TAG_COMPOUND, 0);

    // Blocks (long array)
    nbt.writeLongArrayTag('Blocks', longArray);

    // Entities (empty list of compounds)
    nbt.writeListStart('Entities', NBTWriter.TAG_COMPOUND, 0);

    // PendingBlockTicks (empty list)
    nbt.writeListStart('PendingBlockTicks', NBTWriter.TAG_COMPOUND, 0);

    // PendingFluidTicks (empty list)
    nbt.writeListStart('PendingFluidTicks', NBTWriter.TAG_COMPOUND, 0);

    // Position
    nbt.writeCompoundStart('Position');
    nbt.writeIntTag('x', 0);
    nbt.writeIntTag('y', 0);
    nbt.writeIntTag('z', 0);
    nbt.writeCompoundEnd();

    // Size
    nbt.writeCompoundStart('Size');
    nbt.writeIntTag('x', sizeX);
    nbt.writeIntTag('y', sizeY);
    nbt.writeIntTag('z', sizeZ);
    nbt.writeCompoundEnd();

    // Palette (list of compounds)
    nbt.writeListStart('Palette', NBTWriter.TAG_COMPOUND, palette.length);
    for (const blockName of palette) {
        nbt.writeStringTag('Name', blockName);
        nbt.writeCompoundEnd(); // end this palette compound
    }

    nbt.writeCompoundEnd(); // end PixelArt region
    nbt.writeCompoundEnd(); // end Regions

    // MinecraftDataVersion (1.21.1 = 3955)
    nbt.writeIntTag('MinecraftDataVersion', 3955);

    nbt.writeCompoundEnd(); // end root

    // Get raw bytes
    const rawBuffer = nbt.toArrayBuffer();

    // Gzip compress using CompressionStream
    const compressed = await gzipCompress(rawBuffer);

    return { data: compressed, totalBlocks, paletteSize: palette.length };
}

async function gzipCompress(buffer) {
    const stream = new Blob([buffer])
        .stream()
        .pipeThrough(new CompressionStream('gzip'));

    const compressedBlob = await new Response(stream).blob();
    return await compressedBlob.arrayBuffer();
}

function downloadLitematic(data, filename) {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'pixel_art.litematic';
    a.click();
    URL.revokeObjectURL(url);
}

// Expose to global scope
window.generateLitematic = generateLitematic;
window.downloadLitematic = downloadLitematic;
