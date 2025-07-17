import React, { forwardRef } from 'react';
import SettingDesignContainer from '../containers/SettingDesignContainer';

interface SettingScreenProps {
  onSettingChange: (changed: boolean) => void;
}

const SettingScreen = forwardRef<{ handleSave: () => Promise<void> }, SettingScreenProps>((props, ref) => {
  return (
    <div style={styles.container}>
      <p style={styles.title}> Settings</p>
      <p style={styles.subtitle}>Design</p>
      <SettingDesignContainer ref={ref} onSettingChange={props.onSettingChange} />
    </div>
  );
});

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
    marginTop: '24px',
  },
};

export default SettingScreen;
