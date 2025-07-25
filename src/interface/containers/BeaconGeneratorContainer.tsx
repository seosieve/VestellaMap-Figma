import React, { CSSProperties, useState } from 'react';
import { Colors } from '../../constant/color';
import { useMessageListener } from '../../util/managers/messaageManager';
import SaveButton from '../components/SaveButton';
import DraggableLine from '../components/DraggableLine';

const BeaconGeneratorContainer: React.FC = () => {
  const [horizontalLineColor, setHorizontalLineColor] = useState<string>(Colors.dark);

  useMessageListener('selection-lines', (msg) => {
    const count = msg.count;
    setHorizontalLineColor(count > 0 ? Colors.white : Colors.dark);
  });

  const handleNumberingClick = () => {
    parent.postMessage({ pluginMessage: { type: 'numbering-beacons' } }, '*');
  };

  const handleExportClick = () => {
    parent.postMessage({ pluginMessage: { type: 'export-csv' } }, '*');
  };

  useMessageListener('export-csv', (msg) => {
    console.log(msg);
    handleExport(msg.csvContent);
  });

  const handleExport = (csvContent: string) => {
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
    <>
      <div style={styles.titleContainer}>
        <p style={styles.title}>Beacon Generator</p>
        <SaveButton onClick={handleExportClick} />
      </div>
      <div style={styles.container}>
        <div style={{ ...styles.horizontalLine, backgroundColor: horizontalLineColor }} />
        <div style={{ width: '100%', height: 120 }}>
          <DraggableLine width={300} height={100} />
        </div>
        <div style={styles.numberContainer}>
          <div style={styles.numberItem}>
            <p style={styles.category}>Major</p>
            <p style={styles.number}>100</p>
          </div>
          <div style={styles.divider} />
          <div style={styles.numberItem}>
            <p style={styles.category}>Minor</p>
            <p style={styles.number}>13204</p>
          </div>
        </div>
      </div>
    </>
  );
};

const styles: { [key: string]: CSSProperties } = {
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '0',
    marginTop: '36px',
  },
  title: {
    color: Colors.white,
    fontSize: '16px',
    fontWeight: '700',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80px',
    backgroundColor: Colors.shadow,
    borderRadius: '12px',
    padding: '16px',
    gap: '8px',
  },
  horizontalLine: {
    width: '100%',
    height: '1px',
    transition: 'all 0.3s ease',
  },
  numberContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    gap: '8px',
  },
  numberItem: {
    display: 'flex',
    gap: '4px',
  },
  category: {
    color: Colors.base,
    fontSize: '12px',
    fontWeight: '400',
  },
  number: {
    color: Colors.white,
    fontSize: '12px',
    fontWeight: '700',
  },
  divider: {
    width: '1px',
    height: '10px',
    backgroundColor: Colors.dark,
  },
};

export default BeaconGeneratorContainer;
