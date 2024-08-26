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
          <ResizablePanelGroup
            direction="horizontal"
            className="w-full rounded-lg border space-x-2"
          >
            <ResizablePanel defaultSize={76}>
              <AreaChartTotalRevenue />
            </ResizablePanel>

            <ResizableHandle withHandle className="border border-none" />

            <ResizablePanel defaultSize={24}>
              <PieChartInteractive />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
};
