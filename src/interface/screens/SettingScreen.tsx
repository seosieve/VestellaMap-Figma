import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { Colors } from '../../constant/color';
import SettingDesignContainer, { SettingDesignHandle } from '../containers/SettingDesignContainer';
import SettingDevelopContainer, { SettingDevelopHandle } from '../containers/SettingDevelopmentContainer';
import Button from '../components/Button';

interface SettingScreenProps {
  onSettingChange: (changed: boolean) => void;
}

const SettingScreen: React.FC<SettingScreenProps> = ({ onSettingChange }) => {
  const designRef = useRef<SettingDesignHandle>(null);
  const developRef = useRef<SettingDevelopHandle>(null);
  const [designSave, setDesignSave] = useState<boolean>(false);
  const [developSave, setDevelopSave] = useState<boolean>(false);
  const [saveDisabled, setSaveDisabled] = useState<boolean>(false);

  useEffect(() => {
    setSaveDisabled(designSave && developSave);
  }, [designSave, developSave]);

  const handleSave = () => {
    designRef.current?.handleSave();
    developRef.current?.handleSave();
  };

  return (
    <div style={styles.container}>
      <p style={styles.title}>Settings</p>
      <div style={styles.contentContainer}>
        <SettingDesignContainer ref={designRef} onSettingChange={onSettingChange} setDesignSave={setDesignSave} />
        <SettingDevelopContainer ref={developRef} onSettingChange={onSettingChange} setDevelopSave={setDevelopSave} />
        <div style={styles.buttonContainer}>
          <Button title="Save" disabled={saveDisabled} onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '36px',
  },
  title: {
    color: Colors.white,
    fontSize: '24px',
    fontWeight: '700',
    margin: '0',
    marginBottom: '24px',
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.shadow,
    borderRadius: '12px',
    padding: '16px',
  },
};

export default SettingScreen;
