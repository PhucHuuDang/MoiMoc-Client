import { Navbar } from "@/components/_global-components-reused/navbar";
import { ContactModal } from "@/components/modal/contact-modal";
import { LoginModal } from "@/components/modal/login-modal";
import { RegisterModal } from "@/components/modal/register-modal";
import { AdminSideBar } from "./orders/_orders-components/admin-sidebar";
import { SheetSidebar } from "./orders/_orders-components/sheet-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

const HomeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <TooltipProvider>
        <AdminSideBar />
      </TooltipProvider>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <SheetSidebar />

        {children}
      </div>
    </div>
  );
};

export default HomeLayout;
