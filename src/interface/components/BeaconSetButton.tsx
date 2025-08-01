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
      <p style={isHovered ? styles.hover : styles.text}>Set</p>
    </button>
  );
};

const styles = {
  default: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '12px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
  },
  text: {
    color: Colors.base,
    fontSize: '12px',
    fontWeight: '400',
    margin: '0',
    transition: 'all 0.3s ease',
  },
  hover: {
    color: Colors.white,
    fontSize: '12px',
    fontWeight: '400',
    margin: '0',
    transition: 'all 0.3s ease',
  },
};

export default BeaconSetButton;
