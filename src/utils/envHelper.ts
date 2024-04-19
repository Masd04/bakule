/**
 * Ensures that an environment variable is set and returns its value.
 * Throws an error if the variable is not set.
 * 
 * @param key - The name of the environment variable.
 * @returns The value of the environment variable.
 */
export function ensureEnvVariable(key: string): string {
    const value = process.env[key];
    if (value === undefined) {
      throw new Error(`Environment variable ${key} is not set`);
    }
    return value;
  }