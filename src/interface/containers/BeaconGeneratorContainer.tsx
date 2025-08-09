import React, { CSSProperties, useState } from 'react';
import { Colors } from '../../constant/color';
import { GenerateSpot } from '../../util/services/nodeGenerator';
import { useMessageListener } from '../../util/managers/messaageManager';
import ExportCSVButton from '../components/ExportCSVButton';
import ExportQRButton from '../components/ExportQRButton';
import DraggableLine from '../components/DraggableLine';
import NumberableLine from '../components/NumberableLine';
import RatioBox from '../components/RatioBox';
import BeaconInfoBox from '../components/BeaconInfoBox';

const BeaconGeneratorContainer: React.FC = () => {
  const [ratio, setRatio] = useState<number>(0);
  const [selection, setSelection] = useState<string>('line');

  useMessageListener('selection-beacon-line', (msg) => {
    if (msg.active) {
      setSelection('line');
      checkCurrentSelection();
    }
  });

  useMessageListener('selection-beacon-ellipse', (msg) => {
    if (msg.active) {
      setSelection('ellipse');
      checkCurrentSelection();
    }
  });

  const checkCurrentSelection = () => {
    parent.postMessage({ pluginMessage: { type: 'check-current-selection' } }, '*');
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
          <ExportCSVButton />
          <ExportQRButton />
        </div>
      </div>
      <div style={styles.contentContainer}>
        <div style={styles.interactiveContainer}>
          <div
            style={{
              ...styles.componentWrapper,
              opacity: selection === 'line' ? 1 : 0,
              pointerEvents: selection === 'line' ? 'auto' : 'none',
            }}
          >
            <DraggableLine onClick={handleGenerateClick} onRatioChange={setRatio} onHoverChange={handleHoverChange} />
          </div>

          <div
            style={{
              ...styles.componentWrapper,
              opacity: selection !== 'line' ? 1 : 0,
              pointerEvents: selection !== 'line' ? 'auto' : 'none',
            }}
          >
            <NumberableLine onClick={() => {}} />
          </div>
        </div>
        <div style={styles.infoContainer}>
          <RatioBox ratio={ratio} selection={selection} />
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
  interactiveContainer: {
    width: '90%',
    position: 'relative',
    height: '80px',
  },
  componentWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    transition: 'all 0.5s ease',
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
