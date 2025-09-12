import React from 'react';

interface MiamiCyberGangLogoProps {
  size?: number;
  color?: string;
}

export const MiamiCyberGangLogo: React.FC<MiamiCyberGangLogoProps> = ({ 
  size = 64, 
  color = 'currentColor' 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color }}
    >
      {/* Placeholder circular logo with "MCG" text - you will replace this with the actual SVG */}
      <circle 
        cx="100" 
        cy="100" 
        r="90" 
        fill="none" 
        stroke={color} 
        strokeWidth="4"
      />
      <circle 
        cx="100" 
        cy="100" 
        r="70" 
        fill="none" 
        stroke={color} 
        strokeWidth="2"
      />
      <text 
        x="100" 
        y="110" 
        textAnchor="middle" 
        fontSize="32" 
        fontWeight="bold" 
        fill={color}
        fontFamily="Arial, sans-serif"
      >
        MCG
      </text>
      {/* Small decorative elements */}
      <circle cx="70" cy="70" r="4" fill={color} />
      <circle cx="130" cy="70" r="4" fill={color} />
      <circle cx="70" cy="130" r="4" fill={color} />
      <circle cx="130" cy="130" r="4" fill={color} />
    </svg>
  );
};