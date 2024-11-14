"use client";

import { LayoutDashboard, LogOut, Settings, User } from "lucide-react";
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
import { useRouter } from "next/navigation";
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
    label: "Settings",
    icon: <Settings />,
    href: "/settings",
  },
  {
    label: "Dashboard",
    icon: <LayoutDashboard />,
    href: "/dashboard",
  },
  {
    label: "Logout",
    icon: <LogOut />,
    href: "/",
  },
];

type Checked = DropdownMenuCheckboxItemProps["checked"];
export const UserItemsControl = () => {
  const [selectedItem, setSelectedItem] = useState<Record<string, Checked>>({
    Profile: false,
    Settings: false,
    Logout: false,
    Dashboard: false,
  });
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [isShowAlert, setIsShowAlert] = useState<boolean>(false);

  const auth = useAuthContext();
  const role = auth?.user?.role;

  const clearCart = useCartStore((state) => state.clearCart);

  // const [ConfirmModal, confirm] = useConfirm(
  //   "Bạn có chắc chắn muốn đăng xuất?",
  //   "Đăng xuất",
  // );

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

  const handleChecked = async (
    label: string,
    checked: Checked,
    href: string,
  ) => {
    setSelectedItem((prev) => ({ [label]: checked }));

    if (label === "Logout") {
      setIsShowAlert(true);
    } else {
      router.push(href);
    }
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
          {/* <DropdownMen */}
          {MENU_ITEMS.map((item) => {
            return role === "ADMIN" ? (
              <DropdownMenuCheckboxItem
                key={item.label}
                checked={selectedItem[item.label]}
                onCheckedChange={(checked: boolean) =>
                  handleChecked(item.label, checked, item.href)
                }
                className="gap-x-2 cursor-pointer w-full items-start"
              >
                {item.icon}
                <span>{item.label}</span>
              </DropdownMenuCheckboxItem>
            ) : (
              item.label !== "Dashboard" && (
                <DropdownMenuCheckboxItem
                  key={item.label}
                  checked={selectedItem[item.label]}
                  onCheckedChange={(checked: boolean) =>
                    handleChecked(item.label, checked, item.href)
                  }
                  className="gap-x-2 cursor-pointer w-full items-start"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </DropdownMenuCheckboxItem>
              )
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={isShowAlert}
        onOpenChange={() => {
          setTimeout(() => (document.body.style.pointerEvents = ""), 100);
        }}
      >
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
            <AlertDialogCancel onClick={() => setIsShowAlert(false)}>
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
