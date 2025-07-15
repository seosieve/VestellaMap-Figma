import React from 'react';

export interface Tab {
  id: string;
  label: string;
  position: 'left' | 'right';
}

interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ tabs, activeTab, onTabChange }) => {
  const leftTabs = tabs.filter((tab) => tab.position === 'left');
  const rightTabs = tabs.filter((tab) => tab.position === 'right');

  return (
    <div style={styles.container}>
      <div style={styles.tabGroup}>
        {leftTabs.map((tab) => (
          <button
            key={tab.id}
            style={{
              ...styles.tab,
              ...(activeTab === tab.id ? styles.activeTab : {}),
            }}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div style={styles.tabGroup}>
        {rightTabs.map((tab) => (
          <button
            key={tab.id}
            style={{
              ...styles.tab,
              ...(activeTab === tab.id ? styles.activeTab : {}),
            }}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#1B1C1D',
  },
  tabGroup: {
    display: 'flex',
  },
  tab: {
    height: '36px',
    paddingVertical: '8px',
    paddingHorizontal: '6px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'medium',
    color: '#ffffff',
    opacity: 0.7,
    transition: 'all 0.3s ease',
  },
  activeTab: {
    opacity: 1,
    borderBottom: '2px solid #31DD9E',
  },
};

export default TabBar;
