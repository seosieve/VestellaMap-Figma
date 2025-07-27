import React, { CSSProperties, useState, useRef } from 'react';
import { Colors } from '../../constant/color';
import { useMessageListener } from '../../util/managers/messaageManager';
import { GenerateSpot } from 'src/util/services/nodeGenerator';

interface DraggableLineProps {
  onClick: () => void;
  onRatioChange: (ratio: number) => void;
  onHoverChange: (isHovered: boolean, type: GenerateSpot, ratio: number) => void;
}

const DraggableLine: React.FC<DraggableLineProps> = ({ onClick, onRatioChange, onHoverChange }) => {
  const [horizontalLineColor, setHorizontalLineColor] = useState<string>(Colors.dark);
  const [circlePosition, setCirclePosition] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  // 드래그 시작 위치 저장
  const dragStartPosition = useRef<{ x: number; y: number } | null>(null);

  const lineStart = { x: 0.1, y: 0.5 };
  const lineEnd = { x: 0.9, y: 0.5 };

  useMessageListener('selection-beacon-line', (msg) => {
    const active = msg.active;
    setHorizontalLineColor(active ? Colors.white : Colors.dark);
    setIsDisabled(active ? false : true);
  });

  const handleContainerClick = () => {
    parent.postMessage({ pluginMessage: { type: 'empty-beacon-line' } }, '*');
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDragging(true);
    dragStartPosition.current = { x: e.clientX, y: e.clientY };
    onHoverChange(false, 'ratio', circlePosition);
    window.addEventListener('mouseup', handleWindowMouseUp);
  };

  const handleWindowMouseUp = (e: MouseEvent) => {
    setDragging(false);

    if (dragStartPosition.current) {
      const deltaX = Math.abs(e.clientX - dragStartPosition.current.x);
      const deltaY = Math.abs(e.clientY - dragStartPosition.current.y);
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < 1) {
        onClick();
      }
    }

    dragStartPosition.current = null;
    window.removeEventListener('mouseup', handleWindowMouseUp);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;

    const div = e.currentTarget;
    const rect = div.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width;
    const clampedX = Math.max(lineStart.x, Math.min(lineEnd.x, mouseX));
    const ratio = (clampedX - lineStart.x) / (lineEnd.x - lineStart.x);

    setCirclePosition(ratio);
    onRatioChange(ratio);
  };

  const handleMouseUp = () => {
    setDragging(false);
    onHoverChange(true, 'ratio', circlePosition);
  };

  const handleHover = (hovered: boolean) => {
    setIsHovered(hovered);
    onHoverChange(hovered, 'ratio', circlePosition);
  };

  return (
    <div style={styles.container} onClick={handleContainerClick} onMouseMove={handleMouseMove}>
      <div style={{ ...styles.horizontalLine, backgroundColor: horizontalLineColor }} />
      <button
        style={{
          ...styles.default,
          ...(isHovered ? styles.hover : {}),
          ...(isDisabled ? styles.disabled : {}),
          left: `${10 + 80 * circlePosition}%`,
        }}
        disabled={isDisabled}
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => handleHover(true)}
        onMouseLeave={() => handleHover(false)}
      />
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '80px',
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
