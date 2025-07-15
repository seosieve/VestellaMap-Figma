import React, { useState, CSSProperties } from 'react';
import Button from '../components/Button';

const SlotGeneratorContainer: React.FC = () => {
  const [countFocused, setCountFocused] = useState<boolean>(false);
  const [pillarFocused, setPillarFocused] = useState<boolean>(false);
  const [count, setCount] = useState<string>('');
  const [pillar, setPillar] = useState<string>('');

  const handleGenerateClick = () => {
    const countNum = parseInt(count, 10);
    const pillarNum = parseInt(pillar, 10);

    parent.postMessage(
      {
        pluginMessage: {
          type: 'generate-slots',
          count: countNum,
          pillar: pillarNum,
        },
      },
      '*',
    );
  };

  const isGenerateDisabled = !count || parseInt(count, 10) <= 0;

  return (
    <div style={styles.container}>
      <div style={styles.inputContainer}>
        <div style={styles.parameterContainer}>
          <p style={styles.parameter}>Slots per Row</p>
          <input
            style={{
              ...styles.input,
              ...(countFocused && styles.inputFocused),
            }}
            type="number"
            placeholder="0"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            onFocus={() => setCountFocused(true)}
            onBlur={() => setCountFocused(false)}
          />
        </div>
        <div style={styles.parameterContainer}>
          <p style={styles.parameter}>Pillar Interval</p>
          <input
            style={{
              ...styles.input,
              ...(pillarFocused && styles.inputFocused),
            }}
            type="number"
            placeholder="0"
            value={pillar}
            onChange={(e) => setPillar(e.target.value)}
            onFocus={() => setPillarFocused(true)}
            onBlur={() => setPillarFocused(false)}
          />
        </div>
      </div>
      <Button title="Generate" disabled={isGenerateDisabled} onClick={handleGenerateClick} />
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2c2d2f',
    borderRadius: '12px',
    padding: '16px',
    marginTop: '24px',
    gap: '16px',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    gap: '8px',
  },
  parameterContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  parameter: {
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: 'medium',
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

export default SlotGeneratorContainer;
