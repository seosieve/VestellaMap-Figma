import React, { useState } from 'react';
import { Colors } from '../../constant/color';
import Excel from '../atoms/Excel';

interface ExcelSaveButtonProps {
  onClick: () => void;
}

const ExcelSaveButton: React.FC<ExcelSaveButtonProps> = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      style={isHovered ? styles.hover : styles.default}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Excel width={16} height={16} color={Colors.mintBase} />
      <p style={styles.text}>Excel Save</p>
    </button>
  );
};

const styles = {
  default: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    height: '30px',
    backgroundColor: 'transparent',
    border: `1px solid ${Colors.shadow}`,
    borderRadius: '4px',
    paddingLeft: '8px',
    paddingRight: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  hover: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    height: '30px',
    backgroundColor: 'transparent',
    border: `1px solid ${Colors.dark}`,
    borderRadius: '4px',
    paddingLeft: '8px',
    paddingRight: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  text: {
    color: Colors.white,
    fontSize: '12px',
    fontWeight: '600',
  },
};

export default ExcelSaveButton;
