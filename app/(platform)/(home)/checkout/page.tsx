import { Metadata } from "next";
import { CheckoutClient } from "./checkout-client";
import { SparklesCore } from "@/components/aceternity-ui/sparkles";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Thanh toán",
    description: "Thanh toán đơn hàng của bạn tại moimoc.shop",
  };
}

const CheckoutPage = () => {
  return (
    <div
      className="min-h-screen w-full relative flex flex-col items-center justify-center
        overflow-hidden"
    >
      <div className="w-full h-full 2xl:h-screen absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={150}
          className="w-full h-full"
          particleColor="#47843c"
        />
      </div>
      <div className="z-10">
        <CheckoutClient />
      </div>
    </div>
  );
};

export default CheckoutPage;
