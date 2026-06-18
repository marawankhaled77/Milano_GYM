import React from 'react';
import { Home, CreditCard, QrCode, ShoppingBag, User } from 'lucide-react';

export default function BottomNav({ currentScreen, setScreen, cartCount }) {
  const navItems = [
    { id: 'dashboard', label: 'الرئيسية', icon: Home },
    { id: 'plans', label: 'الاشتراكات', icon: CreditCard },
    { id: 'my-id', label: 'هويتي', icon: QrCode, isSpecial: true },
    { id: 'shop', label: 'المتجر', icon: ShoppingBag, hasBadge: true },
    { id: 'profile', label: 'حسابي', icon: User }
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[76px] bg-[#0c0c0e]/95 backdrop-blur-md border-t border-white/5 px-6 pb-2 pt-1.5 flex items-center justify-between z-40 select-none md:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentScreen === item.id || (item.id === 'dashboard' && currentScreen === 'dashboard');

        if (item.isSpecial) {
          return (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className="relative -top-5 flex flex-col items-center justify-center group cursor-pointer"
            >
              <div className={`w-[56px] h-[56px] rounded-full flex items-center justify-center transition-all duration-300 ${
                currentScreen === 'my-id'
                  ? 'bg-gym-gold text-black gold-glow-strong scale-105'
                  : 'bg-[#18181b] text-gym-gold border border-gym-gold/20 hover:border-gym-gold/50 hover:bg-[#202024]'
              }`}>
                <Icon size={26} className="animate-pulse" />
              </div>
              <span className={`text-[10px] mt-1 font-medium tracking-wide transition-all ${
                currentScreen === 'my-id' ? 'text-gym-gold font-bold' : 'text-gym-gray'
              }`}>
                {item.label}
              </span>
            </button>
          );
        }

        return (
          <button
            key={item.id}
            onClick={() => setScreen(item.id)}
            className="flex flex-col items-center justify-center py-2 relative flex-1 text-center group cursor-pointer"
          >
            <div className={`transition-all duration-300 relative ${
              isActive ? 'text-gym-gold scale-110' : 'text-gym-gray group-hover:text-white'
            }`}>
              <Icon size={20} />
              
              {/* Badge for shopping cart */}
              {item.hasBadge && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-gym-gold text-black text-[9px] font-bold w-[15px] h-[15px] rounded-full flex items-center justify-center border border-[#0c0c0e] font-mono">
                  {cartCount}
                </span>
              )}
            </div>
            
            <span className={`text-[10px] mt-1 transition-all ${
              isActive ? 'text-gym-gold font-semibold' : 'text-gym-gray group-hover:text-white/80'
            }`}>
              {item.label}
            </span>

            {/* Active state indicator dot */}
            {isActive && (
              <span className="absolute bottom-0 w-[4px] h-[4px] rounded-full bg-gym-gold"></span>
            )}
          </button>
        );
      })}
    </div>
  );
}
