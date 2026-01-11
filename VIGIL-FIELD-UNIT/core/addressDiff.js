// VIGIL CORE: ADDRESS DIFF ENGINE
// VERSION: 1.1.2
// HEURISTIC COMPARISON & ENTROPY ANALYSIS

/**
 * Calculates Shannon Entropy of a string to detect non-random (Vanity) addresses
 */
export function calculateEntropy(str) {
  const len = str.length;
  const frequencies = {};
  for (let i = 0; i < len; i++) {
    const char = str[i];
    frequencies[char] = (frequencies[char] || 0) + 1;
  }
  return Object.values(frequencies).reduce((sum, freq) => {
    const p = freq / len;
    return sum - p * Math.log2(p);
  }, 0);
}

/**
 * Calculates visual similarity between two addresses (0-100)
 */
export function getSimilarityScore(addr1, addr2) {
  if (!addr1 || !addr2) return 0;
  if (addr1 === addr2) return 100;
  
  // Edge Matching (The 8-Character Blind Spot)
  const prefixMatch = addr1.slice(0, 4) === addr2.slice(0, 4);
  const suffixMatch = addr1.slice(-4) === addr2.slice(-4);
  
  if (!prefixMatch && !suffixMatch) return 0;

  // Levenshtein distance for inner characters
  const track = Array(addr2.length + 1).fill(null).map(() => Array(addr1.length + 1).fill(null));
  for (let i = 0; i <= addr1.length; i += 1) track[0][i] = i;
  for (let j = 0; j <= addr2.length; j += 1) track[j][0] = j;
  for (let j = 1; j <= addr2.length; j += 1) {
    for (let i = 1; i <= addr1.length; i += 1) {
      const indicator = addr1[i - 1] === addr2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1,
        track[j - 1][i] + 1,
        track[j - 1][i - 1] + indicator
      );
    }
  }
  const distance = track[addr2.length][addr1.length];
  const maxLen = Math.max(addr1.length, addr2.length);
  const similarity = ((maxLen - distance) / maxLen) * 100;

  // Add weight to edge matches as they are the primary deception vector
  let weightedSim = similarity;
  if (prefixMatch) weightedSim += 15;
  if (suffixMatch) weightedSim += 15;

  return Math.min(100, weightedSim);
}

export function getAddressDiff(addr1, addr2) {
  if (!addr1 || !addr2) return [];
  const segments = [];
  const maxLen = Math.max(addr1.length, addr2.length);
  let i = 0;
  let current = { text: '', type: 'match' };

  while (i < maxLen) {
    const c1 = addr1[i] || '';
    const c2 = addr2[i] || '';
    const isMatch = c1 === c2 && c1 !== '';

    if (isMatch && current.type === 'match') current.text += c1;
    else if (!isMatch && current.type === 'diff') current.text += c1 || c2;
    else {
      if (current.text) segments.push(current);
      current = { text: c1 || c2, type: isMatch ? 'match' : 'diff' };
    }
    i++;
  }
  if (current.text) segments.push(current);
  return segments;
}