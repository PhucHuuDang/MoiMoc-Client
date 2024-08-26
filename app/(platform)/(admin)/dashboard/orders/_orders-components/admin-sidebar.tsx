"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Home,
  LineChart,
  Package,
  Package2,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import { useState } from "react";
import { FloatingDock } from "@/components/aceternity-ui/floating-dock";

const navItems = [
  { href: "#", icon: Package2, label: "Acme Inc", isBrand: true },
  { href: "#", icon: Home, label: "Dashboard" },
  {
    href: "/dashboard/orders",
    icon: ShoppingCart,
    label: "Orders",
    active: true,
  },
  { href: "/dashboard/products", icon: Package, label: "Products" },
  { href: "#", icon: Users2, label: "Customers" },
  { href: "#", icon: LineChart, label: "Analytics" },
];

const settingsItem = { href: "#", icon: Settings, label: "Settings" };

export const AdminSideBar = () => {
  const [isActive, setIsActive] = useState();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        {navItems.map((item, index) => (
          <SidebarItem key={index} {...item} />
        ))}
      </nav>

      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <SidebarItem {...settingsItem} />
      </nav>
    </aside>
  );
};
