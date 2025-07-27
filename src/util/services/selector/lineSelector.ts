// lineDetector.ts

import { showNotification } from '../../managers/notificationManager';

export type LineInfo = {
  x: number;
  y: number;
  width: number;
  rotation: number;
  strokeWeight: number;
};

export function selectLine() {
  selectRouteLine();
  selectBeaconLine();
}

// Route Line 판별
function selectRouteLine() {
  const { selection } = figma.currentPage;

  const hasLineOnly = selection.every((node) => node.type === 'LINE');
  const count = hasLineOnly ? selection.length : 0;

  figma.ui.postMessage({ type: 'selection-route-line', count });
}

// Beacon Line 판별
function selectBeaconLine() {
  const { selection } = figma.currentPage;
  const firstNode = selection[0];

  const singleSelection = selection.length === 1;
  const lineSelection = firstNode?.type === 'LINE';
  const hasParent = !!firstNode?.parent;
  const hasFrameParent = firstNode?.parent?.type === 'FRAME';

  const isActive = singleSelection && lineSelection && hasParent && hasFrameParent;

  figma.ui.postMessage({ type: 'selection-beacon-line', active: isActive });

  if (isActive) {
    // Line Node 정보 전송
    const { x, y, width, rotation, strokeWeight } = firstNode as LineNode;
    const { width: parentWidth, height: parentHeight } = firstNode?.parent as FrameNode;
    const lineInfo: LineInfo = { x, y, width, rotation, strokeWeight: strokeWeight as number };
    figma.ui.postMessage({ type: 'beacon-line-info', lineInfo, parentWidth, parentHeight });
  }
}

// Route Line Empty 알림
export function notifyRouteLineEmpty() {
  const { selection } = figma.currentPage;

  const hasLineOnly = selection.every((node) => node.type === 'LINE');
  const count = selection.length;

  if (!hasLineOnly) {
    showNotification('❎ㅤ선분만 선택 가능해요');
  }

  if (count === 0) {
    showNotification('❎ㅤ선택된 선분이 없어요');
  }
}

// Beacon Line Empty 알림
export function notifyBeaconLineEmpty() {
  const { selection } = figma.currentPage;
  const firstNode = selection[0];
  const count = selection.length;

  const singleSelection = selection.length === 1;
  const hasLineOnly = selection.every((node) => node.type === 'LINE');
  const hasFrameParent = firstNode?.parent?.type === 'FRAME';

  if (count === 0) {
    showNotification('❎ㅤ선택된 선분이 없어요');
    return;
  }

  if (hasLineOnly && count > 1) {
    showNotification('❎ㅤ하나의 선분만 선택해주세요');
    return;
  }

  if (!hasLineOnly) {
    showNotification('❎ㅤ선분만 선택 가능해요');
    return;
  }

  if (singleSelection && hasLineOnly && !hasFrameParent) {
    showNotification('❎ㅤ프레임 안의 선분을 선택해주세요.');
    return;
  }
}
