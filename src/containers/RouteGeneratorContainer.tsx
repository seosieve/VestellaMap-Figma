import React, { CSSProperties } from 'react';
import Button from '../components/Button';
import { GenerateSpot } from '../utils/routeGenerator';

const RouteGeneratorContainer: React.FC = () => {
  const handleGenerateClick = (spot: GenerateSpot) => {
    parent.postMessage({ pluginMessage: { type: 'generate-routes', spot: spot } }, '*');
  };

  return (
    <div style={styles.buttonContainer}>
      <Button title="시작점" onClick={() => handleGenerateClick('start')} />
      <Button title="사이점" onClick={() => handleGenerateClick('intersect')} />
      <Button title="끝점" onClick={() => handleGenerateClick('end')} />
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
  },
};

export default RouteGeneratorContainer;
