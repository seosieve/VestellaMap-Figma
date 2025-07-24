// previewGenerator.ts

import { Colors } from '../../constant/color';
import { hexToRgb } from '../managers/colorManager';
import { Point, GenerateSpot, calculateStartPoint, calculateEndPoint, calculateIntersectPoint } from './routeGenerator';
import { showNotification } from '../managers/notificationManager';

export function showPreviewEllipse(msg: { spot: GenerateSpot }) {
  const selection = figma.currentPage.selection;
  const line = selection[0] as LineNode;

  switch (msg.spot) {
    case 'start':
      generatePreviewEllipse(calculateStartPoint(line));
      break;
    case 'end':
      generatePreviewEllipse(calculateEndPoint(line));
      break;
    case 'intersect':
      const intersectLine = selection[1] as LineNode;
      const intersectPoint = calculateIntersectPoint(line, intersectLine);
      if (intersectPoint !== 'parallel' && intersectPoint !== 'noIntersect') {
        generatePreviewEllipse(intersectPoint);
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
  circle.fills = [{ type: 'SOLID', color: hexToRgb(Colors.base) }];
  circle.name = 'preview-circle';
  circle.opacity = 0.1;
  circle.locked = true;
  circle.x = point[0] - diameter / 2;
  circle.y = point[1] - diameter / 2;

  // 부모 노드 유무 판별
  const parentNode = figma.currentPage.selection[0]?.parent;
  const targetParent = parentNode && 'children' in parentNode ? parentNode : figma.currentPage;
  targetParent.appendChild(circle);
}

export function hidePreviewEllipse() {
  const previews = figma.currentPage.findAll((node) => node.name === 'preview-circle');
  previews.forEach((node) => node.remove());
}
