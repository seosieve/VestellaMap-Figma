import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import TabBar, { Tab } from './components/TabBar';

import DesignScreen from './screens/DesignScreen';
import DevelopmentScreen from './screens/DevelopmentScreen';
import SettingScreen from './screens/SettingScreen';
import Design from './atoms/Design';
import Setting from './atoms/Setting';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Design');

  const tabs: Tab[] = [
    {
      id: 'Design',
      label: 'Design',
      icon: Design,
      position: 'left',
    },
    {
      id: 'Setting',
      label: '',
      icon: Setting,
      position: 'right',
    },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
      <div style={styles.content}>
        {activeTab === 'Design' && <DesignScreen />}
        {activeTab === 'Development' && <DevelopmentScreen />}
        {activeTab === 'Setting' && <SettingScreen />}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#1B1C1D',
    display: 'flex',
    height: '100%',
    flexDirection: 'column' as const,
    overflow: 'hidden' as const,
  },
  header: {
    position: 'sticky' as const,
    top: 0,
    backgroundColor: '#1B1C1D',
    paddingTop: '12px',
    paddingLeft: '32px',
    paddingRight: '32px',
    zIndex: 1000,
  },
  content: {
    flex: 1,
    paddingLeft: '32px',
    paddingRight: '32px',
    paddingBottom: '32px',
    overflowY: 'auto' as const,
    overflowX: 'hidden' as const,
  },
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
