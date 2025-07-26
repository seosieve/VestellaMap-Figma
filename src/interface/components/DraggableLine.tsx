import React, { CSSProperties, useState } from 'react';
import { Colors } from '../../constant/color';
import { useMessageListener } from '../../util/managers/messaageManager';

const DraggableLine: React.FC = () => {
  const [horizontalLineColor, setHorizontalLineColor] = useState<string>(Colors.dark);
  const [circlePosition, setCirclePosition] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const lineStart = { x: 0.1, y: 0.5 };
  const lineEnd = { x: 0.9, y: 0.5 };

  useMessageListener('selection-lines', (msg) => {
    const count = msg.count;
    setHorizontalLineColor(count === 1 ? Colors.white : Colors.dark);
    setIsDisabled(count === 1 ? false : true);
  });

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDragging(true);
    console.log('mouse down');
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const div = e.currentTarget;
    const rect = div.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width;

    // 선의 시작점과 끝점 사이에서만 움직이도록 제한
    const clampedX = Math.max(lineStart.x, Math.min(lineEnd.x, mouseX));

    // 0~1 비율로 변환 (선의 시작점 = 0, 끝점 = 1)
    const ratio = (clampedX - lineStart.x) / (lineEnd.x - lineStart.x);
    setCirclePosition(ratio);
    console.log(ratio);
  };

  const handleMouseUp = () => {
    setDragging(false);
    console.log('mouse up');
  };

  return (
    <div style={styles.container} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <div style={{ ...styles.horizontalLine, backgroundColor: horizontalLineColor }} />
      <button
        style={{
          ...styles.default,
          ...(isHovered ? styles.hover : {}),
          ...(isDisabled ? styles.disabled : {}),
          left: `${10 + 80 * circlePosition}%`,
        }}
        disabled={isDisabled}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100px',
    cursor: 'pointer',
  },
  horizontalLine: {
    position: 'absolute',
    top: '50%',
    left: '8px',
    right: '8px',
    height: '1px',
    transform: 'translateY(-50%)',
    transition: 'all 0.3s ease',
  },
  default: {
    position: 'absolute',
    top: '50%',
    width: '36px',
    height: '36px',
    backgroundColor: Colors.mintBase,
    border: `4px solid ${Colors.mintBase}`,
    borderRadius: '50%',
    cursor: 'pointer',
    transform: 'translate(-50%, -50%)',
  },
  disabled: {
    width: '36px',
    height: '36px',
    backgroundColor: Colors.dark,
    border: `4px solid ${Colors.medium}`,
    borderRadius: '50%',
    cursor: 'default',
  },
  hover: {
    width: '36px',
    height: '36px',
    backgroundColor: Colors.mintBase,
    border: `6px solid ${Colors.mintBright}`,
    borderRadius: '50%',
    cursor: 'pointer',
  },
};

export default DraggableLine;
