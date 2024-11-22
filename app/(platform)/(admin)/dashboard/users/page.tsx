import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserStats } from "./components_users/user-starts";
import { UserManagement } from "./components_users/user-management";
import { UserActivity } from "@/app/(platform)/(home)/settings/_components/user-activity";
import { RecentUsersActivity } from "./components_users/recent-users-activity";
import { UsersChart } from "../_components-dashboard/_customize-charts/users-chart";
import { UsersLineChart } from "../_components-dashboard/_customize-charts/users-line-chart";
// import { UserActivity } from "@/app/(platform)/(home)/settings/_components/user-activity";

export default function AdminUsersPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-5">User Management Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <UserStats />
      </div>

      {/* <UsersChart /> */}
      <div className="mb-6">
        <UsersLineChart />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <Tabs defaultValue="all-users" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="all-users">All Users</TabsTrigger>
                <TabsTrigger value="add-user">Add User</TabsTrigger>
              </TabsList>
              <TabsContent value="all-users">
                <UserManagement />
              </TabsContent>
              {/* <TabsContent value="add-user">
                <UserManagement initialTab="add-user" />
              </TabsContent> */}
            </Tabs>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
            {/* <UserActivity /> */}
            <RecentUsersActivity />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
