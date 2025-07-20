import React from 'react';
import { Colors } from '../../constant/color';

export interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ width: number; height: number; color: string }>;
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

  const renderTab = (tab: Tab) => {
    const isActive = activeTab === tab.id;
    const Icon = tab.icon;

    return (
      <button
        key={tab.id}
        style={{
          ...styles.tab,
          ...(isActive ? styles.activeTab : {}),
        }}
        onClick={() => onTabChange(tab.id)}
      >
        <Icon
          width={tab.position === 'left' ? 16 : 24}
          height={tab.position === 'left' ? 16 : 24}
          color={isActive ? Colors.white : Colors.base}
        />
        {tab.label}
      </button>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.tabGroup}>{leftTabs.map(renderTab)}</div>
      <div style={styles.tabGroup}>{rightTabs.map(renderTab)}</div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: Colors.black,
  },
  tabGroup: {
    display: 'flex',
    gap: '8px',
  },
  tab: {
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    paddingLeft: '8px',
    paddingRight: '8px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '400',
    color: Colors.base,
    transition: 'all 0.2s ease',
    borderBottom: `2px solid ${Colors.black}`,
  },
  activeTab: {
    opacity: 1,
    color: Colors.white,
    borderBottom: `2px solid ${Colors.mintBase}`,
  },
};

export default TabBar;
