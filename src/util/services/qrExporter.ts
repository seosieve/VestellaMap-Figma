// qrExporter.ts

import { showNotification } from '../managers/notificationManager';

export async function exportQR() {
  var qrContent: string[] = [];

  const { selection } = figma.currentPage;

  // 선택된 노드가 없을 때 처리
  if (selection.length === 0) {
    showNotification('❎ㅤ선택된 프레임이 없어요');
    return;
  }

  // 선택된 노드가 프레임이 아닐 때 처리
  if (selection[0]?.type !== 'FRAME') {
    showNotification('❎ㅤ비콘이 포함된 프레임을 선택해주세요');
    return;
  }

  const frame = selection[0] as FrameNode;
  const children = frame.children;
  const beacons = children.filter((child) => child.name.includes('beacon'));
  qrContent = makeQRContent(beacons);

  showNotification('✅ㅤ비콘 데이터를 QR 코드로 변환중이에요...');

  figma.ui.postMessage({
    type: 'export-QR',
    qrContent: qrContent,
  });
}

function makeQRContent(beacons: SceneNode[]): string[] {
  var qrContent: string[][] = [[]];

  beacons.forEach((beacon) => {
    const beaconGroup = beacon as GroupNode;
    if (beaconGroup.children.length !== 2) {
      showNotification('❎ㅤ파일 생성중 오류가 발생했어요');
      return;
    }
  });

  beacons.forEach((beacon) => {
    const beaconGroup = beacon as GroupNode;
    const text = beaconGroup.children[1] as TextNode;
    const beaconNumber = text.characters.replace(/\n/g, ' ');
    qrContent.push([beaconNumber]);
  });

  // 중복 제거
  qrContent = qrContent.filter((row, index, self) => self.findIndex((t) => t[0] === row[0]) === index);

  // 정렬 추가
  qrContent.sort((a, b) => {
    const numA = parseInt(a[0]?.split(' ')?.[1] || '0');
    const numB = parseInt(b[0]?.split(' ')?.[1] || '0');
    return numA - numB;
  });

  return [qrContent.map((row) => row.join(',')).join('\n')];
}
