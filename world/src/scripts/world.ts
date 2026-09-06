import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { buildRoom, stationPositions, type StationId } from './room';
import { movementKeys, walk } from './movement';

export function createWorld(
  host: HTMLElement,
  onOpen: (id: StationId) => void,
  onFailure: () => void,
) {
  const listeners = new AbortController();
  const { signal } = listeners;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  renderer.domElement.setAttribute('aria-hidden', 'true');
  host.prepend(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-9, 9, 6, -6, 0.1, 100);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.09;
  controls.enablePan = false;
  controls.minPolarAngle = 0.45;
  controls.maxPolarAngle = 1.25;
  controls.minAzimuthAngle = -0.12;
  controls.maxAzimuthAngle = 1.5;
  controls.minZoom = 0.7;
  controls.maxZoom = 1.7;
  function resetCamera() {
    camera.position.set(11, 10, 14);
    controls.target.set(0, 1, 0);
    camera.zoom = 1;
    camera.updateProjectionMatrix();
    controls.update();
  }
  resetCamera();
  const { room, robot, sparks, obstacles, lampLight, textures } = buildRoom();
  scene.add(room);
  const ambient = new THREE.HemisphereLight('#fffae3', '#607a64', 2.9);
  scene.add(ambient);
  const sun = new THREE.DirectionalLight('#ffedca', 3.3);
  sun.position.set(-3, 8, 6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, {
    left: -8,
    right: 8,
    top: 8,
    bottom: -8,
    near: 0.1,
    far: 30,
  });
  sun.shadow.normalBias = 0.035;
  sun.shadow.bias = -0.0001;
  scene.add(sun);
  const fill = new THREE.DirectionalLight('#d1e5f0', 0.8);
  fill.position.set(5, 4, -3);
  scene.add(fill);
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.ShadowMaterial({ opacity: 0.12 }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.39;
  ground.receiveShadow = true;
  scene.add(ground);
  const hits = (
    Object.entries(stationPositions) as [StationId, THREE.Vector3][]
  ).map(([id, position]) => {
    // 固定命中区域独立于装饰动画，避免悬停反馈造成命中抖动。
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(
        id === 'papers' ? 1 : 1.8,
        1.1,
        id === 'papers' ? 2.8 : 0.65,
      ),
      new THREE.MeshBasicMaterial({ visible: false }),
    );
    mesh.position.copy(position);
    mesh.position.y -= 0.4;
    mesh.userData.station = id;
    scene.add(mesh);
    return mesh;
  });
  const hotspotElements = (Object.keys(stationPositions) as StationId[]).map(
    (id) => ({
      id,
      element: document.querySelector<HTMLElement>(`[data-hotspot="${id}"]`)!,
    }),
  );
  const projected = new THREE.Vector3();
  let width = 0,
    height = 0;
  function resize() {
    width = host.clientWidth;
    height = host.clientHeight;
    if (!width || !height) return;
    const viewHeight = window.innerWidth < 700 ? 14.5 : 11.4;
    camera.left = (-viewHeight * width) / height / 2;
    camera.right = -camera.left;
    camera.top = viewHeight / 2;
    camera.bottom = -camera.top;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  resize();
  const pressed = new Set<string>();
  const dialog = document.querySelector<HTMLDialogElement>('#detail-dialog')!;
  function clearKeys() {
    pressed.clear();
  }
  host.addEventListener(
    'keydown',
    (event) => {
      if (movementKeys[event.code] && !dialog.open) {
        event.preventDefault();
        pressed.add(movementKeys[event.code]);
      }
    },
    { signal },
  );
  window.addEventListener(
    'keyup',
    (event) => {
      if (movementKeys[event.code]) pressed.delete(movementKeys[event.code]);
    },
    { signal },
  );
  window.addEventListener('blur', clearKeys, { signal });
  host.addEventListener('focusout', clearKeys, { signal });
  document
    .querySelectorAll<HTMLButtonElement>('[data-move]')
    .forEach((button) => {
      button.addEventListener(
        'pointerdown',
        (event) => {
          event.preventDefault();
          button.setPointerCapture(event.pointerId);
          host.focus({ preventScroll: true });
          pressed.add(button.dataset.move!);
        },
        { signal },
      );
      for (const type of ['pointerup', 'pointercancel', 'lostpointercapture'])
        button.addEventListener(
          type,
          () => pressed.delete(button.dataset.move!),
          { signal },
        );
      button.addEventListener(
        'keydown',
        (event) => {
          if (event.code === 'Space' || event.code === 'Enter') {
            event.preventDefault();
            pressed.add(button.dataset.move!);
          }
        },
        { signal },
      );
      button.addEventListener(
        'keyup',
        () => pressed.delete(button.dataset.move!),
        { signal },
      );
      button.addEventListener('blur', clearKeys, { signal });
    });
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const down = new THREE.Vector2();
  function cast(event: PointerEvent) {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.set(
      ((event.clientX - rect.left) / width) * 2 - 1,
      (-(event.clientY - rect.top) / height) * 2 + 1,
    );
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObjects(hits, false)[0];
  }
  renderer.domElement.addEventListener(
    'pointerdown',
    (event) => {
      down.set(event.clientX, event.clientY);
      host.focus({ preventScroll: true });
    },
    { signal },
  );
  renderer.domElement.addEventListener(
    'pointerup',
    (event) => {
      if (
        event.isPrimary &&
        down.distanceTo(new THREE.Vector2(event.clientX, event.clientY)) < 5
      ) {
        const hit = cast(event);
        if (hit) onOpen(hit.object.userData.station);
      }
    },
    { signal },
  );
  renderer.domElement.addEventListener(
    'pointermove',
    (event) => {
      renderer.domElement.style.cursor = cast(event)
        ? 'pointer'
        : event.buttons
          ? 'grabbing'
          : 'grab';
    },
    { signal },
  );
  document
    .querySelector('#reset-camera')!
    .addEventListener('click', resetCamera, { signal });
  let night = false;
  document.querySelector('#theme-toggle')!.addEventListener(
    'click',
    () => {
      night = !night;
      document.body.toggleAttribute('data-night', night);
      document
        .querySelector('#theme-toggle')!
        .setAttribute('aria-pressed', String(night));
      document.querySelector('#theme-label')!.textContent = night
        ? 'Evening'
        : 'Daylight';
      ambient.intensity = night ? 0.85 : 2.9;
      ambient.color.set(night ? '#9fbacf' : '#fffae3');
      sun.intensity = night ? 0.65 : 3.3;
      sun.color.set(night ? '#b1c4f2' : '#ffedca');
      fill.intensity = night ? 0.3 : 0.8;
      lampLight.intensity = night ? 9 : 0;
    },
    { signal },
  );
  let collected = 0;
  let elapsed = 0;
  let stopped = false;
  let inView = true;
  let frame = 0;
  let last = performance.now();
  const direction = new THREE.Vector3();
  const forward = new THREE.Vector3();
  const right = new THREE.Vector3();
  document.querySelector('#reset-walk')!.addEventListener(
    'click',
    () => {
      robot.position.set(-0.8, 0.1, 2.9);
      robot.rotation.y = 0;
      renderer.shadowMap.needsUpdate = true;
      sparks.forEach((s) => (s.visible = true));
      collected = 0;
      document.querySelector('#collect-count')!.textContent = '0 / 3';
      document.querySelector('#collect-status')!.textContent =
        'Find 3 sparks of inspiration';
      host.focus({ preventScroll: true });
    },
    { signal },
  );
  function render(now: number) {
    if (stopped || document.hidden || !inView) return;
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    elapsed += dt;
    if (dialog.open) pressed.clear();
    direction.set(0, 0, 0);
    camera.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
    right.crossVectors(forward, camera.up).normalize();
    if (pressed.has('up')) direction.add(forward);
    if (pressed.has('down')) direction.sub(forward);
    if (pressed.has('left')) direction.sub(right);
    if (pressed.has('right')) direction.add(right);
    if (direction.lengthSq() > 0) {
      direction.normalize();
      walk(robot.position, direction, dt, obstacles);
      robot.rotation.y = Math.atan2(direction.x, direction.z);
      renderer.shadowMap.needsUpdate = true;
    }
    robot.position.y =
      0.1 +
      (reducedMotion.matches
        ? 0
        : Math.sin(elapsed * (direction.lengthSq() ? 14 : 2)) * 0.013);
    sparks.forEach((spark, i) => {
      if (!reducedMotion.matches) {
        spark.rotation.y = elapsed * 0.8;
        spark.position.y = 0.5 + Math.sin(elapsed * 2 + i) * 0.045;
      }
      if (
        spark.visible &&
        Math.hypot(
          robot.position.x - spark.position.x,
          robot.position.z - spark.position.z,
        ) < 0.43
      ) {
        spark.visible = false;
        collected++;
        document.querySelector('#collect-count')!.textContent =
          `${collected} / 3`;
        document.querySelector('#collect-status')!.textContent =
          collected === 3
            ? "All ideas found. Let's build something."
            : `${collected} found. Keep exploring!`;
      }
    });
    controls.update();
    for (const { id, element } of hotspotElements) {
      projected.copy(stationPositions[id]).project(camera);
      element.style.left = `${(projected.x * 0.5 + 0.5) * width}px`;
      element.style.top = `${(-projected.y * 0.5 + 0.5) * height}px`;
      element.style.visibility =
        Math.abs(projected.x) > 1 || Math.abs(projected.y) > 1 ? 'hidden' : '';
    }
    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  }
  function resumeWhenVisible() {
    clearKeys();
    cancelAnimationFrame(frame);
    if (!document.hidden && !stopped && inView) {
      last = performance.now();
      frame = requestAnimationFrame(render);
    }
  }
  // 阅读文字或切换标签页时暂停三维渲染，避免占用后台 GPU。
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    resumeWhenVisible();
  });
  visibilityObserver.observe(host);
  document.addEventListener('visibilitychange', resumeWhenVisible, { signal });
  renderer.domElement.addEventListener(
    'webglcontextlost',
    (event) => {
      event.preventDefault();
      dispose();
      onFailure();
    },
    { signal },
  );
  frame = requestAnimationFrame(render);
  function dispose() {
    if (stopped) return;
    stopped = true;
    cancelAnimationFrame(frame);
    listeners.abort();
    observer.disconnect();
    visibilityObserver.disconnect();
    controls.dispose();
    const geometries = new Set<THREE.BufferGeometry>();
    const materials = new Set<THREE.Material>();
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        geometries.add(object.geometry);
        (Array.isArray(object.material)
          ? object.material
          : [object.material]
        ).forEach((m) => materials.add(m));
      }
    });
    geometries.forEach((g) => g.dispose());
    materials.forEach((m) => m.dispose());
    textures.forEach((t) => t.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  }
  return { dispose };
}
