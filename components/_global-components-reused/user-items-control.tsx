"use client";

import Link from "next/link";

import { HouseIcon, LayoutDashboard, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { deleteTokenCookies } from "@/api/store/cookies-stored";
import { toast } from "sonner";
import Spinner from "../animata/spinner";
import { Logo } from "./logo";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { useAuthContext } from "@/provider/auth-provider";
import { useCartStore } from "@/store/use-cart-store";

const MENU_ITEMS = [
  {
    label: "Profile",
    icon: <User />,
    href: "/settings",
  },

  {
    label: "Dashboard",
    icon: <LayoutDashboard />,
    href: "/dashboard",
  },
  {
    label: "Home Page",
    icon: <HouseIcon />,
    href: "/",
  },
];

type Checked = DropdownMenuCheckboxItemProps["checked"];
export const UserItemsControl = () => {
  const pathName = usePathname();

  const [loading, setLoading] = useState<boolean>(false);
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);

  const auth = useAuthContext();
  const role = auth?.user?.role;

  const clearCart = useCartStore((state) => state.clearCart);

  const WaitingLogout = () => {
    return (
      <div className="fixed flex items-center justify-center inset-0 w-full bg-black/20">
        <div>
          <Logo height={80} width={200} fill="#fff" />
          <div className="flex items-center gap-x-1">
            <Spinner className="size-8" />
            <span className="text-slate-100 font-semibold">Logout...</span>
          </div>
        </div>
      </div>
    );
  };

  const handleLogout = async () => {
    setLoading(true);
    await deleteTokenCookies();
    <WaitingLogout />;
    await new Promise((resolve) => setTimeout(resolve, 500));
    clearCart();
    setLoading(false);
    setIsShowAlert(false);
    toast.success("Đăng xuất thành công");
  };

  const handleCloseLogoutDialog = () => {
    setTimeout(() => (document.body.style.pointerEvents = ""), 100);
    setIsShowAlert(false);
  };

  if (loading) {
    return <WaitingLogout />;
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <User
            className="h-6 w-[101px] text-moi_moc_green hover:scale-110 transition duration-200 p-0.5
              rounded-lg"
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Options</DropdownMenuLabel>

          <DropdownMenuSeparator />
          {MENU_ITEMS.map((item) => {
            return role === "ADMIN" ? (
              <DropdownMenuCheckboxItem
                key={item.href}
                // checked={selectedItem[item.label]}
                checked={pathName === item.href}
                // onCheckedChange={(checked: boolean) =>
                //   handleChecked(item.label, checked, item.href)
                // }
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-x-2 cursor-pointer w-full"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </DropdownMenuCheckboxItem>
            ) : (
              item.label !== "Dashboard" && (
                <DropdownMenuCheckboxItem
                  key={item.href}
                  checked={pathName === item.href}

                  // checked={selectedItem[item.label]}
                  // onCheckedChange={(checked: boolean) =>
                  //   handleChecked(item.label, checked, item.href)
                  // }
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-x-2 cursor-pointer w-full"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuCheckboxItem>
              )
            );
          })}

          <DropdownMenuCheckboxItem
            className="flex items-start gap-x-2 cursor-pointer w-full"
            onClick={() => setIsShowAlert(true)}
          >
            <LogOut />
            <span>Logout</span>
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isShowAlert} onOpenChange={handleCloseLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Bạn có chắc chắn muốn đăng xuất?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Đăng xuất sẽ đưa bạn về trang chủ
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCloseLogoutDialog}>
              Huỷ bỏ
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>
              Tiếp tục
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
