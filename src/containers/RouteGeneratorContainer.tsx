import React, { CSSProperties, useEffect, useState } from 'react';
import CircleButton from '../components/CircleButton';
import { GenerateSpot } from '../utils/routeGenerator';

const RouteGeneratorContainer: React.FC = () => {
  const [buttonStates, setButtonStates] = useState({ start: false, intersect: false, end: false });
  const [horizontalLineColor, setHorizontalLineColor] = useState<string>('#404041');
  const [verticalLineOpacity, setVerticalLineOpacity] = useState<string>('33%');

  const handleGenerateClick = (spot: GenerateSpot) => {
    parent.postMessage({ pluginMessage: { type: 'generate-routes', spot: spot } }, '*');
  };

  useEffect(() => {
    window.onmessage = (event) => {
      const msg = event.data.pluginMessage;

      if (msg.type === 'detection-lines') {
        const count = msg.count;
        // Line Color 설정
        setHorizontalLineColor(count > 0 ? '#FFFFFF' : '#404041');
        setVerticalLineOpacity(count === 2 ? '100%' : '33%');
        // Button State 설정
        setButtonStates({ start: count === 1, intersect: count === 2, end: count === 1 });
      }
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.crossBackground}>
        <div style={{ ...styles.horizontalLine, backgroundColor: horizontalLineColor }} />
        <div style={{ ...styles.verticalLine, opacity: verticalLineOpacity }} />
      </div>
      <div style={styles.buttonContainer}>
        <CircleButton disabled={!buttonStates.start} onClick={() => handleGenerateClick('start')} />
        <CircleButton disabled={!buttonStates.intersect} onClick={() => handleGenerateClick('intersect')} />
        <CircleButton disabled={!buttonStates.end} onClick={() => handleGenerateClick('end')} />
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80px',
    backgroundColor: '#2c2d2f',
    borderRadius: '12px',
    padding: '16px',
    marginTop: '24px',
  },
  crossBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalLine: {
    position: 'absolute',
    width: 'calc(100% - 32px)',
    height: '1px',
    transition: 'all 0.3s ease',
  },
  verticalLine: {
    position: 'absolute',
    width: '1px',
    height: 'calc(100% - 32px)',
    background: 'linear-gradient(180deg, #FFFFFF33, #FFFFFF, #FFFFFF33)',
    transition: 'all 0.3s ease',
  },
  buttonContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    justifyContent: 'space-between',
    width: '100%',
    zIndex: 1,
  },
};

export default RouteGeneratorContainer;
