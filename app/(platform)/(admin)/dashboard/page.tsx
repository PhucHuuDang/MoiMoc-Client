import { verifyAuth } from "@/api/auth/verify-auth";
import { DashboardClient } from "@/app/(platform)/(admin)/dashboard/dashboard-client";

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
