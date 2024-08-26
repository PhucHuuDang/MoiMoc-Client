export type ThemeColors =
  | "Zinc"
  | "Orange"
  | "Blue"
  | "Green"
  | "Rose"
  | "Violet";
export interface ThemeColorStateParams {
  themeColor: ThemeColors;
  setThemeColor: React.Dispatch<React.SetStateAction<ThemeColors>>;
}
