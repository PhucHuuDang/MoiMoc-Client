import { LoginModal } from "@/components/modal/login-modal";
import { RegisterModal } from "@/components/modal/register-modal";

const HomeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="h-full bg-main_background_color">
      <LoginModal />
      <RegisterModal />
      {children}
    </div>
  );
};

export default HomeLayout;
