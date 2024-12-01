"use client";
import {
  Banknote,
  BookImage,
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Truck,
  Users,
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
    {
      href: "/dashboard",
      icon: <Home className={`${styleDockItems}`} />,
      title: "Dashboard",
    },
    {
      href: "/dashboard/users",
      icon: <Users className={`${styleDockItems}`} />,
      title: "Users",
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
      title: "Delivery Management",
    },
    {
      href: "/dashboard/payment-methods",
      icon: <Banknote className={`${styleDockItems}`} />,
      title: "Payment Methods Management",
    },
    {
      href: "/dashboard/about-moi-moc",
      icon: <BookImage className={`${styleDockItems}`} />,
      title: "About Moi Moc Management",
    },
  ];

  return (
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
