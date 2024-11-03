import { create } from "zustand";
import { BalanceResponse } from "mainnet-js";

interface Wallet {
  address: string;
  tokenaddr: string;
  // Add other wallet properties as needed
}

interface StoreState {
  wallet: Wallet | null;
  balance: BalanceResponse | null;
  network: "mainnet" | "testnet";
  tokenList: any[]; // Replace 'any' with proper token type
  maxAmountToSend: {
    bch?: number;
    sat?: number;
  } | null;
}

export const useStore = create<StoreState>((set) => ({
  wallet: null,
  balance: null,
  network: "mainnet",
  tokenList: [],
  maxAmountToSend: null,
}));
