"use client"

import { useState, useCallback, useEffect } from "react"
import { Header } from "@/components/psg/header"
import { HeroCard } from "@/components/psg/hero-card"
import { MiningEngine } from "@/components/psg/mining-engine"
import { ProgressBar } from "@/components/psg/progress-bar"
import { SubscriptionTiers } from "@/components/psg/subscription-tiers"
import { BottomNav } from "@/components/psg/bottom-nav"
import { Package, Wallet, Users, ChevronLeft, TrendingUp, ArrowDownCircle, History, CreditCard, Copy, Check } from "lucide-react"

// Tier reward mapping based on new specs
const tierRewards = {
  1: 2500,   // Basic: $50 → 2,500 points
  2: 7500,   // Pro: $150 → 7,500 points
  3: 25000,  // VIP: $500 → 25,000 points
  4: 50000,  // Elite: $1000 → 50,000 points
}

export default function PSGDinarsApp() {
  const [activeTab, setActiveTab] = useState("home")
  const [progress, setProgress] = useState(0)
  const [currentTier, setCurrentTier] = useState(3) // Default: VIP tier
  const [userBalance, setUserBalance] = useState(12500)
  const [totalEarnings, setTotalEarnings] = useState(45750)
  const [todayEarnings, setTodayEarnings] = useState(0)
  const [withdrawableBalance] = useState(38500)
  const [copied, setCopied] = useState(false)

  const handleProgressChange = useCallback((newProgress: number) => {
    setProgress(newProgress)
  }, [])

  const handlePointsEarned = useCallback((points: number) => {
    setUserBalance((prev) => prev + points)
    setTotalEarnings((prev) => prev + points)
    setTodayEarnings(0) // Reset daily earnings after 24h cycle
  }, [])

  // Update today's earnings in real-time
  useEffect(() => {
    const dailyReward = tierRewards[currentTier as keyof typeof tierRewards] || 0
    const pointsPerSecond = dailyReward / (24 * 60 * 60)
    
    const interval = setInterval(() => {
      setTodayEarnings((prev) => {
        const newValue = prev + pointsPerSecond
        return Math.min(newValue, dailyReward)
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [currentTier])

  const getDailyReward = () => {
    return tierRewards[currentTier as keyof typeof tierRewards] || 0
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ar-SA').format(Math.floor(num))
  }

  const handleCopyReferral = () => {
    navigator.clipboard.writeText("PSG-VIP-7X8K2M")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <>
            <HeroCard balance={userBalance} totalEarnings={totalEarnings} />
            
            {/* Real-time Stats Cards */}
            <div className="px-4 grid grid-cols-2 gap-3 mb-4">
              {/* Today's Earnings - Live */}
              <div className="glass rounded-xl p-4 border border-neon-green/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                  <span className="text-xs text-muted-foreground">أرباح اليوم الحالية</span>
                </div>
                <p className="text-xl font-bold text-neon-green">{formatNumber(todayEarnings)}</p>
                <p className="text-[10px] text-muted-foreground">نقطة</p>
              </div>
              
              {/* Withdrawable Balance */}
              <div className="glass rounded-xl p-4 border border-gold/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-3 h-3 text-gold" />
                  <span className="text-xs text-muted-foreground">الرصيد القابل للسحب</span>
                </div>
                <p className="text-xl font-bold text-gold">{formatNumber(withdrawableBalance)}</p>
                <p className="text-[10px] text-muted-foreground">نقطة</p>
              </div>
            </div>

            <MiningEngine
              dailyReward={getDailyReward()}
              onProgressChange={handleProgressChange}
              onPointsEarned={handlePointsEarned}
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
              <h2 className="text-xl font-bold text-foreground">باقات الاستثمار</h2>
            </div>
            <SubscriptionTiers
              currentTier={currentTier}
              onSelectTier={setCurrentTier}
            />
          </div>
        )
      case "withdraw":
        return (
          <div className="p-4">
            <div className="flex items-center gap-2 mb-6">
              <Wallet className="w-5 h-5 text-gold" />
              <h2 className="text-xl font-bold text-foreground">السحب</h2>
            </div>
            
            {/* Withdrawable Balance Card */}
            <div className="glass rounded-2xl p-6 border border-gold/20 mb-6">
              <p className="text-sm text-muted-foreground mb-2">الرصيد القابل للسحب</p>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold text-gold-gradient">{formatNumber(withdrawableBalance)}</span>
                <span className="text-sm text-muted-foreground">نقطة</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald">
                <div className="w-2 h-2 rounded-full bg-emerald" />
                <span>متاح للسحب الآن</span>
              </div>
            </div>

            {/* Withdraw Methods */}
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">طرق السحب</h3>
            <div className="flex flex-col gap-3 mb-6">
              {[
                { name: "تحويل بنكي", icon: CreditCard, min: 10000, time: "2-3 أيام" },
                { name: "محفظة إلكترونية", icon: Wallet, min: 5000, time: "24 ساعة" },
                { name: "USDT", icon: ArrowDownCircle, min: 2500, time: "فوري" },
              ].map((method, index) => (
                <button
                  key={index}
                  className="glass rounded-xl p-4 border border-border hover:border-gold/30 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/20 to-emerald/10 flex items-center justify-center">
                      <method.icon className="w-5 h-5 text-gold" />
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-foreground">{method.name}</p>
                      <p className="text-xs text-muted-foreground">الحد الأدنى: {formatNumber(method.min)} نقطة</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-emerald">{method.time}</span>
                    <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                  </div>
                </button>
              ))}
            </div>

            {/* Recent Transactions */}
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
              <History className="w-4 h-4" />
              <span>آخر العمليات</span>
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { type: "سحب", amount: 5000, status: "مكتمل", date: "2024/01/15" },
                { type: "إيداع", amount: 25000, status: "مكتمل", date: "2024/01/10" },
              ].map((tx, index) => (
                <div
                  key={index}
                  className="glass rounded-xl p-3 border border-border flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{tx.type}</p>
                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-bold ${tx.type === "سحب" ? "text-destructive" : "text-emerald"}`}>
                      {tx.type === "سحب" ? "-" : "+"}{formatNumber(tx.amount)}
                    </p>
                    <p className="text-[10px] text-emerald">{tx.status}</p>
                  </div>
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

            {/* Referral Code */}
            <div className="glass rounded-xl p-4 border border-gold/20 mb-6">
              <p className="text-sm text-muted-foreground mb-2">كود الإحالة الخاص بك</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-mono font-bold text-gold">PSG-VIP-7X8K2M</span>
                <button
                  onClick={handleCopyReferral}
                  className="p-2 rounded-lg bg-gold/10 hover:bg-gold/20 transition-colors"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-emerald" />
                  ) : (
                    <Copy className="w-5 h-5 text-gold" />
                  )}
                </button>
              </div>
            </div>

            {/* Team Members */}
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">أعضاء الفريق</h3>
            <div className="flex flex-col gap-3">
              {[
                { name: "أحمد محمد", level: "نخبة", earnings: 1250 },
                { name: "فاطمة علي", level: "محترف", earnings: 890 },
                { name: "خالد سعيد", level: "أساسي", earnings: 450 },
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
                    <span className="text-sm font-semibold text-emerald">{formatNumber(member.earnings)}</span>
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
      {/* Background decorations with PSG watermarks */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-emerald/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-gold/3 rounded-full blur-3xl" />
        {/* PSG Watermark */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-[200px] font-bold text-gold/[0.02] font-mono select-none">
          PSG
        </div>
      </div>

      <div className="relative z-10">
        <Header userLevel={currentTier - 1} userName="مستخدم VIP" />
        {renderContent()}
      </div>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </main>
  )
}
