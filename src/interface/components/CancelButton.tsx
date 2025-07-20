import React, { useState } from 'react';
import { Colors } from '../../constant/color';

interface CancelButtonProps {
  onClick?: () => void;
}

const CancelButton: React.FC<CancelButtonProps> = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      style={isHovered ? styles.hover : styles.default}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Cancel
    </button>
  );
};

const styles = {
  default: {
    width: '100%',
    height: '36px',
    backgroundColor: 'transparent',
    color: Colors.base,
    border: 'none',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  hover: {
    width: '100%',
    height: '36px',
    backgroundColor: 'transparent',
    color: Colors.white,
    border: 'none',
    fontSize: '14px',
    fontWeight: '700',
    textDecoration: 'underline',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

export default CancelButton;
