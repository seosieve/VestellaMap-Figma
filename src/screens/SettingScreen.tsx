import React from 'react';
import SettingDesignContainer from '../containers/SettingDesignContainer';

const SettingScreen: React.FC = () => {
  return (
    <div style={styles.container}>
      <p style={styles.title}> Settings</p>
      <p style={styles.subtitle}>Design</p>
      <SettingDesignContainer />
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
    marginTop: '24px',
  },
};

export default SettingScreen;
