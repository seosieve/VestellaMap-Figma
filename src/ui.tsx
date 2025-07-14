import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

interface NodeInfo {
  name: string;
  lotCount: number;
}

const App: React.FC = () => {
  const [count, setCount] = useState<string>('');
  const [pillar, setPillar] = useState<string>('');
  const [selectionCount, setSelectionCount] = useState<number>(0);
  const [totalLotCount, setTotalLotCount] = useState<number>(0);
  const [nodeInfo, setNodeInfo] = useState<NodeInfo[]>([]);

  useEffect(() => {
    // 메시지 리스너 설정
    window.onmessage = (event) => {
      const msg = event.data.pluginMessage;
    
      if (msg.type === 'selection-slots') {
        setSelectionCount(msg.selectionCount);
        setTotalLotCount(msg.lotCount);
        if (msg.nodeInfo) {
          setNodeInfo(msg.nodeInfo);
        }
      }
    };
  }, []);

  const handleGenerateClick = () => {
    const countNum = parseInt(count, 10);
    const pillarNum = parseInt(pillar, 10);
    
    parent.postMessage({ 
      pluginMessage: { 
        type: 'generate-slots', 
        count: countNum, 
        pillar: pillarNum 
      } 
    }, '*');
  };

  const isGenerateDisabled = !count || parseInt(count, 10) <= 0;

  return (
    <div style={styles.container}>
      <p style={styles.title}>Parking Layout</p>
      <p style={styles.title}>Generator</p>
      <div className="generator-container">
        <div className="input-container">
          <div className="parameter-container">
            <p className="parameter">Slots per Row</p>
            <input 
              type="number" 
              placeholder="0"
              value={count}
              onChange={(e) => setCount(e.target.value)}
            />
          </div>
          <div className="parameter-container">
            <p className="parameter">Pillar Interval</p>
            <input 
              type="number" 
              placeholder="0"
              value={pillar}
              onChange={(e) => setPillar(e.target.value)}
            />
          </div>
        </div>  
        <button 
          disabled={isGenerateDisabled}
          onClick={handleGenerateClick}
        >
          Generate
        </button>
      </div>
      <p className="subtitle">Slot Count by Group</p>
      <div className="count-container">
        <div className="header-container">
          <p className="header">Group Name</p>
          <p className="header">Slot Count</p>
        </div>
        {selectionCount === 0 ? (
          <div className="placeholder-container">
            <p className="placeholder">No groups selected.</p>
            <p className="placeholder">Select a group to view slot count.</p>
          </div>
        ) : (
          <>
            {nodeInfo.map((info, index) => (
              <div key={index} className="content-container">
                <p className="content">{info.name}</p>
                <p className="content">{info.lotCount}</p>
              </div>
            ))}
            <div className="total-container">
              <p className="content">Total</p>
              <p className="total">{totalLotCount}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: '#1B1C1D',
    padding: '20px'
  },
  title: {
    color: '#ffffff',
    fontSize: '24px',
    fontWeight: '700',
    margin: '0'
  } 
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 