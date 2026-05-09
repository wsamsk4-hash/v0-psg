"use client"

import { useState, useCallback } from "react"
import { Header } from "@/components/psg/header"
import { HeroCard } from "@/components/psg/hero-card"
import { MiningEngine } from "@/components/psg/mining-engine"
import { ProgressBar } from "@/components/psg/progress-bar"
import { SubscriptionTiers } from "@/components/psg/subscription-tiers"
import { BottomNav } from "@/components/psg/bottom-nav"
import { Package, ShoppingBag, Users, Crown, Gift, Users2, TrendingUp, ChevronLeft } from "lucide-react"

// Tier reward calculation: Price / 210
const tierRewards = {
  1: Math.round(50 / 210),   // Starter: ~0.24 → 0
  2: Math.round(150 / 210),  // Pro: ~0.71 → 1
  3: Math.round(500 / 210),  // Elite: ~2.38 → 2
  4: Math.round(1000 / 210), // Legend: ~4.76 → 5
}

export default function PSGDinarsApp() {
  const [activeTab, setActiveTab] = useState("home")
  const [progress, setProgress] = useState(0)
  const [currentTier, setCurrentTier] = useState(3) // Default: Elite tier
  const [userBalance] = useState(12500)
  const [totalEarnings] = useState(45750)

  const handleProgressChange = useCallback((newProgress: number) => {
    setProgress(newProgress)
  }, [])

  const getDailyReward = () => {
    return tierRewards[currentTier as keyof typeof tierRewards] || 0
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <>
            <HeroCard balance={userBalance} totalEarnings={totalEarnings} />
            <MiningEngine
              dailyReward={getDailyReward()}
              onProgressChange={handleProgressChange}
            />
            <ProgressBar progress={progress} />
            <SubscriptionTiers
              currentTier={currentTier}
              onSelectTier={setCurrentTier}
            />
          </>
        )
      case "packages":
        return (
          <div className="p-4">
            <div className="flex items-center gap-2 mb-6">
              <Package className="w-5 h-5 text-gold" />
              <h2 className="text-xl font-bold text-foreground">الباقات المتاحة</h2>
            </div>
            <SubscriptionTiers
              currentTier={currentTier}
              onSelectTier={setCurrentTier}
            />
          </div>
        )
      case "store":
        return (
          <div className="p-4">
            <div className="flex items-center gap-2 mb-6">
              <ShoppingBag className="w-5 h-5 text-gold" />
              <h2 className="text-xl font-bold text-foreground">المتجر</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: "بطاقة هدايا", price: 500, icon: Gift },
                { name: "ترقية VIP", price: 1000, icon: Crown },
                { name: "نقاط إضافية", price: 200, icon: TrendingUp },
                { name: "دعوة صديق", price: 0, icon: Users2 },
              ].map((item, index) => (
                <div
                  key={index}
                  className="glass rounded-xl p-4 border border-gold/10 hover:border-gold/30 transition-all cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-emerald/10 flex items-center justify-center mb-3">
                    <item.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                  <p className="text-sm text-gold">
                    {item.price > 0 ? `${item.price} نقطة` : "مجاني"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )
      case "team":
        return (
          <div className="p-4">
            <div className="flex items-center gap-2 mb-6">
              <Users className="w-5 h-5 text-gold" />
              <h2 className="text-xl font-bold text-foreground">فريقي</h2>
            </div>
            
            {/* Team Stats */}
            <div className="glass rounded-xl p-5 border border-gold/10 mb-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-gold">12</p>
                  <p className="text-xs text-muted-foreground">أعضاء الفريق</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-emerald">3,450</p>
                  <p className="text-xs text-muted-foreground">عمولات الفريق</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">5</p>
                  <p className="text-xs text-muted-foreground">إحالات نشطة</p>
                </div>
              </div>
            </div>

            {/* Team Members */}
            <div className="flex flex-col gap-3">
              {[
                { name: "أحمد محمد", level: "نخبة", earnings: 1250 },
                { name: "فاطمة علي", level: "محترف", earnings: 890 },
                { name: "خالد سعيد", level: "مبتدئ", earnings: 450 },
              ].map((member, index) => (
                <div
                  key={index}
                  className="glass rounded-xl p-4 border border-border flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-emerald/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-gold">{member.name[0]}</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.level}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-emerald">{member.earnings}</span>
                    <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>

            {/* Invite Button */}
            <button className="w-full mt-6 py-4 rounded-xl bg-gradient-to-l from-gold via-gold-light to-gold text-midnight font-bold text-lg transition-all hover:shadow-lg hover:shadow-gold/30">
              دعوة أصدقاء جدد
            </button>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-background pb-24">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-emerald/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-gold/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <Header userLevel={currentTier - 1} userName="مستخدم VIP" />
        {renderContent()}
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </main>
  )
}
