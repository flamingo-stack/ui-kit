import React from "react"

export interface MacOSIconProps extends React.SVGProps<SVGSVGElement> {}

export function MacOSIcon({ className, ...props }: MacOSIconProps) {
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
      <path d="M11.5 2C10.5 0.5 9 0 9 0S8.5 1.5 9.5 3C10.5 4.5 12 5 12 5S12.5 3.5 11.5 2Z" fill="currentColor"/>
      <path d="M12 5.5C11 5.5 10.5 6 10 6C9.5 6 9 5.5 8 5.5C6.5 5.5 5 6.5 5 9C5 11.5 6.5 14.5 8 14.5C8.5 14.5 9 14 10 14C11 14 11.5 14.5 12 14.5C13.5 14.5 15 11.5 15 11.5C15 11.5 13 11 13 9C13 7 15 6.5 15 6.5C15 6.5 13.5 5.5 12 5.5Z" fill="currentColor"/>
      <path d="M3 9C3 7 4 5.5 5 5.5C5.5 5.5 6 6 6 6C5 6.5 4 7.5 4 9C4 10.5 4.5 12 5.5 13C4.5 13.5 3.5 14.5 3 14.5C1.5 14.5 1 11.5 1 9C1 6.5 2 5.5 3 5.5Z" fill="currentColor"/>
    </svg>
  )
}