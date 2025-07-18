import React, { CSSProperties } from 'react';
import Button from '../components/Button';
import { Point } from '../utils/routeGenerator';

const RouteGeneratorContainer: React.FC = () => {
  const handleGenerateClick = (point: Point) => {
    parent.postMessage({ pluginMessage: { type: 'generate-routes', point: point } }, '*');
  };

  return (
    <div style={styles.buttonContainer}>
      <Button title="시작점에 생성" onClick={() => handleGenerateClick(Point.start)} />
      <Button title="끝점에 생성" onClick={() => handleGenerateClick(Point.end)} />
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
