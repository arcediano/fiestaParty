'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { SubscriptionProvider } from '@/components/providers/subscription-provider'
import { Toaster } from 'sonner'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode } from 'react'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minuto
      refetchOnWindowFocus: false,
    },
  },
})

interface ProvidersProps {
  children: ReactNode
  session?: any
}

export function Providers({ children, session }: ProvidersProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SubscriptionProvider>
            {children}
            <Toaster 
              position="top-right"
              toastOptions={{
                classNames: {
                  success: 'bg-green-50 text-green-800 border-green-200',
                  error: 'bg-red-50 text-red-800 border-red-200',
                  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
                  info: 'bg-blue-50 text-blue-800 border-blue-200',
                },
              }}
            />
          </SubscriptionProvider>
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  )
}