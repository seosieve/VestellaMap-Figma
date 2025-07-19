import React, { useState } from 'react';

interface CircleButtonProps {
  disabled: boolean;
  onClick: () => void;
}

const CircleButton: React.FC<CircleButtonProps> = ({ disabled, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      style={disabled ? styles.disabled : isHovered ? styles.hover : styles.default}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
