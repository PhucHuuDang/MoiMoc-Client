"use client";

import {
  Banknote,
  BookImage,
  Home,
  Package,
  Settings,
  ShoppingCart,
  Truck,
  Users,
} from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  {
    href: "/dashboard/users",
    icon: Users,
    label: "Users",
  },
  {
    href: "/dashboard/orders",
    icon: ShoppingCart,
    label: "Orders",
    active: true,
  },
  { href: "/dashboard/products", icon: Package, label: "Products" },
  {
    href: "/dashboard/delivery-methods",
    icon: Truck,
    label: "Delivery Management",
  },
  {
    href: "/dashboard/payment-methods",
    icon: Banknote,
    label: "Payment Methods Management",
  },
  {
    href: "/dashboard/payment-methods",

    icon: BookImage,
    label: "About Moi Moc Management",
  },
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
