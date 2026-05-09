"use client"

import { Home, Package, Wallet, Users } from "lucide-react"

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const navItems = [
  { id: "home", label: "الرئيسية", icon: Home },
  { id: "packages", label: "الباقات", icon: Package },
  { id: "withdraw", label: "السحب", icon: Wallet },
  { id: "team", label: "الفريق", icon: Users },
]

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-gold/20 safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-3">
        {navItems.map((item) => {
          const isActive = activeTab === item.id
          const Icon = item.icon

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-t from-gold/20 to-transparent'
                  : 'hover:bg-midnight-light'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className={`relative ${isActive ? 'animate-float' : ''}`}>
                <Icon
                  className={`w-5 h-5 transition-colors duration-300 ${
                    isActive ? 'text-gold' : 'text-muted-foreground'
                  }`}
                />
                {isActive && (
                  <div className="absolute -inset-2 bg-gold/20 rounded-full blur-lg -z-10" />
                )}
              </div>
              <span
                className={`text-[10px] font-medium transition-colors duration-300 ${
                  isActive ? 'text-gold' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 w-8 h-0.5 bg-gradient-to-l from-transparent via-gold to-transparent" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
