import React from "react"

export interface LinuxIconProps extends React.SVGProps<SVGSVGElement> {}

export function LinuxIcon({ className, ...props }: LinuxIconProps) {
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
      <circle cx="8" cy="5" r="3" fill="currentColor"/>
      <path d="M4 8C4 8 5 10 8 10C11 10 12 8 12 8L11 13H5L4 8Z" fill="currentColor"/>
      <circle cx="6" cy="5" r="0.5" fill="#212121"/>
      <circle cx="10" cy="5" r="0.5" fill="#212121"/>
    </svg>
  )
}