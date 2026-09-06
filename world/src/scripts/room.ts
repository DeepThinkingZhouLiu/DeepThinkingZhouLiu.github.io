import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export type StationId = 'about' | 'news' | 'papers' | 'projects' | 'contact';
export type Obstacle = { x: number; z: number; w: number; d: number };
export const stationPositions: Record<StationId, THREE.Vector3> = {
  about: new THREE.Vector3(-4.3, 2.8, -2.1),
  news: new THREE.Vector3(1.9, 3.25, -3.65),
  papers: new THREE.Vector3(-3.9, 2.35, 0.15),
  projects: new THREE.Vector3(0.7, 1.95, -1.85),
  contact: new THREE.Vector3(3.0, 1.15, 1.75),
};

export function buildRoom() {
  const room = new THREE.Group();
  const materials = new Map<string, THREE.MeshStandardMaterial>();
  const textures: THREE.Texture[] = [];
  const material = (color: string) => {
    if (!materials.has(color))
      materials.set(
        color,
        new THREE.MeshStandardMaterial({ color, roughness: 0.8 }),
      );
    return materials.get(color)!;
  };
  const palette = {
    wood: '#b88555',
    lightWood: '#d9af7c',
    darkWood: '#785439',
    cream: '#f4e9d3',
    green: '#486857',
    dark: '#233e3b',
    orange: '#bd593a',
    yellow: '#e7ba5b',
    blue: '#709ea5',
  };
  function box(
    w: number,
    h: number,
    d: number,
    x: number,
    y: number,
    z: number,
    color: string,
    parent: THREE.Object3D = room,
    rounded = false,
  ) {
    const geometry = rounded
      ? new RoundedBoxGeometry(w, h, d, 2, 0.05)
      : new THREE.BoxGeometry(w, h, d);
    const mesh = new THREE.Mesh(geometry, material(color));
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  function cylinder(
    rt: number,
    rb: number,
    h: number,
    x: number,
    y: number,
    z: number,
    color: string,
    parent: THREE.Object3D = room,
    segments = 16,
  ) {
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(rt, rb, h, segments),
      material(color),
    );
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }
  function sphere(
    r: number,
    x: number,
    y: number,
    z: number,
    color: string,
    parent: THREE.Object3D = room,
  ) {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(r, 12, 8),
      material(color),
    );
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    parent.add(mesh);
    return mesh;
  }
  function print(
    w: number,
    h: number,
    x: number,
    y: number,
    z: number,
    lines: string[],
    color = '#f5efdc',
    ink = '#294940',
    rotation = 0,
  ) {
    const canvas = document.createElement('canvas');
    canvas.width = 768;
    canvas.height = Math.round((768 * h) / w);
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = ink;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    lines.forEach((line, i) => {
      ctx.font = `${i === 0 ? '600' : '400'} ${i === 0 ? 66 : 42}px sans-serif`;
      ctx.fillText(
        line,
        384,
        (canvas.height * (i + 1)) / (lines.length + 1),
        700,
      );
    });
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    textures.push(texture);
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshStandardMaterial({ map: texture, roughness: 0.95 }),
    );
    mesh.position.set(x, y, z);
    mesh.rotation.y = rotation;
    room.add(mesh);
    return mesh;
  }
  function plant(x: number, z: number, scale = 1) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    g.scale.setScalar(scale);
    room.add(g);
    cylinder(0.32, 0.24, 0.5, 0, 0.25, 0, palette.orange, g);
    cylinder(0.29, 0.29, 0.035, 0, 0.505, 0, palette.darkWood, g);
    for (let i = 0; i < 7; i++) {
      const a = i * 2.4;
      const height = 0.7 + (i % 3) * 0.22;
      const stem = cylinder(
        0.018,
        0.025,
        height,
        Math.cos(a) * 0.12,
        0.5 + height / 2,
        Math.sin(a) * 0.12,
        palette.green,
        g,
        6,
      );
      stem.rotation.z = Math.sin(a) * 0.25;
      const leaf = sphere(
        0.26,
        Math.cos(a) * 0.29,
        0.55 + height,
        Math.sin(a) * 0.28,
        i % 2 ? '#657d48' : '#345c45',
        g,
      );
      leaf.scale.set(0.8, 1.6, 0.35);
      leaf.rotation.set(Math.cos(a) * 0.7, a, Math.sin(a) * 0.7);
    }
  }
  // 开放式剖面房间：只保留两面墙，避免遮住交互物件。
  box(10, 0.32, 8, 0, -0.2, 0, palette.darkWood, room, true);
  for (let i = 0; i < 20; i++)
    box(
      0.475,
      0.1,
      7.9,
      -4.75 + i * 0.5,
      -0.005,
      0,
      i % 3 === 0 ? '#d6b384' : i % 3 === 1 ? '#cba479' : '#d2ac7d',
    );
  box(0.18, 3.9, 8, -4.96, 1.83, 0, '#cbd1b9');
  box(10, 3.9, 0.18, 0, 1.83, -3.95, '#dce0cb');
  box(0.08, 0.16, 8, -4.83, 0.12, 0, '#8f9b7e');
  box(10, 0.16, 0.08, 0, 0.12, -3.82, '#8f9b7e');
  box(0.23, 0.09, 8.05, -4.96, 3.8, 0, '#e7e8d7');
  box(10.1, 0.09, 0.23, 0, 3.8, -3.95, '#e7e8d7');
  // 后墙窗户、窗台和竖向窗棂。
  box(2.65, 2.25, 0.13, -2.45, 2.2, -3.77, palette.cream);
  box(2.4, 1.98, 0.07, -2.45, 2.2, -3.67, '#91b8ba');
  box(2.4, 0.92, 0.03, -2.45, 1.69, -3.615, '#b5cbb2');
  sphere(0.25, -2.95, 2.8, -3.59, '#f7d682').scale.z = 0.1;
  box(0.065, 2, 0.06, -2.45, 2.2, -3.56, palette.cream);
  box(2.4, 0.065, 0.06, -2.45, 2.2, -3.55, palette.cream);
  box(2.85, 0.1, 0.42, -2.45, 1.04, -3.6, palette.lightWood);
  for (let i = 0; i < 3; i++) {
    cylinder(
      0.12,
      0.1,
      0.2,
      -3.2 + i * 0.58,
      1.19,
      -3.5,
      i === 1 ? palette.cream : palette.orange,
    );
    sphere(0.16, -3.2 + i * 0.58, 1.43, -3.5, palette.green).scale.set(
      0.8,
      1.2,
      0.8,
    );
  }
  // 论文书架靠左墙，书脊颜色重复，减少视觉噪声。
  box(0.95, 2.25, 2.9, -4.22, 1.13, 0.25, palette.darkWood);
  box(0.98, 2.32, 0.09, -4.18, 1.16, -1.25, palette.lightWood);
  box(0.98, 2.32, 0.09, -4.18, 1.16, 1.75, palette.lightWood);
  for (let row = 0; row < 3; row++) {
    box(1.03, 0.075, 3.07, -4.2, 0.11 + row * 0.75, 0.25, palette.lightWood);
    for (let j = 0; j < 12; j++) {
      const h = 0.36 + ((j * 7 + row * 3) % 5) * 0.06;
      const color = [
        palette.cream,
        palette.green,
        palette.orange,
        palette.blue,
        palette.yellow,
      ][(j + row * 2) % 5];
      box(
        0.62,
        h,
        0.12 + (j % 3) * 0.03,
        -4.01,
        0.17 + row * 0.75 + h / 2,
        -1.05 + j * 0.225,
        color,
      );
      box(
        0.018,
        0.026,
        0.09,
        -3.689,
        0.25 + row * 0.75 + h * 0.55,
        -1.05 + j * 0.225,
        palette.cream,
      );
    }
  }
  box(1.08, 0.1, 3.14, -4.22, 2.29, 0.25, palette.lightWood);
  print(
    1.18,
    0.47,
    -3.67,
    2.0,
    0.2,
    ['PAPERS', 'IDEAS INTO EVIDENCE'],
    palette.cream,
    palette.dark,
    Math.PI / 2,
  );
  box(0.075, 1.2, 1.38, -4.83, 2.55, -2.55, palette.darkWood);
  print(
    1.22,
    1.06,
    -4.78,
    2.55,
    -2.55,
    ['ZHOU LIU', 'RESEARCH AGENTS', 'PEKING UNIVERSITY'],
    palette.cream,
    palette.dark,
    Math.PI / 2,
  );
  // 公告板展示真实接收消息，完整条目在语义化 HTML 中。
  box(2.25, 1.55, 0.12, 1.8, 2.75, -3.78, palette.darkWood);
  box(2.1, 1.4, 0.08, 1.8, 2.75, -3.68, '#b58962');
  print(1.32, 0.95, 1.44, 2.75, -3.61, [
    '4 PAPERS',
    'EMNLP 2026',
    'MAIN + FINDINGS',
  ]);
  print(0.52, 0.64, 2.47, 2.62, -3.6, ['CVPR', '2026'], palette.yellow);
  sphere(0.038, 1.4, 3.2, -3.56, palette.orange);
  sphere(0.035, 2.47, 2.91, -3.55, palette.green);
  // 工作台和显示器。
  box(3.7, 0.15, 1.25, 0.65, 1.17, -2.39, palette.lightWood, room, true);
  for (const x of [-0.9, 2.2])
    for (const z of [-2.85, -1.95])
      box(0.1, 1.14, 0.1, x, 0.56, z, palette.dark);
  box(0.66, 0.055, 0.34, 0.6, 1.29, -2.6, palette.dark);
  box(0.075, 0.35, 0.08, 0.6, 1.46, -2.62, palette.dark);
  box(1.44, 0.92, 0.095, 0.6, 1.91, -2.66, palette.dark, room, true);
  print(
    1.32,
    0.8,
    0.6,
    1.91,
    -2.602,
    ['> hello, world_', 'agents / data / discovery', 'OPEN SOURCE'],
    palette.dark,
    '#bed9ae',
  );
  box(0.77, 0.035, 0.28, 0.6, 1.28, -2.03, '#ece4d2', room, true);
  for (let i = 0; i < 7; i++)
    for (let j = 0; j < 2; j++)
      box(
        0.067,
        0.013,
        0.055,
        0.31 + i * 0.092,
        1.303,
        -2.1 + j * 0.09,
        '#b7bcad',
      );
  box(0.15, 0.045, 0.21, 1.21, 1.28, -2.04, palette.cream, room, true);
  cylinder(0.13, 0.12, 0.23, -0.63, 1.36, -2.22, palette.cream);
  cylinder(0.106, 0.106, 0.018, -0.63, 1.48, -2.22, palette.darkWood);
  const handle = new THREE.Mesh(
    new THREE.TorusGeometry(0.085, 0.026, 8, 12),
    material(palette.cream),
  );
  handle.position.set(-0.79, 1.37, -2.22);
  room.add(handle);
  box(0.55, 0.07, 0.41, 1.94, 1.31, -2.2, palette.orange);
  box(0.48, 0.05, 0.37, 1.9, 1.37, -2.21, palette.cream);
  const lamp = new THREE.Group();
  lamp.position.set(-0.87, 1.25, -2.73);
  room.add(lamp);
  cylinder(0.18, 0.22, 0.055, 0, 0.028, 0, palette.dark, lamp);
  cylinder(0.024, 0.024, 0.65, 0, 0.35, 0, palette.dark, lamp, 8);
  cylinder(0.07, 0.26, 0.22, 0, 0.73, 0, palette.orange, lamp);
  const lampLight = new THREE.PointLight('#ffcb83', 0, 4, 2);
  lampLight.position.set(-0.87, 1.82, -2.6);
  room.add(lampLight);
  // 工作椅、地毯以及聊天角。
  cylinder(0.46, 0.43, 0.12, 0.6, 0.63, -0.97, palette.green);
  box(0.82, 0.65, 0.15, 0.6, 1, -0.56, palette.green, room, true);
  cylinder(0.045, 0.045, 0.54, 0.6, 0.3, -0.97, palette.dark);
  box(0.7, 0.065, 0.1, 0.6, 0.07, -0.97, palette.dark);
  box(0.1, 0.065, 0.7, 0.6, 0.07, -0.97, palette.dark);
  box(3.6, 0.025, 2.45, 0.35, 0.065, 1.15, '#e3d6b7', room, true);
  for (let i = 0; i < 7; i++)
    box(0.035, 0.003, 2.25, -1.15 + i * 0.49, 0.08, 1.15, '#bcbca0');
  box(3.35, 0.003, 0.04, 0.35, 0.081, 0.08, palette.orange);
  box(3.35, 0.003, 0.04, 0.35, 0.081, 2.21, palette.orange);
  const chair = new THREE.Group();
  chair.position.set(3.32, 0, 1.88);
  chair.rotation.y = -0.4;
  room.add(chair);
  box(1.32, 0.43, 1.18, 0, 0.48, 0, palette.orange, chair, true);
  box(1.32, 0.92, 0.25, 0, 0.87, 0.49, palette.orange, chair, true);
  box(0.18, 0.45, 1.22, -0.64, 0.73, 0, palette.orange, chair, true);
  box(0.18, 0.45, 1.22, 0.64, 0.73, 0, palette.orange, chair, true);
  box(0.56, 0.43, 0.16, 0, 0.91, 0.26, '#e5bf87', chair, true).rotation.z =
    0.14;
  for (const x of [-0.45, 0.45])
    for (const z of [-0.38, 0.38])
      cylinder(0.045, 0.055, 0.28, x, 0.14, z, palette.darkWood, chair);
  cylinder(0.42, 0.42, 0.09, 2.08, 0.69, 1.38, palette.lightWood);
  cylinder(0.055, 0.07, 0.65, 2.08, 0.33, 1.38, palette.darkWood);
  box(0.38, 0.04, 0.27, 2.04, 0.76, 1.34, palette.green);
  cylinder(0.09, 0.08, 0.17, 2.23, 0.82, 1.42, palette.cream);
  plant(4.1, -2.75, 1.12);
  plant(-3.8, 2.92, 0.85);
  // 奖杯和墙上装饰，保持轻量几何。
  box(1.18, 0.085, 0.47, 4, 2.24, -3.57, palette.lightWood);
  cylinder(0.13, 0.13, 0.1, 3.93, 2.34, -3.49, palette.darkWood);
  cylinder(0.04, 0.04, 0.2, 3.93, 2.47, -3.49, palette.yellow);
  cylinder(0.23, 0.075, 0.27, 3.93, 2.69, -3.49, palette.yellow);
  print(0.62, 0.24, 4, 2.06, -3.58, ['CVPR 2026'], palette.cream);
  const clockFace = cylinder(0.29, 0.29, 0.05, -0.48, 3.2, -3.8, palette.cream);
  clockFace.rotation.x = Math.PI / 2;
  box(0.022, 0.18, 0.025, -0.48, 3.25, -3.76, palette.dark);
  box(0.12, 0.023, 0.025, -0.43, 3.2, -3.75, palette.dark);
  const robot = new THREE.Group();
  robot.position.set(-0.8, 0.1, 2.9);
  room.add(robot);
  cylinder(0.21, 0.23, 0.35, 0, 0.22, 0, palette.cream, robot);
  box(0.48, 0.36, 0.39, 0, 0.56, 0, palette.cream, robot, true);
  box(0.36, 0.19, 0.025, 0, 0.57, 0.2, palette.dark, robot, true);
  sphere(0.045, -0.09, 0.58, 0.22, '#badab3', robot);
  sphere(0.045, 0.09, 0.58, 0.22, '#badab3', robot);
  cylinder(0.018, 0.018, 0.14, 0, 0.81, 0, palette.dark, robot, 8);
  sphere(0.047, 0, 0.9, 0, palette.orange, robot);
  for (const x of [-0.19, 0.19]) {
    const wheel = cylinder(0.11, 0.11, 0.095, x, 0.11, 0, palette.dark, robot);
    wheel.rotation.z = Math.PI / 2;
  }
  const sparks = [
    [-2.45, 1.7],
    [1.1, 2.92],
    [2.93, -0.58],
  ].map(([x, z]) => {
    const mesh = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.135),
      new THREE.MeshStandardMaterial({
        color: '#efbd50',
        emissive: '#d5942f',
        emissiveIntensity: 0.4,
        roughness: 0.45,
      }),
    );
    mesh.position.set(x, 0.5, z);
    room.add(mesh);
    return mesh;
  });
  const obstacles: Obstacle[] = [
    { x: -4.23, z: 0.25, w: 1.12, d: 3.2 },
    { x: 0.65, z: -2.39, w: 3.7, d: 1.4 },
    { x: 0.6, z: -0.87, w: 1, d: 1 },
    { x: 3.32, z: 1.88, w: 1.85, d: 1.85 },
    { x: 2.08, z: 1.38, w: 0.85, d: 0.85 },
    { x: 4.1, z: -2.75, w: 0.95, d: 0.95 },
    { x: -3.8, z: 2.92, w: 0.75, d: 0.75 },
  ];
  return { room, robot, sparks, obstacles, lampLight, textures };
}
