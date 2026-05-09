"use client"

import { Clock } from "lucide-react"

interface ProgressBarProps {
  progress: number
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="mx-4 mb-6">
      <div className="glass rounded-xl p-4 border border-gold/10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gold" />
            <span className="text-sm font-medium text-foreground">التقدم اليومي</span>
          </div>
          <span className="text-sm font-bold text-gold">{Math.round(progress)}%</span>
        </div>
        
        <div className="relative h-3 bg-midnight-light rounded-full overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute h-full w-px bg-gold/30"
                style={{ left: `${(i + 1) * 10}%` }}
              />
            ))}
          </div>
          
          {/* Progress fill */}
          <div
            className="h-full bg-gradient-to-l from-emerald via-gold to-gold-light rounded-full transition-all duration-500 relative overflow-hidden"
            style={{ width: `${progress}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 animate-shimmer" />
          </div>
        </div>
        
        <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
          <span>البداية</span>
          <span>٢٤ ساعة</span>
        </div>
      </div>
    </div>
  )
}
