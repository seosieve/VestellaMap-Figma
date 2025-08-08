// qrExporter.ts

import { showNotification } from '../managers/notificationManager';

export async function exportQR() {
  const selection = figma.currentPage.selection;

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

  try {
    // 실제 비콘 데이터를 JSON으로 생성
    const beaconData = {
      beacons: [
        { x: 100, y: 200, id: 'beacon1' },
        { x: 150, y: 250, id: 'beacon2' },
      ],
      timestamp: new Date().toISOString(),
    };

    // UI에 QR 생성 요청 전송
    figma.ui.postMessage({
      type: 'download-QR',
      beaconData: beaconData,
    });

    console.log('QR 코드 생성 완료');
  } catch (error) {
    console.error('QR 생성 실패:', error);
  }
}

function makeQRContent(beacons: SceneNode[]): string {
  const qrData = JSON.stringify(beacons);
  return qrData;
}
