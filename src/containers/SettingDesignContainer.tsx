import React, { useEffect, useState, CSSProperties } from 'react';
import { DefaultValue, DesignSettings } from '../utils/settingManager';
import ResetButton from '../components/ResetButton';
import Button from '../components/Button';
import InputBox from '../components/InputBox';

interface SettingDesignContainerProps {
  onSettingChange: (hasChanges: boolean) => void;
}

const SettingDesignContainer: React.FC<SettingDesignContainerProps> = ({ onSettingChange }) => {
  const [slotGap, setSlotGap] = useState<number>(0);
  const [rowGap, setRowGap] = useState<number>(0);
  const [backgroundPadding, setBackgroundPadding] = useState<number>(0);
  const [pillarWidth, setPillarWidth] = useState<number>(0);
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<DesignSettings>(DefaultValue);

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
    const isAllSame = checkValues('===').every(Boolean);

    onSettingChange(hasChanges);
    setIsSaveDisabled(isAllSame);
  }, [slotGap, rowGap, backgroundPadding, pillarWidth, initialValues]);

  const handleReset = () => {
    const { slotGap, rowGap, backgroundPadding, pillarWidth } = DefaultValue;
    setInitialValues(DefaultValue);
    setSlotGap(slotGap);
    setRowGap(rowGap);
    setBackgroundPadding(backgroundPadding);
    setPillarWidth(pillarWidth);
    onSettingChange(false);
    parent.postMessage({ pluginMessage: { type: 'reset-settings', ...DefaultValue } }, '*');
  };

  const handleSave = async () => {
    setInitialValues({ slotGap, rowGap, backgroundPadding, pillarWidth });
    onSettingChange(false);
    parent.postMessage(
      { pluginMessage: { type: 'save-settings', slotGap, rowGap, backgroundPadding, pillarWidth } },
      '*',
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <p style={styles.title}>Design</p>
        <ResetButton onClick={handleReset} />
      </div>
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
    gap: '16px',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#FFFFFF',
    margin: '0',
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
