// slotCounter.ts

export function countSlots() {
  const selection = figma.currentPage.selection;

  // 재귀적으로 lot 개수를 세는 함수
  function countLotsRecursively(node: SceneNode): number {
    let count = 0;

    // 현재 노드가 lot을 포함하는지 확인
    if (node.name.includes('lot')) {
      count++;
    }

    // 자식 노드들이 있으면 재귀적으로 탐색
    if ('children' in node) {
      for (const child of node.children) {
        count += countLotsRecursively(child);
      }
    }

    return count;
  }

  // 각 선택된 노드의 정보를 배열로 수집
  const nodeInfo = selection.map((node) => ({
    name: node.name,
    lotCount: countLotsRecursively(node),
  }));

  let totalLots = 0;
  nodeInfo.forEach((info) => {
    totalLots += info.lotCount;
  });

  figma.ui.postMessage({
    type: 'selection-slots',
    selectionCount: selection.length,
    lotCount: totalLots,
    nodeInfo: nodeInfo,
  });
}
