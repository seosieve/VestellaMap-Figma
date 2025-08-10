// beaconNumberer.ts

import { showNotification } from '../managers/notificationManager';
import { hexToRgb } from '../managers/colorManager';
import { Colors } from '../../constant/color';
import { Point } from './nodeGenerator';
import { get } from '../managers/storageManager';
import { DevelopDefault } from './settingHandler';

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

export async function numberBeacon() {
  const { selection } = figma.currentPage;

  const parentNode = selection[0]?.parent as FrameNode;
  const group = selection[0] as GroupNode;

  const circle = group.children[0] as EllipseNode;
  const circleCenter: Point = [circle.x + circle.width / 2, circle.y + circle.height / 2];

  const major = await get('major', DevelopDefault.major);
  const minor = numberBeaconMinor(parentNode, circleCenter);
  const diameter = await get('diameter', DevelopDefault.diameter);

  // 기존 텍스트 제거
  group.children.filter((child) => child.type === 'TEXT').forEach((text) => text.remove());

  const text = figma.createText();
  text.textAlignHorizontal = 'CENTER';
  text.textAlignVertical = 'CENTER';
  text.characters = major + '\n' + minor;
  text.fontSize = Math.round(diameter * 0.2);
  text.fontName = { family: 'Inter', style: 'Bold' };
  text.fills = [{ type: 'SOLID', color: hexToRgb(Colors.white) }];
  text.x = circleCenter[0] - text.width / 2;
  text.y = circleCenter[1] - text.height / 2;
  group.appendChild(text);

  // 비콘 그룹 이름 변경
  group.name = `beacon ${major} ${minor}`;
}
