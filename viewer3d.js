    import * as THREE from 'three';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

    let scene, camera, renderer, controls, blockGroup = null, gridHelper = null, axesHelper = null, initialized = false;
    const container = document.getElementById('viewer3dContainer');

    function initThree() {
        if (initialized) return; initialized = true;
        scene = new THREE.Scene(); scene.background = new THREE.Color(0x171717); scene.fog = new THREE.Fog(0x171717, 200, 500);
        const rect = container.getBoundingClientRect();
        camera = new THREE.PerspectiveCamera(50, rect.width/rect.height, 0.1, 1000); camera.position.set(80, 60, 80);
        renderer = new THREE.WebGLRenderer({ antialias: true }); renderer.setSize(rect.width, rect.height); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        controls = new OrbitControls(camera, renderer.domElement); controls.enableDamping = true; controls.dampingFactor = 0.08; controls.minDistance = 10; controls.maxDistance = 400;
        scene.add(new THREE.AmbientLight(0xffffff, 0.6));
        const dl = new THREE.DirectionalLight(0xffffff, 0.8); dl.position.set(50, 100, 50); scene.add(dl);
        const dl2 = new THREE.DirectionalLight(0xffd2c2, 0.2); dl2.position.set(-30, 50, -30); scene.add(dl2);
        new ResizeObserver(() => { const r = container.getBoundingClientRect(); camera.aspect = r.width/r.height; camera.updateProjectionMatrix(); renderer.setSize(r.width, r.height); }).observe(container);
        (function animate() { requestAnimationFrame(animate); if (controls) controls.update(); if (renderer && scene && camera) renderer.render(scene, camera); })();
    }

    window.buildScene3D = function() {
        initThree(); const d = window.pixelArtData; if (!d) return;
        const { blockMap, paletteArr, w, h } = d;
        const isVertical = document.getElementById('orientVertical').classList.contains('active');
        if (blockGroup) { scene.remove(blockGroup); blockGroup.traverse(c => { if(c.geometry)c.geometry.dispose(); if(c.material)c.material.dispose(); }); }
        if (gridHelper) { scene.remove(gridHelper); gridHelper = null; }
        if (axesHelper) { scene.remove(axesHelper); axesHelper = null; }
        blockGroup = new THREE.Group();
        const groups = {};
        for (let y=0;y<h;y++) for (let x=0;x<w;x++) { const p=blockMap[y*w+x]; if(p===-1) continue; if(!groups[p]) groups[p]=[]; groups[p].push({x,y}); }
        const geometry = new THREE.BoxGeometry(1,1,1), matrix = new THREE.Matrix4();
        for (const [ps, positions] of Object.entries(groups)) { const pi=parseInt(ps);
            const mat = new THREE.MeshLambertMaterial({ color: new THREE.Color(paletteArr[pi][0]/255, paletteArr[pi][1]/255, paletteArr[pi][2]/255) });
            const mesh = new THREE.InstancedMesh(geometry, mat, positions.length);
            for (let i=0;i<positions.length;i++) { const {x,y}=positions[i];
                let px,py,pz; if(isVertical){px=x-w/2;py=(h-1-y)-h/2;pz=0;}else{px=x-w/2;py=0;pz=y-h/2;}
                matrix.setPosition(px,py,pz); mesh.setMatrixAt(i, matrix); }
            mesh.instanceMatrix.needsUpdate = true; blockGroup.add(mesh);
        }
        scene.add(blockGroup);
        const maxDim = Math.max(w,h), gs = maxDim+20;
        gridHelper = new THREE.GridHelper(gs, gs, 0x789a99, 0x252525);
        gridHelper.position.y = isVertical ? -h/2-0.5 : -0.5; scene.add(gridHelper);
        axesHelper = new THREE.AxesHelper(Math.min(maxDim*0.3, 15));
        axesHelper.position.set(-w/2, isVertical?-h/2:0, isVertical?0:-h/2); scene.add(axesHelper);
        resetCameraView();
    };

    function resetCameraView() {
        const d = window.pixelArtData; if (!d) return; const {w,h} = d;
        const isV = document.getElementById('orientVertical').classList.contains('active');
        const dist = Math.max(w,h)*1.2;
        if (isV) { camera.position.set(0,0,dist); } else { camera.position.set(0,dist,0); }
        controls.target.set(0,0,0); controls.update();
    }

    window.resetCamera3D = resetCameraView;
    window.viewFront3D = () => { const d=window.pixelArtData; if(!d)return; const dist=Math.max(d.w,d.h)*1.2; const isV=document.getElementById('orientVertical').classList.contains('active');
        camera.position.set(0, isV?0:10, dist); controls.target.set(0,0,0); controls.update(); };
    window.viewTop3D = () => { const d=window.pixelArtData; if(!d)return; const dist=Math.max(d.w,d.h)*1.2;
        camera.position.set(0,dist,document.getElementById('orientVertical').classList.contains('active')?0.01:0); controls.target.set(0,0,0); controls.update(); };
    window.viewAngle3D = () => { const d=window.pixelArtData; if(!d)return; const dist=Math.max(d.w,d.h)*0.9;
        camera.position.set(dist*0.7,dist*0.5,dist*0.7); controls.target.set(0,0,0); controls.update(); };
