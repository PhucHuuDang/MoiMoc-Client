"use client";
import {
  Banknote,
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Truck,
  Users2,
} from "lucide-react";

import { FloatingDock } from "@/components/aceternity-ui/floating-dock";
import { cn } from "@/lib/utils";

interface AdminFloatingDockProps {
  className?: string;
}

export const AdminFloatingDock = ({ className }: AdminFloatingDockProps) => {
  const styleDockItems =
    "size-full text-moi_moc_green dark:text-primary dark:group-hover:text-primary/80 duration-300 group-hover:scale-110";

  const dockItems = [
    // {
    //   href: "#",
    //   icon: <Package2 className={`${styleDockItems}`} />,
    //   title: "Acme Inc",
    // },
    {
      href: "/dashboard",
      icon: <Home className={`${styleDockItems}`} />,
      title: "Dashboard",
    },
    {
      href: "/dashboard/orders",
      icon: <ShoppingCart className={`${styleDockItems}`} />,
      title: "Orders",
    },
    {
      href: "/dashboard/products",
      icon: <Package className={`${styleDockItems}`} />,
      title: "Products",
    },
    {
      href: "/dashboard/delivery-methods",
      icon: <Truck className={`${styleDockItems}`} />,
      title: "Delivery",
    },
    {
      href: "/dashboard/payment-methods",
      icon: <Banknote className={`${styleDockItems}`} />,
      title: "Delivery",
    },
    // {
    //   href: "#",
    //   icon: <Users2 className={`${styleDockItems}`} />,
    //   title: "Customers",
    // },
    // {
    //   href: "#",
    //   icon: <LineChart className={`${styleDockItems}`} />,
    //   title: "Analytics",
    // },
  ];

  return (
    // <div className="fixed bottom-4 left-1/2 -translate-x-1/2 transform">
    <div
      className={cn(
        "fixed bottom-2.5 mx-auto text-center w-screen flex items-center justify-center ",
        className,
      )}
    >
      <FloatingDock
        items={dockItems}
        classNameIconContainer="bg-green-500 text-foreground dark:bg-background group "
        // desktopClassName="bg-red-500"

        // desktopClassName="w-[450px] flex item-center justify-evenly bg-accent"
      />
    </div>
  );
};
