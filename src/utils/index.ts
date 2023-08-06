/*
 * Checks if the input option is a number between 1 and 4 (inclusive).
 * @param option - The input option to be checked.
 * @returns A boolean indicating whether the input option is valid.
 */
export function isValidMenuOption(option: number): boolean {
  const MIN_VALID_VALUE = 1;
  const MAX_VALID_VALUE = 4;

  return (
    Number.isFinite(option) &&
    option >= MIN_VALID_VALUE &&
    option <= MAX_VALID_VALUE
  );
}
