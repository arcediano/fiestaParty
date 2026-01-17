// src/components/ui/buttons/FloatingActionMenu.tsx - VERSIÓN SIMPLIFICADA
'use client';

import * as React from "react";
import { cn } from "@/lib/utils";
import { 
  Plus, 
  X, 
  ArrowUp, 
  Share2, 
  MessageCircle,
  Heart,
  Calendar,
  FileText,
  Users,
  Sparkles,
  Crown,
  Rocket
} from "lucide-react";

export interface FabMenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'destructive' | 'premium' | 'success' | 'warning' | 'info';
  badge?: number | string;
  disabled?: boolean;
}

export interface FloatingActionMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: FabMenuItem[];
  mainIcon?: React.ReactNode;
  closeIcon?: React.ReactNode;
  isOpen?: boolean;
  onMenuToggle?: (isOpen: boolean) => void;
  direction?: 'up' | 'down' | 'left' | 'right';
  labelPosition?: 'left' | 'right';
  showLabels?: boolean;
  isMobile?: boolean;
  backdrop?: boolean;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center-bottom';
}

const FloatingActionMenu = React.forwardRef<HTMLDivElement, FloatingActionMenuProps>(
  ({ 
    className,
    position = "bottom-right",
    items = [],
    mainIcon,
    closeIcon,
    isOpen: controlledIsOpen,
    onMenuToggle,
    direction = "up",
    labelPosition = "right",
    showLabels = true,
    isMobile = false,
    backdrop = true,
    children,
    ...props 
  }, ref) => {
    const [internalIsOpen, setInternalIsOpen] = React.useState(false);
    const isControlled = controlledIsOpen !== undefined;
    const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
    
    const toggleMenu = () => {
      const newState = !isOpen;
      if (!isControlled) {
        setInternalIsOpen(newState);
      }
      if (onMenuToggle) {
        onMenuToggle(newState);
      }
    };
    
    const handleItemClick = (item: FabMenuItem) => {
      if (!item.disabled) {
        item.onClick();
        if (!isControlled) {
          setInternalIsOpen(false);
        }
        if (onMenuToggle) {
          onMenuToggle(false);
        }
      }
    };
    
    const getPositionClass = () => {
      switch (position) {
        case 'bottom-right': return 'bottom-6 right-6';
        case 'bottom-left': return 'bottom-6 left-6';
        case 'top-right': return 'top-6 right-6';
        case 'top-left': return 'top-6 left-6';
        case 'center-bottom': return 'bottom-6 left-1/2 -translate-x-1/2';
        default: return 'bottom-6 right-6';
      }
    };
    
    const getVariantClass = (variant: FabMenuItem['variant'] = 'default') => {
      switch (variant) {
        case 'primary': return 'bg-primary text-primary-foreground hover:bg-primary/90';
        case 'secondary': return 'bg-secondary text-secondary-foreground hover:bg-secondary/80';
        case 'accent': return 'bg-accent text-accent-foreground hover:bg-accent/90';
        case 'destructive': return 'bg-destructive text-destructive-foreground hover:bg-destructive/90';
        case 'premium': return 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90';
        case 'success': return 'bg-green-500 text-white hover:bg-green-600';
        case 'warning': return 'bg-yellow-500 text-white hover:bg-yellow-600';
        case 'info': return 'bg-blue-500 text-white hover:bg-blue-600';
        default: return 'bg-primary text-primary-foreground hover:bg-primary/90';
      }
    };
    
    const getDelayClass = (index: number) => {
      const delays = [
        'delay-75',
        'delay-100',
        'delay-150',
        'delay-200',
        'delay-250',
        'delay-300',
        'delay-350',
        'delay-400',
      ];
      return delays[Math.min(index, delays.length - 1)];
    };
    
    // Items por defecto
    const defaultItems: FabMenuItem[] = [
      {
        id: 'create',
        label: 'Crear Evento',
        icon: <Sparkles className="h-5 w-5" />,
        onClick: () => {
          window.location.href = '/create';
        },
        variant: 'premium',
      },
      {
        id: 'share',
        label: 'Compartir',
        icon: <Share2 className="h-5 w-5" />,
        onClick: () => {
          if (navigator.share) {
            navigator.share({
              title: 'Fiesta Party',
              text: '¡Crea invitaciones increíbles!',
              url: window.location.href,
            });
          } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Enlace copiado');
          }
        },
        variant: 'info',
      },
      {
        id: 'contact',
        label: 'Contactar',
        icon: <MessageCircle className="h-5 w-5" />,
        onClick: () => {
          console.log('Abrir contacto');
        },
        variant: 'accent',
      },
      {
        id: 'scroll-top',
        label: 'Volver Arriba',
        icon: <Rocket className="h-5 w-5" />,
        onClick: () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        variant: 'primary',
      },
    ];
    
    const menuItems = items.length > 0 ? items : defaultItems;
    
    return (
      <>
        {/* Backdrop */}
        {backdrop && isOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => {
              if (!isControlled) setInternalIsOpen(false);
              if (onMenuToggle) onMenuToggle(false);
            }}
          />
        )}
        
        <div
          ref={ref}
          className={cn(
            "fixed z-50 flex flex-col items-end gap-3 transition-all duration-300",
            getPositionClass(),
            className
          )}
          {...props}
        >
          {/* Items del menú */}
          {menuItems.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "flex items-center gap-2 transition-all duration-300",
                direction === 'left' || direction === 'right' ? 'flex-row' : 'flex-col',
                isOpen 
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4 pointer-events-none',
                getDelayClass(index)
              )}
            >
              {showLabels && (
                <div
                  className={cn(
                    "bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium shadow-md border border-gray-200 dark:border-gray-700 whitespace-nowrap",
                    labelPosition === 'left' ? 'order-2' : 'order-1',
                    direction === 'left' ? 'mr-2' : direction === 'right' ? 'ml-2' : ''
                  )}
                >
                  {item.label}
                </div>
              )}
              
              <button
                className={cn(
                  "inline-flex items-center justify-center rounded-full h-12 w-12 shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2",
                  getVariantClass(item.variant),
                  item.disabled && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => handleItemClick(item)}
                disabled={item.disabled}
                aria-label={item.label}
              >
                {item.icon}
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            </div>
          ))}
          
          {/* Botón principal */}
          <button
            className={cn(
              "inline-flex items-center justify-center rounded-full h-14 w-14 shadow-xl transition-all duration-300 hover:shadow-2xl active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2",
              "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90",
              isOpen && "rotate-45"
            )}
            onClick={toggleMenu}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              closeIcon || <X className="h-6 w-6" />
            ) : (
              mainIcon || <Plus className="h-6 w-6" />
            )}
          </button>
        </div>
      </>
    );
  }
);

FloatingActionMenu.displayName = "FloatingActionMenu";

export { FloatingActionMenu };