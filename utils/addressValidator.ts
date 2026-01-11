
const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

/**
 * Validates if a string is a valid Solana address
 * @param {string} address - Address to validate
 * @returns {boolean} - True if valid Solana address
 */
export function isValidSolanaAddress(address: string): boolean {
  if (!address || typeof address !== 'string') return false;
  if (address.length < 32 || address.length > 44) return false;

  for (let i = 0; i < address.length; i++) {
    if (!BASE58_ALPHABET.includes(address[i])) return false;
  }
  return true;
}

/**
 * Extracts Solana addresses from text
 */
export function extractAddresses(text: string): string[] {
  if (!text || typeof text !== 'string') return [];
  const addressRegex = /[1-9A-HJ-NP-Za-km-z]{32,44}/g;
  const matches = text.match(addressRegex) || [];
  return matches.filter(addr => isValidSolanaAddress(addr));
}
