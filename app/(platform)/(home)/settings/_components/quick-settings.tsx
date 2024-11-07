import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";

export const QuickSettings = () => {
  const [quickSettings, setQuickSettings] = useState({
    emailNotifications: true,
    twoFactor: false,
    darkMode: false,
  });
  const [darkMode, setDarkMode] = useState(false);

  const [themeColor, setThemeColor] = useState("#007bff");
  const [fontSize, setFontSize] = useState(16);

  const handleQuickSettingChange = (setting: keyof typeof quickSettings) => {
    setQuickSettings(
      (prev: {
        emailNotifications: boolean;
        twoFactor: boolean;
        darkMode: boolean;
      }) => ({
        ...prev,
        [setting]: !prev[setting],
      }),
    );
    if (setting === "darkMode") {
      setDarkMode(!darkMode);
    }
  };

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    document.documentElement.style.setProperty("--theme-color", themeColor);
    document.documentElement.style.setProperty("--font-size", `${fontSize}px`);
  }, [darkMode, themeColor, fontSize]);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Quick Settings</CardTitle>
        <CardDescription>
          Quickly toggle your most important settings
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Switch
            id="emailNotifications"
            checked={quickSettings.emailNotifications}
            onCheckedChange={() =>
              handleQuickSettingChange("emailNotifications")
            }
          />
          <Label htmlFor="emailNotifications">Email Notifications</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="twoFactor"
            checked={quickSettings.twoFactor}
            onCheckedChange={() => handleQuickSettingChange("twoFactor")}
          />
          <Label htmlFor="twoFactor">Two-Factor Auth</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="darkMode"
            checked={quickSettings.darkMode}
            onCheckedChange={() => handleQuickSettingChange("darkMode")}
          />
          <Label htmlFor="darkMode">Dark Mode</Label>
        </div>
      </CardContent>
    </Card>
  );
};
