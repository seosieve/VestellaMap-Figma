import React, { useState } from 'react';

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
    backgroundColor: '#31DD9E',
    color: '#05130E',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  disabled: {
    width: '100%',
    height: '36px',
    backgroundColor: '#22936A',
    color: '#133F2F',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'default',
    transition: 'all 0.3s ease',
  },
  hover: {
    width: '100%',
    height: '36px',
    backgroundColor: '#50F4B8',
    color: '#05130E',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

export default Button;
