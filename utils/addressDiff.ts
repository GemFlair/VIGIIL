
export interface DiffSegment {
  text: string;
  type: 'match' | 'diff';
}

/**
 * Compares two addresses and returns diff segments
 */
export function getAddressDiff(addr1: string, addr2: string): DiffSegment[] {
  if (!addr1 || !addr2) return [];

  const segments: DiffSegment[] = [];
  const maxLen = Math.max(addr1.length, addr2.length);
  let i = 0;
  let currentSegment: DiffSegment = { text: '', type: 'match' };

  while (i < maxLen) {
    const char1 = addr1[i] || '';
    const char2 = addr2[i] || '';
    const isMatch = char1 === char2 && char1 !== '';

    if (isMatch && currentSegment.type === 'match') {
      currentSegment.text += char1;
    } else if (!isMatch && currentSegment.type === 'diff') {
      currentSegment.text += char1 || char2;
    } else {
      if (currentSegment.text) segments.push(currentSegment);
      currentSegment = {
        text: char1 || char2,
        type: isMatch ? 'match' : 'diff'
      };
    }
    i++;
  }

  if (currentSegment.text) segments.push(currentSegment);
  return segments;
}

/**
 * Calculates security score (0-100)
 */
export function calculateSecurityScore(level: string, similarity: number = 0, isTrusted: boolean = false): number {
  if (isTrusted) return 100;
  if (level === 'NEW') return 50;
  if (level === 'CAUTION') return 30;
  if (level === 'POISON') return Math.max(0, 30 - (similarity - 25));
  return 50;
}
