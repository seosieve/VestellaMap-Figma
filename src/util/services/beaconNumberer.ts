// beaconNumberer.ts

import { hexToRgb } from '../managers/colorManager';
import { Colors } from '../../constant/color';

export async function numberBeacons() {
  const selection = figma.currentPage.selection;
  const beacon = selection[0] as GroupNode;
  const beaconCenter = {
    x: beacon.absoluteTransform[0][2] + beacon.width / 2, // 절대 좌표로 변경
    y: beacon.absoluteTransform[1][2] + beacon.height / 2, // 절대 좌표로 변경
  };
  const parentFrame = selection[0]?.parent as FrameNode;

  // 비콘의 상대적 위치 계산 (0~1 사이의 값)
  const relativeX = (beaconCenter.x - parentFrame.absoluteTransform[0][2]) / parentFrame.width;
  const relativeY = (beaconCenter.y - parentFrame.absoluteTransform[1][2]) / parentFrame.height;

  // 값이 0~1 사이에 있도록 보정
  const clampedX = Math.max(0, Math.min(1, relativeX));
  const clampedY = Math.max(0, Math.min(1, relativeY));

  const thousandHundred = Math.floor(clampedX * 99); // 0~99
  const tenOne = Math.floor(clampedY * 99); // 0~99

  const beaconNumber = 10000 + thousandHundred * 100 + tenOne;

  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' });

  //Text Node 생성
  const textNode = figma.createText();
  textNode.textAlignHorizontal = 'CENTER';
  textNode.textAlignVertical = 'CENTER';
  textNode.characters = '100' + '\n' + beaconNumber.toString();
  textNode.fontSize = 16;
  textNode.fills = [{ type: 'SOLID', color: hexToRgb(Colors.mintBlack) }];

  textNode.x = beacon.x + (beacon.width - textNode.width) / 2;
  textNode.y = beacon.y + (beacon.height - textNode.height) / 2;

  beacon.appendChild(textNode);
}
