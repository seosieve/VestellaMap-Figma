import React, { CSSProperties } from 'react';
import { Colors } from '../../constant/color';

interface RatioBoxProps {
  selection: string;
  ratio: number;
}

const RatioBox: React.FC<RatioBoxProps> = ({ ratio, selection }) => {
  return (
    <div style={styles.container}>
      <p
        style={{
          ...styles.ratio,
          opacity: selection === 'line' ? 1 : 0,
        }}
      >
        {Math.round(ratio * 100)}%
      </p>
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
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  },
};

export default RatioBox;
