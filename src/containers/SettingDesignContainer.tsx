import React, { useEffect, useState, CSSProperties } from 'react';
import InputBox from '../components/InputBox';
import Button from '../components/Button';

const SettingDesignContainer: React.FC = () => {
  const [slotGap, setSlotGap] = useState<string>('');
  const [rowGap, setRowGap] = useState<string>('');
  const [backgroundPadding, setBackgroundPadding] = useState<string>('');
  const [pillarWidth, setPillarWidth] = useState<string>('');

  useEffect(() => {
    parent.postMessage({ pluginMessage: { type: 'load-settings' } }, '*');

    window.onmessage = (event) => {
      const msg = event.data.pluginMessage;
      if (msg.type === 'settings-loaded') {
        setSlotGap(msg.settings.slotGap.toString());
        setRowGap(msg.settings.rowGap.toString());
        setBackgroundPadding(msg.settings.backgroundPadding.toString());
        setPillarWidth(msg.settings.pillarWidth.toString());
      }
    };
  }, []);

  const handleSave = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: 'save-settings',
          settings: {
            slotGap: parseInt(slotGap),
            rowGap: parseInt(rowGap),
            backgroundPadding: parseInt(backgroundPadding),
            pillarWidth: parseInt(pillarWidth),
          },
        },
      },
      '*',
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.inputContainer}>
        <InputBox title="Slot Gap" value={slotGap} onChange={setSlotGap} />
        <InputBox title="Row Gap" value={rowGap} onChange={setRowGap} />
        <InputBox title="Background Padding" value={backgroundPadding} onChange={setBackgroundPadding} />
        <InputBox title="Pillar Width" value={pillarWidth} onChange={setPillarWidth} />
      </div>
      <Button title="Save" onClick={handleSave} />
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
    marginTop: '12px',
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

export default SettingDesignContainer;
