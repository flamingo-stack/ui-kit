import React from 'react'

interface ShapeCircleDashIconProps {
  className?: string
  size?: number
  color?: string
}

export function ShapeCircleDashIcon({ 
  className = '', 
  size = 24, 
  color = 'currentColor' 
}: ShapeCircleDashIconProps) {
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
        d="M8.56 2.75C10.93 1.75 13.58 1.75 15.95 2.75"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M21.25 8.56C22.25 10.93 22.25 13.58 21.25 15.95"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M15.44 21.25C13.07 22.25 10.42 22.25 8.05 21.25"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M2.75 15.44C1.75 13.07 1.75 10.42 2.75 8.05"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}