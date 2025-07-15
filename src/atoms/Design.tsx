import React from 'react';

interface DesignProps {
  width: number;
  height: number;
  color: string;
}

const Design: React.FC<DesignProps> = ({ width, height, color }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
      <path
        d="M21 18.3V5.7C21.6 5.4 22 4.7 22 4C22 2.9 21.1 2 20 2C19.3 2 18.6 2.4 18.3 3H5.7C5.4 2.4 4.7 2 4 2C2.9 2 2 2.9 2 4C2 4.7 2.4 5.4 3 5.7V18.3C2.4 18.6 2 19.3 2 20C2 21.1 2.9 22 4 22C4.7 22 5.4 21.6 5.7 21H18.3C18.6 21.6 19.3 22 20 22C21.1 22 22 21.1 22 20C22 19.3 21.6 18.6 21 18.3ZM19 18.3C18.7 18.5 18.5 18.7 18.3 19H5.7C5.5 18.7 5.3 18.5 5 18.3V5.7C5.3 5.5 5.5 5.3 5.7 5H18.3C18.5 5.3 18.7 5.5 19 5.7V18.3ZM16 7H8C7.4 7 7 7.4 7 8V16C7 16.6 7.4 17 8 17H16C16.6 17 17 16.6 17 16V8C17 7.4 16.6 7 16 7Z"
        fill={color}
      />
    </svg>
  );
};

export default Design;
