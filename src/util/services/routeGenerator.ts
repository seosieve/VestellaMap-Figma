// routeGenerator.ts

import { Colors } from '../../constant/color';
import { hexToRgb } from '../managers/colorManager';
import { showNotification } from '../managers/notificationManager';

export type GenerateSpot = 'start' | 'intersect' | 'end';

export type Point = [x: number, y: number];

export function generateRoutes(msg: { spot: GenerateSpot }) {
  const selection = figma.currentPage.selection;
  const line = selection[0] as LineNode;

  switch (msg.spot) {
    case 'start':
      generateEllipse(calculateStartPoint(line));
      break;
    case 'end':
      generateEllipse(calculateEndPoint(line));
      break;
    case 'intersect':
      const intersectLine = selection[1] as LineNode;
      const intersectPoint = calculateIntersectPoint(line, intersectLine);
      switch (intersectPoint) {
        case 'parallel':
          showNotification('❎ㅤ평행한 선분입니다');
          break;
        case 'noIntersect':
          showNotification('❎ㅤ교차점이 없는 선분입니다');
          break;
        default:
          generateEllipse(intersectPoint);
          break;
      }
      break;
  }
}

// 선분 시작점 계산
export function calculateStartPoint(line: LineNode): Point {
  const { offsetX, offsetY } = calculateLineMetrics(line);
  return [line.x + offsetX, line.y + offsetY];
}

// 선분 끝점 계산
export function calculateEndPoint(line: LineNode): Point {
  const { radian, offsetX, offsetY } = calculateLineMetrics(line);
  const endPoint = { x: line.x + line.width * Math.cos(radian), y: line.y + line.width * Math.sin(radian) };
  return [endPoint.x + offsetX, endPoint.y + offsetY];
}

// 선분 교차점 계산
export function calculateIntersectPoint(line1: LineNode, line2: LineNode): Point | 'parallel' | 'noIntersect' {
  // 각 선의 회전각을 라디안으로 변환
  const metrics1 = calculateLineMetrics(line1);
  const metrics2 = calculateLineMetrics(line2);

  // 각 선의 방향 벡터
  const dir1: Point = [Math.cos(metrics1.radian), Math.sin(metrics1.radian)];
  const dir2: Point = [Math.cos(metrics2.radian), Math.sin(metrics2.radian)];

  // 선의 굵기를 고려한 시작점
  const p1: Point = [line1.x + metrics1.offsetX, line1.y + metrics1.offsetY];
  const p2: Point = [line2.x + metrics2.offsetX, line2.y + metrics2.offsetY];

  // 평행한 경우 체크 (내적이 1이거나 -1인 경우)
  if (isParallel(dir1, dir2)) {
    return 'parallel';
  }

  // 교차점 계산을 위한 매개변수 t 구하기
  const t = (dir2[0] * (p1[1] - p2[1]) - dir2[1] * (p1[0] - p2[0])) / (dir1[0] * dir2[1] - dir1[1] * dir2[0]);

  // 교차점 계산
  const intersection: Point = [p1[0] + dir1[0] * t, p1[1] + dir1[1] * t];

  // 교차점이 두 선분 위에 있는지 확인
  const isOnLine1 = isPointOnLine(intersection, line1, metrics1);
  const isOnLine2 = isPointOnLine(intersection, line2, metrics2);

  if (!isOnLine1 || !isOnLine2) {
    return 'noIntersect';
  }

  return intersection;
}

function isParallel(dir1: Point, dir2: Point): boolean {
  const dot = dir1[0] * dir2[0] + dir1[1] * dir2[1];
  return Math.abs(Math.abs(dot) - 1) < 0.0001;
}

// 점이 선분 위에 있는지 확인하는 함수
function isPointOnLine(point: Point, line: LineNode, metrics: ReturnType<typeof calculateLineMetrics>): boolean {
  // 선의 실제 시작점과 끝점 (굵기 고려)
  const start: Point = [line.x + metrics.offsetX, line.y + metrics.offsetY];
  const end: Point = [
    start[0] + line.width * Math.cos(metrics.radian),
    start[1] + line.width * Math.sin(metrics.radian),
  ];

  // 점과 선의 시작점, 끝점 사이의 거리 계산
  const d = distance(start, end);
  const d1 = distance(start, point);
  const d2 = distance(end, point);

  // 선의 굵기를 고려한 오차 범위 설정
  const strokeWeight = typeof line.strokeWeight === 'number' ? line.strokeWeight : 1;
  const buffer = Math.max(0.1, strokeWeight); // 최소 0.1, 선의 굵기만큼 오차 허용

  return Math.abs(d1 + d2 - d) < buffer;
}

// 두 점 사이의 거리 계산
function distance(p1: Point, p2: Point): number {
  const dx = p2[0] - p1[0];
  const dy = p2[1] - p1[1];
  return Math.sqrt(dx * dx + dy * dy);
}

// 공통 유틸리티 함수
function calculateLineMetrics(line: LineNode) {
  const strokeWeight = typeof line.strokeWeight === 'number' ? line.strokeWeight : 1;
  const strokeOffset = strokeWeight / 2;
  const radian = (-line.rotation * Math.PI) / 180;

  const offsetX = strokeOffset * Math.sin(radian);
  const offsetY = -strokeOffset * Math.cos(radian);

  return { radian, offsetX, offsetY };
}

// Route Ellipse 생성
function generateEllipse(point: Point) {
  const circle = figma.createEllipse();
  const diameter = 200;
  circle.resize(diameter, diameter);
  circle.fills = [{ type: 'SOLID', color: hexToRgb(Colors.base) }];
  circle.name = 'Route';

  const circleCenter: Point = [point[0], point[1]];
  circle.x = circleCenter[0] - diameter / 2;
  circle.y = circleCenter[1] - diameter / 2;

  figma.currentPage.appendChild(circle);
}

// Select No Line 알림
export function notifyEmpty() {
  if (figma.currentPage.selection.length === 0) {
    showNotification('❎ㅤ선분을 선택해주세요');
  }
}
