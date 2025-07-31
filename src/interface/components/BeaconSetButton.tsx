import React, { useState } from 'react';
import { Colors } from '../../constant/color';

interface BeaconSetButtonProps {
  onClick: () => void;
}

const BeaconSetButton: React.FC<BeaconSetButtonProps> = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      style={styles.default}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p style={isHovered ? styles.hover : styles.text}>Set Number</p>
    </button>
  );
};

const styles = {
  default: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    height: '28px',
    backgroundColor: 'transparent',
    border: 'none',
    paddingLeft: '16px',
    paddingRight: '16px',
    cursor: 'pointer',
  },
  text: {
    color: Colors.base,
    fontSize: '12px',
    fontWeight: '400',
    transition: 'all 0.3s ease',
  },
  hover: {
    color: Colors.white,
    fontSize: '12px',
    fontWeight: '400',
    transition: 'all 0.3s ease',
  },
};

export default BeaconSetButton;
