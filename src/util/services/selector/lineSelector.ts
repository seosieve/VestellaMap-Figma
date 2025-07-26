// lineDetector.ts

export function selectLine() {
  const selection = figma.currentPage.selection;
  const count = selection.every((node) => node.type === 'LINE') ? selection.length : 0;

  figma.ui.postMessage({ type: 'selection-route-lines', count });
  figma.ui.postMessage({ type: 'selection-beacon-line', active: false });

  if (selection[0]?.parent && selection[0]?.parent?.type === 'FRAME') {
    figma.ui.postMessage({ type: 'selection-beacon-line', active: true });
  }
}
