import React, { CSSProperties } from 'react';
import Button from '../components/Button';

const RouteGeneratorContainer: React.FC = () => {
  const handleGenerateClick = () => {
    parent.postMessage({ pluginMessage: { type: 'generate-routes' } }, '*');
  };

  return (
    <div style={styles.buttonContainer}>
      <Button title="시작점에 생성" onClick={handleGenerateClick} />
      <Button title="끝점에 생성" onClick={handleGenerateClick} />
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
