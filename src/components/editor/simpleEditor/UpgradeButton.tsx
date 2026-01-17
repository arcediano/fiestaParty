// src/components/editor/simpleEditor/UpgradeButton.tsx
'use client';

import { Sparkles, Star, Zap, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UpgradeButtonProps {
  onClick: () => void;
  variant?: 'default' | 'gradient' | 'outline' | 'premium';
  size?: 'default' | 'sm' | 'lg';
  showIcon?: boolean;
  showBadge?: boolean;
  className?: string;
  isPremium?: boolean;
}

export function UpgradeButton({ 
  onClick, 
  variant = 'gradient',
  size = 'default',
  showIcon = true,
  showBadge = true,
  className,
  isPremium = false
}: UpgradeButtonProps) {
  // Si el usuario ya es premium, mostrar estado premium
  if (isPremium) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "group relative inline-flex items-center justify-center font-medium transition-all duration-300",
          "bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200",
          "text-amber-700 hover:text-amber-800 hover:from-amber-100 hover:to-yellow-100",
          "rounded-xl shadow-sm hover:shadow-md",
          {
            "px-4 py-2.5 text-sm": size === 'default',
            "px-3 py-1.5 text-xs": size === 'sm',
            "px-6 py-3 text-base": size === 'lg',
          },
          className
        )}
      >
        <div className="flex items-center gap-2">
          {showIcon && <Star className="h-4 w-4" />}
          <span className="font-semibold">Premium</span>
        </div>
        
        {/* Badge de estado */}
        {showBadge && (
          <div className="absolute -top-1.5 -right-1.5">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400 rounded-full animate-ping opacity-75"></div>
              <div className="relative h-3 w-3 bg-amber-500 rounded-full"></div>
            </div>
          </div>
        )}
        
        {/* Tooltip en hover */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Ver beneficios premium
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
            <div className="border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </button>
    );
  }

  // Variantes para usuarios no premium
  const variants = {
    default: cn(
      "bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700",
      "text-white shadow-lg hover:shadow-xl"
    ),
    gradient: cn(
      "bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-600 hover:via-rose-600 hover:to-pink-700",
      "text-white shadow-lg hover:shadow-xl relative overflow-hidden"
    ),
    outline: cn(
      "bg-white border-2 border-pink-500 text-pink-600 hover:bg-pink-50",
      "shadow-sm hover:shadow-md"
    ),
    premium: cn(
      "bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:via-yellow-500 hover:to-amber-600",
      "text-white shadow-lg hover:shadow-xl relative overflow-hidden"
    )
  };

  const sizes = {
    default: "px-5 py-2.5 text-sm",
    sm: "px-3 py-1.5 text-xs",
    lg: "px-7 py-3.5 text-base"
  };

  const icons = {
    default: <Sparkles className="h-4 w-4" />,
    gradient: <Zap className="h-4 w-4" />,
    outline: <Sparkles className="h-4 w-4" />,
    premium: <Crown className="h-4 w-4" />
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center justify-center font-semibold transition-all duration-300",
        "rounded-xl active:scale-95",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {/* Efecto de brillo para variante gradient */}
      {variant === 'gradient' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      )}
      
      {/* Efecto de partículas para variante premium */}
      {variant === 'premium' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          <div className="absolute -top-1 -right-1 h-2 w-2 bg-yellow-300 rounded-full animate-ping"></div>
        </>
      )}

      <div className="relative flex items-center gap-2">
        {showIcon && icons[variant]}
        <span>Upgrade</span>
      </div>
      
      {/* Badge "Popular" para variante gradient */}
      {variant === 'gradient' && showBadge && (
        <div className="absolute -top-2 -right-2">
          <div className="px-1.5 py-0.5 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-[10px] font-bold rounded-full">
            POPULAR
          </div>
        </div>
      )}
      
      {/* Tooltip en hover */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        Desbloquear funciones premium
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
          <div className="border-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </button>
  );
}

// Versión compacta para espacios reducidos
export function CompactUpgradeButton({ onClick, isPremium = false }: { onClick: () => void, isPremium?: boolean }) {
  if (isPremium) {
    return (
      <button
        onClick={onClick}
        className="relative p-2 bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-200 text-amber-700 rounded-lg hover:from-amber-200 hover:to-yellow-200 transition-colors group"
        title="Cuenta Premium"
      >
        <Star className="h-4 w-4" />
        <div className="absolute -top-1 -right-1 h-2 w-2 bg-amber-500 rounded-full animate-pulse"></div>
        
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Premium
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="relative p-2 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-lg hover:from-pink-700 hover:to-rose-700 transition-all shadow-md hover:shadow-lg group"
      title="Actualizar a Premium"
    >
      <Zap className="h-4 w-4" />
      <div className="absolute -top-1 -right-1 h-2 w-2 bg-amber-400 rounded-full animate-pulse"></div>
      
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        Upgrade
      </div>
    </button>
  );
}

// Versión con contador de características
export function FeatureUpgradeButton({ 
  onClick, 
  featureCount = 8 
}: { 
  onClick: () => void; 
  featureCount?: number;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 text-white rounded-xl p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
    >
      {/* Efecto de fondo animado */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      <div className="relative space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Crown className="h-5 w-5" />
            </div>
            <div className="text-left">
              <div className="font-bold text-lg">Premium</div>
              <div className="text-sm opacity-90">Desbloquea todo el potencial</div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold">$9.99</div>
            <div className="text-xs opacity-75">/mes</div>
          </div>
        </div>
        
        <div className="pt-3 border-t border-white/20">
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <span className="font-semibold">+{featureCount} características</span>
              <div className="text-xs opacity-75">exclusivas</div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4" />
              <span className="font-semibold">Upgrade</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

// Versión para la barra lateral o footer
export function SidebarUpgradeButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group relative w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white rounded-lg p-3 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center">
            <Zap className="h-4 w-4" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-sm">¿Necesitas más?</div>
            <div className="text-xs opacity-90">Actualiza a Premium</div>
          </div>
        </div>
        <div className="px-2 py-1 bg-white/20 rounded text-xs font-bold">
          NEW
        </div>
      </div>
      
      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-lg"></div>
    </button>
  );
}