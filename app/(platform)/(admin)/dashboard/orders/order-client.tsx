"use client";

import { CardOrderHeader } from "./_orders-components/card-order-header";
import { CustomerOrderDetail } from "./_orders-components/customer-order-detail";
import { StatisticProgress } from "./_orders-components/statistic-progress";
import { TabsOrders } from "./_orders-components/tabs-orders";

export const progressValue = [
  {
    title: "$320",
    description: "This month",
    value: 320,
    percentageDescription: " +25% from last week",
    progressValue: 30,
  },
  {
    title: "$320",
    description: "This month",
    value: 320,
    // percentage: 12,
    percentageDescription: " +10% from last week",

    progressValue: 12,
  },
];

export const OrderClient = () => {
  return (
    <main
      className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3
        xl:grid-cols-3"
    >
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <CardOrderHeader />

          {progressValue.map((progress, index) => {
            return <StatisticProgress {...progress} key={progress.title} />;
          })}
        </div>

        <TabsOrders />
      </div>
      <div>
        <CustomerOrderDetail />
      </div>
    </main>
  );
};
