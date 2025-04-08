/**
 * Verify if a string is valid JSON
 * @param jsonString - String to verify
 * @returns True if valid JSON, false otherwise
 */
export const verifyJSON = (jsonString: string): boolean => {
  if (!jsonString) return true;
  try {
    JSON.parse(jsonString);
    return true;
  } catch (err) {
    return false;
  }
};
