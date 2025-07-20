import React from 'react';

interface CheckProps {
  width: number;
  height: number;
  color: string;
}

const Check: React.FC<CheckProps> = ({ width, height, color }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.6699 6.33542C19.0984 6.79501 19.1114 7.55467 18.699 8.03216L10.4067 17.6322C10.2037 17.8672 9.92352 18 9.63077 18C9.33801 18 9.05788 17.8672 8.85486 17.6322L5.30102 13.5179C4.88856 13.0404 4.90159 12.2807 5.33011 11.8211C5.75863 11.3615 6.44038 11.3761 6.85283 11.8536L9.63077 15.0696L17.1472 6.36784C17.5596 5.89034 18.2414 5.87583 18.6699 6.33542Z"
        fill={color}
        stroke={color}
        stroke-width="1.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default Check;
