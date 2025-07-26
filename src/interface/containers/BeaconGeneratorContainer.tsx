import React, { CSSProperties, useState } from 'react';
import { Colors } from '../../constant/color';
import { useMessageListener } from '../../util/managers/messaageManager';
import ExcelSaveButton from '../components/ExcelSaveButton';
import DraggableLine from '../components/DraggableLine';
import BeaconInfoBox from '../components/BeaconInfoBox';

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
        <ExcelSaveButton onClick={handleExportClick} />
      </div>
      <div style={styles.contentContainer}>
        <div style={styles.dragLineContainer}>
          <DraggableLine />
        </div>
        <div style={styles.infoContainer}>
          <BeaconInfoBox major={100} minor={13204} />
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
    marginTop: '28px',
  },
  title: {
    color: Colors.white,
    fontSize: '16px',
    fontWeight: '700',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.shadow,
    borderRadius: '12px',
    paddingTop: '16px',
    paddingBottom: '16px',
  },
  dragLineContainer: {
    flex: 1,
    width: '90%',
  },
  infoContainer: {
    width: '100%',
  },
};

export default BeaconGeneratorContainer;
