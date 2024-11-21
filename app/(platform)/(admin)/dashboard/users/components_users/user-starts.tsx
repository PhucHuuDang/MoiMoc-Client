import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, UserMinus } from "lucide-react";

interface UserStatsTypes {
  title: string;
  value: number;
  icon: React.ElementType;
  change: number;
}

const stats: UserStatsTypes[] = [
  { title: "Total Users", value: 2547, icon: Users, change: 12.5 },
  { title: "New Users", value: 45, icon: UserPlus, change: 3.2 },
  { title: "Inactive Users", value: 20, icon: UserMinus, change: -2.5 },
];

export function UserStats() {
  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p
              className={`text-xs ${stat.change > 0 ? "text-green-500" : "text-red-500"}`}
            >
              {stat.change > 0 ? "+" : ""}
              {stat.change}% from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
