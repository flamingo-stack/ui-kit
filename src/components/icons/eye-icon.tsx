import React from 'react'

interface EyeIconProps {
  className?: string
  size?: number
  color?: string
}

export function EyeIcon({
  className = '',
  size = 24,
  color = 'currentColor'
}: EyeIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M58.3387 30.3872C58.7777 31.4293 58.7777 32.5709 58.3387 33.613C56.2446 38.5835 48.629 53.3334 31.9941 53.3334C15.3563 53.3334 7.74983 38.5784 5.66027 33.6104C5.22262 32.5699 5.22262 31.4303 5.66027 30.3898C7.74983 25.4218 15.3563 10.6667 31.9941 10.6667C48.629 10.6667 56.2446 25.4167 58.3387 30.3872Z"
        stroke={color} />
      <path
        d="M42.6674 32.0001C42.6674 37.8911 37.8918 42.6667 32.0007 42.6667C26.1097 42.6667 21.3341 37.8911 21.3341 32.0001C21.3341 26.109 26.1097 21.3334 32.0007 21.3334C37.8918 21.3334 42.6674 26.109 42.6674 32.0001Z"
        stroke={color} />

    </svg>
  )
}