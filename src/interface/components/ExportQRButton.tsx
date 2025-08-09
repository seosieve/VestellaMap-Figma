import React, { useState } from 'react';
import { useMessageListener } from '../../util/managers/messaageManager';
import { Colors } from '../../constant/color';
import QR from '../atoms/QR';

const ExportQRButton = () => {
  const endPoint = 'https://api.qrserver.com/v1/create-qr-code/';
  const size = '512x512';
  const margin = 20;
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    parent.postMessage({ pluginMessage: { type: 'export-QR' } }, '*');
  };

  useMessageListener('export-QR', (msg) => {
    // 받은 비콘 데이터로 QR 코드 생성
    const qrData = JSON.stringify(msg.qrContent);
    const qrUrl = `${endPoint}?data=${encodeURIComponent(qrData)}&size=${size}&format=png&margin=${margin}`;

    fetch(qrUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // 다운로드 링크 생성 및 클릭
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'beacon_QR.png';
        link.click();
        // 메모리 정리
        URL.revokeObjectURL(link.href);
      })
      .catch((error) => {
        console.error('QR 다운로드 실패:', error);
      });
  });

  return (
    <button
      style={isHovered ? styles.hover : styles.default}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <QR width={24} height={24} color={isHovered ? Colors.mintBright : Colors.mintBase} />
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

export default ExportQRButton;
