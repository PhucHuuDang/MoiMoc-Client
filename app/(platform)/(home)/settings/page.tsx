import SettingsClient from "./settings-client";

export async function generateMetadata() {
  return {
    title: "Cài đặt",
    description:
      "Bạn có thể điều chỉnh hoặc cập nhật thông tin cá nhân tại đây moimoc.shop",
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
