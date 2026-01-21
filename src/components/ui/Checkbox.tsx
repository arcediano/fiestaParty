'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const checkboxId = id || React.useId()

    return (
      <div className="flex flex-col">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              id={checkboxId}
              type="checkbox"
              ref={ref}
              className={cn(
                'peer h-4 w-4 appearance-none rounded-sm border border-input',
                'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                'disabled:cursor-not-allowed disabled:opacity-50',
                'checked:bg-primary checked:border-primary',
                'transition-colors duration-200',
                className
              )}
              {...props}
            />
            <Check
              className={cn(
                'absolute left-0 top-0 h-4 w-4 text-white',
                'pointer-events-none opacity-0 peer-checked:opacity-100',
                'transition-opacity duration-200'
              )}
            />
          </div>
          {label && (
            <label
              htmlFor={checkboxId}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {label}
            </label>
          )}
        </div>
        {error && (
          <p className="mt-1 text-sm text-destructive">{error}</p>
        )}
      </div>
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }