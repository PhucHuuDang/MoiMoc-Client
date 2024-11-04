import { ThemeProvider as NextThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminSideBar } from "@/app/(platform)/(admin)/dashboard/orders/_orders-components/admin-sidebar";
import { SheetControlSystem } from "@/app/(platform)/(admin)/dashboard/orders/_orders-components/sheet-control-system";
import { AdminFloatingDock } from "./dashboard/orders/_orders-components/admin-floating-dock";
import { ThemeDataProvider } from "@/provider/theme-data-provider";
import { isUserWithRole, verifyAuth } from "@/api/auth/verify-auth";
import NotFound from "@/app/not-found";

const AdminLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { isAuth, user, token } = await verifyAuth();

  // console.log({ user });

  if (!isAuth || !token || !isUserWithRole(user) || user.role !== "ADMIN") {
    return <NotFound />;
  }

  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <ThemeDataProvider>
        <TooltipProvider>
          <div className="flex min-h-screen w-full flex-col">
            <AdminSideBar />
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 dark:bg-card">
              <SheetControlSystem />

              {children}
            </div>
            <AdminFloatingDock />
          </div>
        </TooltipProvider>
      </ThemeDataProvider>
    </NextThemeProvider>
  );
};

export default AdminLayout;
