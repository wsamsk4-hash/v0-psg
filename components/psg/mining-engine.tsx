"use client"

import { useState, useEffect, useCallback } from "react"
import { Zap, Play, Pause } from "lucide-react"

interface MiningEngineProps {
  dailyReward: number
  onProgressChange: (progress: number) => void
}

export function MiningEngine({ dailyReward, onProgressChange }: MiningEngineProps) {
  const [isActive, setIsActive] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(24 * 60 * 60) // 24 hours in seconds
  const [totalTime] = useState(24 * 60 * 60)

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const calculateProgress = useCallback(() => {
    return ((totalTime - timeRemaining) / totalTime) * 100
  }, [totalTime, timeRemaining])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          const newTime = prev - 1
          if (newTime <= 0) {
            setIsActive(false)
            return 0
          }
          return newTime
        })
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isActive, timeRemaining])

  useEffect(() => {
    onProgressChange(calculateProgress())
  }, [timeRemaining, calculateProgress, onProgressChange])

  const handleClick = () => {
    if (timeRemaining === 0) {
      // Reset timer
      setTimeRemaining(24 * 60 * 60)
      setIsActive(true)
    } else {
      setIsActive(!isActive)
    }
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ar-SA').format(num)
  }

  return (
    <div className="flex flex-col items-center px-4 py-8">
      {/* Section Title */}
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-5 h-5 text-gold" />
        <h2 className="text-xl font-bold text-foreground">العداد الرئيسي</h2>
      </div>

      {/* Hex Mining Button */}
      <button
        onClick={handleClick}
        className="relative group focus:outline-none"
        aria-label={isActive ? "إيقاف التعدين" : "بدء التعدين"}
      >
        {/* Outer glow */}
        <div className={`absolute inset-0 hex-button bg-gradient-to-br from-gold via-emerald to-gold blur-xl opacity-50 scale-110 transition-all duration-500 ${isActive ? 'animate-pulse-gold' : ''}`} />
        
        {/* Main hex button */}
        <div className={`relative w-44 h-48 hex-button bg-gradient-to-br from-midnight-light via-midnight to-midnight-light border-2 transition-all duration-300 ${isActive ? 'border-emerald shadow-2xl shadow-emerald/30' : 'border-gold/50 group-hover:border-gold'}`}>
          {/* Inner content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {/* Icon */}
            <div className={`w-12 h-12 rounded-full mb-2 flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-emerald/20' : 'bg-gold/20 group-hover:bg-gold/30'}`}>
              {isActive ? (
                <Pause className="w-6 h-6 text-emerald" />
              ) : (
                <Play className="w-6 h-6 text-gold mr-[-2px]" />
              )}
            </div>
            
            {/* Timer */}
            <span className={`text-2xl font-mono font-bold tracking-wider ${isActive ? 'text-emerald' : 'text-gold'}`}>
              {formatTime(timeRemaining)}
            </span>
            
            {/* Status text */}
            <span className="text-xs text-muted-foreground mt-1">
              {isActive ? 'جاري التعدين...' : timeRemaining === 0 ? 'انقر للإعادة' : 'انقر للبدء'}
            </span>
          </div>

          {/* Animated rings when active */}
          {isActive && (
            <>
              <div className="absolute inset-0 hex-button border border-emerald/30 animate-ping" />
              <div className="absolute inset-2 hex-button border border-gold/20 animate-pulse" />
            </>
          )}
        </div>
      </button>

      {/* Expected Daily Reward */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-gold/20">
          <span className="text-muted-foreground">العائد المتوقع اليوم:</span>
          <span className="text-xl font-bold text-gold-gradient">
            {formatNumber(dailyReward)}
          </span>
          <span className="text-sm text-muted-foreground">نقطة</span>
        </div>
      </div>
    </div>
  )
}
