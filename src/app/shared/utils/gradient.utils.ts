/**
 * Generates a unique linear gradient CSS string based on the input string (name).
 * If the input string is empty, it will return a default gradient.
 * @param {string} name The input string to generate the gradient from.
 * @returns {string} A linear gradient CSS string.
 */
export const randomGradient = (name: string): string => {
  name = name.trim();
  if (!name) {
    return 'linear-gradient(45deg, #a78bfa, #818cf8)'; // Reset to default
  }

  const hash = stringToHash(name);
  const randomFn = seededRandom(hash);

  const gradientValue = generateRandomGradient(randomFn);

  return gradientValue;
};

/**
 * Simple string hashing function to create a seed for the random number generator.
 * This ensures the same name produces the same hash, leading to the same gradient.
 * @param {string} str The input string (name).
 * @returns {number} A numerical hash.
 */
function stringToHash(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash); // Ensure positive hash
}

/**
 * A simple pseudo-random number generator (PRNG) using a seed.
 * @param {number} seed The initial seed for the PRNG.
 * @returns {function(): number} A function that returns a pseudo-random number between 0 (inclusive) and 1 (exclusive).
 */
function seededRandom(seed: number) {
  let s = seed % 2147483647; // Ensure seed is within a reasonable range
  if (s <= 0) s += 2147483646; // Handle zero or negative seeds

  return function () {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

/**
 * Generates a random HSL color based on a seeded PRNG.
 * HSL (Hue, Saturation, Lightness) is great for generating visually distinct colors.
 * @param {function(): number} randomFn The seeded random number generator function.
 * @returns {string} An HSL color string (e.g., "hsl(240, 100%, 50%)").
 */
function generateRandomHSLColor(randomFn: () => number) {
  const h = Math.floor(randomFn() * 360); // Hue: 0-359
  const s = Math.floor(randomFn() * 30) + 70; // Saturation: 70-100% (avoiding dull colors)
  const l = Math.floor(randomFn() * 20) + 40; // Lightness: 40-60% (avoiding too dark/light)
  return `hsl(${h}, ${s}%, ${l}%)`;
}

/**
 * Generates a random linear gradient CSS string.
 * @param {function(): number} randomFn The seeded random number generator function.
 * @returns {string} A CSS linear-gradient value.
 */
function generateRandomGradient(randomFn: () => number) {
  const angle = Math.floor(randomFn() * 360); // Angle: 0-359 degrees
  const numColors = Math.floor(randomFn() * 2) + 2; // 2 or 3 colors
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    colors.push(generateRandomHSLColor(randomFn));
  }
  return `linear-gradient(${angle}deg, ${colors.join(', ')})`;
}
