import { Metadata } from "next";
import { ProductsPublicClient } from "./product-public-client";
import Loading from "../loading";
import { Suspense } from "react";
import { buildProductsPageMetadata } from "@/lib/seo/metadata-builder";

// ISR: Revalidate every 5 minutes for fresh product data
export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return buildProductsPageMetadata();
}

const ProductPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ProductsPublicClient />
    </Suspense>
  );
};

export default ProductPage;
