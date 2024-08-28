"use client";

import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTheme } from "next-themes";
import { ThemeColors } from "@/types/theme-types";
import { useThemeContext } from "@/provider/theme-data-provider";

const availableThemeColors = [
  { name: "Zinc", light: "bg-zinc-900", dark: "bg-zinc-700" },
  { name: "Orange", light: "bg-orange-500", dark: "bg-orange-700" },
  { name: "Blue", light: "bg-blue-600", dark: "bg-blue-700" },
  { name: "Green", light: "bg-green-600", dark: "bg-green-500" },
  { name: "Rose", light: "bg-rose-600", dark: "bg-rose-700" },
  { name: "Violet", light: "bg-purple-900", dark: "bg-purple-700" },
];

export const ThemeColorToggle = () => {
  const { themeColor, setThemeColor } = useThemeContext();
  const { theme } = useTheme();

  const createSelectItems = () =>
    availableThemeColors.map(({ name, light, dark }) => {
      return (
        <SelectItem key={name} value={name}>
          <div className="flex item-center justify-center gap-x-2">
            <div
              className={cn(
                "rounded-full size-[20px]",
                theme === "light" ? light : dark,
              )}
            ></div>
            <div className="text-sm">{name}</div>
          </div>
        </SelectItem>
      );
    });

  return (
    <Select
      onValueChange={(value) => setThemeColor(value as ThemeColors)}
      defaultValue={themeColor}
    >
      <SelectTrigger className="w-[180px] ring-offset-transparent focus:ring-transparent">
        <SelectValue placeholder="Select color" />
      </SelectTrigger>

      <SelectContent className="border-muted">
        {createSelectItems()}
      </SelectContent>
    </Select>
  );
};
