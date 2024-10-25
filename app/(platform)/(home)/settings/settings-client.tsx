"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import {
  Bell,
  Lock,
  User,
  Mail,
  Phone,
  Globe,
  Camera,
  Key,
  Palette,
  Moon,
  Sun,
  Github,
  Twitter,
  Facebook,
  Linkedin,
  LogOut,
  Trash2,
  Download,
  Activity,
  ChevronDown,
  Check,
  X,
  Edit2,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";

export const TABS = [
  {
    value: "personal",
    label: "Personal",
  },
  {
    value: "account",
    label: "Account",
  },
  {
    value: "security",
    label: "Security",
  },
  {
    value: "notifications",
    label: "Notifications",
  },
  {
    value: "connected",
    label: "Connected Accounts",
  },
  {
    value: "privacy",
    label: "Privacy",
  },
  {
    value: "appearance",
    label: "Appearance",
  },
];

export default function SettingsClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [profileImage, setProfileImage] = useState(
    "/placeholder.svg?height=100&width=100",
  );
  const [profileCompletion, setProfileCompletion] = useState(65);
  const [quickSettings, setQuickSettings] = useState({
    emailNotifications: true,
    twoFactor: false,
    darkMode: false,
  });
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Đặng",
    lastName: "Hữu Phúc",
    bio: "A passionate developer",
    location: "HCMC, Vietnam",
    website: "https://phuchuudang.github.io/Portfolio-website/#services",
  });
  const [isEditing, setIsEditing] = useState({
    firstName: false,
    lastName: false,
    bio: false,
    location: false,
    website: false,
  });
  const [themeColor, setThemeColor] = useState("#007bff");
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    document.documentElement.style.setProperty("--theme-color", themeColor);
    document.documentElement.style.setProperty("--font-size", `${fontSize}px`);
  }, [darkMode, themeColor, fontSize]);

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // toast.custom({
      //   title: "Settings saved",
      //   description: "Your profile settings have been updated successfully.",
      // })
      toast.success("Settings saved");
    }, 1500);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleQuickSettingChange = (setting: keyof typeof quickSettings) => {
    setQuickSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
    if (setting === "darkMode") {
      setDarkMode(!darkMode);
    }
  };

  const handlePersonalInfoChange = (
    field: keyof typeof personalInfo,
    value: string,
  ) => {
    setPersonalInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsEditing((prev) => ({
      ...prev,
      [field]: false,
    }));
  };

  const validateField = (field: keyof typeof personalInfo, value: string) => {
    switch (field) {
      case "firstName":
      case "lastName":
        return value.length > 0 && value.length <= 50;
      case "bio":
        return value.length <= 500;
      case "website":
        return /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
          value,
        );
      default:
        return true;
    }
  };

  return (
    <div className="pt-28 pb-10">
      <div className="max-w-screen-2xl mx-auto">
        <div className="sticky top-0 z-10 bg-background pb-4 mb-8 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-4 rounded-lg">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={profileImage} alt="Profile picture" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold">
                  {personalInfo.firstName} {personalInfo.lastName}
                </h1>
                <span className="text-muted-foreground">
                  Manage your profile settings and preferences
                </span>
              </div>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Camera className="mr-2 h-4 w-4" />
                  Change Picture
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change profile picture</DialogTitle>
                  <DialogDescription>
                    Upload a new profile picture or take a photo.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="flex items-center justify-center">
                    <Avatar className="w-40 h-40">
                      <AvatarImage src={profileImage} alt="Profile picture" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </div>
                  <Label htmlFor="picture" className="cursor-pointer">
                    <Input
                      id="picture"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <div className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-center">
                      Choose File
                    </div>
                  </Label>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1 mr-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Progress value={profileCompletion} className="w-full" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Profile {profileCompletion}% complete</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save All Changes"}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will update all your profile settings. Are you
                    sure you want to continue?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSave}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-full justify-evenly">
              {TABS.map((tab, index) => {
                return (
                  <TabsTrigger
                    className="w-full"
                    key={`${tab.value}-${index}`}
                    value={tab.value}
                  >
                    {tab.label}
                  </TabsTrigger>
                );
              })}
             
            </TabsList>
          </Tabs>
        </div>

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

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsContent value="personal">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details here.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(personalInfo).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <Label htmlFor={key}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </Label>
                      {isEditing[key as keyof typeof isEditing] ? (
                        <div className="flex items-center space-x-2">
                          <Input
                            id={key}
                            value={value}
                            onChange={(e) =>
                              setPersonalInfo((prev) => ({
                                ...prev,
                                [key]: e.target.value,
                              }))
                            }
                            className="flex-grow"
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              handlePersonalInfoChange(
                                key as keyof typeof personalInfo,
                                value,
                              )
                            }
                            disabled={
                              !validateField(
                                key as keyof typeof personalInfo,
                                value,
                              )
                            }
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              setIsEditing((prev) => ({
                                ...prev,
                                [key]: false,
                              }))
                            }
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between">
                          <span>{value}</span>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              setIsEditing((prev) => ({ ...prev, [key]: true }))
                            }
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="zh">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select a timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">Eastern Time</SelectItem>
                      <SelectItem value="cst">Central Time</SelectItem>
                      <SelectItem value="mst">Mountain Time</SelectItem>
                      <SelectItem value="pst">Pacific Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your security preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    id="twoFactor"
                    checked={quickSettings.twoFactor}
                    onCheckedChange={() =>
                      handleQuickSettingChange("twoFactor")
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Choose how you want to be notified.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="emailNotifications">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    checked={quickSettings.emailNotifications}
                    onCheckedChange={() =>
                      handleQuickSettingChange("emailNotifications")
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="pushNotifications">
                      Push Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications on your devices
                    </p>
                  </div>
                  <Switch id="pushNotifications" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive important updates via SMS
                    </p>
                  </div>
                  <Switch id="smsNotifications" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notificationFrequency">
                    Notification Frequency
                  </Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="notificationFrequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="connected">
            <Card>
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>
                  Manage your connected social media accounts.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Github className="h-6 w-6" />
                    <div>
                      <p className="font-medium">GitHub</p>
                      <p className="text-sm text-muted-foreground">
                        Not connected
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Twitter className="h-6 w-6" />
                    <div>
                      <p className="font-medium">Twitter</p>
                      <p className="text-sm text-muted-foreground">@johndoe</p>
                    </div>
                  </div>
                  <Button variant="outline">Disconnect</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Facebook className="h-6 w-6" />
                    <div>
                      <p className="font-medium">Facebook</p>
                      <p className="text-sm text-muted-foreground">
                        Not connected
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Linkedin className="h-6 w-6" />
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <p className="text-sm text-muted-foreground">Connected</p>
                    </div>
                  </div>
                  <Button variant="outline">Disconnect</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Manage your privacy preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="profileVisibility">
                      Profile Visibility
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Control who can see your profile
                    </p>
                  </div>
                  <Select defaultValue="public">
                    <SelectTrigger id="profileVisibility" className="w-[180px]">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="friends">Friends Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="activityStatus">Activity Status</Label>
                    <p className="text-sm text-muted-foreground">
                      Show when you're active on the platform
                    </p>
                  </div>
                  <Switch id="activityStatus" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dataSharing">Data Sharing</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow us to use your data for personalized experiences
                    </p>
                  </div>
                  <Switch id="dataSharing" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
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
        </Tabs>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent account activity</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Changed password</span>
                  <span className="ml-auto text-sm text-muted-foreground">
                    2 days ago
                  </span>
                </div>
                <div className="flex items-center">
                  <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Updated profile picture</span>
                  <span className="ml-auto text-sm text-muted-foreground">
                    1 week ago
                  </span>
                </div>
                <div className="flex items-center">
                  <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Connected Twitter account</span>
                  <span className="ml-auto text-sm text-muted-foreground">
                    2 weeks ago
                  </span>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
            <CardDescription>
              Irreversible and destructive actions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Delete Account</h3>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all data
                </p>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-destructive text-destructive-foreground">
                      Delete Account
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardContent>
        </Card>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="fixed bottom-4 right-4 rounded-full" size="icon">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40">
          <div className="grid gap-4">
            <Button onClick={() => setActiveTab("personal")}>Personal</Button>
            <Button onClick={() => setActiveTab("account")}>Account</Button>
            <Button onClick={() => setActiveTab("security")}>Security</Button>
            <Button onClick={() => setActiveTab("notifications")}>
              Notifications
            </Button>
            <Button onClick={() => setActiveTab("connected")}>Connected</Button>
            <Button onClick={() => setActiveTab("privacy")}>Privacy</Button>
            <Button onClick={() => setActiveTab("appearance")}>
              Appearance
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
