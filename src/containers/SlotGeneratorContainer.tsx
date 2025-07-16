import React, { useState, CSSProperties } from 'react';
import InputBox from '../components/InputBox';
import Button from '../components/Button';

const SlotGeneratorContainer: React.FC = () => {
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
        <InputBox title="Slots per Row" value={count} onChange={setCount} />
        <InputBox title="Pillar Interval" value={pillar} onChange={setPillar} />
      </div>
      <div style={styles.multipleContainer}>
        <p style={styles.multiple}>Generate 2 Rows</p>
        <input type="checkbox" />
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
  multipleContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  multiple: {
    color: '#ffffff',
    fontSize: '12px',
    fontWeight: '400',
    margin: '0',
  },
};

export default SlotGeneratorContainer;
