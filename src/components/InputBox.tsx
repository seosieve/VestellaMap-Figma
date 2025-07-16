import React, { useState, CSSProperties } from 'react';

interface InputBoxProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '400',
    margin: '0',
  },
  input: {
    width: '72px',
    padding: '6px',
    border: '1px solid #404041',
    borderRadius: '4px',
    backgroundColor: '#404041',
    color: '#ffffff',
    fontFamily: 'Manrope',
    fontSize: '14px',
    fontWeight: '800',
  },
  inputFocused: {
    outline: 'none',
    border: '1px solid #31dd9e',
  },
};

export default InputBox;
