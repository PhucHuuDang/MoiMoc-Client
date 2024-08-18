import { OrderClient } from "./order-client";

import { AdminFloatingDock } from "./_orders-components/admin-floating-dock";

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

export function OrderPage() {
  return (
    <>
      <OrderClient />
      <AdminFloatingDock />
    </>
  );
}

export default OrderPage;
