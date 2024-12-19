import { ProductDetailSkelton } from "@/app/(platform)/(home)/[productId]/_components/product-detail-skeleton";
import { Suspense } from "react";
import { EditClient } from "./edit-client";
import { serverGetData } from "@/api/actions/get-data-api";
import { capitalize } from "lodash";
import { IngredientsTypes } from "@/types/product-types";

const EditProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  const [ingredients, productCategories, editProductData] = await Promise.all([
    serverGetData("/ingredients"),
    serverGetData("/product-category"),
    serverGetData(`/products/search/${productId}`),
  ]);

  const ingredientsList = ingredients?.map((ingredient: IngredientsTypes) => ({
    value: ingredient.id,
    label: capitalize(ingredient.ingredient),
  }));

  return (
    <Suspense fallback={<ProductDetailSkelton />}>
      <EditClient
        productId={productId}
        editProductData={editProductData}
        ingredientsList={ingredientsList}
        productCategories={productCategories}
      />
    </Suspense>
  );
};

export default EditProductPage;
