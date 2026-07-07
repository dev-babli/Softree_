/**
 * Derive up-to-two-character initials from a name.
 *
 * Example: `getInitials("Ada Lovelace")` -> `"AL"`.
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
