// slotGenerator.ts

export function generateSlots(msg: { type: string; count: number; pillar: number; multiple: boolean }) {
  const count = msg.count;
  const pillar = msg.pillar;
  const multiple = msg.multiple;

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

  try {
    if (multiple) {
      generateMultiple(count, pillar, selectedNode);
    } else {
      generateSingle(count, pillar, selectedNode);
    }
  } catch (error) {
    figma.notify('노드 복사 중 오류가 발생했습니다. 다시 시도해주세요.');
    return;
  }
}

// 다중 행 생성 함수
function generateMultiple(count: number, pillar: number, selectedNode: SceneNode) {
  // 2열 레이아웃을 위한 수직 프레임 생성
  const frame = figma.createFrame();
  setFrameAttributes(frame, 'VERTICAL');
  frame.paddingLeft = frame.paddingRight = frame.paddingTop = frame.paddingBottom = 16;
  frame.fills = [{ type: 'SOLID', color: { r: 0.33, g: 0.33, b: 0.33 } }];
  frame.cornerRadius = 12;

  // 2개의 행 생성
  for (let row = 0; row < 2; row++) {
    // 단일 행 노드 생성
    const nodes = createNodes(count, pillar, selectedNode);
    // 각 노드를 그룹에 넣고 프레임으로 이동
    const group = figma.group(nodes, figma.currentPage);
    const innerFrame = figma.createFrame();

    const children = [...group.children];
    children.forEach((child) => {
      innerFrame.appendChild(child);
    });

    setFrameAttributes(innerFrame, 'HORIZONTAL');
    innerFrame.fills = [];

    frame.appendChild(innerFrame);
  }

  centerViewport(frame);

  figma.currentPage.selection = [frame];
}

// 단일 행 생성 함수
function generateSingle(count: number, pillar: number, selectedNode: SceneNode) {
  // 단일 행 노드 생성
  const nodes = createNodes(count, pillar, selectedNode);
  // 각 노드를 그룹에 넣고 프레임으로 이동
  const group = figma.group(nodes, figma.currentPage);
  const frame = figma.createFrame();

  const children = [...group.children];
  children.forEach((child) => {
    frame.appendChild(child);
  });

  setFrameAttributes(frame, 'HORIZONTAL');
  frame.paddingLeft = frame.paddingRight = frame.paddingTop = frame.paddingBottom = 16;
  frame.fills = [{ type: 'SOLID', color: { r: 0.33, g: 0.33, b: 0.33 } }];
  frame.cornerRadius = 12;

  centerViewport(frame);

  figma.currentPage.selection = [frame];
}

// 프레임 Auto Layout 설정 함수
function setFrameAttributes(frame: FrameNode, layoutMode: 'HORIZONTAL' | 'VERTICAL') {
  frame.name = 'Group';
  frame.itemSpacing = 16;
  frame.layoutMode = layoutMode;
  frame.primaryAxisSizingMode = 'AUTO';
  frame.counterAxisSizingMode = 'AUTO';
  frame.primaryAxisAlignItems = 'CENTER';
  frame.counterAxisAlignItems = 'CENTER';
}

// Nodes 생성 함수
function createNodes(count: number, pillar: number, selectedNode: SceneNode): SceneNode[] {
  const nodes: SceneNode[] = [];
  for (let i = 0; i < count; i++) {
    if (pillar > 0 && i % pillar === 0) {
      const pillarRect = createPillar();
      figma.currentPage.appendChild(pillarRect);
      nodes.push(pillarRect);
    }
    const copiedNode = selectedNode.clone();
    figma.currentPage.appendChild(copiedNode);
    nodes.push(copiedNode);
  }
  return nodes;
}

// Pillar 생성 함수
function createPillar() {
  const pillar = figma.createRectangle();
  pillar.name = 'pillar';
  pillar.resize(28, 128);
  pillar.fills = [{ type: 'SOLID', color: { r: 0.8, g: 0.8, b: 0.8 } }];
  return pillar;
}

// ViewPort 중앙 배치 함수
function centerViewport(frame: FrameNode) {
  const viewportCenter = figma.viewport.center;
  frame.x = viewportCenter.x - frame.width / 2;
  frame.y = viewportCenter.y - frame.height / 2;
}
