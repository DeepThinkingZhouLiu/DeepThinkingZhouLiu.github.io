import { Vector3 } from 'three';
import type { Obstacle } from './room';

export const movementKeys: Record<string, string> = {
  KeyW: 'up',
  ArrowUp: 'up',
  KeyS: 'down',
  ArrowDown: 'down',
  KeyA: 'left',
  ArrowLeft: 'left',
  KeyD: 'right',
  ArrowRight: 'right',
};

export function walk(
  position: Vector3,
  direction: Vector3,
  dt: number,
  obstacles: Obstacle[],
) {
  const radius = 0.25;
  function clear(x: number, z: number) {
    return (
      Math.abs(x) < 4.65 &&
      Math.abs(z) < 3.64 &&
      !obstacles.some(
        (o) =>
          Math.abs(x - o.x) < o.w / 2 + radius &&
          Math.abs(z - o.z) < o.d / 2 + radius,
      )
    );
  }
  const x = position.x + direction.x * dt * 2.6;
  const z = position.z + direction.z * dt * 2.6;
  // 分轴碰撞让角色沿家具边缘滑动，不会卡在斜向接触点。
  if (clear(x, position.z)) position.x = x;
  if (clear(position.x, z)) position.z = z;
}
