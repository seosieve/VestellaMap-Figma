// beaconSelector.ts

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
  if (node.name.includes('beacon')) {
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

function countSingleBeacon(node: SceneNode) {
  figma.ui.postMessage({
    type: 'selection-single-beacon',
  });
}
