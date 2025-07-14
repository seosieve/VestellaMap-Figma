import React from 'react';

interface Tab {
  id: string;
  label: string;
}

interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div style={styles.container}>
      {tabs.map((tab) => (
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
  );
};

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    borderBottom: '1px solid #E6E6E6',
    backgroundColor: '#1B1C1D',
  },
  tab: {
    padding: '8px 16px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: '14px',
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
