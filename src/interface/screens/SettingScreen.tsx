import React from 'react';
import SettingDesignContainer from '../containers/SettingDesignContainer';

interface SettingScreenProps {
  onSettingChange: (changed: boolean) => void;
}

const SettingScreen: React.FC<SettingScreenProps> = ({ onSettingChange }) => {
  return (
    <div style={styles.container}>
      <p style={styles.title}> Settings</p>
      <SettingDesignContainer onSettingChange={onSettingChange} />
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
    marginBottom: '24px',
  },
  subtitle: {
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '700',
    marginTop: '24px',
  },
};

export default SettingScreen;
