import React from 'react';

const SettingScreen: React.FC = () => {
  return (
    <div style={styles.container}>
      <p style={styles.title}> Settings</p>
      <p style={styles.subtitle}>Design</p>
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
