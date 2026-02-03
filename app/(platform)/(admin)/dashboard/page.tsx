import { verifyAuth } from "@/api/auth/verify-auth";
import { DashboardClient } from "@/app/(platform)/(admin)/dashboard/dashboard-client";

// Explicitly mark this route as dynamic since it requires authentication
export const dynamic = "force-dynamic";

const DashboardPage = async () => {
  // role based ADMIN in here
  const { isAuth, user } = await verifyAuth();

  return (
    <>
      <DashboardClient />
    </>
  );
};

export default DashboardPage;
