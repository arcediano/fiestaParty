// src/lib/hooks/useMediaQuery.ts
'use client';

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    
    // Actualizar estado inicial
    const updateMatches = () => setMatches(media.matches);
    updateMatches();
    
    // Escuchar cambios
    media.addEventListener('change', updateMatches);
    
    // Cleanup
    return () => media.removeEventListener('change', updateMatches);
  }, [query]);

  return matches;
}