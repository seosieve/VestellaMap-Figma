import React, { CSSProperties } from 'react';
import { Colors } from '../../constant/color';

interface BeaconInfoBoxProps {
  major: number;
  minor: number;
}

const BeaconInfoBox: React.FC<BeaconInfoBoxProps> = ({ major, minor }) => {
  return (
    <div style={styles.container}>
      <div style={styles.item}>
        <p style={styles.category}>Major</p>
        <p style={styles.number}>{major}</p>
      </div>
      <div style={styles.divider} />
      <div style={styles.item}>
        <p style={styles.category}>Minor</p>
        <p style={styles.number}>{minor}</p>
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '8px',
    paddingLeft: '16px',
    paddingRight: '16px',
  },
  item: {
    display: 'flex',
    gap: '4px',
  },
  category: {
    color: Colors.base,
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '1',
    margin: '0',
  },
  number: {
    color: Colors.white,
    fontSize: '12px',
    fontWeight: '700',
    lineHeight: '1',
    margin: '0',
  },
  divider: {
    width: '1px',
    height: '10px',
    backgroundColor: Colors.dark,
  },
};

export default BeaconInfoBox;
