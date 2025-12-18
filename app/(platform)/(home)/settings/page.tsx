import { Metadata } from "next";
import SettingsClient from "./settings-client";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Cài đặt",
    description:
      "Bạn có thể điều chỉnh hoặc cập nhật thông tin cá nhân tại đây moimoc.com",
  };
}

const SettingsPage = () => {
  return (
    <>
      <SettingsClient />
    </>
  );
};

export default SettingsPage;
