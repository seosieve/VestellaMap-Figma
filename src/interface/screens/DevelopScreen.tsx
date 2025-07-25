import React from 'react';
import { Colors } from '../../constant/color';
import RouteGeneratorContainer from '../containers/RouteGeneratorContainer';
import BeaconGeneratorContainer from '../containers/BeaconGeneratorContainer';
import BeaconCountContainer from '../containers/BeaconCountContainer';

const DevelopScreen: React.FC = () => {
  const handleGenerateClick = () => {
    parent.postMessage({ pluginMessage: { type: 'generate-routes' } }, '*');
  };

  return (
    <div style={styles.container}>
      <p style={styles.title}>Route Spot</p>
      <p style={styles.title}>Generator</p>
      <RouteGeneratorContainer />
      <p style={styles.subtitle}>Beacon Generator</p>
      <BeaconGeneratorContainer />
      <p style={styles.subtitle}>Beacon Count by Group</p>
      <BeaconCountContainer />
    </div>
  );
};

const styles = {
  container: {
    paddingTop: '32px',
  },
  title: {
    color: Colors.white,
    fontSize: '24px',
    fontWeight: '700',
    margin: '0',
  },
  subtitle: {
    color: Colors.white,
    fontSize: '16px',
    fontWeight: '700',
    marginTop: '36px',
  },
};

export default DevelopScreen;
