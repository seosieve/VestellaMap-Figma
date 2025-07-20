// previewGenerator.ts

import { Point, GenerateSpot, calculateStartPoint, calculateEndPoint, calculateIntersectPoint } from './routeGenerator';

export function showPreviewEllipse(msg: { buttonType: GenerateSpot }) {
  const [line1, line2] = figma.currentPage.selection;

  if (!line1 || line1.type !== 'LINE') return;

  switch (msg.buttonType) {
    case 'start':
      generatePreviewEllipse(calculateStartPoint(line1));
      break;
    case 'end':
      generatePreviewEllipse(calculateEndPoint(line1));
      break;
    case 'intersect':
      if (line2?.type === 'LINE') {
        const intersectPoint = calculateIntersectPoint(line1, line2);
        if (intersectPoint) {
          generatePreviewEllipse(intersectPoint);
        }
      }
      break;
  }
}

export function generatePreviewEllipse(point: Point) {
  // 기존 프리뷰 원 제거
  const existingPreviews = figma.currentPage.findAll((node) => node.name === 'preview-circle');
  existingPreviews.forEach((node) => node.remove());

  const circle = figma.createEllipse();
  const diameter = 200;

  circle.resize(diameter, diameter);
  circle.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } }];
  circle.opacity = 0.1;
  circle.name = 'preview-circle';
  circle.locked = true;

  circle.x = point[0] - diameter / 2;
  circle.y = point[1] - diameter / 2;

  figma.currentPage.appendChild(circle);
}

export function hidePreviewEllipse() {
  const previews = figma.currentPage.findAll((node) => node.name === 'preview-circle');
  previews.forEach((node) => node.remove());
}
