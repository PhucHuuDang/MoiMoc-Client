import { ThemeProvider as NextThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminSideBar } from "@/app/(platform)/(admin)/dashboard/orders/_orders-components/admin-sidebar";
import { SheetSidebar } from "@/app/(platform)/(admin)/dashboard/orders/_orders-components/sheet-sidebar";
import { AdminFloatingDock } from "./dashboard/orders/_orders-components/admin-floating-dock";
import { ThemeDataProvider } from "@/provider/theme-data-provider";

const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
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
              <SheetSidebar />

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
