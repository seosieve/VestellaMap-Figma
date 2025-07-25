import React, { useState } from 'react';

interface DraggableLineProps {
  width?: number;
  height?: number;
}

const DEFAULT_WIDTH = 300;
const DEFAULT_HEIGHT = 200;

const DraggableLine: React.FC<DraggableLineProps> = ({ width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT }) => {
  // 원의 위치를 0~1 비율로 관리 (0 = 선의 시작점, 1 = 선의 끝점)
  const [circlePosition, setCirclePosition] = useState(0.5); // 50% 위치에서 시작
  const [dragging, setDragging] = useState(false);

  // 고정된 선의 시작점과 끝점 (비율)
  const lineStart = { x: 0.1, y: 0.5 }; // 선의 시작점 (10%, 50%)
  const lineEnd = { x: 0.9, y: 0.5 }; // 선의 끝점 (90%, 50%)

  // 마우스 다운 시
  const handleMouseDown = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    setDragging(true);
  };

  // 마우스 이동 시
  const handleMouseMove = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    if (!dragging) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width;

    // 선의 시작점과 끝점 사이에서만 움직이도록 제한
    const clampedX = Math.max(lineStart.x, Math.min(lineEnd.x, mouseX));

    // 0~1 비율로 변환 (선의 시작점 = 0, 끝점 = 1)
    const ratio = (clampedX - lineStart.x) / (lineEnd.x - lineStart.x);
    setCirclePosition(ratio);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  // 실제 픽셀 좌표로 변환 (부모 컨테이너의 실제 크기 기준)
  const px = (ratio: number, axis: 'x' | 'y') => (axis === 'x' ? ratio * width : ratio * height);

  // 원의 현재 위치 계산
  const circleX = lineStart.x + (lineEnd.x - lineStart.x) * circlePosition;
  const circleY = lineStart.y;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      style={{ border: '1px solid #ccc', background: '#222', display: 'block' }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* 고정된 선 */}
      <line
        x1={px(lineStart.x, 'x')}
        y1={px(lineStart.y, 'y')}
        x2={px(lineEnd.x, 'x')}
        y2={px(lineEnd.y, 'y')}
        stroke="#31DD9E"
        strokeWidth={3}
      />
      {/* 움직이는 원 */}
      <circle
        cx={px(circleX, 'x')}
        cy={px(circleY, 'y')}
        r={10}
        fill="#fff"
        stroke="#31DD9E"
        strokeWidth={2}
        style={{ cursor: 'pointer' }}
        onMouseDown={handleMouseDown}
      />
    </svg>
  );
};

export default DraggableLine;
