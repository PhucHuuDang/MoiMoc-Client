import { Navbar } from "@/components/_global-components-reused/navbar";
import { ContactModal } from "@/components/modal/contact-modal";
import { LoginModal } from "@/components/modal/login-modal";
import { RegisterModal } from "@/components/modal/register-modal";
import { SheetCart } from "./_components/sheet-cart";

const HomeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="h-full bg-main_background_color">
      <LoginModal />
      <RegisterModal />
      <ContactModal />
      <Navbar />
      <SheetCart />
      {children}
    </div>
  );
};

export default HomeLayout;
