import React, { useState, useEffect } from 'react';
import { CSSProperties } from 'react';
import Button from '../components/Button';

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
        <p style={styles.message}>저장되지 않은 변경사항이 있습니다.</p>
        <div style={styles.buttonContainer}>
          <Button title="저장하고 이동" onClick={onConfirm} />
          <Button title="취소" onClick={onClose} />
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
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#2c2d2f',
    padding: '16px',
    borderRadius: '8px',
    width: '280px',
  },
  message: {
    color: '#ffffff',
    fontSize: '14px',
    textAlign: 'center',
    margin: '0 0 16px 0',
  },
  buttonContainer: {
    display: 'flex',
    gap: '8px',
    justifyContent: 'center',
  },
};

export default WarningModal;
