import React, { CSSProperties } from 'react';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CheckBox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <div style={styles.container}>
      <p style={styles.title}>Generate 2 Rows</p>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
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
  title: {
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: '400',
    margin: '0',
  },
};

export default CheckBox;
