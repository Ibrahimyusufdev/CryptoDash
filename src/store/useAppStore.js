// src/store/useAppStore.js
import { create } from "zustand";

export const useAppStore = create((set) => ({
  selectedCrypto: null,
  setSelectedCrypto: (crypto) => set({ selectedCrypto: crypto }),
}));
