import React, { CSSProperties, useState } from 'react';
import { Colors } from '../../constant/color';
import { GenerateSpot } from '../../util/services/nodeGenerator';
import ExportCSVButton from '../components/ExportCSVButton';
import ExportQRButton from '../components/ExportQRButton';
import DraggableLine from '../components/DraggableLine';
import RatioBox from '../components/RatioBox';
import BeaconInfoBox from '../components/BeaconInfoBox';

const BeaconGeneratorContainer: React.FC = () => {
  const [ratio, setRatio] = useState<number>(0);

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
          <ExportCSVButton />
          <ExportQRButton />
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
