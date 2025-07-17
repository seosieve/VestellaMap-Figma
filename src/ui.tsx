import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import TabBar, { Tab } from './components/TabBar';

import DesignScreen from './screens/DesignScreen';
import DevelopmentScreen from './screens/DevelopmentScreen';
import SettingScreen from './screens/SettingScreen';
import Design from './atoms/Design';
import Development from './atoms/Development';
import Setting from './atoms/Setting';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Design');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const tabs: Tab[] = [
    {
      id: 'Design',
      label: 'Design',
      icon: Design,
      position: 'left',
    },
    // {
    //   id: 'Development',
    //   label: 'Development',
    //   icon: Development,
    //   position: 'left',
    // },
    {
      id: 'Setting',
      label: '',
      icon: Setting,
      position: 'right',
    },
  ];

  const handleTabChange = (tabId: string) => {
    if (hasUnsavedChanges) {
      const confirm = window.confirm('You have unsaved changes. Are you sure you want to switch tabs?');
      if (!confirm) {
        return;
      }
    }
    setActiveTab(tabId);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <TabBar tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
      <div style={styles.content}>
        {activeTab === 'Design' && <DesignScreen />}
        {activeTab === 'Development' && <DevelopmentScreen />}
        {activeTab === 'Setting' && <SettingScreen onSettingChage={setHasUnsavedChanges} />}
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
