import React from "react"

export interface WindowsIconProps extends React.SVGProps<SVGSVGElement> {}

export function WindowsIcon({ className, ...props }: WindowsIconProps) {
  return (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M2 3.5L7 2.5V7.5H2V3.5Z" fill="currentColor"/>
      <path d="M8 2.25L14 1V7.5H8V2.25Z" fill="currentColor"/>
      <path d="M2 8.5H7V13.5L2 12.5V8.5Z" fill="currentColor"/>
      <path d="M8 8.5H14V15L8 13.75V8.5Z" fill="currentColor"/>
    </svg>
  )
}