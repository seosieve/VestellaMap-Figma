import React, { useState, CSSProperties } from 'react';
import InputBox from '../components/InputBox';
import CheckBox from '../components/CheckBox';
import Button from '../components/Button';

const SlotGeneratorContainer: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [pillar, setPillar] = useState<number>(0);
  const [multiple, setMultiple] = useState<boolean>(false);

  const handleGenerateClick = () => {
    const countNum = count;
    const pillarNum = pillar;

    parent.postMessage(
      { pluginMessage: { type: 'generate-slots', count: countNum, pillar: pillarNum, multiple: multiple } },
      '*',
    );
  };

  const isGenerateDisabled = !count || count <= 0;

  return (
    <div style={styles.container}>
      <div style={styles.inputContainer}>
        <InputBox title="Slots per Row" onChange={setCount} />
        <InputBox title="Pillar Interval" onChange={setPillar} />
      </div>
      <CheckBox checked={multiple} onChange={setMultiple} />
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
};

export default SlotGeneratorContainer;
