import { Button } from "@/components/ui/button";
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
import { Facebook, Github, Linkedin, Twitter } from "lucide-react";
import { useEffect, useState } from "react";

interface ConnectedTabsProps {
  value: string;
}
export const ConnectedTabs = ({ value }: ConnectedTabsProps) => {
  return (
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
                <p className="text-sm text-muted-foreground">Not connected</p>
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
                <p className="text-sm text-muted-foreground">Not connected</p>
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
  );
};
