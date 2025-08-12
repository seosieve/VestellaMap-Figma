// beaconSelector.ts

import { showNotification } from '../../managers/notificationManager';

export function selectBeacons() {
  const selection = figma.currentPage.selection;

  // 각 선택된 노드의 정보를 배열로 수집
  const nodeInfo = selection.map((node) => ({
    name: node.name,
    beaconCount: countBeaconsRecursively(node),
  }));

  let totalBeacons = 0;
  nodeInfo.forEach((info) => {
    totalBeacons += info.beaconCount;
  });

  figma.ui.postMessage({
    type: 'selection-beacons',
    selectionCount: selection.length,
    beaconCount: totalBeacons,
    nodeInfo: nodeInfo,
  });
}

// 재귀적으로 beacon 개수를 세는 함수
function countBeaconsRecursively(node: SceneNode): number {
  let count = 0;

  // 현재 노드가 beacon을 포함하는지 확인
  if (node.name.includes('beacon') && node.type !== 'FRAME') {
    count++;
  }

  // 자식 노드들이 있으면 재귀적으로 탐색
  if ('children' in node) {
    for (const child of node.children) {
      count += countBeaconsRecursively(child);
    }
  }

  return count;
}

export function selectBeaconEllipse() {
  const { selection } = figma.currentPage;
  const firstNode = selection[0];
  const count = selection.length;

  const singleSelection = count === 1;
  const isGroup = firstNode?.type === 'GROUP';
  const isBeacon = firstNode?.name.includes('beacon');
  const hasEllipse = isGroup && (firstNode as GroupNode)?.children?.some((child) => child.type === 'ELLIPSE');
  const hasFrameParent = firstNode?.parent?.type === 'FRAME';

  const isActive = singleSelection && isGroup && isBeacon && hasEllipse && hasFrameParent;

  figma.ui.postMessage({ type: 'selection-beacon-ellipse', active: isActive });
}

// Beacon Ellipse Empty 알림
export function notifyBeaconEllipseEmpty() {
  const { selection } = figma.currentPage;
  const firstNode = selection[0];
  const count = selection.length;

  const isGroup = firstNode?.type === 'GROUP';
  const isBeacon = firstNode?.name.includes('beacon');
  const hasEllipse = isGroup && (firstNode as GroupNode)?.children?.some((child) => child.type === 'ELLIPSE');
  const hasFrameParent = firstNode?.parent?.type === 'FRAME';

  if (count === 0) {
    showNotification('❎ㅤ선택된 비콘이 없어요');
    return;
  }

  if (isGroup && isBeacon && count > 1) {
    showNotification('❎ㅤ하나의 비콘만 선택해주세요');
    return;
  }

  if (!isGroup || !isBeacon) {
    showNotification('❎ㅤ비콘만 선택 가능해요');
    return;
  }

  if (isGroup && isBeacon && hasEllipse && !hasFrameParent) {
    showNotification('❎ㅤ프레임 안의 비콘을 선택해주세요.');
    return;
  }
}
