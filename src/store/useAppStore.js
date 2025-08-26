import { create } from "zustand";

export const useAppStore = create((set) => ({
  // crypto selection
  selectedCrypto: null,
  setSelectedCrypto: (crypto) => set({ selectedCrypto: crypto }),

  // stock selection
  selectedStock: null,
  setSelectedStock: (stock) => set({ selectedStock: stock }),
}));

export default useAppStore;
