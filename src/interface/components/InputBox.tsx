import React, { useState, CSSProperties } from 'react';
import { Colors } from '../../constant/color';

interface InputBoxProps {
  title: string;
  value?: number;
  onChange: (value: number) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ title, value, onChange }) => {
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <div style={styles.container}>
      <p style={styles.title}>{title}</p>
      <input
        style={{
          ...styles.input,
          ...(focused && styles.inputFocused),
        }}
        type="number"
        placeholder="0"
        value={value ?? undefined}
        onChange={(e) => onChange(parseInt(e.target.value))}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
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
  input: {
    width: '60px',
    height: '32px',
    padding: '6px',
    border: `1px solid ${Colors.dark}`,
    borderRadius: '4px',
    backgroundColor: Colors.dark,
    color: Colors.white,
    fontFamily: 'Manrope',
    fontSize: '14px',
    fontWeight: '800',
  },
  inputFocused: {
    outline: 'none',
    border: `1px solid ${Colors.mintBase}`,
  },
};

export default InputBox;
