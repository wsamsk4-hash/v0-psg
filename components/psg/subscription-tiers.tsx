"use client"

import { Crown, Star, Gem, Trophy, Sparkles, Check, ShoppingCart } from "lucide-react"

interface Tier {
  id: number
  nameAr: string
  nameEn: string
  price: number
  dailyReward: number
  icon: React.ReactNode
  color: string
  borderColor: string
  bgGradient: string
  badgeColor: string
  features: string[]
}

const tiers: Tier[] = [
  {
    id: 1,
    nameAr: "أساسي",
    nameEn: "Basic",
    price: 50,
    dailyReward: 2500,
    icon: <Star className="w-6 h-6" />,
    color: "text-amber-600",
    borderColor: "border-amber-600/30",
    bgGradient: "from-amber-600/10 to-amber-600/5",
    badgeColor: "bg-amber-600",
    features: ["دعم أساسي", "تقارير أسبوعية", "سحب شهري"]
  },
  {
    id: 2,
    nameAr: "محترف",
    nameEn: "Pro",
    price: 150,
    dailyReward: 7500,
    icon: <Crown className="w-6 h-6" />,
    color: "text-slate-300",
    borderColor: "border-slate-300/30",
    bgGradient: "from-slate-300/10 to-slate-300/5",
    badgeColor: "bg-slate-300",
    features: ["دعم متقدم", "تقارير يومية", "سحب أسبوعي", "مكافآت إضافية"]
  },
  {
    id: 3,
    nameAr: "VIP",
    nameEn: "VIP",
    price: 500,
    dailyReward: 25000,
    icon: <Gem className="w-6 h-6" />,
    color: "text-gold",
    borderColor: "border-gold/30",
    bgGradient: "from-gold/10 to-gold/5",
    badgeColor: "bg-gold",
    features: ["دعم VIP", "تقارير فورية", "سحب يومي", "مكافآت مضاعفة", "أولوية المعاملات"]
  },
  {
    id: 4,
    nameAr: "نخبة",
    nameEn: "Elite",
    price: 1000,
    dailyReward: 50000,
    icon: <Trophy className="w-6 h-6" />,
    color: "text-emerald",
    borderColor: "border-emerald/30",
    bgGradient: "from-emerald/10 to-emerald/5",
    badgeColor: "bg-emerald",
    features: ["دعم حصري ٢٤/٧", "تقارير مخصصة", "سحب فوري", "مكافآت VIP", "عضوية مدى الحياة", "إدارة حساب خاص"]
  }
]

interface SubscriptionTiersProps {
  currentTier: number
  onSelectTier: (tierId: number) => void
}

export function SubscriptionTiers({ currentTier, onSelectTier }: SubscriptionTiersProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ar-SA').format(num)
  }

  return (
    <div className="px-4 pb-8">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-gold" />
        <h2 className="text-xl font-bold text-foreground">باقات الاستثمار</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        اختر الباقة المناسبة لك واستمتع بأرباح يومية مضمونة
      </p>

      {/* Tiers List */}
      <div className="flex flex-col gap-4">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={`relative overflow-hidden rounded-2xl p-5 text-right transition-all duration-300 ${
              currentTier === tier.id
                ? `glass ${tier.borderColor} border-2 scale-[1.02]`
                : 'glass border border-border hover:border-gold/20'
            }`}
          >
            {/* Background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-l ${tier.bgGradient} opacity-50`} />
            
            {/* Gold badge for each tier */}
            <div className={`absolute top-3 left-3 w-8 h-8 rounded-full ${tier.badgeColor} flex items-center justify-center shadow-lg`}>
              <span className="text-midnight text-xs font-bold">{tier.id}</span>
            </div>

            {/* Current tier badge */}
            {currentTier === tier.id && (
              <div className="absolute top-3 left-14 px-2 py-1 rounded-full bg-neon-green/20 text-neon-green text-[10px] font-semibold flex items-center gap-1">
                <Check className="w-3 h-3" />
                <span>الباقة الحالية</span>
              </div>
            )}

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                {/* Tier Info */}
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.bgGradient} flex items-center justify-center ${tier.color} border border-current/20`}>
                    {tier.icon}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className={`text-lg font-bold ${tier.color}`}>{tier.nameAr}</span>
                    <span className="text-xs text-muted-foreground font-mono">{tier.nameEn}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex flex-col items-end">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-foreground">${tier.price}</span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">دولار أمريكي</span>
                </div>
              </div>

              {/* Daily Reward in Points */}
              <div className="flex items-center justify-between mb-4 p-3 rounded-xl bg-midnight-light/50 border border-gold/10">
                <span className="text-sm text-muted-foreground">العائد اليومي</span>
                <div className="flex items-center gap-1">
                  <span className="text-lg font-bold text-gold">{formatNumber(tier.dailyReward)}</span>
                  <span className="text-xs text-gold">نقطة</span>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-4">
                {tier.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 rounded-full bg-midnight-light text-[10px] text-muted-foreground border border-border"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Buy Button */}
              <button
                onClick={() => onSelectTier(tier.id)}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                  currentTier === tier.id
                    ? 'bg-muted text-muted-foreground cursor-default'
                    : 'bg-gradient-to-l from-gold via-gold-light to-gold text-midnight hover:shadow-lg hover:shadow-gold/30'
                }`}
                disabled={currentTier === tier.id}
              >
                {currentTier === tier.id ? (
                  <span>مفعّل</span>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4" />
                    <span>شراء الآن</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
