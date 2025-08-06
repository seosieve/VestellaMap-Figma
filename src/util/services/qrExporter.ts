// qrExporter.ts

export async function exportQR() {
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
