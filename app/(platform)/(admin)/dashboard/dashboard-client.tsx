"use client";

import { DashboardCard } from "@/app/(platform)/(admin)/dashboard/_components-dashboard/dashboard-card";
import { dashboardData } from "./orders/db/data";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { AreaChartTotalRevenue } from "./_components-dashboard/_customize-charts/area-chart-total-revenue";
import { PieChartInteractive } from "./_components-dashboard/_customize-charts/pie-chart-interactive";
import { TotalOrdersChart } from "./_components-dashboard/_customize-charts/total-orders-chart";
import Maps from "@/components/_global-components-reused/maps";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const DashboardClient = () => {
  return (
    <div className="min-h-screen">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 px-4">
          {dashboardData.map((item) => (
            <DashboardCard {...item} key={item.id} />
          ))}
        </div>
        <div className="px-4 my-8">
          <ResizablePanelGroup direction="horizontal" className="w-full">
            <div className="flex items-center gap-x-2 w-full">
              <ResizablePanel defaultSize={70} minSize={30} maxSize={70}>
                <TotalOrdersChart />
              </ResizablePanel>

              <ResizableHandle withHandle className="border-none" />

              <ResizablePanel defaultSize={30} minSize={30} maxSize={70}>
                <PieChartInteractive />
              </ResizablePanel>
            </div>
          </ResizablePanelGroup>
        </div>

        <div className="px-4">
          <AreaChartTotalRevenue />
        </div>

        <div className="my-8 px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">Locations</CardTitle>
              <CardDescription>Based on user activity</CardDescription>
            </CardHeader>
            <CardContent className="h-[600px]">
              <div className="relative p-4 px-10 rounded-2xl h-full">
                <Maps />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
