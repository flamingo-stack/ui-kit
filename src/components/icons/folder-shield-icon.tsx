import React from 'react'

interface FolderShieldIconProps {
  className?: string
  size?: number
  color?: string
}

export function FolderShieldIcon({ 
  className = '', 
  size = 24, 
  color = 'currentColor' 
}: FolderShieldIconProps) {
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
        d="M22 19C22 19.78 21.78 20.5 21.37 21.09C20.59 22.26 19.11 23 17.5 23H4C2.9 23 2 22.1 2 21V5C2 3.9 2.9 3 4 3H9L11 5H20C21.1 5 22 5.9 22 7V19Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12 11L17 8V13C17 15.21 14.76 17 12 17C9.24 17 7 15.21 7 13V8L12 11Z"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}