import { Metadata } from "next";
import { ProductsPublicClient } from "./product-public-client";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Sản phẩm",
    description:
      "Khám phá các sản phẩm từ thiên nhiên tại MoiMoc.shop. Sự tinh túy từ tự nhiên, an toàn và thân thiện với môi trường, mang đến chất lượng vượt trội cho bạn.",
  };
}

const ProductPage = () => {
  return (
    <div className="min-h-screen">
      <ProductsPublicClient />
    </div>
  );
};

export default ProductPage;
