import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserActivity } from "../types/user-types";

const activities: UserActivity[] = [
  { user: "Alice Johnson", action: "Created account", time: "2 minutes ago" },
  { user: "Bob Smith", action: "Updated profile", time: "1 hour ago" },
  { user: "Charlie Brown", action: "Deleted account", time: "3 hours ago" },
  { user: "Diana Prince", action: "Changed password", time: "5 hours ago" },
  { user: "Ethan Hunt", action: "Logged in", time: "1 day ago" },
];

export function RecentUsersActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src="/about-moi-moc-images/avatar-placeholder.gif"
              alt="Avatar"
            />
            <AvatarFallback>
              {activity.user
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.user}</p>
            <p className="text-sm text-muted-foreground">{activity.action}</p>
          </div>
          <div className="ml-auto font-medium text-sm text-muted-foreground">
            {activity.time}
          </div>
        </div>
      ))}
    </div>
  );
}
