import { ProductClient } from "@/app/(platform)/(admin)/dashboard/products/product-client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AllProducts } from "./all-products";

const ProductsPage = () => {
  return (
    <>
      <Tabs defaultValue="all-products">
        <TabsList>
          <TabsTrigger value="all-products">All Products</TabsTrigger>
          <TabsTrigger value="add-product">Add Product</TabsTrigger>
        </TabsList>

        <TabsContent value="all-products">
          <AllProducts />
        </TabsContent>

        <TabsContent value="add-product">
          <ProductClient />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ProductsPage;
