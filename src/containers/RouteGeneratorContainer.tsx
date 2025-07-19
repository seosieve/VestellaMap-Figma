import React, { CSSProperties } from 'react';
import CircleButton from '../components/CircleButton';
import { GenerateSpot } from '../utils/routeGenerator';

const RouteGeneratorContainer: React.FC = () => {
  const handleGenerateClick = (spot: GenerateSpot) => {
    parent.postMessage({ pluginMessage: { type: 'generate-routes', spot: spot } }, '*');
  };

  return (
    <div style={styles.container}>
      <div style={styles.crossBackground}>
        <div style={styles.horizontalLine} />
        <div style={styles.verticalLine} />
      </div>
      <div style={styles.buttonContainer}>
        <CircleButton disabled onClick={() => handleGenerateClick('start')} />
        <CircleButton disabled onClick={() => handleGenerateClick('intersect')} />
        <CircleButton disabled onClick={() => handleGenerateClick('end')} />
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
    backgroundColor: '#404041',
  },
  verticalLine: {
    position: 'absolute',
    width: '1px',
    height: 'calc(100% - 32px)',
    background: 'linear-gradient(180deg, #40404133, #404041, #40404133)',
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
