// utils/purchaseUnlock.ts

import { useCoins } from "./coin/CoinContext";


export const purchaseUnlock = (price: number, onSuccess: () => void) => {
  const { spendCoins } = useCoins();
  const success = spendCoins(price);
  if (success) {
    onSuccess();
  }
};
