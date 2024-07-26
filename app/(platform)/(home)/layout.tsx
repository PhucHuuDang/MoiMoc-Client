import { LoginModal } from "@/components/modal/login-modal";

const HomeLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="h-full bg-main_background_color">
      <LoginModal />
      {children}
    </div>
  );
};

export default HomeLayout;
