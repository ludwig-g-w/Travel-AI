export interface BalanceResponse {
  bch?: number;
  sat?: number;
  USD?: number;
  EUR?: number;
  GBP?: number;
  [key: string]: number | undefined;
}

export async function convert(
  amount: number,
  fromUnit: string,
  toUnit: string
): Promise<number> {
  // This would normally be implemented by the mainnet-js library
  // This is just a mock implementation
  return amount * 50000; // Mock conversion rate
}
