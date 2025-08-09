import React, { CSSProperties, useEffect, useState } from 'react';
import { Colors } from '../../constant/color';
import { useMessageListener } from '../../util/managers/messaageManager';
import { LineInfo } from '../../util/services/selector/lineSelector';

interface BeaconInfoBoxProps {
  ratio: number;
}

const BeaconInfoBox: React.FC<BeaconInfoBoxProps> = ({ ratio }) => {
  const [major, setMajor] = useState<number>(0);
  const [minor, setMinor] = useState<number>(0);
  const [lineInfo, setLineInfo] = useState<LineInfo | null>(null);
  const [parentInfo, setParentInfo] = useState<{ width: number; height: number } | null>(null);

  useEffect(() => {
    parent.postMessage({ pluginMessage: { type: 'load-develop-settings' } }, '*');
  }, []);

  useMessageListener('develop-settings-loaded', (msg) => {
    setMajor(msg.major);
  });

  useMessageListener('beacon-line-info', (msg) => {
    setLineInfo(msg.lineInfo);
    setParentInfo({ width: msg.parentWidth, height: msg.parentHeight });
  });

  useEffect(() => {
    if (lineInfo && parentInfo) {
      const radian = (-lineInfo.rotation * Math.PI) / 180;
      const offset = lineInfo.strokeWeight / 2;

      const pointX = lineInfo.x + lineInfo.width * Math.cos(radian) * ratio + offset * Math.sin(radian);
      const pointY = lineInfo.y + lineInfo.width * Math.sin(radian) * ratio - offset * Math.cos(radian);

      const x = Math.floor(Math.max(0, Math.min(1, pointX / parentInfo.width)) * 99);
      const y = Math.floor(Math.max(0, Math.min(1, pointY / parentInfo.height)) * 99);

      setMinor(10000 + x * 100 + y);
    }
  }, [lineInfo, ratio]);

  return (
    <div style={styles.container}>
      <div style={styles.item}>
        <p style={styles.category}>Major</p>
        <p style={styles.number}>{major}</p>
      </div>
      <div style={styles.divider} />
      <div style={styles.item}>
        <p style={styles.category}>Minor</p>
        <p style={{ ...styles.number, ...(minor.toString().length === 5 && styles.fixedNumber) }}>{minor}</p>
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
    height: '12px',
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
  fixedNumber: {
    width: '35px',
  },
  divider: {
    width: '1px',
    height: '10px',
    backgroundColor: Colors.dark,
  },
};

export default BeaconInfoBox;
