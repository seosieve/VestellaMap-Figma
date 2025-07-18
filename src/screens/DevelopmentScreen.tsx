import React from 'react';
import RouteGeneratorContainer from '../containers/RouteGeneratorContainer';

const DevelopmentScreen: React.FC = () => {
  const handleGenerateClick = () => {
    parent.postMessage({ pluginMessage: { type: 'generate-routes' } }, '*');
  };

  return (
    <div style={styles.container}>
      <RouteGeneratorContainer />
    </div>
  );
};

const styles = {
  container: {
    paddingTop: '32px',
  },
};

export default DevelopmentScreen;
