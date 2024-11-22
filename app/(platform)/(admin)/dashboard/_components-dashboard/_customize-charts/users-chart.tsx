"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { clientGetData } from "@/api/actions/get-data-api";
import { useAuthContext } from "@/provider/auth-provider";
import { UserProfile } from "@/types/user-types";
import { format, getMonth } from "date-fns";

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

const chartConfig = {
  users: {
    label: "Users",
  },
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
  },
  january: {
    label: "January",
    color: "hsl(var(--chart-1))",
  },
  february: {
    label: "February",
    color: "hsl(var(--chart-2))",
  },
  march: {
    label: "March",
    color: "hsl(var(--chart-3))",
  },
  april: {
    label: "April",
    color: "hsl(var(--chart-4))",
  },
  may: {
    label: "May",
    color: "hsl(var(--chart-5))",
  },

  june: {
    label: "June",
    color: "hsl(var(--chart-6))",
  },

  july: {
    label: "July",
    color: "hsl(var(--chart-7))",
  },
  august: {
    label: "August",
    color: "hsl(var(--chart-8))",
  },
  september: {
    label: "September",
    color: "hsl(var(--chart-9))",
  },
  october: {
    label: "October",
    color: "hsl(var(--chart-10))",
  },
  november: {
    label: "November",
    color: "hsl(var(--chart-11))",
  },
  december: {
    label: "December",
    color: "hsl(var(--chart-12))",
  },
} satisfies ChartConfig;

interface UserCountByMonth {
  month: string;
  usersCount: number;
  fill: string;
}

export function UsersChart() {
  const id = "pie-interactive";
  const [activeMonth, setActiveMonth] = React.useState("november");
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

  const activeIndex = React.useMemo(
    () =>
      usersData?.findIndex(
        (item) => item.month.toLowerCase() === activeMonth.toLowerCase(),
      ),
    [activeMonth, usersData],
  );

  const months = React.useMemo(
    () => (usersData ? usersData.map((item) => item.month.toLowerCase()) : []),
    [usersData], // Add usersData as a dependency
  );

  return (
    !isLoading && (
      <Card data-chart={id} className="flex flex-col">
        <ChartStyle id={id} config={chartConfig} />
        <CardHeader className="flex-row items-start space-y-0 pb-0">
          <div className="grid gap-1">
            <CardTitle>Users</CardTitle>
            <CardDescription>The statistic in 2024</CardDescription>
          </div>
          <Select value={activeMonth} onValueChange={setActiveMonth}>
            <SelectTrigger
              className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl">
              {months?.map((key) => {
                const config = chartConfig[key as keyof typeof chartConfig];

                if (!config) {
                  return null;
                }

                return (
                  <SelectItem
                    key={key}
                    value={key}
                    className="rounded-lg [&_span]:flex"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className="flex h-3 w-3 shrink-0 rounded-sm"
                        style={{
                          backgroundColor: `var(--color-${key})`,
                        }}
                      />
                      {config?.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="flex flex-1 justify-center pb-0">
          <ChartContainer
            id={id}
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[300px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={usersData || []}
                dataKey="usersCount"
                nameKey="month"
                innerRadius={60}
                strokeWidth={5}
                activeIndex={activeIndex}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => (
                  <g>
                    <Sector {...props} outerRadius={outerRadius + 10} />
                    <Sector
                      {...props}
                      outerRadius={outerRadius + 25}
                      innerRadius={outerRadius + 12}
                    />
                  </g>
                )}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold text-red-500"
                          >
                            {usersData?.[
                              activeIndex!
                            ]?.usersCount.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Users
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    )
  );
}
