import React, { CSSProperties, useEffect } from 'react';
import { Colors } from '../../constant/color';
import Button from '../components/Button';

const BeaconGeneratorContainer: React.FC = () => {
  const handleNumberingClick = () => {
    parent.postMessage({ pluginMessage: { type: 'numbering-beacons' } }, '*');
  };

  const handleExportClick = () => {
    parent.postMessage({ pluginMessage: { type: 'export-csv' } }, '*');
  };

  const handleExport = () => {
    // CSV 데이터 생성
    const csvContent = 'Beacon Number,X,Y\n'; // CSV 헤더
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // 다운로드 링크 생성 및 클릭
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'beacon_locations.csv';
    link.click();

    // 메모리 정리
    URL.revokeObjectURL(link.href);
  };

  return (
    <div style={styles.container}>
      <Button title="Set Beacon Number" onClick={handleNumberingClick} />
      <Button title="Export CSV" onClick={handleExport} />
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.shadow,
    borderRadius: '12px',
    padding: '16px',
    marginTop: '24px',
    gap: '8px',
  },
};

export default BeaconGeneratorContainer;
