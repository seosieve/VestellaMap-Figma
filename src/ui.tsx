import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import TabBar, { Tab } from './components/TabBar';

import DesignScreen from './screens/DesignScreen';
import DevelopmentScreen from './screens/DevelopmentScreen';
import SettingScreen from './screens/SettingScreen';
import SlotGeneratorContainer from './containers/SlotGeneratorContainer';
import SlotCountContainer from './containers/SlotCountContainer';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Design');

  const tabs: Tab[] = [
    { id: 'Design', label: 'Design', position: 'left' },
    { id: 'Setting', label: 'Setting', position: 'right' },
  ];

  return (
    <div style={styles.container}>
      <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'Design' && (
        <div style={styles.contentContainer}>
          <p style={styles.title}>Parking Layout</p>
          <p style={styles.title}>Generator</p>
          <SlotGeneratorContainer />
          <p style={styles.subtitle}>Slot Count by Group</p>
          <SlotCountContainer />
        </div>
      )}
      {activeTab === 'Development' && <DevelopmentScreen />}
      {activeTab === 'Setting' && <SettingScreen />}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#1B1C1D',
    padding: '20px',
  },
  contentContainer: {
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

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
