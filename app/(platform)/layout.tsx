import { verifyAuth } from "@/api/auth/verify-auth";
import { QueryProvider } from "@/provider/query.provider";

const PlatformLayout = async ({ children }: { children: React.ReactNode }) => {

  return (
    <>
      <QueryProvider>
        {children}
      </QueryProvider>
    </>
  );
};

export default PlatformLayout;
