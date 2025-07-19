// lineDetector.ts

export function detectLine() {
  const selection = figma.currentPage.selection;
  const count = selection.every((node) => node.type === 'LINE') ? selection.length : 0;

  figma.ui.postMessage({ type: 'detection-lines', count });
}
