import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import TabBar, { Tab } from './components/TabBar';

import { Colors } from '../constant/color';
import DesignScreen from './screens/DesignScreen';
import DevelopScreen from './screens/DevelopScreen';
import SettingScreen from './screens/SettingScreen';
import WarningModal from './screens/WarningModal';
import Design from './atoms/Design';
import Develop from './atoms/Develop';
import Setting from './atoms/Setting';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Design');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingTabId, setPendingTabId] = useState<string | null>(null);

  const tabs: Tab[] = [
    {
      id: 'Design',
      label: 'Design',
      icon: Design,
      position: 'left',
    },
    {
      id: 'Develop',
      label: 'Develop',
      icon: Develop,
      position: 'left',
    },
    {
      id: 'Setting',
      label: '',
      icon: Setting,
      position: 'right',
    },
  ];

  const handleTabChange = (tabId: string) => {
    checkCurrentSelection();

    if (hasUnsavedChanges && tabId !== 'Setting') {
      setIsModalOpen(true);
      setPendingTabId(tabId);
      return;
    }
    setActiveTab(tabId);
  };

  const checkCurrentSelection = () => {
    parent.postMessage({ pluginMessage: { type: 'check-current-selection' } }, '*');
  };

  const handleConfirm = async () => {
    if (pendingTabId) {
      setActiveTab(pendingTabId);
      setPendingTabId(null);
    }
    setIsModalOpen(false);
    setHasUnsavedChanges(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <TabBar tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
      <div style={styles.content}>
        {activeTab === 'Design' && <DesignScreen />}
        {activeTab === 'Develop' && <DevelopScreen />}
        {activeTab === 'Setting' && <SettingScreen onSettingChange={setHasUnsavedChanges} />}
      </div>
      <WarningModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleConfirm} />
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: Colors.black,
    display: 'flex',
    height: '100%',
    flexDirection: 'column' as const,
    overflow: 'hidden' as const,
  },
  header: {
    position: 'sticky' as const,
    top: 0,
    backgroundColor: Colors.black,
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
