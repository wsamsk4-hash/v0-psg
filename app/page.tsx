"use client"

import { useState, useCallback, useEffect } from "react"
import { Header } from "@/components/psg/header"
import { HeroCard } from "@/components/psg/hero-card"
import { MiningEngine } from "@/components/psg/mining-engine"
import { ProgressBar } from "@/components/psg/progress-bar"
import { SubscriptionTiers } from "@/components/psg/subscription-tiers"
import { BottomNav } from "@/components/psg/bottom-nav"
import { LoginScreen } from "@/components/psg/login-screen"
import { 
  Package, Wallet, User, ChevronLeft, TrendingUp, 
  ArrowDownCircle, History, CreditCard, Copy, Check,
  Gift, Users, Link2, Share2, Award, Settings, 
  Bell, Shield, HelpCircle, LogOut
} from "lucide-react"

// Tier reward mapping based on 7-month ROI: Price / 210 * 10000
const tierRewards = {
  1: 2380,   // Basic: $50 → 2,380 points
  2: 7140,   // Silver: $150 → 7,140 points
  3: 23800,  // Gold VIP: $500 → 23,800 points
  4: 47600,  // Elite: $1000 → 47,600 points
}

export default function PSGDinarsApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const [progress, setProgress] = useState(0)
  const [currentTier, setCurrentTier] = useState(3)
  const [userBalance, setUserBalance] = useState(125000)
  const [totalEarnings, setTotalEarnings] = useState(457500)
  const [todayEarnings, setTodayEarnings] = useState(0)
  const [withdrawableBalance] = useState(385000)
  const [copied, setCopied] = useState(false)
  const [referralCode] = useState("PSG-VIP-7X8K2M")

  const handleProgressChange = useCallback((newProgress: number) => {
    setProgress(newProgress)
  }, [])

  const handlePointsEarned = useCallback((points: number) => {
    setUserBalance((prev) => prev + points)
    setTotalEarnings((prev) => prev + points)
    setTodayEarnings(0)
  }, [])

  // Update today's earnings in real-time
  useEffect(() => {
    if (!isLoggedIn) return
    const dailyReward = tierRewards[currentTier as keyof typeof tierRewards] || 0
    const pointsPerSecond = dailyReward / (24 * 60 * 60)
    
    const interval = setInterval(() => {
      setTodayEarnings((prev) => {
        const newValue = prev + pointsPerSecond
        return Math.min(newValue, dailyReward)
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [currentTier, isLoggedIn])

  const getDailyReward = () => {
    return tierRewards[currentTier as keyof typeof tierRewards] || 0
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ar-SA').format(Math.floor(num))
  }

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return <LoginScreen onLogin={handleLogin} />
  }

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <>
            <HeroCard balance={userBalance} totalEarnings={totalEarnings} />
            
            {/* Real-time Stats Cards */}
            <div className="px-4 grid grid-cols-2 gap-3 mb-4">
              <div className="glass rounded-xl p-4 border border-neon-green/20">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                  <span className="text-xs text-muted-foreground">أرباح اليوم الحالية</span>
                </div>
                <p className="text-xl font-bold text-neon-green">{formatNumber(todayEarnings)}</p>
                <p className="text-[10px] text-muted-foreground">نقطة</p>
              </div>
              
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
            
            {/* Referral Section Preview */}
            <div className="px-4 mb-6">
              <div className="glass-gold rounded-2xl p-4 border border-gold/20">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-gold" />
                    <span className="font-bold text-foreground">نظام المكافآت</span>
                  </div>
                  <span className="text-xs text-emerald">+10% عمولة</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-midnight-light/50 border border-border">
                  <span className="text-sm font-mono text-gold">{referralCode}</span>
                  <button
                    onClick={handleCopyReferral}
                    className="p-2 rounded-lg bg-gold/10 hover:bg-gold/20 transition-colors"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald" />
                    ) : (
                      <Copy className="w-4 h-4 text-gold" />
                    )}
                  </button>
                </div>
              </div>
            </div>

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
      case "wallet":
        return (
          <div className="p-4">
            <div className="flex items-center gap-2 mb-6">
              <Wallet className="w-5 h-5 text-gold" />
              <h2 className="text-xl font-bold text-foreground">المحفظة</h2>
            </div>
            
            {/* Balance Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="glass rounded-xl p-4 border border-gold/20">
                <p className="text-xs text-muted-foreground mb-1">الرصيد الكلي</p>
                <p className="text-2xl font-bold text-gold-gradient">{formatNumber(userBalance)}</p>
                <p className="text-[10px] text-muted-foreground">نقطة</p>
              </div>
              <div className="glass rounded-xl p-4 border border-emerald/20">
                <p className="text-xs text-muted-foreground mb-1">قابل للسحب</p>
                <p className="text-2xl font-bold text-emerald">{formatNumber(withdrawableBalance)}</p>
                <p className="text-[10px] text-muted-foreground">نقطة</p>
              </div>
            </div>

            {/* Withdraw Methods */}
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">طرق السحب</h3>
            <div className="flex flex-col gap-3 mb-6">
              {[
                { name: "تحويل بنكي", icon: CreditCard, min: 10000, time: "2-3 أيام" },
                { name: "محفظة إلكترونية", icon: Wallet, min: 5000, time: "24 ساعة" },
                { name: "USDT (TRC20)", icon: ArrowDownCircle, min: 2500, time: "فوري" },
              ].map((method, index) => (
                <button
                  key={index}
                  className="glass rounded-xl p-4 border border-border hover:border-gold/30 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold/20 to-royal/10 flex items-center justify-center">
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

            {/* Transaction History */}
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
              <History className="w-4 h-4" />
              <span>آخر العمليات</span>
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { type: "سحب", amount: 50000, status: "مكتمل", date: "2024/01/15" },
                { type: "إيداع", amount: 250000, status: "مكتمل", date: "2024/01/10" },
                { type: "مكافأة", amount: 12500, status: "مكتمل", date: "2024/01/08" },
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
      case "profile":
        return (
          <div className="p-4">
            <div className="flex items-center gap-2 mb-6">
              <User className="w-5 h-5 text-gold" />
              <h2 className="text-xl font-bold text-foreground">الملف الشخصي</h2>
            </div>
            
            {/* Profile Card */}
            <div className="glass-gold rounded-2xl p-6 border border-gold/20 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                  <span className="text-2xl font-bold text-midnight">VIP</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">مستخدم VIP</h3>
                  <p className="text-sm text-muted-foreground">عضو منذ يناير 2024</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Award className="w-4 h-4 text-gold" />
                    <span className="text-xs text-gold">المستوى الذهبي</span>
                  </div>
                </div>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
                <div className="text-center">
                  <p className="text-xl font-bold text-gold">{formatNumber(totalEarnings)}</p>
                  <p className="text-[10px] text-muted-foreground">إجمالي الأرباح</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-emerald">12</p>
                  <p className="text-[10px] text-muted-foreground">الإحالات</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-foreground">45</p>
                  <p className="text-[10px] text-muted-foreground">أيام نشط</p>
                </div>
              </div>
            </div>

            {/* Referral Section */}
            <div className="glass rounded-xl p-4 border border-gold/20 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Gift className="w-5 h-5 text-gold" />
                <span className="font-bold text-foreground">نظام المكافآت</span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                احصل على 10% عمولة من أرباح كل صديق تدعوه!
              </p>
              
              {/* Referral Link */}
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">رابط الإحالة الخاص بك</p>
                <div className="flex items-center justify-between p-3 rounded-xl bg-midnight-light border border-border">
                  <div className="flex items-center gap-2">
                    <Link2 className="w-4 h-4 text-gold" />
                    <span className="text-sm font-mono text-gold">{referralCode}</span>
                  </div>
                  <button
                    onClick={handleCopyReferral}
                    className="px-3 py-1.5 rounded-lg bg-gold/10 hover:bg-gold/20 transition-colors flex items-center gap-1"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3 h-3 text-emerald" />
                        <span className="text-xs text-emerald">تم النسخ</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-gold" />
                        <span className="text-xs text-gold">نسخ</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Team Stats */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-midnight-light/50 border border-border text-center">
                  <Users className="w-5 h-5 text-gold mx-auto mb-1" />
                  <p className="text-lg font-bold text-foreground">12</p>
                  <p className="text-[10px] text-muted-foreground">أعضاء الفريق</p>
                </div>
                <div className="p-3 rounded-xl bg-midnight-light/50 border border-border text-center">
                  <TrendingUp className="w-5 h-5 text-emerald mx-auto mb-1" />
                  <p className="text-lg font-bold text-emerald">34,500</p>
                  <p className="text-[10px] text-muted-foreground">عمولات الفريق</p>
                </div>
              </div>

              {/* Share Button */}
              <button className="w-full mt-4 py-3 rounded-xl bg-gradient-to-l from-gold via-gold-light to-gold text-midnight font-bold text-sm transition-all hover:shadow-lg hover:shadow-gold/30 flex items-center justify-center gap-2">
                <Share2 className="w-4 h-4" />
                <span>مشاركة الرابط</span>
              </button>
            </div>

            {/* Settings Menu */}
            <div className="flex flex-col gap-2">
              {[
                { icon: Settings, label: "الإعدادات", color: "text-foreground" },
                { icon: Bell, label: "الإشعارات", color: "text-foreground" },
                { icon: Shield, label: "الأمان والخصوصية", color: "text-foreground" },
                { icon: HelpCircle, label: "المساعدة والدعم", color: "text-foreground" },
                { icon: LogOut, label: "تسجيل الخروج", color: "text-destructive" },
              ].map((item, index) => (
                <button
                  key={index}
                  onClick={() => item.label === "تسجيل الخروج" && setIsLoggedIn(false)}
                  className="glass rounded-xl p-4 border border-border hover:border-gold/20 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    <span className={`font-medium ${item.color}`}>{item.label}</span>
                  </div>
                  <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-background pb-24 carbon-fiber">
      {/* Background decorations */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-royal/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-gold/3 rounded-full blur-3xl" />
        {/* PSG Watermark */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-[200px] font-bold text-gold/[0.015] font-mono select-none">
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
