"use client";
import { clientGetData } from "@/api/actions/get-data-api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthContext } from "@/provider/auth-provider";
import { UserProfile } from "@/types/user-types";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Users, UserPlus, UserMinus } from "lucide-react";
import React from "react";

interface UserStatsTypes {
  title: string;
  value: number;
  icon: React.ElementType;
  change: number;
}

const stats: UserStatsTypes[] = [
  { title: "Total Users", value: 101, icon: Users, change: 89 },
  { title: "Percentage Increase", value: 45, icon: UserPlus, change: 3.2 },
  {
    title: "Largest Number of Users in Month",
    value: 87,
    icon: UserMinus,
    change: 86,
  },
];

var monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface UserCountByMonth {
  month: string;
  usersCount: number;
  fill: string;
}
export const UserStats = () => {
  const auth = useAuthContext();

  const {
    isLoading,
    isError,
    error,
    data: users,
  } = useQuery<UserProfile["user"][]>({
    queryKey: ["all-users"],
    queryFn: async () => await clientGetData("/users", auth?.token),
  });

  const usersData = React.useMemo<UserCountByMonth[] | null>(() => {
    if (!users) {
      return null;
    }

    // Initialize an object to keep track of user counts per month
    const usersCountByMonth: Record<string, number> = monthList.reduce(
      (acc, month) => {
        acc[month] = 0;
        return acc;
      },
      {} as Record<string, number>,
    );

    // Count the number of users registered in each month
    users.forEach((user: Pick<UserProfile["user"], "createdAt">) => {
      const userCreatedMonth = format(new Date(user.createdAt), "MMMM");
      if (usersCountByMonth[userCreatedMonth] !== undefined) {
        usersCountByMonth[userCreatedMonth] += 1;
      }
    });

    return Object.keys(usersCountByMonth).map((month) => ({
      month,
      usersCount: usersCountByMonth[month],
      fill: `var(--color-${month.toLowerCase()})`,
    }));
  }, [users]);

  const calculateTotalPercentageUsers = React.useMemo(() => {
    if (!usersData) {
      return null;
    }

    // Ensure that the data is sorted by month for correct comparison
    const sortedUsersData = usersData.sort(
      (a, b) => monthList.indexOf(a.month) - monthList.indexOf(b.month),
    );

    // Calculate the total number of users across all months
    const totalUsers = sortedUsersData.reduce(
      (acc, { usersCount }) => acc + usersCount,
      0,
    );

    // Calculate percentage and percent increase
    const percentageData = sortedUsersData.map((current, index) => {
      const previous = sortedUsersData[index - 1];
      const percentIncrease = previous
        ? ((current.usersCount - previous.usersCount) / previous.usersCount) *
          100
        : 0; // No increase for the first month

      return {
        month: current.month,
        usersCount: current.usersCount,
        percentage: (current.usersCount / totalUsers) * 100,
        percentIncrease: percentIncrease.toFixed(2), // Round to 2 decimal places
      };
    });

    // Find the entry with the largest percentage
    const largestPercentageMonth = percentageData.reduce((max, current) =>
      current.percentage > max.percentage ? current : max,
    );

    return {
      percentageData,
      largestPercentageMonth,
    };
  }, [usersData]);

  const totalUsers = usersData?.reduce(
    (acc, { usersCount }) => acc + usersCount,
    0,
  );

  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {/* {stat.value} */}
              {totalUsers}
            </div>
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
};
