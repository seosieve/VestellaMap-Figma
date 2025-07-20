import React, { useState } from 'react';
import { Colors } from '../../constant/color';

interface ButtonProps {
  title: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, disabled = false, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      style={disabled ? styles.disabled : isHovered ? styles.hover : styles.default}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {title}
    </button>
  );
};

const styles = {
  default: {
    width: '100%',
    height: '36px',
    backgroundColor: Colors.mintBase,
    color: Colors.mintBlack,
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  disabled: {
    width: '100%',
    height: '36px',
    backgroundColor: Colors.mintDark,
    color: Colors.mintShadow,
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'default',
    transition: 'all 0.3s ease',
  },
  hover: {
    width: '100%',
    height: '36px',
    backgroundColor: Colors.mintBright,
    color: Colors.mintBlack,
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

export default Button;
