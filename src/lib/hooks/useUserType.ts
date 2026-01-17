'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export type UserType = 'casual' | 'professional' | 'unknown';

export function useUserType() {
  const { data: session, status } = useSession();
  const [userType, setUserType] = useState<UserType>('unknown');
  const [detectedIntention, setDetectedIntention] = useState<'personal' | 'business' | null>(null);

  // Detectar intención basada en comportamiento
  useEffect(() => {
    // Si el usuario ya está autenticado, es profesional
    if (session?.user) {
      setUserType('professional');
      return;
    }

    // Verificar localStorage para ver si hay intención guardada
    const savedIntention = localStorage.getItem('user_intention');
    if (savedIntention === 'business' || savedIntention === 'professional') {
      setUserType('professional');
      setDetectedIntention('business');
    } else if (savedIntention === 'personal' || savedIntention === 'casual') {
      setUserType('casual');
      setDetectedIntention('personal');
    }

    // Podríamos añadir más lógica de detección aquí:
    // - Dominio de email
    // - Referrer (si viene de búsquedas profesionales)
    // - Parámetros de URL
  }, [session, status]);

  const setIntention = (intention: 'personal' | 'business') => {
    localStorage.setItem('user_intention', intention);
    setDetectedIntention(intention);
    setUserType(intention === 'business' ? 'professional' : 'casual');
  };

  const clearIntention = () => {
    localStorage.removeItem('user_intention');
    setDetectedIntention(null);
    setUserType('unknown');
  };

  return {
    userType,
    detectedIntention,
    setIntention,
    clearIntention,
    isLoading: status === 'loading',
    isAuthenticated: !!session?.user,
  };
}