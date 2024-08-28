"use client";

import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";

export const ThemeModeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      className="flex items-center justify-center w-16 rounded-3xl"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun
        className="size-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:rotate-90
          dark:scale-0"
      />
      <Moon
        className="size-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0
          dark:scale-100"
      />
      <span className="sr-only">Toggle Theme</span>
    </Button>
  );
};
