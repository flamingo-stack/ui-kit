import React from "react"

export interface NetworkIconProps extends React.SVGProps<SVGSVGElement> { }

export function NetworkIcon({ className = "h-6 w-6", ...props }: NetworkIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M6 2L3 6V14C3 15.1046 3.89543 16 5 16H11L13 14H5V6.5L7 4H17L19 6.5V14H15L17 16H19C20.1046 16 21 15.1046 21 14V6L18 2H6Z"
        fill="currentColor"
      />
      <path
        d="M13 17H7C6.44772 17 6 17.4477 6 18V21C6 21.5523 6.44772 22 7 22H13C13.5523 22 14 21.5523 14 21V18C14 17.4477 13.5523 17 13 17Z"
        fill="currentColor"
      />
      <path
        d="M21 17H15C14.4477 17 14 17.4477 14 18V21C14 21.5523 14.4477 22 15 22H21C21.5523 22 22 21.5523 22 21V18C22 17.4477 21.5523 17 21 17Z"
        fill="currentColor"
      />
      <path
        d="M5 17H3C2.44772 17 2 17.4477 2 18V21C2 21.5523 2.44772 22 3 22H5C5.55228 22 6 21.5523 6 21V18C6 17.4477 5.55228 17 5 17Z"
        fill="currentColor"
      />
      <path
        d="M12 16L10 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 16L14 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 16L4 17"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}