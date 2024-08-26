import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminSideBar } from "@/app/(platform)/(admin)/dashboard/orders/_orders-components/admin-sidebar";
import { SheetSidebar } from "@/app/(platform)/(admin)/dashboard/orders/_orders-components/sheet-sidebar";
import { AdminFloatingDock } from "./dashboard/orders/_orders-components/admin-floating-dock";

const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col">
        <AdminSideBar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <SheetSidebar />

          {children}
        </div>
        <AdminFloatingDock />
      </div>
    </TooltipProvider>
  );
};

export default AdminLayout;
