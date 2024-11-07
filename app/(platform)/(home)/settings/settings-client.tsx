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
import { AvatarImageUpload } from "./_components/avatar-image-upload";
import { PersonalTabs } from "./_components/tabs/personal-tabs";
import { AccountTabs } from "./_components/tabs/account-tabs";
import { PrivacyTabs } from "./_components/tabs/privacy-tabs";
import { QuickSettings } from "./_components/quick-settings";
import { SecurityTabs } from "./_components/tabs/security-tabs";
import { AppearanceTabs } from "./_components/tabs/apprearance-tabs";
import { ConnectedTabs } from "./_components/tabs/connected-tabs";
import { NotificationsTabs } from "./_components/tabs/notifications-tabs";
import OrderTrackingTabs from "./_components/tabs/orders-tracking-tabs";

export const TABS = [
  {
    value: "personal",
    label: "Personal",
  },
  {
    value: "ordersTracking",
    label: "Orders Tracking",
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

  return (
    <div className="pt-28 pb-10 bg-red-500">
      <div className="max-w-screen-2xl mx-4 2xl:mx-auto">
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

            <AvatarImageUpload handleImageUpload={setProfileImage} />
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

        <QuickSettings />

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <PersonalTabs value="personal" />

          <OrderTrackingTabs value="ordersTracking" />

          <AccountTabs value="account" />

          <SecurityTabs value="security" />

          <NotificationsTabs value="notifications" />

          <ConnectedTabs value="connected" />

          <PrivacyTabs value="privacy" />

          <AppearanceTabs value="appearance" />
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
