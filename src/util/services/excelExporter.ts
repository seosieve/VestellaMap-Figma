// excelExporter.ts
import { showNotification } from '../managers/notificationManager';

export function exportCSV() {
  var csvContent: string[] = [];

  const selection = figma.currentPage.selection;
  const frame = selection[0] as FrameNode;

  if (frame.type === 'FRAME') {
    const children = frame.children;
    const beacons = children.filter((child) => child.name.includes('beacon'));
    csvContent = makeCSVContent(beacons);

    // UI 쪽으로 CSV 데이터 전송
    figma.ui.postMessage({
      type: 'export-csv',
      csvContent: csvContent,
    });
  } else {
    showNotification('❎ㅤ프레임을 선택해주세요');
  }
}

function makeCSVContent(beacons: SceneNode[]): string[] {
  var csvContent: string[] = [];

  beacons.forEach((beacon) => {
    const beaconGroup = beacon as GroupNode;
    const text = beaconGroup.children[1] as TextNode;
    const beaconNumber = text.characters.replace(/\n/g, ' ');
    csvContent.push(beaconNumber);
  });

  return csvContent;
}
