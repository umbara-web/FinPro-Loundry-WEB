export function normalizeSearchTerm(input: string): string {
  // Normalize user input so searching by displayed IDs like "#1B975CEC" works.
  // - trim spaces
  // - remove leading '#'
  // - remove all whitespace inside
  // - lowercase to make search case-insensitive (some backends do case-sensitive matching)
  return input.trim().replace(/^#+/, '').replace(/\s+/g, '').toLowerCase();
}
