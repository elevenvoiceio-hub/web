export function mapRange(inputX: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  // Check for division by zero (if inMin equals inMax)
  if (inMin === inMax) {
    console.error("Input range min and max cannot be equal.");
    return outMin; // or throw an error
  }

  // The core linear mapping formula:
  // Y = ((X - A) / (B - A)) * (D - C) + C
  const mappedY = (
    (inputX - inMin) * (outMax - outMin) / (inMax - inMin)
  ) + outMin;

  return mappedY;
}
