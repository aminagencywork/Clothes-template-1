/** Accent colors for the new (green) template. Screens still on the old brown/gold
 *  template use the `--color-*` CSS variables in globals.css instead. */
export const FOREST = "#3a4a2e";
export const AMBER = "#7a4319";
/** Pale tint of AMBER, for light card/tile backgrounds. */
export const AMBER_LIGHT = "#f3e6d5";

/** Blends a hex color toward white; `amount` 0 = unchanged, 1 = white. Used for light chip/tag backgrounds. */
export function tint(hex: string, amount: number): string {
  const n = parseInt(hex.slice(1), 16);
  const mix = (c: number) => Math.round(c + (255 - c) * amount);
  const r = mix((n >> 16) & 255);
  const g = mix((n >> 8) & 255);
  const b = mix(n & 255);
  return `rgb(${r}, ${g}, ${b})`;
}
