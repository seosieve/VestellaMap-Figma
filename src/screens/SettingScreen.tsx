import React from 'react';
import SettingDesignContainer from '../containers/SettingDesignContainer';

interface SettingScreenProps {
  onSettingChage: (changed: boolean) => void;
}

const SettingScreen: React.FC<SettingScreenProps> = ({ onSettingChage }) => {
  return (
    <div style={styles.container}>
      <p style={styles.title}> Settings</p>
      <p style={styles.subtitle}>Design</p>
      <SettingDesignContainer onSettingChage={onSettingChage} />
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
