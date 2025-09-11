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
      viewBox="0 0 65 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M27.6667 30.6666V24.6666C27.6667 22.0893 29.756 20 32.3333 20C34.9107 20 37 22.0893 37 24.6666V30.6666M35.855 6.15349L49.1882 12.6909C51.9291 14.0347 53.6663 16.8212 53.6663 19.8738L53.6666 35.9125C53.6666 45.8584 41.7621 54.1631 35.7386 57.7286C33.6252 58.9795 31.041 58.9795 28.9276 57.7285C22.9042 54.1631 11 45.8584 11.0003 35.9125L11 19.874C11 16.8213 12.7372 14.0347 15.4781 12.6908L28.8112 6.15349C31.0328 5.06423 33.6334 5.06423 35.855 6.15349ZM27 41.3333H37.6667C39.1394 41.3333 40.3333 40.1394 40.3333 38.6666V33.3333C40.3333 31.8605 39.1394 30.6666 37.6667 30.6666H27C25.5272 30.6666 24.3333 31.8605 24.3333 33.3333V38.6666C24.3333 40.1394 25.5272 41.3333 27 41.3333Z"
        stroke={color} />
    </svg>
  )
}