import React, { useState } from 'react';
import { GenerateSpot } from '../../../src/util/services/routeGenerator';

interface CircleButtonProps {
  disabled: boolean;
  onClick: () => void;
  onHoverChange: (isHovered: boolean, type: GenerateSpot) => void;
  type: GenerateSpot;
}

const CircleButton: React.FC<CircleButtonProps> = ({ disabled, onClick, onHoverChange, type }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = (hovered: boolean) => {
    setIsHovered(hovered);
    onHoverChange(hovered, type);
  };

  return (
    <button
      style={disabled ? styles.disabled : isHovered ? styles.hover : styles.default}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    />
  );
};

const styles = {
  default: {
    width: '36px',
    height: '36px',
    backgroundColor: '#31DD9E',
    border: '4px solid #31DD9E',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  disabled: {
    width: '36px',
    height: '36px',
    backgroundColor: '#404041',
    border: '4px solid #505152',
    borderRadius: '50%',
    cursor: 'default',
    transition: 'all 0.3s ease',
  },
  hover: {
    width: '36px',
    height: '36px',
    backgroundColor: '#31DD9E',
    border: '6px solid #50F4B8',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

export default CircleButton;
