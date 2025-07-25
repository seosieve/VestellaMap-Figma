import React from 'react';
import { Colors } from '../../constant/color';

const DashedLine = () => {
  return (
    <svg width="100%" height="2">
      <line x1="0" y1="1" x2="100%" y2="1" stroke={Colors.dark} strokeWidth="1" strokeDasharray="6 6" />
    </svg>
  );
};

export default DashedLine;
