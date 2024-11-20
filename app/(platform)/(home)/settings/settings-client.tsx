"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Trash2, ChevronDown } from "lucide-react";
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
import { useAuthContext } from "@/provider/auth-provider";
import { useQueryClient } from "@tanstack/react-query";
import { UserActivity } from "./_components/user-activity";
import { UserAvatarCard } from "./_components/user-avatar-card";

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
  const auth = useAuthContext();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [profileCompletion, setProfileCompletion] = useState(65);
  const [quickSettings, setQuickSettings] = useState({
    emailNotifications: true,
    twoFactor: false,
    darkMode: false,
  });

  const [isPending, setIsPending] = useState<boolean>(false);

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

      setProfileCompletion((prev) => prev + 20);
      toast.success("Settings saved");
    }, 1500);
  };

  return (
    <div className="pt-28 pb-10">
      <div className="max-w-screen-2xl mx-4 2xl:mx-auto">
        <div className="sticky top-0 z-10 bg-background pb-4 mb-8 p-4 rounded-lg">
          <UserAvatarCard />

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

        <UserActivity />

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
