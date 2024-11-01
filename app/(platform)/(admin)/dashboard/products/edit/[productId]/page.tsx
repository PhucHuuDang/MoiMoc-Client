import { ProductDetailSkelton } from "@/app/(platform)/(home)/[productId]/_components/product-detail-skeleton";
import { Suspense } from "react";
import { EditClient } from "./edit-client";

const EditProductPage = ({ params }: { params: { productId: string } }) => {
  const { productId } = params;

  return (
    <Suspense fallback={<ProductDetailSkelton />}>
      <EditClient productId={productId} />
    </Suspense>
  );
};

export default EditProductPage;
