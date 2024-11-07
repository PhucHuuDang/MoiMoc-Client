import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import { useEffect, useState } from "react";

interface AppearanceTabsProps {
  value: string;
}

export const AppearanceTabs = ({ value }: AppearanceTabsProps) => {
  const [darkMode, setDarkMode] = useState(false);

  const [themeColor, setThemeColor] = useState("#007bff");
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    document.documentElement.style.setProperty("--theme-color", themeColor);
    document.documentElement.style.setProperty("--font-size", `${fontSize}px`);
  }, [darkMode, themeColor, fontSize]);

  return (
    <TabsContent value={value}>
      <Card>
        <CardHeader>
          <CardTitle>Appearance Settings</CardTitle>
          <CardDescription>
            Customize the look and feel of your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="darkMode">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">
                Toggle dark mode on or off
              </p>
            </div>
            <Switch
              id="darkMode"
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="themeColor">Theme Color</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="themeColor"
                type="color"
                value={themeColor}
                onChange={(e) => setThemeColor(e.target.value)}
                className="w-12 h-12 p-1 rounded-md"
              />
              <span>{themeColor}</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="fontSize">Font Size</Label>
            <div className="flex items-center space-x-2">
              <Slider
                id="fontSize"
                min={12}
                max={24}
                step={1}
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
                className="w-[200px]"
              />
              <span>{fontSize}px</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
