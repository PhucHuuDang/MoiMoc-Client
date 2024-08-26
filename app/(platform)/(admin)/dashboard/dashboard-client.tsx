"use client";

import { DashboardCard } from "@/app/(platform)/(admin)/dashboard/_components-dashboard/dashboard-card";
import { dashboardData } from "./orders/db/data";

export const DashboardClient = () => {
  return (
    <div className="min-h-screen">
      <div className="grid sm:grid-cols-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 px-4">
          {dashboardData.map((item) => (
            <DashboardCard {...item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};
