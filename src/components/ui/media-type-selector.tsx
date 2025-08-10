"use client"

import * as React from "react"
import { Video, Image, Music, FileText } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"

export type MediaType = 'video' | 'image' | 'audio' | 'document'

interface MediaTypeOption {
  value: MediaType
  label: string
  icon: React.ReactNode
}

const mediaTypeOptions: MediaTypeOption[] = [
  { value: 'image', label: 'Image', icon: <Image className="h-4 w-4" /> },
  { value: 'video', label: 'Video', icon: <Video className="h-4 w-4" /> },
  { value: 'audio', label: 'Audio', icon: <Music className="h-4 w-4" /> },
  { value: 'document', label: 'Document', icon: <FileText className="h-4 w-4" /> },
]

interface MediaTypeSelectorProps {
  value?: MediaType
  onValueChange?: (value: MediaType) => void
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function MediaTypeSelector({
  value,
  onValueChange,
  placeholder = "Select media type",
  className,
  disabled
}: MediaTypeSelectorProps) {
  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder}>
          {value && (
            <div className="flex items-center gap-2">
              {mediaTypeOptions.find(opt => opt.value === value)?.icon}
              <span>{mediaTypeOptions.find(opt => opt.value === value)?.label}</span>
            </div>
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {mediaTypeOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <div className="flex items-center gap-2">
              {option.icon}
              <span>{option.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}