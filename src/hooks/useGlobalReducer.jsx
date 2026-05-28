import React, { createContext, useContext, useReducer } from 'react';
import { initialStore, storeReducer } from '../store.js';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialStore());
  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export default function useGlobalReducer() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useGlobalReducer must be used within StoreProvider');
  return context;
}
