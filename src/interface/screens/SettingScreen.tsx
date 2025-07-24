import React, { CSSProperties, useRef, useState } from 'react';
import { Colors } from '../../constant/color';
import SettingDesignContainer, { SettingDesignHandle } from '../containers/SettingDesignContainer';
import SettingDevelopmentContainer, { SettingDevelopmentHandle } from '../containers/SettingDevelopmentContainer';
import Button from '../components/Button';

interface SettingScreenProps {
  onSettingChange: (changed: boolean) => void;
}

const SettingScreen: React.FC<SettingScreenProps> = ({ onSettingChange }) => {
  const designRef = useRef<SettingDesignHandle>(null);
  const developmentRef = useRef<SettingDevelopmentHandle>(null);
  const [saveDisabled, setSaveDisabled] = useState<boolean>(false);

  const handleSave = () => {
    designRef.current?.handleSave();
    developmentRef.current?.handleSave();
  };

  return (
    <div style={styles.container}>
      <p style={styles.title}>Settings</p>
      <div style={styles.contentContainer}>
        <SettingDesignContainer ref={designRef} onSettingChange={onSettingChange} setSaveDisabled={setSaveDisabled} />
        <SettingDevelopmentContainer
          ref={developmentRef}
          onSettingChange={onSettingChange}
          setSaveDisabled={setSaveDisabled}
        />
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
