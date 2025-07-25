import React, { useState } from 'react';

interface DraggableLineProps {
  width?: number;
  height?: number;
}

const DEFAULT_WIDTH = 300;
const DEFAULT_HEIGHT = 200;

const DraggableLine: React.FC<DraggableLineProps> = ({ width = DEFAULT_WIDTH, height = DEFAULT_HEIGHT }) => {
  // 좌표를 0~1 비율로 관리
  const [line, setLine] = useState({ x1: 0.2, y1: 0.25, x2: 0.7, y2: 0.75 });
  const [dragging, setDragging] = useState<'start' | 'end' | null>(null);

  // 마우스 이동 시
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!dragging) return;
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    // clamp
    const cx = Math.max(0, Math.min(1, x));
    const cy = Math.max(0, Math.min(1, y));
    if (dragging === 'start') {
      setLine({ ...line, x1: cx, y1: cy });
    } else if (dragging === 'end') {
      setLine({ ...line, x2: cx, y2: cy });
    }
  };

  const handleMouseUp = () => setDragging(null);

  // 실제 픽셀 좌표로 변환
  const px = (ratio: number, axis: 'x' | 'y') => (axis === 'x' ? ratio * width : ratio * height);

  return (
    <svg
      width={width}
      height={height}
      style={{ border: '1px solid #ccc', background: '#222', width: '100%', height: '100%', display: 'block' }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* 선 */}
      <line
        x1={px(line.x1, 'x')}
        y1={px(line.y1, 'y')}
        x2={px(line.x2, 'x')}
        y2={px(line.y2, 'y')}
        stroke="#31DD9E"
        strokeWidth={3}
      />
      {/* 시작점 */}
      <circle
        cx={px(line.x1, 'x')}
        cy={px(line.y1, 'y')}
        r={10}
        fill="#fff"
        stroke="#31DD9E"
        strokeWidth={2}
        style={{ cursor: 'pointer' }}
        onMouseDown={() => setDragging('start')}
      />
      {/* 끝점 */}
      <circle
        cx={px(line.x2, 'x')}
        cy={px(line.y2, 'y')}
        r={10}
        fill="#fff"
        stroke="#31DD9E"
        strokeWidth={2}
        style={{ cursor: 'pointer' }}
        onMouseDown={() => setDragging('end')}
      />
    </svg>
  );
};

export default DraggableLine;
