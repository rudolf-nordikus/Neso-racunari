import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { NZ_PATH } from "@/lib/nz";

/*
 * "Kako radi": scroll priča u three.js (isti pristup kao monoform.ba).
 * Diorama ulice u Sarajevu u clay stilu 3D ikona. Sve je vezano za skrol
 * (deterministički iz napretka), pa scena radi i unazad.
 *
 *  0 Kvar        laptop na stolu se dimi, mušterija tužna
 *  1 Poziv       mušterija zove, telefon zvoni
 *  2 Dolazak     Nešo dolazi Berlingom na dogovoreno mjesto (ulica, ne kuća)
 *  3 Preuzimanje Nešo preuzme laptop iz ruku, Berlingo odlazi
 *  4 Servis      radionica: alati, traka napretka, kvačica
 *  5 Povratak    Berlingo se vraća, Nešo predaje laptop
 *  6 Radi        svi sretni, konfete
 *
 * 17.11.: scena živi u kartici "Mobilni tim u Sarajevu" (process-v4.tsx), 4 koraka kartice
 * pokrivaju 7 scena; napredak je prigušen pa klik na korak glatko premota radnju.
 */

export type SceneOptions = {
  canvas: HTMLCanvasElement;
  getProgress: () => number;
  steps: number;
  /** Pomak kadra naviše (udio visine), da tekst preko dna kartice ne pokrije radnju. */
  shiftY?: number;
  /** Odmak kamere (1 = kadar za cijeli ekran, više = šire za manju karticu). */
  zoom?: number;
};

const C = {
  amber: 0xffc300,
  navy: 0x00142d,
  navy7: 0x0a2a4d,
  blue: 0x0084ff,
  white: 0xf4f6f9,
  skin: 0xf2c49b,
  ground: 0x1d4b7f,
  road: 0x0b2240,
  walk: 0x2c5f97,
  green: 0x2fa36b,
  wood: 0xc99a5b,
  grey: 0x8a94a3,
};

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const ease = (t: number) => t * t * (3 - 2 * t);
const seg = (t: number, a: number, b: number) => ease(clamp((t - a) / (b - a)));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const damp = (a: number, b: number, k: number, dt: number) => a + (b - a) * (1 - Math.exp(-k * dt));

