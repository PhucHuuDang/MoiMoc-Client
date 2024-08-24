"use client";
import {
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";

import { FloatingDock } from "@/components/aceternity-ui/floating-dock";

export const AdminFloatingDock = () => {
  const dockItems = [
    {
      href: "#",
      icon: <Package2 className="size-full text-moi_moc_green" />,
      title: "Acme Inc",
    },
    {
      href: "#",
      icon: <Home className="size-full text-moi_moc_green" />,
      title: "Dashboard",
    },
    {
      href: "/dashboard/orders",
      icon: <ShoppingCart className="size-full text-moi_moc_green" />,
      title: "Orders",
    },
    {
      href: "/dashboard/products",
      icon: <Package className="size-full text-moi_moc_green" />,
      title: "Products",
    },
    {
      href: "#",
      icon: <Users2 className="size-full text-moi_moc_green" />,
      title: "Customers",
    },
    {
      href: "#",
      icon: <LineChart className="size-full text-moi_moc_green" />,
      title: "Analytics",
    },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 transform">
      <FloatingDock
        items={dockItems}
        classNameIconContainer="bg-green-500"
        // desktopClassName="w-[450px] flex item-center justify-evenly bg-accent"
      />
    </div>
  );
};
