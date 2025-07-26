import React from 'react';
import { Colors } from '../../constant/color';
import RouteGeneratorContainer from '../containers/RouteGeneratorContainer';
import BeaconGeneratorContainer from '../containers/BeaconGeneratorContainer';
import BeaconCountContainer from '../containers/BeaconCountContainer';

const DevelopScreen: React.FC = () => {
  return (
    <div style={styles.container}>
      <p style={styles.title}>Route Spot</p>
      <p style={styles.title}>Generator</p>
      <RouteGeneratorContainer />
      <BeaconGeneratorContainer />
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
};

export default DevelopScreen;
