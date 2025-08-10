import React, { CSSProperties, useState } from 'react';
import { Colors } from '../../constant/color';
import { useMessageListener } from '../../util/managers/messaageManager';

const NumberableLine = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleContainerClick = () => {
    parent.postMessage({ pluginMessage: { type: 'empty-beacon-ellipse' } }, '*');
  };

  const handleClick = () => {
    if (!isDisabled) {
      parent.postMessage({ pluginMessage: { type: 'numbering-beacons' } }, '*');
    }
  };

  useMessageListener('selection-beacon-ellipse', (msg) => {
    const active = msg.active;
    setIsDisabled(active ? false : true);
  });

  return (
    <div style={styles.container} onClick={handleContainerClick}>
      <div style={styles.horizontalLine} />
      <button
        style={{
          ...styles.default,
          ...(isDisabled ? styles.disabled : {}),
          ...(isHovered ? styles.hover : {}),
        }}
        onClick={handleClick}
        onMouseEnter={() => !isDisabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Set Numbering
      </button>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '80px',
    cursor: 'pointer',
  },
  horizontalLine: {
    position: 'absolute',
    backgroundColor: Colors.dark,
    top: '50%',
    left: '8px',
    right: '8px',
    height: '1px',
    transform: 'translateY(-50%)',
    transition: 'all 0.3s ease',
  },
  default: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: '28px',
    backgroundColor: Colors.mintBase,
    color: Colors.mintBlack,
    fontSize: '12px',
    fontWeight: '700',
    margin: '0',
    border: 'none',
    borderRadius: '4px',
    paddingLeft: '12px',
    paddingRight: '12px',
    cursor: 'pointer',
    transform: 'translate(-50%, -50%)',
    transition: 'all 0.3s ease',
  },
  disabled: {
    backgroundColor: Colors.dark,
    color: Colors.medium,
  },
  hover: {
    backgroundColor: Colors.mintBright,
  },
};

export default NumberableLine;
