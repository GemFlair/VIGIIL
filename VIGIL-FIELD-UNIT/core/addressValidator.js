// VIGIL CORE: ADDRESS VALIDATOR
// Mathematical Primitive + Sovereign Registry

const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

// SOVEREIGN MINT REGISTRY (PHASE 2 - IMPLEMENTATION)
export const CANONICAL_MINTS = {
  USDC: "EPjFW33rdLH2QD6LksXY33vMRfGct1grTparXMQ7fgc3",
  USDT: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
  SOL_WRAPPED: "So11111111111111111111111111111111111111112",
  SOL_NATIVE: "11111111111111111111111111111111"
};

export function isValidSolanaAddress(address) {
  if (!address || typeof address !== 'string') return false;
  if (address.length < 32 || address.length > 44) return false;
  for (let i = 0; i < address.length; i++) {
    if (!BASE58_ALPHABET.includes(address[i])) return false;
  }
  return true;
}

export function extractAddresses(text) {
  if (!text || typeof text !== 'string') return [];
  const regex = /[1-9A-HJ-NP-Za-km-z]{32,44}/g;
  return (text.match(regex) || []).filter(isValidSolanaAddress);
}