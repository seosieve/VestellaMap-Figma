import React from 'react';
import RouteGeneratorContainer from '../containers/RouteGeneratorContainer';

const DevelopmentScreen: React.FC = () => {
  const handleGenerateClick = () => {
    parent.postMessage({ pluginMessage: { type: 'generate-routes' } }, '*');
  };

  return (
    <div style={styles.container}>
      <p style={styles.title}>Route Spot</p>
      <p style={styles.title}>Generator</p>
      <RouteGeneratorContainer />
    </div>
  );
};

const styles = {
  container: {
    paddingTop: '32px',
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

export default DevelopmentScreen;
