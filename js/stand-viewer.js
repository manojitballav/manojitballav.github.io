// Interactive 3D viewer for the HomeView stand post.
// The mesh comes from the Blender build in the 3D-prints project (meshopt-compressed GLB);
// three.js and the model only load once the viewer is near the screen.
const root = document.getElementById("standViewer");
const stage = root.querySelector(".stand-viewer__stage");
const status = root.querySelector(".stand-viewer__status");

// Hinge axis (Blender mm, X across, -Y front, Z up) and the tilt range of the detent clicks
const PIVOT = { y: -87.5, z: 145.3, angle: 10, min: 5, max: 25, step: 5 };

// node -> [label, material, tilts with the iPad, printed, parent label]
const PARTS = {
  part0: ["HomePod cap", "abs_black", 0, 1],
  part1: ["iPad holder", "abs_silver", 1, 1],
  part2: ["Lower lip", "abs_white", 1, 1],
  part3: ["Lip screws", "abs_silver", 1, 1],
  part4: ["Lip screws", "abs_silver", 1, 1],
  part5: ["Lip screws", "abs_silver", 1, 1],
  part6: ["M8 bolt", "abs_silver", 0, 1],
  part7: ["Nut", "abs_silver", 0, 1],
  part8: ["HomePod", "knit_gray", 0, 0],
  part9: ["HomePod", "gloss_black", 0, 0],
  part10: ["HomePod", "rubber_black", 0, 0],
  part11: ["HomePod", "symbols_gray", 0, 0],
  part12: ["HomePod", "cable_black", 0, 0],
  part13: ["iPad", "aluminium", 1, 0],
  part14: ["iPad", "glass_white", 1, 0],
  part15: ["iPad", "screen", 1, 0],
  part16: ["iPad", "steel", 1, 0],
  part17: ["iPad", "button", 1, 0],
  part18: ["iPad", "black", 1, 0],
  part19: ["iPad", "steel", 1, 0],
  part20: ["iPad", "black", 1, 0],
};

const PRESETS = {
  abs_white:    { color: 0xf0efeb, roughness: 0.42, clearcoat: 0.15, clearcoatRoughness: 0.5 },
  abs_black:    { color: 0x1d1d1f, roughness: 0.45, clearcoat: 0.15, clearcoatRoughness: 0.5 },
  abs_silver:   { color: 0xc4c7ca, metalness: 0.12, roughness: 0.4, clearcoat: 0.15, clearcoatRoughness: 0.5 },
  aluminium:    { color: 0xd3d5d8, metalness: 1, roughness: 0.32 },
  glass_white:  { color: 0xf8f8f8, roughness: 0.05, clearcoat: 1, clearcoatRoughness: 0.02 },
  screen:       { color: 0x000000, roughness: 0.04, clearcoat: 1, emissive: 0xffffff, emissiveIntensity: 1.05 },
  button:       { color: 0xe6e6e6, roughness: 0.3 },
  black:        { color: 0x050505, roughness: 0.1 },
  steel:        { color: 0xe5e6e8, metalness: 1, roughness: 0.28 },
  knit_gray:    { color: 0x2b2b2d, roughness: 0.92, sheen: 1, sheenColor: 0x6a6a70, sheenRoughness: 0.5 },
  gloss_black:  { color: 0x0a0a0b, roughness: 0.12, clearcoat: 1 },
  rubber_black: { color: 0x1a1a1a, roughness: 0.8 },
  symbols_gray: { color: 0x6e6e6e, roughness: 0.3 },
  cable_black:  { color: 0x1c1c1c, roughness: 0.85, sheen: 0.4, sheenColor: 0x666666 },
};

let started = false;
const io = new IntersectionObserver(entries => {
  if (entries.some(e => e.isIntersecting) && !started) { started = true; io.disconnect(); start(); }
}, { rootMargin: "400px 0px" });
io.observe(root);

