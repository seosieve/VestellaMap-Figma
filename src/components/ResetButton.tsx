import React, { useState } from 'react';
import Reset from '../atoms/Reset';

interface ResetButtonProps {
  onClick: () => void;
}

const ResetButton: React.FC<ResetButtonProps> = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const handleClick = () => {
    setIsRotating(true);
    onClick();
    setTimeout(() => setIsRotating(false), 300);
  };

  return (
    <button
      style={isHovered ? styles.hover : styles.default}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ ...styles.iconWrapper, animation: isRotating ? 'rotate 0.3s ease' : 'none' }}>
        <Reset width={12} height={12} color="#AFAFAF" />
      </div>
      <style>
        {`
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hover: {
    width: '24px',
    height: '24px',
    backgroundColor: '#464646',
    border: 'none',
    borderRadius: '50%',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default ResetButton;
