import React, { CSSProperties } from 'react';
import { Colors } from '../../constant/color';

interface ToggleBoxProps {
  title: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const ToggleBox: React.FC<ToggleBoxProps> = ({ title, value, onChange }) => {
  const handleToggle = () => {
    onChange(!value);
  };

  return (
    <div style={styles.container}>
      <p style={styles.title}>{title}</p>
      <div onClick={handleToggle} style={styles.toggleContainer}>
        <div
          style={{
            ...styles.toggleButton,
            transform: value ? 'translateX(28px)' : 'translateX(0)',
            backgroundColor: value ? Colors.white : Colors.medium,
          }}
        ></div>
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    color: Colors.white,
    fontSize: '14px',
    fontWeight: '400',
    margin: '0',
  },
  toggleContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '60px',
    height: '32px',
    borderRadius: '16px',
    backgroundColor: Colors.dark,
  },
  toggleButton: {
    width: '20px',
    height: '20px',
    borderRadius: '10px',
    margin: '6px',
    transition: 'all 0.3s ease',
  },
};

export default ToggleBox;
