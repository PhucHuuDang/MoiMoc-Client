"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useAuthContext } from "@/provider/auth-provider";
import { useQuery } from "@tanstack/react-query";
import { clientGetData } from "@/api/actions/get-data-api";
import React from "react";
import { format } from "date-fns";
import { UserProfile } from "@/types/user-types";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  usersCount: {
    label: "Users",
    color: "hsl(var(--chart-1))",
  },
  // mobile: {
  //   label: "Mobile",
  //   color: "hsl(var(--chart-2))",
  // },
} satisfies ChartConfig;

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

export function UsersLineChart() {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users Statistic</CardTitle>
        <CardDescription>Showing total users in 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={usersData || []}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="usersCount"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 8,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Users statistic <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          The largest % of users in{" "}
          <span className="text-primary">
            {calculateTotalPercentageUsers?.largestPercentageMonth.month}
          </span>{" "}
          with{" "}
          <span className="text-primary">
            {calculateTotalPercentageUsers?.largestPercentageMonth.percentage.toFixed(
              2,
            )}
            %{" "}
          </span>
          of{" "}
          <span className="text-primary">
            {calculateTotalPercentageUsers?.largestPercentageMonth.usersCount}{" "}
            users
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
