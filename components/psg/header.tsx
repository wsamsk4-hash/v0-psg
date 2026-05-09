"use client"

import { Crown, User } from "lucide-react"

interface HeaderProps {
  userLevel: number
  userName: string
}

const levelNames = ["مبتدئ", "محترف", "نخبة", "أسطورة"]

export function Header({ userLevel, userName }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-gold/20">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-light via-gold to-gold-dark flex items-center justify-center shadow-lg">
              <span className="font-mono font-bold text-midnight text-lg">P</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald animate-glow-emerald" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono font-bold text-lg metallic-gold">PSG Dinars</span>
            <span className="text-[10px] text-muted-foreground">منصة الاستثمار الرقمي</span>
          </div>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-foreground">{userName}</span>
            <div className="flex items-center gap-1">
              <Crown className="w-3 h-3 text-gold" />
              <span className="text-xs text-gold font-semibold">
                {levelNames[userLevel] || levelNames[0]}
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-gold/20 to-emerald/20 p-0.5">
              <div className="w-full h-full rounded-full bg-midnight-light flex items-center justify-center">
                <User className="w-5 h-5 text-gold" />
              </div>
            </div>
            {/* VIP Badge */}
            <div className="absolute -top-1 -left-1 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-gold to-gold-light text-[8px] font-bold text-midnight">
              VIP
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
