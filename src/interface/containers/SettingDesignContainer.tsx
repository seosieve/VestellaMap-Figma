import React, { useEffect, useState, CSSProperties, forwardRef, useImperativeHandle } from 'react';
import { Colors } from '../../constant/color';
import { DesignDefault, DesignSettings } from '../../util/services/settingHandler';
import { useMessageListener } from '../../util/managers/messaageManager';
import ResetButton from '../components/ResetButton';
import InputBox from '../components/InputBox';

export interface SettingDesignHandle {
  handleSave: () => void;
}

interface SettingDesignProps {
  onSettingChange: (hasChanges: boolean) => void;
  setDesignSave: (disabled: boolean) => void;
}

const SettingDesignContainer = forwardRef<SettingDesignHandle, SettingDesignProps>((props, ref) => {
  const [slotGap, setSlotGap] = useState<number>(0);
  const [rowGap, setRowGap] = useState<number>(0);
  const [backgroundPadding, setBackgroundPadding] = useState<number>(0);
  const [pillarWidth, setPillarWidth] = useState<number>(0);
  const [initialValues, setInitialValues] = useState<DesignSettings>(DesignDefault);

  useEffect(() => {
    parent.postMessage({ pluginMessage: { type: 'load-design-settings' } }, '*');
  }, []);

  useImperativeHandle(ref, () => ({
    handleSave,
  }));

  useMessageListener('design-settings-loaded', (msg) => {
    setSlotGap(msg.slotGap);
    setRowGap(msg.rowGap);
    setBackgroundPadding(msg.backgroundPadding);
    setPillarWidth(msg.pillarWidth);
    setInitialValues(msg);
  });

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

    props.onSettingChange(hasChanges);
    props.setDesignSave(isAllSame);
  }, [slotGap, rowGap, backgroundPadding, pillarWidth, initialValues]);

  const handleReset = () => {
    updateAllValues(DesignDefault);
    props.onSettingChange(false);
    parent.postMessage({ pluginMessage: { type: 'reset-design-settings', ...DesignDefault } }, '*');
  };

  const handleSave = async () => {
    // 최대값 체크
    const checkedValues: DesignSettings = {
      slotGap: Math.min(slotGap, 100),
      rowGap: Math.min(rowGap, 100),
      backgroundPadding: Math.min(backgroundPadding, 100),
      pillarWidth: Math.min(pillarWidth, 100),
    };

    updateAllValues(checkedValues);
    props.onSettingChange(false);
    parent.postMessage({ pluginMessage: { type: 'save-design-settings', ...checkedValues } }, '*');
  };

  const updateAllValues = (values: DesignSettings) => {
    setSlotGap(values.slotGap);
    setRowGap(values.rowGap);
    setBackgroundPadding(values.backgroundPadding);
    setPillarWidth(values.pillarWidth);
    setInitialValues(values);
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
    </div>
  );
});

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    color: Colors.white,
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
