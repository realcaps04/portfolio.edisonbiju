import { createContext, useContext } from 'react';

export const PwaContext = createContext(null);

export function usePwa() {
  const context = useContext(PwaContext);
  if (!context) {
    throw new Error('usePwa must be used inside PwaProvider');
  }
  return context;
}
