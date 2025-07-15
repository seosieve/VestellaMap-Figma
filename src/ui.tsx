import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import TabBar, { Tab } from './components/TabBar';
import Button from './components/Button';
import DesignScreen from './screens/DesignScreen';
import DevelopmentScreen from './screens/DevelopmentScreen';
import SettingScreen from './screens/SettingScreen';
import SlotCountContainer from './containers/SlotCountContainer';

const App: React.FC = () => {
  const [count, setCount] = useState<string>('');
  const [pillar, setPillar] = useState<string>('');

  const handleGenerateClick = () => {
    const countNum = parseInt(count, 10);
    const pillarNum = parseInt(pillar, 10);

    parent.postMessage(
      {
        pluginMessage: {
          type: 'generate-slots',
          count: countNum,
          pillar: pillarNum,
        },
      },
      '*',
    );
  };

  const isGenerateDisabled = !count || parseInt(count, 10) <= 0;

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
          <div className="generator-container">
            <div className="input-container">
              <div className="parameter-container">
                <p className="parameter">Slots per Row</p>
                <input type="number" placeholder="0" value={count} onChange={(e) => setCount(e.target.value)} />
              </div>
              <div className="parameter-container">
                <p className="parameter">Pillar Interval</p>
                <input type="number" placeholder="0" value={pillar} onChange={(e) => setPillar(e.target.value)} />
              </div>
            </div>
            <Button title="Generate" disabled={isGenerateDisabled} onClick={handleGenerateClick} />
          </div>
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
