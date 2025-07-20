import React, { CSSProperties } from 'react';
import { Colors } from '../../constant/color';
import Button from '../components/Button';

const BeaconGeneratorContainer: React.FC = () => {
  const handleNumberingClick = () => {
    parent.postMessage({ pluginMessage: { type: 'numbering-beacons' } }, '*');
  };

  return (
    <div style={styles.container}>
      <Button title="Show Beacon Number" onClick={handleNumberingClick} />
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '48px',
    backgroundColor: Colors.shadow,
    borderRadius: '12px',
    padding: '16px',
    marginTop: '24px',
  },
};

export default BeaconGeneratorContainer;
