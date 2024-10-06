import { ProductClient } from "@/app/(platform)/(admin)/dashboard/products/product-client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AllProducts } from "./all-products";
import { serverGetData } from "@/api/actions/get-data-api";
import { capitalize } from "lodash";

type IngredientsTypes = {
  id: string;
  ingredient: string;
  createdAt: string;
  updatedAt: string;
};

const ProductsPage = async () => {
  // const ingredients: IngredientsTypes[] = await serverGetData("/ingredients");

  const [ingredients, productCategories] = await Promise.all([
    serverGetData("/ingredients"),
    serverGetData("/product-category"),
  ]);

  const ingredientsList = ingredients.map((ingredient: IngredientsTypes) => ({
    value: ingredient.id,
    label: capitalize(ingredient.ingredient),
  }));

  // console.log({ productCategories });

  return (
    <>
      <Tabs defaultValue="all-products">
        <TabsList>
          <TabsTrigger value="all-products">All Products</TabsTrigger>
          <TabsTrigger value="add-product">Add Product</TabsTrigger>
        </TabsList>

        <TabsContent value="all-products" className="z-10">
          <AllProducts />
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
