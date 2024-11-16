"use client";

import { clientGetData } from "@/api/actions/get-data-api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { formatActivityTime } from "@/lib/format-activity-time";
import { useQuery } from "@tanstack/react-query";
import { Activity } from "lucide-react";

type ActivityType = {
  id: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  activity: string;
};

export const UserActivity = () => {
  const {
    data: activities,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user-activities"],
    queryFn: async () => clientGetData("/users/activities"),
  });

  const ActivitySkeleton = () => {
    return (
      <div className="flex items-center">
        <Skeleton className="mr-2 size-4 rounded-lg" />
        <Skeleton className="ml-auto w-12 rounded-lg" />
      </div>
    );
  };

  console.log({ activities });

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your recent account activity</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px]">
          <div className="space-y-4">
            {!isLoading
              ? activities?.map((activity: ActivityType) => {
                  return (
                    <div key={activity.id} className="flex items-center">
                      <Activity className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{activity.activity}</span>
                      <span className="ml-auto text-sm text-muted-foreground">
                        {formatActivityTime(activity.createdAt)}
                      </span>
                    </div>
                  );
                })
              : Array.from({ length: 4 }).map((_, index) => {
                  return <ActivitySkeleton key={index} />;
                })}
            {/* <div className="flex items-center">
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
            </div> */}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
