import { Metadata } from "next";
import SettingsClient from "./settings-client";
import { Suspense } from "react";
import Loading from "../loading";

// Explicitly mark this route as dynamic since it requires authentication
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Cài đặt",
    description:
      "Bạn có thể điều chỉnh hoặc cập nhật thông tin cá nhân tại đây moimoc.com",
  };
}

const SettingsPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <SettingsClient />
    </Suspense>
  );
};

export default SettingsPage;
