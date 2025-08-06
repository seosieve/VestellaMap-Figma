import React, { CSSProperties, useState } from 'react';
import { Colors } from '../../constant/color';
import { useMessageListener } from '../../util/managers/messaageManager';
import { GenerateSpot } from '../../util/services/nodeGenerator';
import ExportButton from '../components/ExportButton';
import DraggableLine from '../components/DraggableLine';
import RatioBox from '../components/RatioBox';
import BeaconInfoBox from '../components/BeaconInfoBox';

const BeaconGeneratorContainer: React.FC = () => {
  const [ratio, setRatio] = useState<number>(0);

  const handleExportCSVClick = () => {
    parent.postMessage({ pluginMessage: { type: 'export-CSV' } }, '*');
  };

  const handleExportQRClick = () => {
    parent.postMessage({ pluginMessage: { type: 'export-QR' } }, '*');
  };

  useMessageListener('export-CSV', (msg) => {
    console.log(msg);
    handleExport(msg.csvContent);
  });

  useMessageListener('download-QR', (msg) => {
    // 받은 비콘 데이터로 QR 코드 생성
    const qrData = JSON.stringify(msg.beaconData);
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrData)}&size=256x256&format=png`;

    // QR 이미지 다운로드
    fetch(qrUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'beacon_qr.png';
        link.click();
        URL.revokeObjectURL(link.href);
      })
      .catch((error) => {
        console.error('QR 다운로드 실패:', error);
      });
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

  const handleGenerateClick = () => {
    parent.postMessage({ pluginMessage: { type: 'generate-node', spot: 'ratio', ratio: ratio } }, '*');
  };

  const handleHoverChange = (isHovered: boolean, type: GenerateSpot, ratio: number) => {
    if (isHovered) {
      parent.postMessage({ pluginMessage: { type: 'show-preview-ellipse', spot: type, ratio: ratio } }, '*');
    } else {
      parent.postMessage({ pluginMessage: { type: 'hide-preview-ellipse' } }, '*');
    }
  };

  return (
    <>
      <div style={styles.titleContainer}>
        <p style={styles.title}>Beacon Generator</p>
        <div style={styles.buttonContainer}>
          <ExportButton type="CSV" onClick={handleExportCSVClick} />
          <ExportButton type="QR" onClick={handleExportQRClick} />
        </div>
      </div>
      <div style={styles.contentContainer}>
        <div style={styles.dragLineContainer}>
          <DraggableLine onClick={handleGenerateClick} onRatioChange={setRatio} onHoverChange={handleHoverChange} />
        </div>
        <div style={styles.infoContainer}>
          <RatioBox ratio={ratio} />
          <BeaconInfoBox ratio={ratio} />
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
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.shadow,
    borderRadius: '12px',
    paddingTop: '12px',
    paddingBottom: '16px',
  },
  dragLineContainer: {
    flex: 1,
    width: '90%',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
};

export default BeaconGeneratorContainer;
