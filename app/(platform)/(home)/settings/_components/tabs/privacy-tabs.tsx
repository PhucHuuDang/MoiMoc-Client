import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";

interface PrivacyTabsProps {
  value: string;
}

export const PrivacyTabs = ({ value }: PrivacyTabsProps) => {
  return (
    <TabsContent value={value}>
      <Card>
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
          <CardDescription>Manage your privacy preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="profileVisibility">Profile Visibility</Label>
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
  );
};
