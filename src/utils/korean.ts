/**
 * Initial consonants (Chosung) list
 */
const CHOSUNG = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];

/**
 * Checks if a character is a Chosung (Initial Consonant).
 */
function isChosung(char: string): boolean {
  return CHOSUNG.includes(char);
}

/**
 * Extracts the Chosung from a Hangul character.
 * If the character is not a complete Hangul syllable but is a Chosung, returns it.
 * Otherwise returns the character itself.
 */
function getChosung(char: string): string {
  const code = char.charCodeAt(0);

  // Hangul Syllables: 0xAC00 ~ 0xD7A3
  if (code >= 0xac00 && code <= 0xd7a3) {
    const chosungIndex = Math.floor((code - 0xac00) / (21 * 28));
    return CHOSUNG[chosungIndex];
  }

  return char;
}

/**
 * Converts a string to its Chosung representation.
 */
function getChosungs(str: string): string {
  return str.split('').map(getChosung).join('');
}

/**
 * Checks if the text matches the query, supporting Chosung search.
 * @param text The target text to search in.
 * @param query The search query.
 */
export function isKoreanMatch(text: string, query: string): boolean {
  if (!query) return true;

  const normalizedText = text.normalize('NFC');
  const normalizedQuery = query.normalize('NFC');

  // Check if the query contains only Chosung characters
  const isChosungQuery = normalizedQuery.split('').every((char) => isChosung(char));

  if (isChosungQuery) {
    const textChosungs = getChosungs(normalizedText);
    return textChosungs.includes(normalizedQuery);
  }

  // Standard case-insensitive inclusion check
  return normalizedText.toLowerCase().includes(normalizedQuery.toLowerCase());
}
