// src/components/ui/buttons/FloatingActionButton.tsx
'use client';

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2, ArrowUp, MessageCircle, Share2 } from "lucide-react"

const fabVariants = cva(
  "inline-flex items-center justify-center rounded-full shadow-lg ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 hover:shadow-xl",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        premium: "bg-gradient-to-r from-primary to-accent text-white hover:opacity-90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "bg-background/80 backdrop-blur-sm border border-input hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-14 w-14 text-sm",
        sm: "h-12 w-12 text-xs",
        lg: "h-16 w-16 text-base",
        xl: "h-20 w-20 text-lg",
      },
      position: {
        "bottom-right": "fixed bottom-6 right-6",
        "bottom-left": "fixed bottom-6 left-6",
        "top-right": "fixed top-6 right-6",
        "top-left": "fixed top-6 left-6",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      position: "bottom-right",
    },
  }
)

export interface FloatingActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof fabVariants> {
  isLoading?: boolean
  icon?: React.ReactNode
  label?: string
  showLabel?: boolean
  pulse?: boolean
  badge?: number | string
  isVisible?: boolean
  isMobile?: boolean
  actionType?: 'scrollTop' | 'share' | 'contact' | 'create' | 'whatsapp'
}

const FloatingActionButton = React.forwardRef<HTMLButtonElement, FloatingActionButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    position = "bottom-right",
    isLoading, 
    icon, 
    label,
    showLabel = false,
    pulse = false,
    badge,
    isVisible = true,
    isMobile = false,
    actionType = 'scrollTop',
    children,
    onClick,
    ...props 
  }, ref) => {
    
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (actionType === 'scrollTop') {
        scrollToTop();
      }
      if (onClick) {
        onClick(e);
      }
    };
    
    const getDefaultIcon = () => {
      switch (actionType) {
        case 'scrollTop': return <ArrowUp className="h-5 w-5" />;
        case 'share': return <Share2 className="h-5 w-5" />;
        case 'contact': return <MessageCircle className="h-5 w-5" />;
        case 'whatsapp': return <span className="text-lg">💬</span>;
        default: return <ArrowUp className="h-5 w-5" />;
      }
    };
    
    const getDefaultLabel = () => {
      switch (actionType) {
        case 'scrollTop': return 'Volver arriba';
        case 'share': return 'Compartir';
        case 'contact': return 'Contactar';
        case 'whatsapp': return 'WhatsApp';
        case 'create': return 'Crear invitación';
        default: return 'Acción';
      }
    };
    
    if (!isVisible) return null;
    
    const buttonSize = isMobile ? 'sm' : size;
    const buttonPosition = isMobile ? 'bottom-right' : position;
    
    return (
      <div className={`${buttonPosition} z-50 flex items-center gap-2 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {showLabel && (label || getDefaultLabel()) && (
          <div className="bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium shadow-md border border-input animate-in fade-in slide-in-from-right-2 whitespace-nowrap">
            {label || getDefaultLabel()}
          </div>
        )}
        
        <button
          className={cn(
            fabVariants({ 
              variant: actionType === 'create' ? 'premium' : variant, 
              size: buttonSize, 
              position: undefined 
            }),
            pulse && "animate-pulse ring-2 ring-offset-2 ring-primary/50",
            className
          )}
          ref={ref}
          onClick={handleClick}
          disabled={isLoading || props.disabled}
          aria-label={label || getDefaultLabel()}
          {...props}
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              {icon || getDefaultIcon() || children}
              {badge !== undefined && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground animate-in zoom-in-50">
                  {badge}
                </span>
              )}
            </>
          )}
        </button>
      </div>
    )
  }
)

FloatingActionButton.displayName = "FloatingActionButton"

export { FloatingActionButton, fabVariants }