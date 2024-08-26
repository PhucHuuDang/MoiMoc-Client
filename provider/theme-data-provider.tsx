"use client";

import { useTheme } from "next-themes";
import { ThemeColorStateParams, ThemeColors } from "@/types/theme-types";
import { createContext, useContext, useEffect, useState } from "react";
import setGlobalColorThemes from "@/lib/theme-colors";

interface ThemeDataProviderProps {
  children: React.ReactNode;
}

const ThemeContext = createContext<ThemeColorStateParams>(
  {} as ThemeColorStateParams,
);

export const ThemeDataProvider = ({ children }: ThemeDataProviderProps) => {
  const getSaveThemeColor = () => {
    try {
      return (localStorage.getItem("theme-color") as ThemeColors) || "Zinc";
    } catch (error) {
      "Zinc" as ThemeColors;
    }
  };

  const [themeColor, setThemeColor] = useState<ThemeColors>(
    getSaveThemeColor() as ThemeColors,
  );

  const [isMounted, setIsMounted] = useState<boolean>(false);

  const { theme } = useTheme();

  useEffect(() => {
    localStorage.setItem("theme-color", themeColor);
    setGlobalColorThemes(theme as "light" | "dark", themeColor);

    if (!isMounted) {
      setIsMounted(true);
    }
  }, [themeColor, theme]);

  if (!isMounted) return null;

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
