import { create } from "zustand";

interface SettingsState {
  bchUnit: "bch" | "sat";
  currency: "USD" | "EUR" | "GBP"; // Add other currencies as needed
}

export const useSettingsStore = create<SettingsState>((set) => ({
  bchUnit: "bch",
  currency: "USD",
}));
