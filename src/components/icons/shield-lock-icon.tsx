import React from 'react'

interface ShieldLockIconProps {
  className?: string
  size?: number
  color?: string
}

export function ShieldLockIcon({ 
  className = '', 
  size = 24, 
  color = 'currentColor' 
}: ShieldLockIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2L3 7V12C3 16.55 6.84 20.74 12 22C17.16 20.74 21 16.55 21 12V7L12 2Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12V13H16V17H8V13H9V12Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}