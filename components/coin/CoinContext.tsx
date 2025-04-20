// context/CoinContext.tsx

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { doc, getDoc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebaseConfig'; // ajusta si está en otra ruta
import { useAuth } from '@/AuthContext'; // asegúrate que este hook tenga acceso al user

interface CoinContextType {
  coins: number;
  addCoins: (amount: number) => Promise<void>;
  spendCoins: (amount: number) => Promise<boolean>;
  setCoins: (amount: number) => void;
}

const CoinContext = createContext<CoinContextType | undefined>(undefined);

export const CoinProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth(); // ← obtiene el usuario autenticado
  const [coins, setCoins] = useState<number>(0);

  // Leer tokens en tiempo real
  useEffect(() => {
    if (!user) return;

    const userRef = doc(db, 'usuarios', user.uid);

    const unsubscribe = onSnapshot(userRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setCoins(data.tokens || 0);
      }
    });

    return unsubscribe;
  }, [user]);

  const addCoins = async (amount: number) => {
    if (!user) return;
    const userRef = doc(db, 'usuarios', user.uid);

    await updateDoc(userRef, {
      tokens: coins + amount,
      historial: arrayUnion({
        tipo: 'compra',
        cantidad: amount,
        metodo: 'paypal',
        fecha: new Date().toISOString(),
      }),
    });
  };

  const spendCoins = async (amount: number) => {
    if (!user) return false;

    if (coins >= amount) {
      const userRef = doc(db, 'usuarios', user.uid);

      await updateDoc(userRef, {
        tokens: coins - amount,
        historial: arrayUnion({
          tipo: 'gasto',
          cantidad: amount,
          motivo: 'desbloqueo de contenido',
          fecha: new Date().toISOString(),
        }),
      });

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
