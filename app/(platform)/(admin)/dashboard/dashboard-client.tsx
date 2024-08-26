"use client";

import { DashboardCard } from "@/app/(platform)/(admin)/_components/dashboard-card";

const dashboardData = [
  {
    description: "Total Revenue",
    title: "$ 1,200",
    statistic: "Total revenue at 2024",
  },
  {
    description: "Total Products",
    title: "$ 1,100",
    statistic: "For all the products at August",
  },
  {
    description: "Highest User Engagement",
    title: "$ 591",
    statistic: "For week: Week 1",
  },
  {
    description: "Highest Location Activity",
    title: "$ 540",
    statistic: "For location: HCM City",
  },
];

export const DashboardClient = () => {
  return (
    <div className="grid sm:grid-cols-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 px-4">
        {dashboardData.map((item) => (
          <DashboardCard {...item} key={item.title} />
        ))}
      </div>
    </div>
  );
};
