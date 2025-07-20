import React from 'react';

interface WarningProps {
  width: number;
  height: number;
  color: string;
}

const Warning: React.FC<WarningProps> = ({ width, height, color }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM12 17C11.4 17 11 16.6 11 16C11 15.4 11.4 15 12 15C12.6 15 13 15.4 13 16C13 16.6 12.6 17 12 17ZM13 12C13 12.6 12.6 13 12 13C11.4 13 11 12.6 11 12V8C11 7.4 11.4 7 12 7C12.6 7 13 7.4 13 8V12Z"
        fill={color}
      />
    </svg>
  );
};

export default Warning;
