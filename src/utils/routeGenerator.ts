// routeGenerator.ts

export type GenerateSpot = 'start' | 'intersect' | 'end';

type Point = [x: number, y: number];

export function generateRoutes(msg: { spot: GenerateSpot }) {
  const selection = figma.currentPage.selection;

  if (selection.length > 0) {
    const selectedNode = selection[0];

    if (selectedNode?.type === 'LINE') {
      const line = selectedNode as LineNode;

      const startPoint = calculateStartPoint(line);
      const endPoint = calculateEndPoint(line);

      if (msg.spot === 'start') {
        generateRoute(startPoint);
      } else if (msg.spot === 'end') {
        generateRoute(endPoint);
      } else if (msg.spot === 'intersect') {
        return;
      }
    }
  } else {
    figma.notify('❎ㅤ선분을 선택해주세요');
  }
}

// 선분 시작점 계산
function calculateStartPoint(line: LineNode): Point {
  const { offsetX, offsetY } = calculateLineMetrics(line);
  return [line.x + offsetX, line.y + offsetY];
}

// 선분 끝점 계산
function calculateEndPoint(line: LineNode): Point {
  const { rotationRad, offsetX, offsetY } = calculateLineMetrics(line);
  const endPoint = { x: line.x + line.width * Math.cos(rotationRad), y: line.y + line.width * Math.sin(rotationRad) };
  return [endPoint.x + offsetX, endPoint.y + offsetY];
}

// 공통 유틸리티 함수
function calculateLineMetrics(line: LineNode) {
  const strokeWeight = typeof line.strokeWeight === 'number' ? line.strokeWeight : 1;
  const strokeOffset = strokeWeight / 2;
  const rotationRad = (-line.rotation * Math.PI) / 180;

  const offsetX = strokeOffset * Math.sin(rotationRad);
  const offsetY = -strokeOffset * Math.cos(rotationRad);

  return { rotationRad, offsetX, offsetY };
}

// Route Ellipse 생성
function generateRoute(point: Point) {
  const circle = figma.createEllipse();
  const diameter = 200;
  circle.resize(diameter, diameter);
  circle.fills = [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } }];
  circle.name = 'Route';

  const circleCenter: Point = [point[0], point[1]];
  circle.x = circleCenter[0] - diameter / 2;
  circle.y = circleCenter[1] - diameter / 2;

  figma.currentPage.appendChild(circle);
}
