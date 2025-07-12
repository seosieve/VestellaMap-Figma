// slotGenerator.ts

export function generateSlots(msg: {type: string, count: number, pillar: number}) {
    const count = msg.count;
    const pillar = msg.pillar;
    
    // 현재 선택된 노드 다시 가져오기
    const currentSelection = figma.currentPage.selection;
    
    if (currentSelection.length === 0) {
      figma.notify('❎ㅤ복사할 노드를 선택해주세요');
      return;
    }

    if (count === 0) {
      figma.notify('❎ㅤ슬롯 개수를 입력해주세요');
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
          pillarRect.name = `pillar`;
          pillarRect.resize(28, 128);
          pillarRect.fills = [{ type: 'SOLID', color: { r: 0.8, g: 0.8, b: 0.8 } }];
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
      group.name = `Group`;
      
      // Auto Layout 적용
      if (group.type === 'GROUP') {
        const frame = figma.createFrame();
        frame.name = group.name;
        
        const children = [...group.children];
        children.forEach(child => {
          frame.appendChild(child);
        });
        
        frame.layoutMode = 'HORIZONTAL';
        frame.itemSpacing = 16;
        frame.paddingLeft = frame.paddingRight = frame.paddingTop = frame.paddingBottom = 16;
        frame.primaryAxisSizingMode = 'AUTO';
        frame.counterAxisSizingMode = 'AUTO';

        frame.fills = [{ type: 'SOLID', color: { r: 0.33, g: 0.33, b: 0.33 } }];
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
}