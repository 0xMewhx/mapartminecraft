    const palettes = {
        concrete: { name: "Concrete", blocks: { "207,213,214": "white_concrete", "224,97,1": "orange_concrete", "169,48,159": "magenta_concrete", "36,137,199": "light_blue_concrete", "241,175,21": "yellow_concrete", "94,168,24": "lime_concrete", "208,101,142": "pink_concrete", "54,57,61": "gray_concrete", "125,125,115": "light_gray_concrete", "21,119,136": "cyan_concrete", "100,32,156": "purple_concrete", "45,47,143": "blue_concrete", "96,60,32": "brown_concrete", "73,91,36": "green_concrete", "142,32,32": "red_concrete", "8,10,15": "black_concrete" } },
        wool: { name: "Wool", blocks: { "233,236,236": "white_wool", "240,118,19": "orange_wool", "189,68,179": "magenta_wool", "58,175,217": "light_blue_wool", "248,198,39": "yellow_wool", "112,185,25": "lime_wool", "237,141,172": "pink_wool", "62,68,71": "gray_wool", "142,142,134": "light_gray_wool", "21,137,145": "cyan_wool", "121,42,172": "purple_wool", "53,57,157": "blue_wool", "114,71,40": "brown_wool", "84,109,27": "green_wool", "161,39,34": "red_wool", "20,21,25": "black_wool" } },
        terracotta: { name: "Terracotta", blocks: { "209,178,161": "white_terracotta", "161,83,37": "orange_terracotta", "149,87,108": "magenta_terracotta", "113,108,137": "light_blue_terracotta", "186,133,36": "yellow_terracotta", "103,117,53": "lime_terracotta", "161,78,78": "pink_terracotta", "58,42,36": "gray_terracotta", "135,107,98": "light_gray_terracotta", "87,91,91": "cyan_terracotta", "118,70,86": "purple_terracotta", "74,59,91": "blue_terracotta", "77,51,36": "brown_terracotta", "76,83,42": "green_terracotta", "143,61,46": "red_terracotta", "37,22,16": "black_terracotta" } },
        concrete_powder: { name: "Concrete Powder", blocks: { "231,234,235": "white_concrete_powder", "233,146,36": "orange_concrete_powder", "191,74,178": "magenta_concrete_powder", "74,190,223": "light_blue_concrete_powder", "232,199,54": "yellow_concrete_powder", "125,194,38": "lime_concrete_powder", "243,163,187": "pink_concrete_powder", "77,81,84": "gray_concrete_powder", "154,154,148": "light_gray_concrete_powder", "36,147,158": "cyan_concrete_powder", "131,54,174": "purple_concrete_powder", "70,77,164": "blue_concrete_powder", "125,83,53": "brown_concrete_powder", "93,115,46": "green_concrete_powder", "168,53,49": "red_concrete_powder", "28,29,33": "black_concrete_powder" } },
        planks: { name: "Planks", blocks: { "162,130,78": "oak_planks", "114,84,48": "spruce_planks", "192,175,121": "birch_planks", "160,115,80": "jungle_planks", "168,90,50": "acacia_planks", "66,43,22": "dark_oak_planks", "117,34,34": "mangrove_planks", "230,180,180": "cherry_planks", "200,180,80": "bamboo_planks", "58,142,140": "warped_planks", "148,63,97": "crimson_planks" } },
        stone_ores: { name: "Stone & Ores", blocks: { "125,125,125": "stone", "81,81,81": "deepslate", "43,34,40": "blackstone", "219,211,160": "sand", "191,103,33": "red_sand", "221,223,165": "end_stone", "111,54,52": "netherrack", "236,233,226": "quartz_block", "15,10,10": "obsidian", "20,18,18": "netherite_block", "247,235,76": "gold_block", "100,219,219": "diamond_block", "39,211,100": "emerald_block", "30,67,140": "lapis_block", "172,199,190": "sea_lantern", "110,123,135": "clay", "155,155,155": "andesite", "185,135,100": "raw_iron_block", "125,85,65": "mud_bricks", "140,180,190": "prismarine", "73,128,120": "dark_prismarine", "163,144,128": "mushroom_stem", "178,30,30": "red_mushroom_block" } },
        extra: { name: "Extra Blocks", blocks: { "183,148,98": "stripped_oak_log", "115,89,52": "stripped_spruce_log", "198,184,145": "stripped_birch_log", "172,123,80": "stripped_jungle_log", "174,93,52": "stripped_acacia_log", "73,53,33": "stripped_dark_oak_log", "119,36,36": "stripped_mangrove_log", "232,184,184": "stripped_cherry_log", "204,186,82": "stripped_bamboo_block", "150,65,99": "stripped_crimson_stem", "60,145,143": "stripped_warped_stem", "192,116,92": "copper_block", "161,125,101": "exposed_copper", "109,142,122": "weathered_copper", "82,156,154": "oxidized_copper", "224,224,224": "calcite", "108,103,95": "tuff", "132,106,91": "dripstone_block", "158,158,158": "smooth_stone", "53,47,47": "polished_basalt", "111,111,111": "dead_brain_coral_block", "76,75,73": "smooth_basalt", "212,201,140": "end_stone_bricks", "49,15,15": "nether_bricks", "145,41,41": "red_nether_bricks", "210,114,54": "shroomlight", "115,7,7": "nether_wart_block", "18,135,132": "warped_wart_block", "30,27,30": "crying_obsidian", "89,109,45": "moss_block", "104,131,52": "azalea_leaves", "116,146,76": "flowering_azalea_leaves", "22,111,31": "dried_kelp_block", "162,196,52": "melon_side", "155,135,95": "gold_ore", "12,12,12": "coal_block", "210,210,210": "iron_block", "161,105,76": "brown_mushroom_block" } },
        ultra: { name: "Ultra Pixel Art", blocks: { "248,225,245": "pearlescent_froglight", "251,250,224": "ochre_froglight", "228,253,230": "verdant_froglight", "181,36,144": "bubble_coral_block", "199,36,36": "fire_coral_block", "45,84,181": "tube_coral_block", "178,181,36": "horn_coral_block", "141,33,151": "brain_coral_block", "74,74,74": "deepslate_coal_ore", "115,87,72": "deepslate_iron_ore", "150,110,50": "deepslate_gold_ore", "60,110,110": "deepslate_diamond_ore", "60,130,60": "deepslate_emerald_ore", "60,70,130": "deepslate_lapis_ore", "149,103,85": "polished_granite", "188,188,188": "polished_diorite", "112,112,112": "polished_andesite", "50,50,50": "polished_deepslate", "147,114,45": "hay_block", "155,117,72": "honeycomb_block", "150,170,60": "slime_block", "190,150,40": "honey_block", "120,100,150": "amethyst_block", "160,130,90": "sponge", "90,110,60": "wet_sponge", "25,120,100": "beacon", "137,95,84": "bricks", "74,120,110": "prismarine_bricks", "43,38,48": "polished_blackstone_bricks", "140,120,140": "purpur_pillar", "210,150,60": "glowstone", "110,40,20": "magma_block", "80,50,40": "soul_soil" } },
        nature: { name: "Nature", blocks: { "127,178,56": "grass_block", "134,96,67": "dirt", "119,85,59": "coarse_dirt", "90,63,40": "podzol", "111,99,105": "mycelium", "245,250,250": "snow_block", "215,115,35": "pumpkin", "220,140,40": "jack_o_lantern", "120,145,30": "melon", "60,140,40": "oak_leaves", "50,90,50": "spruce_leaves", "80,140,60": "birch_leaves", "50,160,30": "jungle_leaves", "40,100,20": "dark_oak_leaves", "70,130,40": "mangrove_leaves", "230,165,190": "cherry_leaves", "130,30,30": "crimson_nylium", "40,115,105": "warped_nylium", "85,60,50": "mud" } },
        stone_ores2: { name: "Stone & Ores II", blocks: { "120,120,120": "cobblestone", "105,121,90": "mossy_cobblestone", "115,115,115": "stone_bricks", "110,118,98": "mossy_stone_bricks", "112,112,112": "cracked_stone_bricks", "110,110,110": "chiseled_stone_bricks", "218,210,158": "sandstone", "190,102,32": "red_sandstone", "215,205,150": "cut_sandstone", "185,95,25": "cut_red_sandstone", "150,105,85": "granite", "188,188,188": "diorite", "220,215,195": "bone_block", "164,118,164": "purpur_block", "130,125,125": "gravel", "220,180,50": "raw_gold_block", "200,120,90": "raw_copper_block", "140,140,140": "iron_ore", "110,110,110": "coal_ore", "125,185,175": "diamond_ore", "80,150,100": "emerald_ore", "205,90,80": "redstone_ore", "70,100,165": "lapis_ore", "135,90,75": "copper_ore", "55,55,55": "bedrock", "90,90,90": "basalt", "65,55,50": "gilded_blackstone" } },
        wood_logs: { name: "Wood Logs", blocks: { "105,85,50": "oak_log", "55,35,20": "spruce_log", "200,190,175": "birch_log", "85,65,25": "jungle_log", "105,100,95": "acacia_log", "40,25,15": "dark_oak_log", "85,55,45": "mangrove_log", "60,40,50": "cherry_log" } },
        shulker: { name: "Shulker Boxes", blocks: { "215,215,220": "white_shulker_box", "235,110,20": "orange_shulker_box", "180,50,165": "magenta_shulker_box", "65,165,210": "light_blue_shulker_box", "240,185,30": "yellow_shulker_box", "100,175,25": "lime_shulker_box", "230,125,160": "pink_shulker_box", "65,70,75": "gray_shulker_box", "135,135,130": "light_gray_shulker_box", "20,130,140": "cyan_shulker_box", "110,45,150": "purple_shulker_box", "45,50,145": "blue_shulker_box", "105,70,45": "brown_shulker_box", "75,100,30": "green_shulker_box", "150,40,40": "red_shulker_box", "30,30,35": "black_shulker_box", "140,100,150": "shulker_box" } },
        misc: { name: "Misc", blocks: { "230,200,180": "target", "140,110,80": "barrel", "180,160,120": "loom", "110,85,60": "note_block", "115,90,65": "jukebox", "150,120,90": "crafting_table", "90,90,90": "furnace", "85,85,85": "smithing_table", "75,75,75": "blast_furnace", "120,90,70": "smoker", "120,110,110": "dispenser", "115,105,105": "dropper", "185,170,130": "bookshelf", "150,20,10": "redstone_block", "165,165,165": "lodestone", "84,64,51": "soul_sand", "100,70,60": "packed_mud" } }
    };

    let loadedImage = null, mcfunctionContent = '', currentOrientation = 'vertical', flipH = false, flipV = false;
    let firstLoadDone = false;
    const appLayout = document.getElementById('appLayout');

    function toggleFlip(axis) {
        if (axis === 'h') { flipH = !flipH; document.getElementById('flipHBtn').classList.toggle('active', flipH); }
        else { flipV = !flipV; document.getElementById('flipVBtn').classList.toggle('active', flipV); }
        if (window.pixelArtData && loadedImage) generatePixelArt(); else updateDropPreview();
    }

    function setOrientation(orient) {
        currentOrientation = orient;
        document.getElementById('orientVertical').classList.toggle('active', orient === 'vertical');
        document.getElementById('orientHorizontal').classList.toggle('active', orient === 'horizontal');
        if (window.pixelArtData) { regenerateMcfunction(); if (window.buildScene3D) window.buildScene3D(); }
    }

    function regenerateMcfunction() {
        const d = window.pixelArtData; if (!d) return;
        const { blockMap, paletteArr, w, h } = d; const lines = [];
        for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
            const palIdx = blockMap[y * w + x]; if (palIdx === -1) continue;
            const block = paletteArr[palIdx][3];
            if (currentOrientation === 'vertical') lines.push(`setblock ~${x} ~${h-1-y} ~ ${block}`);
            else lines.push(`setblock ~${x} ~ ~${y} ${block}`);
        }
        mcfunctionContent = lines.join('\n');
    }

    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const generateBtn = document.getElementById('generateBtn');
    const anarchyBtn = document.getElementById('anarchyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const previewCard = document.getElementById('previewCard');
    const progressBar = document.getElementById('progressBar');
    const progressFill = document.getElementById('progressFill');

    function initPaletteGrid() {
        const grid = document.getElementById('paletteGrid');
        for (const [key, pal] of Object.entries(palettes)) {
            const count = Object.keys(pal.blocks).length;
            const item = document.createElement('div'); item.className = 'palette-item';
            item.innerHTML = `<input type="checkbox" id="pal_${key}" checked><label for="pal_${key}">${pal.name}</label><span class="palette-count">${count}</span>`;
            grid.appendChild(item);
        }
    }

    function toggleAllPalettes(state) { document.querySelectorAll('#paletteGrid input[type="checkbox"]').forEach(cb => cb.checked = state); }

    function getActivePalette() {
        const active = {};
        for (const [key, pal] of Object.entries(palettes)) {
            const cb = document.getElementById(`pal_${key}`); if (cb && cb.checked) Object.assign(active, pal.blocks);
        }
        return active;
    }

    document.getElementById('saturation').addEventListener('input', (e) => { document.getElementById('saturationValue').textContent = e.target.value; updateDropPreview(); });
    document.getElementById('weightR').addEventListener('input', (e) => { document.getElementById('wrValue').textContent = e.target.value; });
    document.getElementById('weightG').addEventListener('input', (e) => { document.getElementById('wgValue').textContent = e.target.value; });
    document.getElementById('weightB').addEventListener('input', (e) => { document.getElementById('wbValue').textContent = e.target.value; });

    dropZone.addEventListener('click', () => { if (!dropZone.classList.contains('has-image')) fileInput.click(); });
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('dragover'); });
    dropZone.addEventListener('dragleave', () => { dropZone.classList.remove('dragover'); });
    dropZone.addEventListener('drop', (e) => { e.preventDefault(); dropZone.classList.remove('dragover'); if (e.dataTransfer.files.length > 0) handleFile(e.dataTransfer.files[0]); });
    fileInput.addEventListener('change', (e) => { if (e.target.files.length > 0) handleFile(e.target.files[0]); });

    async function handleFile(file) {
        if (!file.type.startsWith('image/')) { showToast('Выберите изображение'); return; }
        const reader = new FileReader();
        reader.onload = async (e) => {
            const img = new Image();
            img.onload = async () => {
                loadedImage = img;
                generateBtn.disabled = false; anarchyBtn.disabled = false; downloadBtn.disabled = true; mcfunctionContent = '';
                dropZone.classList.add('has-image');
                dropZone.innerHTML = `<div class="drop-preview-wrap"><canvas id="dropPreviewCanvas"></canvas></div><div class="drop-preview-info"><span id="dropPreviewType">Оригинал</span><span><strong>${file.name}</strong></span><span>${img.width}x${img.height}</span><button class="drop-change-btn" onclick="document.getElementById('fileInput').click()">Другое</button></div>`;
                updateDropPreview();

                if (!firstLoadDone) {
                    // First load: auto-generate, then reveal
                    generateBtn.disabled = true;
                    generateBtn.innerHTML = '<div class="spinner"></div> Генерация...';
                    await generatePixelArt();
                    generateBtn.disabled = false;
                    generateBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Сгенерировать';
                    // Reveal: sidebar slides left, canvas visible behind
                    document.getElementById('welcomeOverlay').classList.add('hidden');
                    setTimeout(() => { appLayout.classList.add('revealed'); }, 150);
                    firstLoadDone = true;
                } else {
                    // Subsequent loads: just regenerate, no animation
                    await generatePixelArt();
                }
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function updateDropPreview() {
        if (!loadedImage) return;
        const canvas = document.getElementById('dropPreviewCanvas'); if (!canvas) return;
        const maxP = 280; let w = loadedImage.width, h = loadedImage.height;
        const s = Math.min(maxP / w, maxP / h, 1); w = Math.round(w * s); h = Math.round(h * s);
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d'); ctx.clearRect(0, 0, w, h);
        ctx.save(); if (flipH || flipV) { ctx.translate(flipH ? w : 0, flipV ? h : 0); ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1); }
        ctx.drawImage(loadedImage, 0, 0, w, h); ctx.restore();
        const sat = parseFloat(document.getElementById('saturation').value);
        if (sat !== 1.0) { const d = ctx.getImageData(0, 0, w, h); enhanceSaturation(d, sat); ctx.putImageData(d, 0, 0); }
    }

    function updateDropPreviewArt() {
        const d = window.pixelArtData; if (!d) return;
        const canvas = document.getElementById('dropPreviewCanvas'); if (!canvas) return;
        const { blockMap, paletteArr, w, h } = d;
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d'); const imgData = ctx.createImageData(w, h);
        for (let i = 0; i < blockMap.length; i++) {
            const pi = i * 4, palIdx = blockMap[i];
            if (palIdx === -1) { imgData.data[pi+3] = 0; }
            else { imgData.data[pi] = paletteArr[palIdx][0]; imgData.data[pi+1] = paletteArr[palIdx][1]; imgData.data[pi+2] = paletteArr[palIdx][2]; imgData.data[pi+3] = 255; }
        }
        ctx.putImageData(imgData, 0, 0);
        const typeLabel = document.getElementById('dropPreviewType');
        if (typeLabel) typeLabel.textContent = 'Pixel Art';
    }

    function enhanceSaturation(imageData, factor) {
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i], g = data[i+1], b = data[i+2];
            const gray = 0.2126*r + 0.7152*g + 0.0722*b;
            data[i] = Math.min(255, Math.max(0, gray + factor*(r-gray)));
            data[i+1] = Math.min(255, Math.max(0, gray + factor*(g-gray)));
            data[i+2] = Math.min(255, Math.max(0, gray + factor*(b-gray)));
        }
        return imageData;
    }

    function findClosest(r, g, b, paletteArr, wr, wg, wb) {
        let minDist = Infinity, minIdx = 0;
        for (let i = 0; i < paletteArr.length; i++) {
            const pr = paletteArr[i][0], pg = paletteArr[i][1], pb = paletteArr[i][2];
            const dist = wr*(r-pr)*(r-pr) + wg*(g-pg)*(g-pg) + wb*(b-pb)*(b-pb);
            if (dist < minDist) { minDist = dist; minIdx = i; }
        }
        return minIdx;
    }

    async function generatePixelArt() {
        if (!loadedImage) return;
        const startTime = performance.now();
        const saturation = parseFloat(document.getElementById('saturation').value);
        const maxW = parseInt(document.getElementById('maxWidth').value), maxH = parseInt(document.getElementById('maxHeight').value);
        const wr = parseInt(document.getElementById('weightR').value), wg = parseInt(document.getElementById('weightG').value), wb = parseInt(document.getElementById('weightB').value);
        const activePalette = getActivePalette(), paletteKeys = Object.keys(activePalette);
        if (paletteKeys.length === 0) { showToast('Выберите хотя бы одну палитру'); return; }
        const paletteArr = paletteKeys.map(key => { const [r,g,b] = key.split(',').map(Number); return [r,g,b,activePalette[key]]; });
        let w = loadedImage.width, h = loadedImage.height;
        const scale = Math.min(maxW/w, maxH/h, 1); w = Math.round(w*scale); h = Math.round(h*scale);
        if (w<1) w=1; if (h<1) h=1;
        const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.save(); if (flipH||flipV) { ctx.translate(flipH?w:0, flipV?h:0); ctx.scale(flipH?-1:1, flipV?-1:1); }
        ctx.drawImage(loadedImage, 0, 0, w, h); ctx.restore();
        let imageData = ctx.getImageData(0, 0, w, h);
        imageData = enhanceSaturation(imageData, saturation); ctx.putImageData(imageData, 0, 0);
        const origCanvas = document.getElementById('originalPreview'); origCanvas.width = w; origCanvas.height = h;
        const origCtx = origCanvas.getContext('2d'); origCtx.clearRect(0, 0, w, h); origCtx.drawImage(canvas, 0, 0);
        const data = imageData.data; const cache = {}; const blockMap = new Array(w*h);
        const pixelCanvas = document.createElement('canvas'); pixelCanvas.width = w; pixelCanvas.height = h;
        const pixelCtx = pixelCanvas.getContext('2d'), pixelData = pixelCtx.createImageData(w, h);
        progressBar.classList.add('active'); progressFill.style.width = '0%';
        const totalPixels = w*h, chunkSize = 10000;
        await new Promise(resolve => { let idx = 0;
            function processChunk() { const end = Math.min(idx+chunkSize, totalPixels);
                for (; idx < end; idx++) { const pi = idx*4, a = data[pi+3];
                    if (a < 128) { blockMap[idx]=-1; pixelData.data[pi]=0; pixelData.data[pi+1]=0; pixelData.data[pi+2]=0; pixelData.data[pi+3]=0; continue; }
                    const r=data[pi], g=data[pi+1], b=data[pi+2], key=`${r},${g},${b}`;
                    let palIdx; if (key in cache) palIdx=cache[key]; else { palIdx=findClosest(r,g,b,paletteArr,wr,wg,wb); cache[key]=palIdx; }
                    blockMap[idx]=palIdx;
                    pixelData.data[pi]=paletteArr[palIdx][0]; pixelData.data[pi+1]=paletteArr[palIdx][1]; pixelData.data[pi+2]=paletteArr[palIdx][2]; pixelData.data[pi+3]=255;
                }
                progressFill.style.width = ((idx/totalPixels)*100)+'%';
                if (idx < totalPixels) requestAnimationFrame(processChunk); else resolve();
            }
            requestAnimationFrame(processChunk);
        });
        pixelCtx.putImageData(pixelData, 0, 0);
        const pixelCanvasEl = document.getElementById('pixelPreview'); pixelCanvasEl.width = w; pixelCanvasEl.height = h;
        const ppc = pixelCanvasEl.getContext('2d'); ppc.clearRect(0, 0, w, h); ppc.drawImage(pixelCanvas, 0, 0);
        let skippedCount = 0; const lines = [];
        for (let y=0;y<h;y++) for (let x=0;x<w;x++) { const palIdx=blockMap[y*w+x]; if (palIdx===-1){skippedCount++;continue;} const block=paletteArr[palIdx][3];
            if (currentOrientation==='vertical') lines.push(`setblock ~${x} ~${h-1-y} ~ ${block}`); else lines.push(`setblock ~${x} ~ ~${y} ${block}`); }
        mcfunctionContent = lines.join('\n');
        const elapsed = performance.now()-startTime;
        window.pixelArtData = { blockMap, paletteArr, w, h, skippedCount };
        buildLegend(blockMap, paletteArr, w, h, skippedCount);
        document.getElementById('statBlocks').textContent = lines.length.toLocaleString();
        document.getElementById('statSize').textContent = `${w}x${h}`;
        document.getElementById('statPalette').textContent = paletteKeys.length;
        document.getElementById('statTime').textContent = `${Math.round(elapsed)}ms`;
        previewCard.classList.remove('hidden');
        document.getElementById('viewer3dCard').classList.remove('hidden');
        document.getElementById('legendCard').classList.remove('hidden');
        downloadBtn.disabled = false; progressBar.classList.remove('active');
        updateDropPreviewArt();
        if (window.buildScene3D) { setTimeout(() => window.buildScene3D(), 100); }
        const skipMsg = skippedCount > 0 ? `, ${skippedCount.toLocaleString()} прозрачных пропущено` : '';
        showToast(`Готово: ${lines.length.toLocaleString()} блоков${skipMsg}`);
    }

    async function generateAnarchyArt() {
        if (!loadedImage) return;
        const startTime = performance.now();
        const maxW = parseInt(document.getElementById('maxWidth').value), maxH = parseInt(document.getElementById('maxHeight').value);
        const paletteArr = [[15,10,10,"obsidian"]];
        let w = loadedImage.width, h = loadedImage.height;
        const scale = Math.min(maxW/w, maxH/h, 1); w = Math.round(w*scale); h = Math.round(h*scale);
        if (w<1) w=1; if (h<1) h=1;
        const canvas = document.createElement('canvas'); canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.save(); if (flipH||flipV) { ctx.translate(flipH?w:0, flipV?h:0); ctx.scale(flipH?-1:1, flipV?-1:1); }
        ctx.drawImage(loadedImage, 0, 0, w, h); ctx.restore();
        const imageData = ctx.getImageData(0, 0, w, h), data = imageData.data;
        const origCanvas = document.getElementById('originalPreview'); origCanvas.width = w; origCanvas.height = h;
        const origCtx = origCanvas.getContext('2d'); origCtx.clearRect(0, 0, w, h); origCtx.drawImage(canvas, 0, 0);
        const blockMap = new Array(w*h);
        const pixelCanvas = document.createElement('canvas'); pixelCanvas.width = w; pixelCanvas.height = h;
        const pixelCtx = pixelCanvas.getContext('2d'), pixelData = pixelCtx.createImageData(w, h);
        progressBar.classList.add('active'); progressFill.style.width = '0%';
        const totalPixels = w*h; let skippedCount = 0;
        await new Promise(resolve => { let idx = 0;
            function processChunk() { const end = Math.min(idx+25000, totalPixels);
                for (; idx < end; idx++) { const pi = idx*4;
                    if (data[pi+3] < 128) { blockMap[idx]=-1; pixelData.data[pi+3]=0; skippedCount++; }
                    else { blockMap[idx]=0; pixelData.data[pi]=15; pixelData.data[pi+1]=10; pixelData.data[pi+2]=10; pixelData.data[pi+3]=255; }
                }
                progressFill.style.width = ((idx/totalPixels)*100)+'%';
                if (idx < totalPixels) requestAnimationFrame(processChunk); else resolve();
            }
            requestAnimationFrame(processChunk);
        });
        pixelCtx.putImageData(pixelData, 0, 0);
        const pixelCanvasEl = document.getElementById('pixelPreview'); pixelCanvasEl.width = w; pixelCanvasEl.height = h;
        const ppc = pixelCanvasEl.getContext('2d'); ppc.clearRect(0, 0, w, h); ppc.drawImage(pixelCanvas, 0, 0);
        const lines = [];
        for (let y=0;y<h;y++) for (let x=0;x<w;x++) { if (blockMap[y*w+x]===-1) continue;
            if (currentOrientation==='vertical') lines.push(`setblock ~${x} ~${h-1-y} ~ obsidian`); else lines.push(`setblock ~${x} ~ ~${y} obsidian`); }
        mcfunctionContent = lines.join('\n');
        const elapsed = performance.now()-startTime;
        window.pixelArtData = { blockMap, paletteArr, w, h, skippedCount };
        buildLegend(blockMap, paletteArr, w, h, skippedCount);
        document.getElementById('statBlocks').textContent = lines.length.toLocaleString();
        document.getElementById('statSize').textContent = `${w}x${h}`;
        document.getElementById('statPalette').textContent = '1';
        document.getElementById('statTime').textContent = `${Math.round(elapsed)}ms`;
        previewCard.classList.remove('hidden');
        document.getElementById('viewer3dCard').classList.remove('hidden');
        document.getElementById('legendCard').classList.remove('hidden');
        downloadBtn.disabled = false; progressBar.classList.remove('active');
        if (window.buildScene3D) { setTimeout(() => window.buildScene3D(), 100); }
        updateDropPreviewArt();
        showToast(`Анархия: ${lines.length.toLocaleString()} блоков обсидиана`);
    }

    function buildLegend(blockMap, paletteArr, w, h, skippedCount) {
        const totalBlocks = w*h - skippedCount, blockCounts = {};
        for (let i = 0; i < blockMap.length; i++) { const idx = blockMap[i]; if (idx===-1) continue;
            const name = paletteArr[idx][3], ck = `${paletteArr[idx][0]},${paletteArr[idx][1]},${paletteArr[idx][2]}`;
            if (!blockCounts[name]) blockCounts[name] = { count: 0, color: ck }; blockCounts[name].count++; }
        const sorted = Object.entries(blockCounts).sort((a,b) => b[1].count - a[1].count);
        document.getElementById('legendSummary').innerHTML = `<div class="legend-summary-item"><span class="legend-summary-value">${totalBlocks.toLocaleString()}</span><span class="legend-summary-label">Блоков</span></div><div class="legend-summary-item"><span class="legend-summary-value">${sorted.length}</span><span class="legend-summary-label">Типов</span></div><div class="legend-summary-item"><span class="legend-summary-value">${w}x${h}</span><span class="legend-summary-label">Размер</span></div><div class="legend-summary-item"><span class="legend-summary-value">${currentOrientation==='vertical'?'Стена':'Пол'}</span><span class="legend-summary-label">Ориентация</span></div>`;
        const tbody = document.getElementById('legendBody'); tbody.innerHTML = '';
        for (const [name, data] of sorted) { const [r,g,b] = data.color.split(',').map(Number);
            const pct = ((data.count/totalBlocks)*100).toFixed(1);
            const tr = document.createElement('tr');
            tr.innerHTML = `<td><span class="legend-color" style="background:rgb(${r},${g},${b})"></span></td><td><span class="legend-name">${name}</span></td><td class="legend-count">${data.count.toLocaleString()}</td><td class="legend-percent">${pct}%</td>`;
            tbody.appendChild(tr); }
    }

    function downloadMcfunction() {
        if (!mcfunctionContent) return;
        const blob = new Blob([mcfunctionContent], { type: 'text/plain' }); const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = 'screen.mcfunction'; a.click(); URL.revokeObjectURL(url);
        showToast('Файл screen.mcfunction скачан');
    }

    function showToast(text) { const toast = document.getElementById('toast'); document.getElementById('toastText').textContent = text; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3500); }

    generateBtn.addEventListener('click', () => { generateBtn.disabled = true; generateBtn.innerHTML = '<div class="spinner"></div> Генерация...'; setTimeout(() => { generatePixelArt().finally(() => { generateBtn.disabled = false; generateBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> Сгенерировать'; }); }, 50); });
    downloadBtn.addEventListener('click', downloadMcfunction);
    anarchyBtn.addEventListener('click', () => { anarchyBtn.disabled = true; anarchyBtn.innerHTML = '<div class="spinner"></div> Анархия...'; setTimeout(() => { generateAnarchyArt().finally(() => { anarchyBtn.disabled = false; anarchyBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg> Анархия'; }); }, 50); });

    initPaletteGrid();
