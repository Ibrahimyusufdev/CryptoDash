import { create } from "zustand";

export const useAppStore = create((set) => ({
  // crypto selection
  selectedCrypto: null,
  setSelectedCrypto: (crypto) => set({ selectedCrypto: crypto }),

  // stock selection
  selectedStock: null,
  setSelectedStock: (stock) => set({ selectedStock: stock }),

  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "light" ? "dark" : "light",
    })),
}));

export default useAppStore;
