"use client"

import { Coins, TrendingUp, Sparkles } from "lucide-react"

interface HeroCardProps {
  balance: number
  totalEarnings: number
}

export function HeroCard({ balance, totalEarnings }: HeroCardProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ar-SA').format(num)
  }

  return (
    <div className="mx-4 mt-6">
      <div className="relative overflow-hidden rounded-2xl glass border border-gold/20 p-6">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-gold/10 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-emerald/10 to-transparent rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 animate-shimmer opacity-30" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-gold" />
            <h2 className="text-lg font-semibold text-foreground">ملخص الحساب</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Balance */}
            <div className="bg-midnight-light/50 rounded-xl p-4 border border-gold/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center">
                  <Coins className="w-4 h-4 text-gold" />
                </div>
                <span className="text-xs text-muted-foreground">رصيد العملات</span>
              </div>
              <p className="text-2xl font-bold text-gold-gradient">
                {formatNumber(balance)}
              </p>
              <span className="text-[10px] text-muted-foreground">نقطة</span>
            </div>
            
            {/* Total Earnings */}
            <div className="bg-midnight-light/50 rounded-xl p-4 border border-emerald/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald/20 to-emerald/5 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-emerald" />
                </div>
                <span className="text-xs text-muted-foreground">الأرباح الكلية</span>
              </div>
              <p className="text-2xl font-bold text-emerald">
                {formatNumber(totalEarnings)}
              </p>
              <span className="text-[10px] text-muted-foreground">نقطة</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
