// beaconNumberer.ts

import { Point } from './nodeGenerator';

export function numberBeaconMinor(parent: FrameNode, point: Point): number {
  // 비콘의 상대적 위치 계산 (0~1 사이의 값)
  const relativeX = point[0] / parent.width;
  const relativeY = point[1] / parent.height;

  // 값이 0~1 사이에 있도록 보정
  const clampedX = Math.max(0, Math.min(1, relativeX));
  const clampedY = Math.max(0, Math.min(1, relativeY));

  const thousandHundred = Math.floor(clampedX * 99); // 0~99
  const tenOne = Math.floor(clampedY * 99); // 0~99

  const beaconNumber = 10000 + thousandHundred * 100 + tenOne;

  return beaconNumber;
}
