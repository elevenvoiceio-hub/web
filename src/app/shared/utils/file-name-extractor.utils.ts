/**
 * Extracts the filename (including the extension) from a full URL string.
 * * @param {string} urlString The full URL (e.g., 'https://example.com/path/to/file.ext').
 * @returns {string} The extracted filename or an empty string if the URL is invalid or malformed.
 */
export function getFileNameFromUrl(urlString: string): string {
  // Check if the URL is valid before proceeding
  if (!urlString || typeof urlString !== 'string') {
    console.error('Invalid URL provided.');
    return '';
  }

  // 1. Find the index of the last forward slash ('/')
  const lastSlashIndex = urlString.lastIndexOf('/');

  // 2. If a slash is found, return the substring starting from the character after it.
  if (lastSlashIndex !== -1) {
    // If the last character is a slash, it means the URL points to a directory, not a file.
    if (lastSlashIndex === urlString.length - 1) {
      return ''; // Return empty string for directory URLs
    }

    // Return the segment after the last slash.
    return urlString.substring(lastSlashIndex + 1);
  }

  // 3. If no slash is found (e.g., "file.txt"), return the whole string (which is the filename).
  return urlString;
}
