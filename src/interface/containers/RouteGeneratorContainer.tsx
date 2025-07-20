import React, { CSSProperties, useEffect, useState } from 'react';
import { Colors } from '../../constant/color';
import CircleButton from '../components/CircleButton';
import { GenerateSpot } from '../../../src/util/services/routeGenerator';

const RouteGeneratorContainer: React.FC = () => {
  const [buttonStates, setButtonStates] = useState({ start: false, intersect: false, end: false });
  const [horizontalLineColor, setHorizontalLineColor] = useState<string>(Colors.dark);
  const [verticalLineOpacity, setVerticalLineOpacity] = useState<string>('33%');

  const handleContainerClick = () => {
    parent.postMessage({ pluginMessage: { type: 'empty-lines' } }, '*');
  };

  const handleGenerateClick = (spot: GenerateSpot) => {
    parent.postMessage({ pluginMessage: { type: 'generate-routes', spot: spot } }, '*');
  };

  const handleHoverChange = (isHovered: boolean, type: GenerateSpot) => {
    if (isHovered) {
      parent.postMessage({ pluginMessage: { type: 'show-preview-ellipse', spot: type } }, '*');
    } else {
      parent.postMessage({ pluginMessage: { type: 'hide-preview-ellipse' } }, '*');
    }
  };

  useEffect(() => {
    window.onmessage = (event) => {
      const msg = event.data.pluginMessage;

      if (msg.type === 'detection-lines') {
        const count = msg.count;
        // Line Color 설정
        setHorizontalLineColor(count > 0 ? Colors.white : Colors.dark);
        setVerticalLineOpacity(count === 2 ? '100%' : '33%');
        // Button State 설정
        setButtonStates({ start: count === 1, intersect: count === 2, end: count === 1 });
      }
    };
  }, []);

  return (
    <div style={styles.container} onClick={handleContainerClick}>
      <div style={styles.crossBackground}>
        <div style={{ ...styles.horizontalLine, backgroundColor: horizontalLineColor }} />
        <div style={{ ...styles.verticalLine, opacity: verticalLineOpacity }} />
      </div>
      <div style={styles.buttonContainer}>
        <CircleButton
          type="start"
          disabled={!buttonStates.start}
          onClick={() => handleGenerateClick('start')}
          onHoverChange={handleHoverChange}
        />
        <CircleButton
          type="intersect"
          disabled={!buttonStates.intersect}
          onClick={() => handleGenerateClick('intersect')}
          onHoverChange={handleHoverChange}
        />
        <CircleButton
          type="end"
          disabled={!buttonStates.end}
          onClick={() => handleGenerateClick('end')}
          onHoverChange={handleHoverChange}
        />
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80px',
    backgroundColor: Colors.shadow,
    borderRadius: '12px',
    padding: '16px',
    marginTop: '24px',
  },
  crossBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalLine: {
    position: 'absolute',
    width: 'calc(100% - 32px)',
    height: '1px',
    transition: 'all 0.3s ease',
  },
  verticalLine: {
    position: 'absolute',
    width: '1px',
    height: 'calc(100% - 32px)',
    background: Colors.whiteGradient,
    transition: 'all 0.3s ease',
  },
  buttonContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    justifyContent: 'space-between',
    width: '100%',
    zIndex: 1,
  },
};

export default RouteGeneratorContainer;
