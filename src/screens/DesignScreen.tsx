import SlotCountContainer from '../containers/SlotCountContainer';
import SlotGeneratorContainer from '../containers/SlotGeneratorContainer';
import React from 'react';

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
    paddingTop: '36px',
  },
  title: {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: '700',
    margin: '0',
  },
  subtitle: {
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '700',
    marginTop: '36px',
  },
};

export default DesignScreen;
