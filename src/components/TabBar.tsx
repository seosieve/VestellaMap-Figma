import React from 'react'

interface Tab {
    id: string
    icon: string
    name: string
}

interface TabBarProps {
    tabs: Tab[]
}

const TabBar: React.FC<TabBarProps> = ({ tabs }) => {
  return (
    <div style={styles.container}>
      {tabs.map((tab) => (
        <button key={tab.id}>
          {tab.icon}
          {tab.name}
        </button>
      ))}
    </div>
  )
}

const styles = {
    container: {
        display: 'flex',
        width: '100%',
        borderBottom: '1px solid #E6E6E6',
        backgroundColor: '#2C2D2F',
    }
}

export default TabBar;