// excelExporter.ts
import { showNotification } from '../managers/notificationManager';

export function exportCSV() {
  var csvContent: string[] = [];

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

  const frame = selection[0] as FrameNode;
  const children = frame.children;
  const beacons = children.filter((child) => child.name.includes('beacon'));
  csvContent = makeCSVContent(beacons);

  figma.ui.postMessage({
    type: 'export-csv',
    csvContent: csvContent,
  });
}

function makeCSVContent(beacons: SceneNode[]): string[] {
  var csvContent: string[][] = [[]];

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
    csvContent.push([beaconNumber]);
  });

  // 정렬 추가
  csvContent.sort((a, b) => {
    const numA = parseInt(a[0]?.split(' ')?.[1] || '0');
    const numB = parseInt(b[0]?.split(' ')?.[1] || '0');
    return numA - numB;
  });

  return [csvContent.map((row) => row.join(',')).join('\n')];
}
