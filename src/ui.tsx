import React, { useEffect, useState } from 'react';
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
      icon: Design, // 컴포넌트 자체를 전달
      position: 'left',
    },
    {
      id: 'Setting',
      label: '',
      icon: Setting, // 컴포넌트 자체를 전달
      position: 'right',
    },
  ];

  return (
    <div style={styles.container}>
      <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      {activeTab === 'Design' && <DesignScreen />}
      {activeTab === 'Development' && <DevelopmentScreen />}
      {activeTab === 'Setting' && <SettingScreen />}
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#1B1C1D',
    paddingTop: '4px',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingBottom: '20px',
  },
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
