// Removes duplicates from array for primitive types
export default function dedupe<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}
