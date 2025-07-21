// lineDetector.ts

export function selectLine() {
  const selection = figma.currentPage.selection;
  const count = selection.every((node) => node.type === 'LINE') ? selection.length : 0;

  figma.ui.postMessage({ type: 'selection-lines', count });
}
