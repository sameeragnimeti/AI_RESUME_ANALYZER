import { Loader2 } from 'lucide-react'

interface LoadingSpinnerProps {
  size?: number
  className?: string
}

export default function LoadingSpinner({ size = 32, className = '' }: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center h-64 ${className}`}>
      <Loader2 size={size} className="animate-spin text-primary-500" />
    </div>
  )
}