export function mountProcessScene({ canvas, getProgress, steps, shiftY = 0, zoom = 1 }: SceneOptions) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = env;
  scene.environmentIntensity = 0.65;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 200);
  const sun = new THREE.DirectionalLight(0xffffff, 1.8);
  sun.position.set(6, 14, 9);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -12, right: 12, top: 12, bottom: -12, near: 1, far: 40 });
  sun.shadow.radius = 5;
  sun.shadow.bias = -0.0004;
  scene.add(sun, new THREE.HemisphereLight(0xcfe6ff, 0x0a2a4d, 0.55));

  // ---------------------------------------------------------------- helpers
  const mats = new Map<string, THREE.MeshPhysicalMaterial>();
  const clay = (color: number, rough = 0.55) => {
    const k = color + ":" + rough;
    if (!mats.has(k)) mats.set(k, new THREE.MeshPhysicalMaterial({ color, roughness: rough, clearcoat: 0.3, clearcoatRoughness: 0.45 }));
    return mats.get(k)!;
  };
  const mesh = (g: THREE.BufferGeometry, m: THREE.Material, parent?: THREE.Object3D) => {
    const x = new THREE.Mesh(g, m);
    x.castShadow = x.receiveShadow = true;
    parent?.add(x);
    return x;
  };
  const rbox = (w: number, h: number, d: number, r: number, color: number, parent?: THREE.Object3D, rough?: number) =>
    mesh(new RoundedBoxGeometry(w, h, d, 3, Math.min(r, w / 2, h / 2, d / 2)), clay(color, rough), parent);
  const textures: THREE.Texture[] = [];
  const canvasTex = (w: number, h: number, draw: (c: CanvasRenderingContext2D) => void) => {
    const cv = document.createElement("canvas");
    cv.width = w;
    cv.height = h;
    const ctx = cv.getContext("2d")!;
    draw(ctx);
    const t = new THREE.CanvasTexture(cv);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    textures.push(t);
    return { t, ctx };
  };
  const nz = new Path2D(NZ_PATH);
  const drawNZ = (c: CanvasRenderingContext2D, x: number, y: number, s: number, color: string) => {
    c.save();
    c.translate(x, y);
    c.scale(s, s);
    c.fillStyle = color;
    c.fill(nz);
    c.restore();
  };

  // ---------------------------------------------------------------- svijet
  const world = new THREE.Group();
  scene.add(world);
  const platform = mesh(new THREE.CylinderGeometry(10.5, 10.5, 0.6, 96), clay(C.ground, 0.8), world);
  platform.position.y = -0.3;
  rbox(21, 0.06, 2.2, 0.03, C.road, world, 0.9).position.set(0, 0.03, 0.5);
  for (let i = -9; i <= 9; i += 1.6) rbox(0.7, 0.02, 0.09, 0.02, C.white, world).position.set(i, 0.07, 0.5);
  rbox(21, 0.12, 2.6, 0.05, C.walk, world, 0.85).position.set(0, 0.06, 2.95);
  rbox(21, 0.16, 0.12, 0.04, C.white, world).position.set(0, 0.08, 1.64);

  // zgrade iza ceste
  const winCanvas = canvasTex(256, 256, (c) => {
    c.fillStyle = "#ffffff";
    c.fillRect(0, 0, 256, 256);
    c.fillStyle = "#b9d6f5";
    for (let y = 20; y < 256; y += 60) for (let x = 22; x < 256; x += 58) c.fillRect(x, y, 30, 38);
  });
  const buildings: [number, number, number, number, number, number][] = [
    [-8.2, -3.2, 2.2, 3.6, 2.4, C.navy7],
    [-1.6, -3.6, 2.2, 4.4, 2.4, 0x163d6a],
    [1.2, -3.0, 2.0, 2.8, 2.2, 0x1c4878],
    [4.2, -3.3, 2.6, 5.0, 2.4, C.navy7],
    [7.4, -2.8, 2.2, 3.2, 2.2, 0x163d6a],
  ];
  for (const [x, z, w, h, d, col] of buildings) {
    rbox(w, h, d, 0.18, col, world, 0.7).position.set(x, h / 2, z);
    const tex = winCanvas.t.clone();
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set((w - 0.4) / 1.1, (h - 0.6) / 1.1);
    tex.needsUpdate = true;
    textures.push(tex);
    const facade = new THREE.Mesh(
      new THREE.PlaneGeometry(w - 0.4, h - 0.6),
      new THREE.MeshBasicMaterial({ map: tex, blending: THREE.MultiplyBlending, transparent: true, premultipliedAlpha: true }),
    );
    facade.position.set(x, h / 2 + 0.1, z + d / 2 + 0.01);
    world.add(facade);
  }
  // drveće
  for (const [x, z, s] of [
    [-9.2, 1.9, 0.8],
    [9.0, -0.9, 0.9],
  ] as [number, number, number][]) {
    const tree = new THREE.Group();
    mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.7, 12), clay(C.wood), tree).position.y = 0.35;
    const crown = mesh(new THREE.SphereGeometry(0.55, 24, 18), clay(C.green, 0.6), tree);
    crown.position.y = 1.05;
    crown.scale.set(1, 1.1, 1);
    tree.position.set(x, 0.12, z);
    tree.scale.setScalar(s);
    world.add(tree);
  }
  // znak "P": dogovoreno mjesto
  const pTex = canvasTex(128, 128, (c) => {
    c.fillStyle = "#0084FF";
    c.beginPath();
    c.roundRect(4, 4, 120, 120, 22);
    c.fill();
    c.fillStyle = "#fff";
    c.font = "bold 92px system-ui, sans-serif";
    c.textAlign = "center";
    c.textBaseline = "middle";
    c.fillText("P", 64, 70);
  }).t;
  const sign = new THREE.Group();
  mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.8, 10), clay(C.grey, 0.4), sign).position.y = 0.9;
  mesh(new THREE.BoxGeometry(0.5, 0.5, 0.04), new THREE.MeshStandardMaterial({ map: pTex, roughness: 0.4 }), sign).position.y = 1.75;
  sign.position.set(4.4, 0.12, 2.0);
  world.add(sign);

  // ---------------------------------------------------------------- radionica "Nešo servis"
  const shop = new THREE.Group();
  shop.position.set(-5.2, 0, -3.3);
  world.add(shop);
  rbox(3.4, 2.6, 0.2, 0.06, C.white, shop).position.set(0, 1.3, -1.1);
  rbox(0.2, 2.6, 2.4, 0.06, C.white, shop).position.set(-1.6, 1.3, 0);
  rbox(0.2, 2.6, 2.4, 0.06, C.white, shop).position.set(1.6, 1.3, 0);
  rbox(3.6, 0.22, 2.6, 0.08, C.amber, shop).position.set(0, 2.68, 0);
  const shopSign = canvasTex(512, 128, (c) => {
    c.fillStyle = "#00142D";
    c.beginPath();
    c.roundRect(0, 0, 512, 128, 28);
    c.fill();
    drawNZ(c, 26, 22, 0.42, "#FFC300");
    c.fillStyle = "#fff";
    c.font = "600 54px system-ui, sans-serif";
    c.textBaseline = "middle";
    c.fillText("Nešo servis", 140, 66);
  }).t;
  const sp = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.6), new THREE.MeshBasicMaterial({ map: shopSign, toneMapped: false }));
  sp.position.set(0, 3.2, 0.95);
  shop.add(sp);
  rbox(2.4, 0.12, 0.9, 0.04, C.wood, shop).position.set(0, 0.85, -0.45);
  for (const x of [-1.05, 1.05]) rbox(0.1, 0.85, 0.8, 0.03, C.navy7, shop).position.set(x, 0.42, -0.45);
  mesh(new THREE.ConeGeometry(0.22, 0.3, 24, 1, true), clay(C.amber), shop).position.set(0.7, 1.75, -0.45);
  const bulb = new THREE.PointLight(0xffd36b, 0, 4);
  bulb.position.set(0.7, 1.6, -0.45);
  shop.add(bulb);

  // ---------------------------------------------------------------- laptop
  const screen = canvasTex(512, 320, () => {});
  let lastScreen = "";
  function drawScreen(mode: "broken" | "progress" | "ok" | "happy", pct = 0, flick = 0) {
    const key = mode + Math.round(pct * 40) + (flick > 0.5 ? 1 : 0);
    if (key === lastScreen) return;
    lastScreen = key;
    const c = screen.ctx;
    if (mode === "broken") {
      c.fillStyle = flick > 0.5 ? "#06101e" : "#0d1f36";
      c.fillRect(0, 0, 512, 320);
      c.strokeStyle = "rgba(255,255,255,0.85)";
      c.lineWidth = 4;
      c.beginPath();
      for (let i = 0; i < 9; i++) {
        const a = (i / 9) * Math.PI * 2 + 0.3;
        let x = 340,
          y = 110;
        c.moveTo(x, y);
        for (let s = 0; s < 4; s++) {
          x += Math.cos(a + (s % 2 ? 0.3 : -0.25)) * 48;
          y += Math.sin(a + (s % 2 ? 0.3 : -0.25)) * 48;
          c.lineTo(x, y);
        }
      }
      c.stroke();
      c.fillStyle = "rgba(255,90,90,0.95)";
      c.font = "bold 64px system-ui, sans-serif";
      c.fillText("!", 120, 200);
    } else if (mode === "progress") {
      c.fillStyle = "#00142D";
      c.fillRect(0, 0, 512, 320);
      drawNZ(c, 212, 60, 0.42, "#FFC300");
      c.fillStyle = "rgba(255,255,255,0.15)";
      c.beginPath();
      c.roundRect(96, 210, 320, 24, 12);
      c.fill();
      c.fillStyle = "#FFC300";
      c.beginPath();
      c.roundRect(96, 210, Math.max(24, 320 * pct), 24, 12);
      c.fill();
    } else {
      c.fillStyle = "#0084FF";
      c.fillRect(0, 0, 512, 320);
      drawNZ(c, 176, 40, 0.72, "#FFFFFF");
      c.fillStyle = "#2fd27a";
      c.beginPath();
      c.arc(410, 250, 38, 0, Math.PI * 2);
      c.fill();
      c.strokeStyle = "#fff";
      c.lineWidth = 9;
      c.lineCap = c.lineJoin = "round";
      c.beginPath();
      c.moveTo(392, 250);
      c.lineTo(405, 263);
      c.lineTo(428, 238);
      c.stroke();
    }
    screen.t.needsUpdate = true;
  }
  const laptop = new THREE.Group();
  rbox(0.78, 0.045, 0.54, 0.02, C.amber, laptop).position.y = 0.022;
  rbox(0.66, 0.008, 0.24, 0.004, C.navy, laptop).position.set(0, 0.048, -0.08);
  const hinge = new THREE.Group();
  hinge.position.set(0, 0.04, -0.26);
  laptop.add(hinge);
  rbox(0.78, 0.5, 0.03, 0.02, C.amber, hinge).position.y = 0.25;
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.43), new THREE.MeshBasicMaterial({ map: screen.t, toneMapped: false }));
  scr.position.set(0, 0.255, 0.017);
  hinge.add(scr);
  world.add(laptop);
  const setLid = (open: number) => (hinge.rotation.x = lerp(Math.PI / 2 - 0.05, -0.25, open));

  const smoke: THREE.Mesh[] = [];
  for (let i = 0; i < 6; i++) {
    const s = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 16, 12),
      new THREE.MeshStandardMaterial({ color: 0x9aa6b5, transparent: true, opacity: 0.6, roughness: 1 }),
    );
    world.add(s);
    smoke.push(s);
  }

  const table = new THREE.Group();
  mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.06, 40), clay(C.white), table).position.y = 0.8;
  mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.8, 12), clay(C.navy7), table).position.y = 0.4;
  mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.04, 24), clay(C.navy7), table).position.y = 0.02;
  table.position.set(3.85, 0.12, 3.05);
  world.add(table);

  // ---------------------------------------------------------------- likovi
  function makePerson(o: { shirt: number; pants: number; hair: number; cap?: boolean }) {
    const root = new THREE.Group();
    const body = new THREE.Group();
    root.add(body);
    const legs = [-0.12, 0.12].map((x) => {
      const p = new THREE.Group();
      p.position.set(x, 0.62, 0);
      mesh(new THREE.CapsuleGeometry(0.1, 0.42, 6, 14), clay(o.pants), p).position.y = -0.3;
      body.add(p);
      return p;
    });
    mesh(new THREE.CapsuleGeometry(0.26, 0.42, 8, 20), clay(o.shirt), body).position.y = 1.0;
    const arms = [-1, 1].map((sx) => {
      const p = new THREE.Group();
      p.position.set(sx * 0.33, 1.22, 0);
      mesh(new THREE.CapsuleGeometry(0.08, 0.38, 6, 12), clay(o.shirt), p).position.y = -0.24;
      mesh(new THREE.SphereGeometry(0.075, 14, 10), clay(C.skin), p).position.y = -0.48;
      body.add(p);
      return p;
    });
    const head = new THREE.Group();
    head.position.y = 1.58;
    body.add(head);
    mesh(new THREE.SphereGeometry(0.25, 28, 22), clay(C.skin, 0.6), head);
    mesh(new THREE.SphereGeometry(0.26, 28, 14, 0, Math.PI * 2, 0, Math.PI / 2.2), clay(o.hair, 0.8), head).position.y = 0.02;
    if (o.cap) {
      mesh(new THREE.CylinderGeometry(0.255, 0.27, 0.14, 28), clay(C.navy), head).position.y = 0.17;
      rbox(0.34, 0.03, 0.2, 0.012, C.amber, head).position.set(0, 0.11, 0.22);
    }
    const eyeG = new THREE.SphereGeometry(0.028, 10, 8);
    for (const x of [-0.085, 0.085]) mesh(eyeG, clay(C.navy, 0.3), head).position.set(x, 0.03, 0.225);
    const smile = mesh(new THREE.TorusGeometry(0.075, 0.016, 8, 20, Math.PI), clay(C.navy, 0.3), head);
    smile.position.set(0, -0.07, 0.228);
    smile.rotation.z = Math.PI;
    const frown = mesh(new THREE.TorusGeometry(0.06, 0.016, 8, 20, Math.PI), clay(C.navy, 0.3), head);
    frown.position.set(0, -0.12, 0.226);
    return {
      root,
      body,
      head,
      arms,
      setMood(happy: boolean) {
        smile.visible = happy;
        frown.visible = !happy;
      },
      walk(phase: number, amt: number) {
        legs[0].rotation.x = Math.sin(phase) * 0.6 * amt;
        legs[1].rotation.x = -Math.sin(phase) * 0.6 * amt;
        arms[0].rotation.x = -Math.sin(phase) * 0.4 * amt;
        arms[1].rotation.x = Math.sin(phase) * 0.4 * amt;
        body.position.y = Math.abs(Math.sin(phase)) * 0.05 * amt;
      },
      reset() {
        arms.forEach((a) => a.rotation.set(0, 0, 0));
        legs.forEach((l) => l.rotation.set(0, 0, 0));
        head.rotation.set(0, 0, 0);
        body.position.y = 0;
        root.scale.setScalar(1);
      },
    };
  }
  type Person = ReturnType<typeof makePerson>;
  const kupac = makePerson({ shirt: C.blue, pants: C.navy, hair: 0x4a2f1d });
  const neso = makePerson({ shirt: C.amber, pants: C.navy, hair: 0xd9dde2 });
  world.add(kupac.root, neso.root);

  const phone = new THREE.Group();
  rbox(0.13, 0.24, 0.03, 0.025, C.amber, phone);
  phone.position.set(0.04, -0.5, 0.06);
  kupac.arms[1].add(phone);
  const rings = Array.from({ length: 3 }, () => {
    const r = new THREE.Mesh(
      new THREE.TorusGeometry(0.2, 0.018, 8, 40),
      new THREE.MeshBasicMaterial({ color: C.amber, transparent: true, opacity: 0.9, toneMapped: false }),
    );
    world.add(r);
    return r;
  });

  // ---------------------------------------------------------------- Berlingo
  const van = new THREE.Group();
  const vanBody = new THREE.Group();
  van.add(vanBody);
  rbox(3.0, 1.35, 1.46, 0.2, C.white, vanBody, 0.4).position.set(-0.25, 1.02, 0);
  rbox(0.95, 0.62, 1.42, 0.18, C.white, vanBody, 0.4).position.set(1.55, 0.72, 0);
  const glass = clay(0x1a2f4d, 0.15);
  const ws = mesh(new RoundedBoxGeometry(0.08, 0.62, 1.26, 2, 0.03), glass, vanBody);
  ws.position.set(1.16, 1.27, 0);
  ws.rotation.z = 0.55;
  for (const z of [-0.735, 0.735]) {
    if (z < 0) mesh(new RoundedBoxGeometry(0.85, 0.44, 0.02, 2, 0.01), glass, vanBody).position.set(0.55, 1.36, z);
    rbox(3.9, 0.11, 0.02, 0.01, C.amber, vanBody).position.set(0.15, 0.62, z * 1.002);
  }
  // Klizna vrata na strani trotoara: otvor (tamno) + vrata koja kližu unazad.
  const doorHole = mesh(new THREE.PlaneGeometry(0.8, 1.1), clay(C.navy, 0.9), vanBody);
  doorHole.position.set(0.55, 1.05, 0.738);
  const door = new THREE.Group();
  rbox(0.82, 1.12, 0.04, 0.03, C.white, door, 0.4);
  mesh(new RoundedBoxGeometry(0.66, 0.42, 0.02, 2, 0.01), glass, door).position.set(0, 0.31, 0.021);
  rbox(0.82, 0.11, 0.02, 0.01, C.amber, door).position.set(0, -0.43, 0.022);
  rbox(0.14, 0.035, 0.02, 0.01, C.navy, door).position.set(-0.3, 0.02, 0.024);
  vanBody.add(door);
  const setDoor = (open: number) => {
    const k = ease(clamp(open));
    door.position.set(0.55 - 0.62 * k, 1.05, 0.757 + 0.05 * Math.min(1, k * 4));
  };
  setDoor(0);
  const decal = canvasTex(640, 220, (c) => {
    drawNZ(c, 18, 30, 0.75, "#FFC300");
    c.fillStyle = "#00142D";
    c.font = "600 64px system-ui, sans-serif";
    c.textBaseline = "middle";
    c.fillText("Nešo Računari", 200, 92);
    c.font = "500 40px system-ui, sans-serif";
    c.fillStyle = "#0084FF";
    c.fillText("061 336 599", 202, 160);
  }).t;
  for (const z of [-0.741, 0.741]) {
    const p = new THREE.Mesh(new THREE.PlaneGeometry(1.12, 0.39), new THREE.MeshStandardMaterial({ map: decal, transparent: true, roughness: 0.5 }));
    p.position.set(-1.16, 1.05, z);
    if (z < 0) p.rotation.y = Math.PI;
    vanBody.add(p);
  }
  // Berlingo detalji: branici, maska, farovi, stop svjetla, retrovizori, krovni nosači, linija kliznih vrata
  const lamp = (color: number) => new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 0.6, roughness: 0.3 });
  rbox(0.2, 0.24, 1.5, 0.08, C.navy, vanBody, 0.7).position.set(2.0, 0.5, 0);
  rbox(0.2, 0.24, 1.48, 0.08, C.navy, vanBody, 0.7).position.set(-1.77, 0.5, 0);
  rbox(0.04, 0.2, 0.86, 0.03, C.navy, vanBody, 0.5).position.set(2.02, 0.76, 0);
  for (const z of [-0.5, 0.5]) mesh(new RoundedBoxGeometry(0.05, 0.13, 0.3, 2, 0.02), lamp(0xfff4d6), vanBody).position.set(2.02, 0.86, z);
  for (const z of [-0.62, 0.62]) mesh(new RoundedBoxGeometry(0.05, 0.34, 0.12, 2, 0.02), lamp(0xff4a4a), vanBody).position.set(-1.76, 1.12, z);
  for (const z of [-0.82, 0.82]) rbox(0.14, 0.13, 0.08, 0.03, C.navy, vanBody).position.set(1.08, 1.2, z);
  for (const z of [-0.56, 0.56]) rbox(2.5, 0.05, 0.06, 0.02, C.grey, vanBody, 0.35).position.set(-0.3, 1.73, z);
  for (const z of [-0.734, 0.734]) {
    if (z < 0) rbox(0.025, 0.95, 0.01, 0.005, 0xc9d2de, vanBody).position.set(0.05, 1.0, z);
  }
  const wheels: THREE.Group[] = [];
  for (const x of [-1.15, 1.45])
    for (const z of [-0.66, 0.66]) {
      const w = new THREE.Group();
      mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.24, 28), clay(C.navy, 0.8), w).rotation.x = Math.PI / 2;
      mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.25, 20), clay(C.grey, 0.3), w).rotation.x = Math.PI / 2;
      w.position.set(x, 0.34, z);
      van.add(w);
      wheels.push(w);
    }
  world.add(van);

  // ---------------------------------------------------------------- iskre u radionici
  const sparks = new THREE.InstancedMesh(new THREE.OctahedronGeometry(0.05), new THREE.MeshBasicMaterial({ color: C.amber, toneMapped: false }), 24);
  shop.add(sparks);
  const dummy = new THREE.Object3D();

  // ---------------------------------------------------------------- pozicije
  const KUPAC = new THREE.Vector3(3.05, 0.12, 2.75);
  const STOP_X = 0.2;
  const DOORPT = new THREE.Vector3(STOP_X + 0.55, 0.12, 1.38); // ispred kliznih vrata
  const MEET = new THREE.Vector3(2.1, 0.12, 2.75);
  const FACE_K = -Math.PI / 2 + 0.55; // kupac okrenut ka Neši, malo ka kameri
  const FACE_N = Math.PI / 2 - 0.55;
  const UP = new THREE.Vector3(0, 1, 0);
  const holdPos = (p: Person, out = new THREE.Vector3(), reach = 0.42) => {
    const f = new THREE.Vector3(0, 0, reach).applyAxisAngle(UP, p.root.rotation.y);
    return out.copy(p.root.position).add(f).setY(p.root.position.y + 0.98 + p.body.position.y);
  };

  // kamera po scenama: [pozicija, pogled]
  const CAM: [number[], number[]][] = [
    [[5.4, 2.3, 6.3], [3.6, 1.2, 2.9]], // krupno: laptop se dimi
    [[5.2, 2.7, 7.4], [3.1, 1.3, 2.8]], // odmak: mušterija zove
    [[3.6, 3.6, 10.2], [1.5, 0.9, 1.9]], // ulica: Berlingo stiže
    [[3.0, 3.1, 8.8], [1.9, 1.0, 2.3]], // primopredaja
    [[-5.3, 2.4, 2.6], [-5.2, 1.15, -3.6]], // radionica, frontalno
    [[3.6, 3.6, 10.2], [1.5, 0.9, 1.9]], // isti kadar kao dolazak
    [[3.0, 2.6, 7.6], [2.5, 1.2, 2.7]], // završni, bliže
  ];
  const camPos = new THREE.Vector3(...CAM[0][0]);
  const camLook = new THREE.Vector3(...CAM[0][1]);
  const tmp = new THREE.Vector3();
  let distMul = 1;

  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    distMul = camera.aspect < 1 ? 1.3 + (1 - camera.aspect) * 1.2 : camera.aspect > 2 ? 0.92 : camera.aspect < 1.2 ? 1.12 : 1;
    distMul *= zoom;
    if (shiftY) camera.setViewOffset(w, h, 0, h * shiftY, w, h);
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();
  let visible = true;
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
  io.observe(canvas);

  // ---------------------------------------------------------------- kadar
  let raf = 0;
  let last = performance.now();
  let P = clamp(getProgress(), 0, 0.9999) * steps;
  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!visible || document.hidden) return;
    const time = now / 1000;
    const target = clamp(getProgress(), 0, 0.9999) * steps;
    P = Math.abs(target - P) > 1.5 ? target : damp(P, target, 5, dt);
    const s = Math.floor(P);
    const t = P - s;

    kupac.reset();
    neso.reset();
    kupac.root.position.copy(KUPAC);
    kupac.root.rotation.y = 0;
    kupac.setMood(s >= 6);
    neso.setMood(true);
    neso.root.visible = false;
    phone.visible = false;
    laptop.visible = true;
    laptop.rotation.set(0, 0, 0);
    smoke.forEach((m) => (m.visible = false));
    rings.forEach((r) => (r.visible = false));
    sparks.visible = false;
    bulb.intensity = 0;
    let vanX = -14;
    setDoor(0);

    const onTable = () => {
      laptop.position.set(table.position.x, table.position.y + 0.83, table.position.z - 0.05);
      laptop.rotation.y = 0;
    };
    // Otvoren laptop se drži dalje od tijela (poklopac je bliže tijelu) i nagnut ka gledaocu.
    const inHands = (p: Person, open = 0) => {
      holdPos(p, laptop.position, 0.42 + 0.34 * open);
      laptop.position.y -= 0.06 * open;
      laptop.rotation.set(-0.2 * open, p.root.rotation.y, 0, "YXZ");
      setLid(open);
      p.arms[0].rotation.x = p.arms[1].rotation.x = -1.15 - 0.35 * open;
    };
    const walkTo = (p: Person, a: THREE.Vector3, b: THREE.Vector3, k: number) => {
      const kk = clamp(k);
      p.root.position.lerpVectors(a, b, ease(kk));
      p.root.rotation.y = Math.atan2(b.x - a.x, b.z - a.z);
      p.walk(kk * 18, kk > 0 && kk < 1 ? 1 : 0);
    };
    const handOver = (from: Person, to: Person, k: number) => {
      const a = holdPos(from);
      const b = holdPos(to);
      laptop.position.lerpVectors(a, b, k);
      laptop.position.y += Math.sin(k * Math.PI) * 0.25;
      laptop.rotation.y = lerp(from.root.rotation.y, to.root.rotation.y, k);
      setLid(0);
      from.arms[0].rotation.x = from.arms[1].rotation.x = -1.15 * (1 - k * 0.8);
      to.arms[0].rotation.x = to.arms[1].rotation.x = -1.15 * Math.min(1, k * 1.6);
    };

    if (s === 0) {
      onTable();
      setLid(1);
      drawScreen("broken", 0, Math.sin(time * 9) > 0.6 ? 1 : 0);
      smoke.forEach((m, i) => {
        const k = (time * 0.45 + i / smoke.length) % 1;
        m.visible = true;
        m.position.set(laptop.position.x + Math.sin(i * 2 + time) * 0.12, laptop.position.y + 0.35 + k * 1.3, laptop.position.z - 0.25);
        m.scale.setScalar(0.6 + k * 1.6);
        (m.material as THREE.MeshStandardMaterial).opacity = 0.55 * (1 - k);
      });
      kupac.head.rotation.x = 0.25;
      kupac.arms[0].rotation.z = -0.5;
      kupac.arms[1].rotation.z = 0.5;
      kupac.arms[0].rotation.x = kupac.arms[1].rotation.x = -0.5 - Math.sin(time * 3) * 0.08;
    } else if (s === 1) {
      onTable();
      setLid(1);
      drawScreen("broken");
      phone.visible = true;
      kupac.arms[1].rotation.x = -2.5;
      kupac.arms[1].rotation.z = 0.55;
      kupac.root.updateMatrixWorld(true);
      rings.forEach((r, i) => {
        const k = (time * 0.9 + i / 3) % 1;
        r.visible = true;
        phone.getWorldPosition(r.position);
        r.scale.setScalar(0.4 + k * 1.8);
        r.lookAt(camera.position);
        (r.material as THREE.MeshBasicMaterial).opacity = 0.9 * (1 - k);
      });
    } else if (s === 2) {
      kupac.root.rotation.y = lerp(0, FACE_K, seg(t, 0.55, 0.8));
      if (t < 0.5) {
        onTable();
        setLid(1);
      } else {
        inHands(kupac, 0);
        const back = 1 - seg(t, 0.5, 0.65);
        laptop.position.lerp(tmp.set(table.position.x, table.position.y + 0.83, table.position.z - 0.05), back);
      }
      drawScreen("broken");
      vanX = lerp(-14, STOP_X, seg(t, 0, 0.7));
      setDoor(seg(t, 0.72, 0.84));
      if (t > 0.8) {
        neso.root.visible = true;
        neso.root.position.copy(DOORPT);
        neso.root.rotation.y = lerp(0, 0.7, seg(t, 0.85, 1));
      }
    } else if (s === 3) {
      kupac.root.rotation.y = FACE_K;
      vanX = t < 0.82 ? STOP_X : lerp(STOP_X, 14, seg(t, 0.82, 1));
      neso.root.visible = t < 0.76;
      setDoor(1 - seg(t, 0.76, 0.84));
      if (t < 0.3) {
        walkTo(neso, DOORPT, MEET, t / 0.3);
        inHands(kupac, 0);
      } else if (t < 0.55) {
        neso.root.position.copy(MEET);
        neso.root.rotation.y = FACE_N;
        handOver(kupac, neso, seg(t, 0.3, 0.52));
      } else {
        walkTo(neso, MEET, DOORPT, (t - 0.55) / 0.2);
        if (t > 0.72) neso.root.rotation.y = lerp(neso.root.rotation.y, Math.PI, seg(t, 0.72, 0.76));
        inHands(neso, 0);
        kupac.arms[1].rotation.x = -2.7;
        kupac.arms[1].rotation.z = -0.3 + Math.sin(time * 8) * 0.35; // maše
      }
      laptop.visible = t < 0.76;
    } else if (s === 4) {
      neso.root.visible = true;
      neso.root.position.set(shop.position.x - 0.62, 0, shop.position.z + 0.35);
      neso.root.rotation.y = Math.atan2(0.62, -0.8);
      neso.arms[0].rotation.x = -1.2 + Math.sin(time * 10) * 0.15;
      neso.arms[1].rotation.x = -1.0 + Math.cos(time * 9) * 0.2;
      laptop.position.set(shop.position.x, 0.92, shop.position.z - 0.45);
      setLid(1);
      const done = t > 0.82;
      drawScreen(done ? "ok" : "progress", seg(t, 0.05, 0.8));
      bulb.intensity = 6;
      sparks.visible = !done;
      for (let i = 0; i < 24; i++) {
        const k = (time * 1.4 + i / 24) % 1;
        dummy.position.set(Math.sin(i * 7.1) * 0.35 * k, 0.95 + k * 0.6, -0.4 + Math.cos(i * 3.3) * 0.25 * k);
        dummy.scale.setScalar(1 - k);
        dummy.rotation.set(time * 4 + i, time * 3, 0);
        dummy.updateMatrix();
        sparks.setMatrixAt(i, dummy.matrix);
      }
      sparks.instanceMatrix.needsUpdate = true;
      kupac.root.rotation.y = -Math.PI / 2;
    } else if (s === 5) {
      kupac.root.rotation.y = FACE_K;
      vanX = lerp(-14, STOP_X, seg(t, 0, 0.42));
      drawScreen("ok");
      setDoor(seg(t, 0.42, 0.5));
      laptop.visible = t > 0.48;
      if (t > 0.48) {
        neso.root.visible = true;
        if (t < 0.76) {
          walkTo(neso, DOORPT, MEET, (t - 0.5) / 0.26);
          inHands(neso, 0);
        } else {
          neso.root.position.copy(MEET);
          neso.root.rotation.y = FACE_N;
          handOver(neso, kupac, seg(t, 0.76, 0.95));
        }
      }
    } else {
      vanX = STOP_X;
      setDoor(1);
      kupac.setMood(true);
      kupac.root.rotation.y = lerp(FACE_K, -0.3, seg(t, 0, 0.3));
      neso.root.visible = true;
      neso.root.position.copy(MEET);
      neso.root.rotation.y = lerp(FACE_N, 0.4, seg(t, 0, 0.3));
      kupac.root.position.y = KUPAC.y + Math.sin(seg(t, 0.32, 0.5) * Math.PI) * 0.16;
      inHands(kupac, seg(t, 0.05, 0.3));
      drawScreen("happy");
      neso.arms[0].rotation.x = -2.8;
      neso.arms[0].rotation.z = -0.3 + Math.sin(time * 8) * 0.2;
      neso.arms[1].rotation.x = -0.6;
    }

    // Berlingo
    van.position.set(vanX, 0.07, 0.42);
    van.visible = Math.abs(vanX) < 10.4;
    vanBody.position.y = vanX !== STOP_X && van.visible ? Math.sin(time * 30) * 0.008 : 0;
    wheels.forEach((w) => (w.rotation.z = -vanX / 0.34));

    // kamera (prigušeno)
    const [cp, cl] = CAM[s];
    const orbit = s === 6 ? Math.sin(time * 0.3) * 0.6 : 0;
    camPos.set(damp(camPos.x, cp[0] + orbit, 2.6, dt), damp(camPos.y, cp[1], 2.6, dt), damp(camPos.z, cp[2], 2.6, dt));
    camLook.set(damp(camLook.x, cl[0], 2.6, dt), damp(camLook.y, cl[1], 2.6, dt), damp(camLook.z, cl[2], 2.6, dt));
    camera.position.copy(camPos).sub(camLook).multiplyScalar(distMul).add(camLook);
    camera.lookAt(camLook);
    renderer.render(scene, camera);
  }
  raf = requestAnimationFrame(frame);

  return {
    dispose() {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
      textures.forEach((x) => x.dispose());
      env.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
