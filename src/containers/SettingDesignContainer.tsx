import React, { useEffect, useState, CSSProperties } from 'react';
import { DEFAULT_SETTINGS, DesignSettings } from '../utils/managers/settingManager';
import InputBox from '../components/InputBox';
import Button from '../components/Button';

interface SettingDesignContainerProps {
  onSettingChange: (hasChanges: boolean) => void;
}

const SettingDesignContainer: React.FC<SettingDesignContainerProps> = ({ onSettingChange }) => {
  const [slotGap, setSlotGap] = useState<number>(0);
  const [rowGap, setRowGap] = useState<number>(0);
  const [backgroundPadding, setBackgroundPadding] = useState<number>(0);
  const [pillarWidth, setPillarWidth] = useState<number>(0);

  const [initialValues, setInitialValues] = useState<DesignSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    parent.postMessage({ pluginMessage: { type: 'load-settings' } }, '*');

    window.onmessage = (event) => {
      const msg = event.data.pluginMessage;
      if (msg.type === 'settings-loaded') {
        setSlotGap(msg.slotGap);
        setRowGap(msg.rowGap);
        setBackgroundPadding(msg.backgroundPadding);
        setPillarWidth(msg.pillarWidth);
        setInitialValues(msg);
      }
    };
  }, []);

  // 파라미터 비교 함수
  const checkValues = (operator: '===' | '!==') => [
    eval(`slotGap ${operator} initialValues.slotGap`),
    eval(`rowGap ${operator} initialValues.rowGap`),
    eval(`backgroundPadding ${operator} initialValues.backgroundPadding`),
    eval(`pillarWidth ${operator} initialValues.pillarWidth`),
  ];

  useEffect(() => {
    // 설정 변경 여부 확인
    const hasChanges = checkValues('!==').some(Boolean);

    onSettingChange(hasChanges);
  }, [slotGap, rowGap, backgroundPadding, pillarWidth, initialValues]);

  const handleSave = async () => {
    // 현재 값으로 초기화
    setInitialValues({ slotGap, rowGap, backgroundPadding, pillarWidth });
    // 설정 변경 여부 초기화
    onSettingChange(false);

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

  const isSaveDisabled = checkValues('===').every(Boolean);

  return (
    <div style={styles.container}>
      <div style={styles.inputContainer}>
        <InputBox title="Slot Gap" value={slotGap} onChange={setSlotGap} />
        <InputBox title="Row Gap" value={rowGap} onChange={setRowGap} />
        <InputBox title="Background Padding" value={backgroundPadding} onChange={setBackgroundPadding} />
        <InputBox title="Pillar Width" value={pillarWidth} onChange={setPillarWidth} />
      </div>
      <Button title="Save" disabled={isSaveDisabled} onClick={handleSave} />
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
