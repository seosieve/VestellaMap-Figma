// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).


// Figma Plugin은 실행시 감지 조건이 두 가지가 있음

// 1. 현재 어떠한 노드를 선택한 상태인가?
// 2. 현재 아무런 노드도 선택하지 않은 상태인가?

// 선택된 요소 가져오기
const selection = figma.currentPage.selection;

figma.showUI(__html__, {height: 300});

// 선택 변경 리스너
figma.on('selectionchange', () => {
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
  
  let totalLots = 0;
  selection.forEach(node => {
    totalLots += countLotsRecursively(node);
  });
  
  figma.ui.postMessage({
    type: 'selection-updated',
    selectionCount: selection.length,
    lotCount: totalLots
  });
});


// Show UI 후 메시지 수신 처리
figma.ui.onmessage = (msg: {type: string, count: number, pillar: number}) => {
  if (msg.type === 'create-shapes') {
    const count = msg.count;
    const pillar = msg.pillar;
    
    // 현재 선택된 노드 다시 가져오기
    const currentSelection = figma.currentPage.selection;
    
    if (currentSelection.length === 0) {
      figma.notify('복사할 노드를 선택해주세요');
      return;
    }
    
    const selectedNode = currentSelection[0];
    
    // 노드가 여전히 존재하는지 확인
    if (!selectedNode || !selectedNode.parent) {
      figma.notify('선택된 노드가 유효하지 않습니다. 다시 선택해주세요.');
      return;
    }

    const nodes: SceneNode[] = [];
    
    try {
      for (let i = 0; i < count; i++) {
        // pillar 값마다 Rectangle을 먼저 추가
        if (pillar > 0 && i % pillar === 0) {
          const pillarRect = figma.createRectangle();
          pillarRect.resize(100, 150);
          pillarRect.fills = [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 } }];
          figma.currentPage.appendChild(pillarRect);
          nodes.push(pillarRect);
        }
        
        // 그 다음에 복사된 노드 추가
        const copiedNode = selectedNode.clone();
        figma.currentPage.appendChild(copiedNode);
        nodes.push(copiedNode);
      }
      
      // Group으로 묶기
      const group = figma.group(nodes, figma.currentPage);
      group.name = `Generated Group (${count} items)`;
      
      // Auto Layout 적용
      if (group.type === 'GROUP') {
        const frame = figma.createFrame();
        frame.name = group.name;
        
        const children = [...group.children];
        children.forEach(child => {
          frame.appendChild(child);
        });
        
        frame.layoutMode = 'HORIZONTAL';
        frame.itemSpacing = 20;
        frame.paddingLeft = frame.paddingRight = frame.paddingTop = frame.paddingBottom = 20;
        frame.primaryAxisSizingMode = 'AUTO';
        frame.counterAxisSizingMode = 'AUTO';
        
        // Frame을 viewport 중심에 배치
        const viewportCenter = figma.viewport.center;
        frame.x = viewportCenter.x - frame.width / 2;
        frame.y = viewportCenter.y - frame.height / 2;
        
        figma.currentPage.selection = [frame];
        figma.viewport.scrollAndZoomIntoView([frame]);
      }
    } catch (error) {
      figma.notify('노드 복사 중 오류가 발생했습니다. 다시 시도해주세요.');
      return;
    }
  }
};
