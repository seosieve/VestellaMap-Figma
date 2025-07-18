import React, { useState, useEffect } from 'react';
import { CSSProperties } from 'react';
import Button from '../components/Button';
import CancelButton from '../components/CancelButton';
import Warning from '../atoms/Warning';

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const WarningModal: React.FC<WarningModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const [visible, setVisible] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      setTimeout(() => setAnimationStarted(true), 50);
      return;
    } else {
      setAnimationStarted(false);
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!visible) return null;

  return (
    <div
      style={{
        ...styles.overlay,
        opacity: animationStarted ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
      }}
    >
      <div
        style={{
          ...styles.modal,
          transform: animationStarted ? 'scale(1)' : 'scale(0.5)',
          opacity: animationStarted ? 1 : 0,
          transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
        }}
      >
        <div style={styles.titleContainer}>
          <Warning width={36} height={36} color="#AFAFAF" />
          <p style={styles.message}> You have unsaved changes.</p>
        </div>
        <div style={styles.buttonContainer}>
          <Button title="Exit With Saving" onClick={onConfirm} />
          <CancelButton onClick={onClose} />
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '40px',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#2c2d2f',
    padding: '16px',
    borderRadius: '12px',
    width: '260px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
  },
  message: {
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '600',
    textAlign: 'center',
    margin: '0',
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'column',
    gap: '8px',
    justifyContent: 'center',
  },
};

export default WarningModal;
