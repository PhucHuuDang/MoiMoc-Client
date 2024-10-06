import { ProductClient } from "@/app/(platform)/(admin)/dashboard/products/product-client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AllProducts } from "./all-products";
import { serverGetData } from "@/api/actions/get-data-api";
import { capitalize } from "lodash";
import {
  ProductReturnedTypes,
  ProductTransformedTypes,
} from "@/types/product-types";

type IngredientsTypes = {
  id: string;
  ingredient: string;
  createdAt: string;
  updatedAt: string;
};

const ProductsPage = async () => {
  // const ingredients: IngredientsTypes[] = await serverGetData("/ingredients");

  const [ingredients, productCategories, products] = await Promise.all([
    serverGetData("/ingredients"),
    serverGetData("/product-category"),
    serverGetData("/products"),
  ]);

  const ingredientsList = ingredients?.map((ingredient: IngredientsTypes) => ({
    value: ingredient.id,
    label: capitalize(ingredient.ingredient),
  }));

  const productsList: ProductTransformedTypes[] = products?.map(
    (product: ProductReturnedTypes) => {
      return {
        id: product.productId,
        productName: product.productName,
        image: product.productImages[0].imageUrl,
        price: product.price,
        discountPercentage: product.discountPercentage,
        discountPrice: product.discountPrice,
        quantity: product.quantity,
        createdAt: product.createdAt,
        productType: product.productType.type,
      };
    },
  );

  console.log({ products });

  return (
    <>
      <Tabs defaultValue="all-products">
        <TabsList>
          <TabsTrigger value="all-products">All Products</TabsTrigger>
          <TabsTrigger value="add-product">Add Product</TabsTrigger>
        </TabsList>

        <TabsContent value="all-products" className="z-10">
          <AllProducts productsList={productsList} />
        </TabsContent>

        <TabsContent value="add-product">
          <ProductClient
            ingredientsList={ingredientsList}
            productCategories={productCategories}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ProductsPage;
