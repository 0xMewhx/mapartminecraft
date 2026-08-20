// ============================================
// NBT Binary Writer
// ============================================
class NBTWriter {
    constructor() {
        this.parts = [];
        this.size = 0;
    }

    _push(bytes) {
        this.parts.push(bytes);
        this.size += bytes.length;
    }

    writeByte(v) { this._push(new Uint8Array([v & 0xFF])); }

    writeShort(v) {
        const buf = new ArrayBuffer(2);
        new DataView(buf).setInt16(0, v, false); // big-endian
        this._push(new Uint8Array(buf));
    }

    writeInt(v) {
        const buf = new ArrayBuffer(4);
        new DataView(buf).setInt32(0, v, false);
        this._push(new Uint8Array(buf));
    }

    writeLong(v) {
        const buf = new ArrayBuffer(8);
        const dv = new DataView(buf);
        let big = typeof v === 'bigint' ? v : BigInt(v);
        // Handle negative: convert to unsigned representation
        if (big < 0n) big += (1n << 64n);
        dv.setUint32(0, Number((big >> 32n) & 0xFFFFFFFFn), false);
        dv.setUint32(4, Number(big & 0xFFFFFFFFn), false);
        this._push(new Uint8Array(buf));
    }

    writeString(str) {
        const encoded = new TextEncoder().encode(str);
        this.writeShort(encoded.length);
        this._push(encoded);
    }

    // Tag IDs
    static END = 0;
    static BYTE = 1;
    static SHORT = 2;
    static INT = 3;
    static LONG = 4;
    static FLOAT = 5;
    static DOUBLE = 6;
    static BYTE_ARRAY = 7;
    static STRING = 8;
    static LIST = 9;
    static COMPOUND = 10;
    static INT_ARRAY = 11;
    static LONG_ARRAY = 12;

    tagHeader(type, name) {
        this.writeByte(type);
        if (name !== null) this.writeString(name);
    }

    compoundStart(name) { this.tagHeader(NBTWriter.COMPOUND, name); }
    compoundEnd() { this.writeByte(NBTWriter.END); }

    stringTag(name, val) {
        this.tagHeader(NBTWriter.STRING, name);
        this.writeString(val);
    }

    intTag(name, val) {
        this.tagHeader(NBTWriter.INT, name);
        this.writeInt(val);
    }

    longTag(name, val) {
        this.tagHeader(NBTWriter.LONG, name);
        this.writeLong(val);
    }

    listStart(name, elemType, count) {
        this.tagHeader(NBTWriter.LIST, name);
        this.writeByte(elemType);
        this.writeInt(count);
    }

    longArrayTag(name, longs) {
        this.tagHeader(NBTWriter.LONG_ARRAY, name);
        this.writeInt(longs.length);
        for (const l of longs) this.writeLong(l);
    }

    toBuffer() {
        const result = new Uint8Array(this.size);
        let offset = 0;
        for (const part of this.parts) {
            result.set(part, offset);
            offset += part.length;
        }
        return result.buffer;
    }
}

// ============================================
// Gzip compression
// ============================================
async function gzipCompress(buffer) {
    const cs = new CompressionStream('gzip');
    const writer = cs.writable.getWriter();
    const reader = cs.readable.getReader();

    writer.write(new Uint8Array(buffer));
    writer.close();

    const chunks = [];
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
    }

    const totalLen = chunks.reduce((s, c) => s + c.length, 0);
    const result = new Uint8Array(totalLen);
    let offset = 0;
    for (const chunk of chunks) {
        result.set(chunk, offset);
        offset += chunk.length;
    }
    return result.buffer;
}

// ============================================
// Pack block indices into long array (Litematica format)
// ============================================
function packBlocks(blockIndices, totalVolume, paletteSize) {
    const bitsPerBlock = Math.max(2, Math.ceil(Math.log2(Math.max(paletteSize, 2))));
    const blocksPerLong = Math.floor(64 / bitsPerBlock);
    const totalLongs = Math.ceil(totalVolume / blocksPerLong);
    const mask = (1n << BigInt(bitsPerBlock)) - 1n;

    const longs = [];

    for (let longIdx = 0; longIdx < totalLongs; longIdx++) {
        let packed = 0n;
        for (let bitIdx = 0; bitIdx < blocksPerLong; bitIdx++) {
            const blockPos = longIdx * blocksPerLong + bitIdx;
            if (blockPos >= totalVolume) break;
            const val = BigInt(blockIndices[blockPos]) & mask;
            packed |= val << BigInt(bitIdx * bitsPerBlock);
        }
        // Convert unsigned 64-bit to signed
        if (packed >= (1n << 63n)) {
            packed -= (1n << 64n);
        }
        longs.push(packed);
    }

    return longs;
}

