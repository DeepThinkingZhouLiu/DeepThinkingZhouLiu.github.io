import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Vector3 } from 'three';
import { walk, movementKeys } from '../src/scripts/movement.ts';

test('移动速度不依赖帧率', () => {
  const a = new Vector3(),
    b = new Vector3(),
    direction = new Vector3(1, 0, 0);
  for (let i = 0; i < 60; i++) walk(a, direction, 1 / 60, []);
  for (let i = 0; i < 30; i++) walk(b, direction, 1 / 30, []);
  assert.ok(Math.abs(a.x - b.x) < 1e-10);
  assert.ok(Math.abs(a.x - 2.6) < 1e-10);
});
test('不能穿出房间边界', () => {
  const p = new Vector3(4.6, 0, 3.6);
  for (let i = 0; i < 120; i++)
    walk(p, new Vector3(1, 0, 1).normalize(), 1 / 60, []);
  assert.ok(p.x < 4.65 && p.z < 3.64);
});
test('家具碰撞计入角色半径', () => {
  const p = new Vector3(0, 0, 0);
  for (let i = 0; i < 120; i++)
    walk(p, new Vector3(1, 0, 0), 1 / 60, [{ x: 2, z: 0, w: 1, d: 1 }]);
  assert.ok(p.x <= 1.25);
  assert.ok(p.x > 1.15);
});
test('斜向碰撞时沿家具边缘滑动', () => {
  const p = new Vector3(1.24, 0, 0);
  walk(p, new Vector3(1, 0, 1).normalize(), 0.05, [{ x: 2, z: 0, w: 1, d: 4 }]);
  assert.equal(p.x, 1.24);
  assert.ok(p.z > 0);
});
test('WASD 和方向键使用一致映射', () => {
  assert.equal(movementKeys.KeyW, movementKeys.ArrowUp);
  assert.equal(movementKeys.KeyA, movementKeys.ArrowLeft);
  assert.equal(movementKeys.KeyS, movementKeys.ArrowDown);
  assert.equal(movementKeys.KeyD, movementKeys.ArrowRight);
});
