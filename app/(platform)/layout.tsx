import { QueryProvider } from "@/provider/query.provider";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryProvider>{children}</QueryProvider>
    </>
  );
};

export default PlatformLayout;
