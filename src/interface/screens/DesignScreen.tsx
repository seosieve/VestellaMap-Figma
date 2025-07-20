import React from 'react';
import { Colors } from '../../constant/color';
import SlotCountContainer from '../containers/SlotCountContainer';
import SlotGeneratorContainer from '../containers/SlotGeneratorContainer';

const DesignScreen: React.FC = () => {
  return (
    <div style={styles.container}>
      <p style={styles.title}>Parking Layout</p>
      <p style={styles.title}>Generator</p>
      <SlotGeneratorContainer />
      <p style={styles.subtitle}>Slot Count by Group</p>
      <SlotCountContainer />
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

export default DesignScreen;
