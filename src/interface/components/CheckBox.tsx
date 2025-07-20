import React, { CSSProperties, useState } from 'react';
import { Colors } from '../../constant/color';
import Check from '../atoms/Check';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckBox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div style={styles.container}>
      <label style={styles.label} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        <p style={styles.title}>Generate 2 Rows</p>
        <input style={styles.input} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <div
          style={{
            ...styles.checkbox,
            ...(checked ? styles.checked : {}),
            ...(isHover && !checked
              ? {
                  backgroundColor: Colors.dark,
                  border: `2px solid ${Colors.medium}`,
                }
              : {}),
          }}
        >
          {checked && <Check width={16} height={16} color={Colors.mintBlack} />}
        </div>
      </label>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  label: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
  title: {
    color: Colors.white,
    fontSize: '12px',
    fontWeight: '400',
    margin: '0',
  },
  input: {
    position: 'absolute',
    opacity: 0,
    cursor: 'pointer',
    height: 0,
    width: 0,
  },
  checkbox: {
    width: '14px',
    height: '14px',
    border: `2px solid ${Colors.medium}`,
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
  },
  checked: {
    backgroundColor: Colors.mintBase,
    border: `2px solid ${Colors.mintBase}`,
  },
};

export default CheckBox;
