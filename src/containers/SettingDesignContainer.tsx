import React, { useEffect, useState, CSSProperties } from 'react';
import InputBox from '../components/InputBox';
import Button from '../components/Button';

const SettingDesignContainer: React.FC = () => {
  const [slotGap, setSlotGap] = useState<number>(0);
  const [rowGap, setRowGap] = useState<number>(0);
  const [backgroundPadding, setBackgroundPadding] = useState<number>(0);
  const [pillarWidth, setPillarWidth] = useState<number>(0);

  useEffect(() => {
    parent.postMessage({ pluginMessage: { type: 'load-settings' } }, '*');

    window.onmessage = (event) => {
      const msg = event.data.pluginMessage;
      if (msg.type === 'settings-loaded') {
        setSlotGap(msg.settings.slotGap);
        setRowGap(msg.settings.rowGap);
        setBackgroundPadding(msg.settings.backgroundPadding);
        setPillarWidth(msg.settings.pillarWidth);
      }
    };
  }, []);

  const handleSave = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: 'save-settings',
          slotGap: slotGap,
          rowGap: rowGap,
          backgroundPadding: backgroundPadding,
          pillarWidth: pillarWidth,
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
