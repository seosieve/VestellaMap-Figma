import React, { useEffect, useState, CSSProperties } from 'react';
import { Colors } from '../../constant/color';

interface NodeInfo {
  name: string;
  lotCount: number;
}

const BeaconCountContainer: React.FC = () => {
  const [selectionCount, setSelectionCount] = useState<number>(0);
  const [totalLotCount, setTotalLotCount] = useState<number>(0);
  const [nodeInfo, setNodeInfo] = useState<NodeInfo[]>([]);

  useEffect(() => {
    // 메시지 리스너 설정
    window.onmessage = (event) => {
      const msg = event.data.pluginMessage;

      if (msg.type === 'selection-beacons') {
        setSelectionCount(msg.selectionCount);
        setTotalLotCount(msg.lotCount);
        if (msg.nodeInfo) {
          setNodeInfo(msg.nodeInfo);
        }
      }
    };
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.titleContainer}>
        <p style={styles.title}>Group Name</p>
        <p style={styles.title}>Beacon Count</p>
      </div>
      {selectionCount === 0 ? (
        <div style={styles.emptyContainer}>
          <p style={styles.empty}>No groups selected.</p>
          <p style={styles.empty}>Select a group to view beacon count.</p>
        </div>
      ) : (
        <>
          {nodeInfo.map((info, index) => (
            <div key={index} style={styles.contentContainer}>
              <p style={styles.content}>{info.name}</p>
              <p style={styles.content}>{info.lotCount}</p>
            </div>
          ))}
          <div style={styles.totalContainer}>
            <p style={styles.content}>Total</p>
            <p style={styles.total}>{totalLotCount}</p>
          </div>
        </>
      )}
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    borderRadius: '8px',
    border: `1px solid ${Colors.medium}`,
    overflow: 'hidden',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '38px',
    borderBottom: `1px solid ${Colors.shadow}`,
  },
  title: {
    color: Colors.base,
    fontSize: '13px',
    fontWeight: '300',
    margin: '0',
    width: '50%',
    textAlign: 'center',
  },
  emptyContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100px',
  },
  empty: {
    color: Colors.base,
    fontSize: '14px',
    fontWeight: '300',
    margin: '0',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '38px',
    borderBottom: `1px solid ${Colors.shadow}`,
  },
  content: {
    color: Colors.white,
    fontSize: '13px',
    fontWeight: '400',
    width: '50%',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginLeft: '16px',
    marginRight: '16px',
  },
  totalContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '38px',
    backgroundColor: Colors.shadow,
  },
  total: {
    color: Colors.mintBase,
    fontSize: '13px',
    fontWeight: '500',
    margin: '0',
    width: '50%',
    textAlign: 'center',
    marginLeft: '16px',
    marginRight: '16px',
  },
};

export default BeaconCountContainer;