async function start() {
  status.textContent = "Loading 3D model…";
  const [THREE, { OrbitControls }, { GLTFLoader }, { MeshoptDecoder }, { RoomEnvironment }] = await Promise.all([
    import("three"),
    import("three/addons/controls/OrbitControls.js"),
    import("three/addons/loaders/GLTFLoader.js"),
    import("three/addons/libs/meshopt_decoder.module.js"),
    import("three/addons/environments/RoomEnvironment.js"),
  ]);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  stage.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new THREE.PerspectiveCamera(30, 1, 20, 8000);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.minDistance = 180;
  controls.maxDistance = 1600;
  controls.maxPolarAngle = Math.PI / 2 - 0.02;   // stay above the table
  // Don't hijack page scrolling: wheel zoom only after a click inside the viewer, and on
  // touch, vertical swipes scroll the page while horizontal drags orbit.
  controls.enableZoom = false;
  renderer.domElement.style.touchAction = "pan-y";
  renderer.domElement.addEventListener("pointerdown", () => { controls.enableZoom = true; });
  renderer.domElement.addEventListener("pointerleave", () => { controls.enableZoom = false; });

  const sun = new THREE.DirectionalLight(0xffffff, 1.8);
  sun.position.set(-300, 700, 400);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -400, right: 400, top: 400, bottom: -400, far: 2000 });
  sun.shadow.bias = -0.0005;
  scene.add(sun);
  // fill so the back and underside of the parts don't go black when you orbit around
  scene.add(new THREE.HemisphereLight(0xffffff, 0x8a8580, 0.9));
  const rim = new THREE.DirectionalLight(0xffffff, 0.9);
  rim.position.set(300, 400, -500);
  scene.add(rim);

  const shadowMat = new THREE.ShadowMaterial({ opacity: 0.18 });
  const ground = new THREE.Mesh(new THREE.CircleGeometry(900, 64), shadowMat);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);
  const syncTheme = () => {
    shadowMat.opacity = document.documentElement.getAttribute("data-theme") === "dark" ? 0.5 : 0.18;
  };
  new MutationObserver(syncTheme).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  syncTheme();

  const pivot = new THREE.Group();
  pivot.position.set(0, PIVOT.z, -PIVOT.y);   // Blender Z-up -> three.js Y-up
  scene.add(pivot);

  let gltf;
  try {
    gltf = await new GLTFLoader().setMeshoptDecoder(MeshoptDecoder)
      .loadAsync(root.dataset.model, e => {
        if (e.total) status.textContent = `Loading 3D model… ${Math.round(e.loaded / e.total * 100)}%`;
      });
  } catch (err) {
    status.textContent = "Couldn't load the 3D model. The photos below show the same design.";
    return;
  }
  const screenTex = new THREE.TextureLoader().load(root.dataset.screen);
  screenTex.colorSpace = THREE.SRGBColorSpace;
  screenTex.anisotropy = 8;

  const byLabel = {};
  const box = new THREE.Box3();
  scene.add(gltf.scene);
  gltf.scene.updateMatrixWorld(true);
  // gltfpack keeps the part names on parent nodes, with the quantized mesh as a child
  const nodes = [];
  gltf.scene.traverse(o => {
    const m = PARTS[o.name] && (o.isMesh ? o : o.children.find(c => c.isMesh));
    if (m) nodes.push([o.name, m]);
  });
  for (const [name, m] of nodes) {
    const [label, preset, tilts, printed] = PARTS[name];
    m.material = new THREE.MeshPhysicalMaterial(PRESETS[preset]);
    if (preset === "screen") m.material.emissiveMap = screenTex;
    m.castShadow = m.receiveShadow = true;
    if (tilts) pivot.attach(m);
    (byLabel[label] ||= []).push(m);
    if (printed || (label === "HomePod" && name !== "part12")) box.expandByObject(m);   // skip the long cable
  }
  status.textContent = "";
  root.classList.add("is-ready");

  // tilt slider: same 5 click positions as the printed detent
  const tilt = root.querySelector("[data-tilt]"), tiltVal = root.querySelector("[data-tilt-val]");
  Object.assign(tilt, { min: PIVOT.min, max: PIVOT.max, step: PIVOT.step, value: PIVOT.angle, disabled: false });
  const setTilt = () => {
    tiltVal.textContent = tilt.value + "°";
    pivot.rotation.x = -THREE.MathUtils.degToRad(tilt.value - PIVOT.angle);
  };
  tilt.addEventListener("input", setTilt);
  setTilt();

  // hide the HomePod and iPad to see only the printed parts
  const devices = root.querySelector("[data-devices]");
  devices.disabled = false;
  devices.addEventListener("change", () => {
    for (const m of [...byLabel.HomePod, ...byLabel.iPad]) m.visible = devices.checked;
  });

  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3()).length();
  const views = { front: [-0.45, 0.3, 1], side: [1, 0.25, 0.05], back: [0.4, 0.35, -1] };
  function go(v) {
    if (v === "hinge") {
      const t = new THREE.Vector3(-20, PIVOT.z - 12, -PIVOT.y);
      camera.position.copy(t).add(new THREE.Vector3(-230, 90, -60));
      controls.target.copy(t);
    } else {
      camera.position.copy(center).add(new THREE.Vector3(...views[v]).normalize().multiplyScalar(size * 1.6));
      controls.target.copy(center);
    }
    controls.update();
    root.querySelectorAll("[data-view]").forEach(b => b.setAttribute("aria-pressed", b.dataset.view === v));
  }
  root.querySelectorAll("[data-view]").forEach(b => {
    b.disabled = false;
    b.addEventListener("click", () => go(b.dataset.view));
  });

  function resize() {
    const w = stage.clientWidth, h = stage.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(stage);
  resize();
  go("front");

  // only render while the viewer is on screen
  const loop = () => { controls.update(); renderer.render(scene, camera); };
  new IntersectionObserver(([e]) => renderer.setAnimationLoop(e.isIntersecting ? loop : null)).observe(root);
}
