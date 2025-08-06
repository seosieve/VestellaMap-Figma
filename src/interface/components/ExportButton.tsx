import React, { useState } from 'react';
import { Colors } from '../../constant/color';
import CSV from '../atoms/CSV';
import QR from '../atoms/QR';

interface ExportButtonProps {
  type: 'CSV' | 'QR';
  onClick: () => void;
}

const ExportButton: React.FC<ExportButtonProps> = ({ type, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getIcon = () => {
    if (type === 'CSV') {
      return <CSV width={24} height={24} color={Colors.mintBase} />;
    } else {
      return <QR width={24} height={24} color={Colors.mintBase} />;
    }
  };

  return (
    <button
      style={isHovered ? styles.hover : styles.default}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {getIcon()}
    </button>
  );
};

const styles = {
  default: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    backgroundColor: 'transparent',
    border: `1px solid ${Colors.shadow}`,
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  hover: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    backgroundColor: 'transparent',
    border: `1px solid ${Colors.dark}`,
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
};

export default ExportButton;
