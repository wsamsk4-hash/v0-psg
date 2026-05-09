"use client"

import { useState } from "react"
import { Hexagon, Sparkles } from "lucide-react"

interface LoginScreenProps {
  onLogin: () => void
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [isLoading, setIsLoading] = useState<string | null>(null)

  const handleSocialLogin = (provider: string) => {
    setIsLoading(provider)
    // Simulate login delay
    setTimeout(() => {
      setIsLoading(null)
      onLogin()
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Carbon fiber background pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(212, 175, 55, 0.03) 2px,
              rgba(212, 175, 55, 0.03) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(212, 175, 55, 0.03) 2px,
              rgba(212, 175, 55, 0.03) 4px
            )
          `,
          backgroundSize: '8px 8px'
        }}
      />
      
      {/* Glowing orbs */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-royal/20 rounded-full blur-3xl" />

      {/* Logo Section */}
      <div className="relative z-10 flex flex-col items-center mb-12">
        {/* Animated hex logo */}
        <div className="relative mb-6">
          <div className="w-28 h-28 relative">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 animate-spin-slow">
              <Hexagon className="w-28 h-28 text-gold/30" strokeWidth={1} />
            </div>
            {/* Inner hex */}
            <div className="absolute inset-3 flex items-center justify-center">
              <Hexagon className="w-20 h-20 text-gold fill-gold/20" strokeWidth={1.5} />
            </div>
            {/* Center glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark animate-pulse-gold" />
            </div>
          </div>
          {/* Sparkle effects */}
          <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-gold animate-pulse" />
          <Sparkles className="absolute -bottom-1 -left-3 w-4 h-4 text-gold/70 animate-pulse delay-300" />
        </div>

        {/* Brand name */}
        <h1 className="text-4xl font-bold metallic-gold mb-2 tracking-tight font-mono">
          PSG Dinars
        </h1>
        <p className="text-muted-foreground text-sm">
          منصة الاستثمار الرقمي الفاخرة
        </p>
      </div>

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-sm">
        <div className="glass rounded-3xl p-6 border border-gold/20">
          <h2 className="text-xl font-bold text-center text-foreground mb-2">
            مرحباً بك
          </h2>
          <p className="text-sm text-muted-foreground text-center mb-6">
            سجل دخولك للوصول إلى حسابك
          </p>

          {/* Social Login Buttons */}
          <div className="flex flex-col gap-3">
            {/* Google Login */}
            <button
              onClick={() => handleSocialLogin('google')}
              disabled={isLoading !== null}
              className="w-full py-4 px-6 rounded-xl bg-white/5 border border-white/10 hover:border-gold/30 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading === 'google' ? (
                <div className="w-5 h-5 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              <span className="font-medium text-foreground">
                {isLoading === 'google' ? 'جاري التسجيل...' : 'تسجيل الدخول بـ Google'}
              </span>
            </button>

            {/* Facebook Login */}
            <button
              onClick={() => handleSocialLogin('facebook')}
              disabled={isLoading !== null}
              className="w-full py-4 px-6 rounded-xl bg-[#1877F2]/10 border border-[#1877F2]/30 hover:border-[#1877F2]/50 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading === 'facebook' ? (
                <div className="w-5 h-5 border-2 border-[#1877F2]/30 border-t-[#1877F2] rounded-full animate-spin" />
              ) : (
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              )}
              <span className="font-medium text-foreground">
                {isLoading === 'facebook' ? 'جاري التسجيل...' : 'تسجيل الدخول بـ Facebook'}
              </span>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">أو</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Guest Continue */}
          <button
            onClick={() => handleSocialLogin('guest')}
            disabled={isLoading !== null}
            className="w-full py-4 rounded-xl bg-gradient-to-l from-gold via-gold-light to-gold text-midnight font-bold transition-all hover:shadow-lg hover:shadow-gold/30 disabled:opacity-50"
          >
            {isLoading === 'guest' ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-midnight/30 border-t-midnight rounded-full animate-spin" />
                جاري الدخول...
              </span>
            ) : (
              'متابعة كضيف'
            )}
          </button>
        </div>

        {/* Terms */}
        <p className="text-[10px] text-muted-foreground text-center mt-4 px-4">
          بالمتابعة، أنت توافق على{' '}
          <span className="text-gold">شروط الخدمة</span>
          {' '}و{' '}
          <span className="text-gold">سياسة الخصوصية</span>
        </p>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gold/5 to-transparent" />
    </div>
  )
}
