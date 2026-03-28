import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_COINS = 100;

type CoinStore = {
  coins: number;
  maxCoins: number;
  earn: (amount?: number) => void;
  spend: (amount: number) => boolean; // 잔액 부족 시 false
};

export const useCoinStore = create<CoinStore>()(
  persist(
    (set, get) => ({
      coins: 0,
      maxCoins: MAX_COINS,

      earn: (amount = 1) =>
        set((s) => ({ coins: Math.min(s.coins + amount, MAX_COINS) })),

      spend: (amount) => {
        if (get().coins < amount) return false;
        set((s) => ({ coins: s.coins - amount }));
        return true;
      },
    }),
    { name: "coin-store" }
  )
);
