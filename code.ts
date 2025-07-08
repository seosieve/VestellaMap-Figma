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

figma.showUI(__html__, { width: 344, height: 555});

if (selection.length > 0) {
  const selectedNode = selection[0];
  
  if (selectedNode.type === 'LINE') {
    const line = selectedNode as LineNode;
    
    // 선분의 시작점과 끝점
    const startPoint = {
      x: line.x,
      y: line.y
    };
    
    const endPoint = {
      x: line.x + line.width,
      y: line.y + line.height
    };
    
    console.log('선분 시작점:', startPoint);
    console.log('선분 끝점:', endPoint);
    figma.notify(`선분: 시작(${startPoint.x}, ${startPoint.y}) → 끝(${endPoint.x}, ${endPoint.y})`);
  }
}

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
      figma.notify('❎ㅤ복사할 노드를 선택해주세요');
      return;
    }

    if (count === 0 || pillar === 0) {
      figma.notify('❎ㅤ개수를 입력해주세요');
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
          pillarRect.name = `pillar-${i}`;
          pillarRect.resize(40, 150);
          pillarRect.fills = [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 } }];
          pillarRect.cornerRadius = 12;
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

        frame.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.5, b: 0.9 } }];
        frame.cornerRadius = 12;
        
        // Frame을 viewport 중심에 배치
        const viewportCenter = figma.viewport.center;
        frame.x = viewportCenter.x - frame.width / 2;
        frame.y = viewportCenter.y - frame.height / 2;
        
        figma.currentPage.selection = [frame];
      }
    } catch (error) {
      figma.notify('노드 복사 중 오류가 발생했습니다. 다시 시도해주세요.');
      return;
    }
  } else if (msg.type === 'create-random-circle') {
    // 선택된 선분에 랜덤 위치에 원 그리기
    const selection = figma.currentPage.selection;
    
    if (selection.length > 0) {
      const selectedNode = selection[0];
      
      if (selectedNode.type === 'LINE') {
        const line = selectedNode as LineNode;
        
        // 선분의 실제 시작점과 끝점 파악
        // Line의 경우 실제로는 vector 속성을 사용해야 할 수도 있음
        console.log('Line 정보:', {
          x: line.x,
          y: line.y,
          width: line.width,
          height: line.height,
          rotation: line.rotation
        });
        
        // Line의 실제 끝점 계산 (rotation과 width 사용)
        const startPoint = { x: line.x, y: line.y };
        
        // rotation을 라디안으로 변환 (반대 방향으로)
        const rotationRad = -line.rotation * Math.PI / 180;
        
        // rotation과 width를 사용해서 끝점 계산
        const endPoint = {
          x: startPoint.x + line.width * Math.cos(rotationRad),
          y: startPoint.y + line.width * Math.sin(rotationRad)
        };
        
        // 선분 위의 랜덤한 위치 계산
        const randomRatio = Math.random();
        const circleCenter = {
          x: startPoint.x + (endPoint.x - startPoint.x) * randomRatio,
          y: startPoint.y + (endPoint.y - startPoint.y) * randomRatio
        };
        
        console.log('선분 정보:', {
          startPoint,
          endPoint,
          rotation: line.rotation,
          width: line.width,
          circleCenter
        });
        
        // 원 생성 (중점 기준)
        const circle = figma.createEllipse();
        const diameter = 200; // 원 지름
        circle.resize(diameter, diameter);
        
        // 원의 중점을 계산된 위치에 배치
        circle.x = circleCenter.x - diameter / 2;
        circle.y = circleCenter.y - diameter / 2;
        
        circle.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } }];
        circle.name = `Circle on Line`;
        
        figma.currentPage.appendChild(circle);
        figma.currentPage.selection = [circle];
        
        figma.notify(`원 생성: 중점(${circleCenter.x.toFixed(1)}, ${circleCenter.y.toFixed(1)})`);
      } else {
        figma.notify('선분을 선택해주세요');
      }
    } else {
      figma.notify('선분을 선택해주세요');
    }
  }
};
