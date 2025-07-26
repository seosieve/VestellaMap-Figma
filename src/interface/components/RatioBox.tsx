import React, { CSSProperties, useEffect, useState } from 'react';
import { Colors } from '../../constant/color';

interface RatioBoxProps {
  ratio: number;
}

const RatioBox: React.FC<RatioBoxProps> = ({ ratio }) => {
  return (
    <div style={styles.container}>
      <p style={styles.ratio}>{Math.round(ratio * 100)}%</p>
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
  ratio: {
    color: Colors.base,
    fontSize: '12px',
    fontWeight: '700',
    lineHeight: '1',
    margin: '0',
  },
};

export default RatioBox;
