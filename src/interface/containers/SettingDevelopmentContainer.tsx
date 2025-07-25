import React, { useEffect, useState, CSSProperties, forwardRef, useImperativeHandle } from 'react';
import { Colors } from '../../constant/color';
import { DevelopDefault, DevelopSettings } from '../../util/services/settingHandler';
import { useMessageListener } from '../../util/managers/messaageManager';
import InputBox from '../components/InputBox';

export interface SettingDevelopHandle {
  handleSave: () => void;
}

interface SettingDevelopProps {
  onSettingChange: (hasChanges: boolean) => void;
  setDevelopSave: (disabled: boolean) => void;
}

const SettingDevelopContainer = forwardRef<SettingDevelopHandle, SettingDevelopProps>((props, ref) => {
  const [major, setMajor] = useState<number>(0);
  const [initialValues, setInitialValues] = useState<DevelopSettings>(DevelopDefault);

  useEffect(() => {
    parent.postMessage({ pluginMessage: { type: 'load-development-settings' } }, '*');
  }, []);

  useImperativeHandle(ref, () => ({
    handleSave,
  }));

  useMessageListener('development-settings-loaded', (msg) => {
    setMajor(msg.major);
    setInitialValues(msg);
  });

  // 파라미터 비교 함수
  const checkValues = (operator: '===' | '!==') => [eval(`major ${operator} initialValues.major`)];

  useEffect(() => {
    // 설정 변경 여부 확인
    const hasChanges = checkValues('!==').some(Boolean);
    const isAllSame = checkValues('===').every(Boolean);

    props.onSettingChange(hasChanges);
    props.setDevelopSave(isAllSame);
  }, [major, initialValues]);

  const handleSave = async () => {
    // 최대값 체크
    const checkedValues: DevelopSettings = {
      major: Math.min(major, 999),
    };

    updateAllValues(checkedValues);
    props.onSettingChange(false);
    parent.postMessage({ pluginMessage: { type: 'save-settings', ...checkedValues } }, '*');
  };

  const updateAllValues = (values: DevelopSettings) => {
    setMajor(values.major);
    setInitialValues(values);
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <p style={styles.title}>Development</p>
      </div>
      <div style={styles.inputContainer}>
        <InputBox title="Major" value={major} onChange={setMajor} />
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
    backgroundColor: Colors.shadow,
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

export default SettingDevelopContainer;
