import React, { useState } from 'react';
import { useMessageListener } from '../../util/managers/messaageManager';
import { Colors } from '../../constant/color';
import CSV from '../atoms/CSV';

const ExportCSVButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    parent.postMessage({ pluginMessage: { type: 'export-CSV' } }, '*');
  };

  useMessageListener('export-CSV', (msg) => {
    const blob = new Blob([msg.csvContent], { type: 'text/csv' });

    // 다운로드 링크 생성 및 클릭
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'beacon_locations.csv';
    link.click();

    // 메모리 정리
    URL.revokeObjectURL(link.href);
  });

  return (
    <button
      style={isHovered ? styles.hover : styles.default}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CSV width={24} height={24} color={Colors.mintBase} />
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

export default ExportCSVButton;
