import { verifyAuth } from "@/api/auth/verify-auth";
import { AuthProvider } from "@/provider/auth-provider";
import { QueryProvider } from "@/provider/query.provider";

const PlatformLayout = async ({ children }: { children: React.ReactNode }) => {
  const auth = verifyAuth();

  return (
    <>
      <QueryProvider>
        <AuthProvider authPromise={auth}>{children}</AuthProvider>
      </QueryProvider>
    </>
  );
};

export default PlatformLayout;
