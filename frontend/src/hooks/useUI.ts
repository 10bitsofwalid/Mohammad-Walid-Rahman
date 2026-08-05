import { useContext } from 'react';
import { UIContext, UIContextType } from '../context/UIContextDef';

export function useUI(): UIContextType {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}

export const useUIContext = useUI;
