import { Navbar } from "@/components/_global-components-reused/navbar";
import { ContactModal } from "@/components/modal/contact-modal";
import { LoginModal } from "@/components/modal/login-modal";
import { RegisterModal } from "@/components/modal/register-modal";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AdminSideBar } from "@/app/(platform)/(admin)/dashboard/orders/_orders-components/admin-sidebar";
import { SheetSidebar } from "@/app/(platform)/(admin)/dashboard/orders/_orders-components/sheet-sidebar";

const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col">
        <AdminSideBar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <SheetSidebar />

          {children}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default AdminLayout;
