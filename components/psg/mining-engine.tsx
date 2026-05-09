"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Coins } from "lucide-react"

interface MiningEngineProps {
  dailyReward: number
  onProgressChange: (progress: number) => void
  onPointsEarned: (points: number) => void
}

export function MiningEngine({ dailyReward, onProgressChange, onPointsEarned }: MiningEngineProps) {
  const [timeRemaining, setTimeRemaining] = useState(24 * 60 * 60) // 24 hours in seconds
  const [totalTime] = useState(24 * 60 * 60)
  const [liveCounter, setLiveCounter] = useState(0)
  const [displayCounter, setDisplayCounter] = useState(0)
  const animationRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(Date.now())

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const calculateProgress = useCallback(() => {
    return ((totalTime - timeRemaining) / totalTime) * 100
  }, [totalTime, timeRemaining])

  // Points per second calculation (dailyReward / 24 hours in seconds)
  const pointsPerSecond = dailyReward / (24 * 60 * 60)

  // Continuous mining animation - runs forever
  useEffect(() => {
    const animate = () => {
      const now = Date.now()
      const deltaTime = (now - lastTimeRef.current) / 1000 // seconds elapsed
      lastTimeRef.current = now

      // Add micro-increments based on time elapsed
      setLiveCounter((prev) => {
        const newValue = prev + (pointsPerSecond * deltaTime)
        return newValue
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [pointsPerSecond])

  // Update display counter with smooth animation
  useEffect(() => {
    setDisplayCounter(liveCounter)
  }, [liveCounter])

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          // Auto-reset the cycle
          onPointsEarned(dailyReward)
          return 24 * 60 * 60
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [dailyReward, onPointsEarned])

  useEffect(() => {
    onProgressChange(calculateProgress())
  }, [timeRemaining, calculateProgress, onProgressChange])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ar-SA', { 
      minimumFractionDigits: 4,
      maximumFractionDigits: 4 
    }).format(num)
  }

  const formatWholeNumber = (num: number) => {
    return new Intl.NumberFormat('ar-SA').format(Math.floor(num))
  }

  return (
    <div className="flex flex-col items-center px-4 py-8">
      {/* Section Title */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
        <span className="text-sm text-neon-green font-semibold">نظام التعدين الآلي نشط</span>
      </div>
      <h2 className="text-xl font-bold text-foreground mb-6">محرك التعدين المستمر</h2>

      {/* Rotating Gold Coin */}
      <div className="relative mb-6">
        {/* Outer glow rings */}
        <div className="absolute inset-0 w-44 h-44 rounded-full bg-gradient-to-br from-gold/30 via-emerald/20 to-gold/30 blur-2xl animate-pulse-gold" />
        <div className="absolute inset-2 w-40 h-40 rounded-full bg-gradient-to-br from-neon-green/20 to-gold/20 blur-xl animate-glow-emerald" />
        
        {/* Main rotating coin container */}
        <div className="relative w-44 h-44 flex items-center justify-center">
          {/* Spinning outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-dashed border-gold/30 animate-spin-slow" />
          
          {/* Inner rotating element */}
          <div className="absolute inset-4 rounded-full border-2 border-emerald/40 animate-spin-reverse" />
          
          {/* Core coin */}
          <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-gold via-gold-light to-gold-dark flex items-center justify-center shadow-2xl shadow-gold/40 animate-coin-rotate">
            {/* Coin shine effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/30 to-transparent" />
            
            {/* PSG Logo/Icon */}
            <div className="relative flex flex-col items-center">
              <Coins className="w-10 h-10 text-midnight mb-1" />
              <span className="text-xs font-bold text-midnight/80 font-mono">PSG</span>
            </div>
            
            {/* Animated ring */}
            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping opacity-50" />
          </div>

          {/* Orbiting particles */}
          <div className="absolute inset-0 animate-spin-slow">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-emerald shadow-lg shadow-emerald/50" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gold shadow-lg shadow-gold/50" />
          </div>
          <div className="absolute inset-0 animate-spin-reverse">
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-neon-green shadow-lg shadow-neon-green/50" />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-gold-light shadow-lg shadow-gold-light/50" />
          </div>
        </div>
      </div>

      {/* Live Running Counter */}
      <div className="glass rounded-2xl p-6 border border-gold/20 mb-4 w-full max-w-xs">
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-2">النقاط المكتسبة الآن</p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl font-bold text-gold-gradient font-mono tabular-nums">
              {formatNumber(displayCounter)}
            </span>
          </div>
          <p className="text-xs text-emerald mt-2">+ {(pointsPerSecond * 60).toFixed(2)} نقطة/دقيقة</p>
        </div>
      </div>

      {/* 24-hour Cycle Timer */}
      <div className="flex items-center gap-4 px-6 py-3 rounded-full glass border border-emerald/20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
          <span className="text-sm text-muted-foreground">الدورة التالية:</span>
        </div>
        <span className="text-lg font-mono font-bold text-emerald">
          {formatTime(timeRemaining)}
        </span>
      </div>

      {/* Expected Daily Reward */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass border border-gold/20">
          <span className="text-muted-foreground">العائد اليومي:</span>
          <span className="text-xl font-bold text-gold-gradient">
            {formatWholeNumber(dailyReward)}
          </span>
          <span className="text-sm text-muted-foreground">نقطة</span>
        </div>
      </div>
    </div>
  )
}
