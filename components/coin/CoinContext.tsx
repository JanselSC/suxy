// context/CoinContext.tsx

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface CoinContextType {
  coins: number;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  setCoins: (amount: number) => void;
}

const CoinContext = createContext<CoinContextType | undefined>(undefined);

export const CoinProvider = ({ children }: { children: ReactNode }) => {
  const [coins, setCoins] = useState<number>(50); // Inicial, puedes cargar desde Firebase si quieres

  const addCoins = (amount: number) => {
    setCoins(prev => prev + amount);
  };

  const spendCoins = (amount: number) => {
    if (coins >= amount) {
      setCoins(prev => prev - amount);
      return true;
    } else {
      alert("No tienes suficientes monedas");
      return false;
    }
  };

  return (
    <CoinContext.Provider value={{ coins, addCoins, spendCoins, setCoins }}>
      {children}
    </CoinContext.Provider>
  );
};

export const useCoins = () => {
  const context = useContext(CoinContext);
  if (!context) throw new Error('useCoins must be used within CoinProvider');
  return context;
};
