import React, { useState } from 'react';
import Reset from '../atoms/Reset';

interface ResetButtonProps {
  onClick?: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      style={isHovered ? styles.hover : styles.default}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Reset width={12} height={12} color="#AFAFAF" />
    </button>
  );
};

const styles = {
  default: {
    width: '24px',
    height: '24px',
    backgroundColor: '#404041',
    border: 'none',
    borderRadius: '50%',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  hover: {
    width: '24px',
    height: '24px',
    backgroundColor: '#595959',
    border: 'none',
    borderRadius: '50%',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

export default ResetButton;
