"use client"

import { X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function Toaster() {
  const { toasts, dismiss } = useToast()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="fixed bottom-0 right-0 z-[1400] flex flex-col gap-2 p-4 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "bg-background border rounded-lg shadow-lg p-4 transition-all duration-300 transform pointer-events-auto",
            toast.visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
            toast.variant === "destructive" && "border-red-500 text-red-500",
            toast.variant === "success" && "border-green-500 text-green-500",
          )}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{toast.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{toast.description}</p>
            </div>
            <button onClick={() => dismiss(toast.id)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
