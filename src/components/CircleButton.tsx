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
    backgroundColor: '#404041',
    border: 'none',
    borderRadius: '50%',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  disabled: {
    width: '36px',
    height: '36px',
    backgroundColor: '#404041',
    color: '#133F2F',
    border: '4px solid #505152',
    borderRadius: '50%',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'default',
    transition: 'all 0.3s ease',
  },
  hover: {
    width: '36px',
    height: '36px',
    backgroundColor: '#464646',
    border: 'none',
    borderRadius: '50%',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

export default CircleButton;
