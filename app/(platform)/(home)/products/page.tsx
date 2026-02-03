import { Metadata } from "next";
import { ProductsPublicClient } from "./product-public-client";
import Loading from "../loading";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sản phẩm",
    description:
      "Khám phá các sản phẩm từ thiên nhiên tại MoiMoc.com. Sự tinh túy từ tự nhiên, an toàn và thân thiện với môi trường, mang đến chất lượng vượt trội cho bạn.",
  };
}

const ProductPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ProductsPublicClient />
    </Suspense>
  );
};

export default ProductPage;