// ============================================
// Generate .litematic file
// ============================================
async function generateLitematic(pixelArtData, orientation) {
    const { blockMap, paletteArr, w, h } = pixelArtData;

    // Region dimensions
    const sizeX = w;
    const sizeY = orientation === 'vertical' ? h : 1;
    const sizeZ = orientation === 'vertical' ? 1 : h;
    const totalVolume = sizeX * sizeY * sizeZ;

    // Build unique block palette
    // Index 0 = air, rest = unique blocks
    const paletteNames = ['minecraft:air'];
    const nameToIndex = new Map();
    nameToIndex.set('minecraft:air', 0);

    for (let i = 0; i < blockMap.length; i++) {
        const palIdx = blockMap[i];
        if (palIdx < 0) continue;
        const fullName = 'minecraft:' + paletteArr[palIdx][3];
        if (!nameToIndex.has(fullName)) {
            nameToIndex.set(fullName, paletteNames.length);
            paletteNames.push(fullName);
        }
    }

    // Fill block index array
    // Litematica block order: index = y * (sizeZ * sizeX) + z * sizeX + x
    const indices = new Uint32Array(totalVolume); // 0 = air by default
    let nonAirCount = 0;

    for (let imgY = 0; imgY < h; imgY++) {
        for (let imgX = 0; imgX < w; imgX++) {
            const palIdx = blockMap[imgY * w + imgX];
            if (palIdx < 0) continue;

            const fullName = 'minecraft:' + paletteArr[palIdx][3];
            const blockIdx = nameToIndex.get(fullName);

            let bx, by, bz;
            if (orientation === 'vertical') {
                bx = imgX;
                by = (h - 1) - imgY; // flip so image top = build top
                bz = 0;
            } else {
                bx = imgX;
                by = 0;
                bz = imgY;
            }

            const idx = by * (sizeZ * sizeX) + bz * sizeX + bx;
            indices[idx] = blockIdx;
            nonAirCount++;
        }
    }

    // Pack into long array
    const longArray = packBlocks(indices, totalVolume, paletteNames.length);

    // ---- Build NBT ----
    const nbt = new NBTWriter();
    const now = BigInt(Date.now());

    // Root compound
    nbt.compoundStart('');

    // Version (checked first by litematica)
    nbt.intTag('Version', 7);
    nbt.intTag('MinecraftDataVersion', 3955); // 1.21.1

    // Metadata
    nbt.compoundStart('Metadata');
    nbt.stringTag('Author', '0xMew');
    nbt.stringTag('Description', '');
    nbt.compoundStart('EnclosingSize');
    nbt.intTag('x', sizeX);
    nbt.intTag('y', sizeY);
    nbt.intTag('z', sizeZ);
    nbt.compoundEnd();
    nbt.stringTag('Name', 'PixelArt');
    nbt.intTag('RegionCount', 1);
    nbt.longTag('TimeCreated', now);
    nbt.longTag('TimeModified', now);
    nbt.intTag('TotalBlocks', nonAirCount);
    nbt.intTag('TotalVolume', totalVolume);
    nbt.intTag('LitematicVersion', 7);
    nbt.compoundEnd(); // Metadata

    // Regions
    nbt.compoundStart('Regions');
    nbt.compoundStart('PixelArt');

    nbt.listStart('BlockEntities', NBTWriter.COMPOUND, 0);
    nbt.longArrayTag('Blocks', longArray);
    nbt.listStart('Entities', NBTWriter.COMPOUND, 0);
    nbt.listStart('PendingBlockTicks', NBTWriter.COMPOUND, 0);
    nbt.listStart('PendingFluidTicks', NBTWriter.COMPOUND, 0);

    nbt.compoundStart('Position');
    nbt.intTag('x', 0);
    nbt.intTag('y', 0);
    nbt.intTag('z', 0);
    nbt.compoundEnd();

    nbt.compoundStart('Size');
    nbt.intTag('x', sizeX);
    nbt.intTag('y', sizeY);
    nbt.intTag('z', sizeZ);
    nbt.compoundEnd();

    // Palette
    nbt.listStart('Palette', NBTWriter.COMPOUND, paletteNames.length);
    for (const name of paletteNames) {
        nbt.stringTag('Name', name);
        nbt.compoundEnd();
    }

    nbt.compoundEnd(); // PixelArt
    nbt.compoundEnd(); // Regions

    nbt.compoundEnd(); // Root

    // Get raw NBT bytes
    const rawNbt = nbt.toBuffer();

    // Gzip compress
    const compressed = await gzipCompress(rawNbt);

    console.log(`[Litematic] Palette: ${paletteNames.length} blocks, Volume: ${totalVolume}, NonAir: ${nonAirCount}, Longs: ${longArray.length}`);
    console.log(`[Litematic] Raw NBT: ${rawNbt.byteLength} bytes, Compressed: ${compressed.byteLength} bytes`);

    return { data: compressed, totalBlocks: nonAirCount, paletteSize: paletteNames.length };
}

// ============================================
// Download helper
// ============================================
function downloadLitematic(data, filename) {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'pixel_art.litematic';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Expose
window.generateLitematic = generateLitematic;
window.downloadLitematic = downloadLitematic;
