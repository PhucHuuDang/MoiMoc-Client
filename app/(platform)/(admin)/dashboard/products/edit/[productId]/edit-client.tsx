"use client";

import { clientGetData } from "@/api/actions/get-data-api";
import { useQueries } from "@tanstack/react-query";
import ProductCUSkeleton from "../../_products_components/product-cu-skeleton";
import { IngredientsTypes } from "@/types/product-types";
import { capitalize } from "lodash";
import { useEffect, useState } from "react";
import {
  Ingredient,
  ProductImage as ProductImageTypes,
} from "@/types/product-detail-types";
import { EditProductSafeTypes } from "@/safe-types-zod/admin/product-types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ProductControllerHeader } from "../../_products_components/header-naviagate-product";
import { ProductDetailCard } from "../../_products_components/product-detail-card";
import { MultiSelectsIngredients } from "../../_products_components/multi-select-ingredients";
import { Stock } from "../../_products_components/stock";
import { ProductCategory } from "../../_products_components/product-category";
import { ExpireDateSelect } from "../../_products_components/expired-date-select";
import { FormImagesProductControl } from "@/components/_global-components-reused/form/form-images-product-control";
import { ProductImage } from "../../_products_components/product-image";
import { FormValues } from "@/components/_global-components-reused/form/form-values";
import { useImagesProductStore } from "@/store/use-images-product-store";
interface EditClientProps {
  productId: string;
}
export const EditClient = ({ productId }: EditClientProps) => {
  const addImage = useImagesProductStore((state) => state.addImage);

  const results = useQueries({
    queries: [
      {
        queryKey: ["justDataProduct", productId],

        queryFn: async () =>
          await clientGetData(`/products/search/${productId}`),
        enabled: !!productId, // Only fetch if productId is available
      },

      {
        queryKey: ["ingredients"],
        queryFn: async () => await clientGetData("/ingredients"),
        enabled: !!productId, // Only fetch if productId is available
      },

      {
        queryKey: ["product-category"],
        queryFn: async () => clientGetData("/product-category"),
        enabled: !!productId, // Only fetch if productId is available
      },
    ],
  });

  const [justDataProduct, ingredients, productCategories] = results;
  const isLoadingFetch = results.some((result) => result.isLoading);
  const data = results.map((result) => result.data);

  const ingredientsList = ingredients.data?.map(
    (ingredient: IngredientsTypes) => ({
      value: ingredient.id.toString(),
      label: capitalize(ingredient.ingredient),
    }),
  );

  const form = useForm<z.infer<typeof EditProductSafeTypes>>({
    resolver: zodResolver(EditProductSafeTypes),
  });

  const stockProps = {
    price: "price",
    discountPrice: "discountPrice",
    quantity: "quantity",
    discountPercentage: "discountPercentage",
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const price = form.watch("price");
  // console.log("values images: ", form.watch("images"));

  const discountPercentage = form.watch("discountPercentage");

  useEffect(() => {
    if (price && discountPercentage) {
      const discountPrice = price - (price * discountPercentage) / 100;

      form.setValue("discountPrice", discountPrice);
    }
    if (discountPercentage?.toString() === "") {
      form.setValue("discountPrice", undefined);
      // form.control("")
    }
  }, [price, discountPercentage, form]);

  // Only reset form if new product data is available
  useEffect(() => {
    if (justDataProduct?.data) {
      const data = justDataProduct.data;
      const newValues = {
        quantity: data?.quantity,
        details: data?.details,
        usage: data?.usage,
        productName: data?.productName,
        productDescription: data?.productDescription,
        price: data?.price,
        discountPrice: data?.discountPrice ?? undefined,
        discountPercentage: data?.discountPercentage ?? undefined,
        expireDate: data.expireDate,
        images: data.productImages.map((image: ProductImageTypes) => {
          // addImage(image.imageUrl);
          return {
            productId: image.productId,
            imageId: image.id,
            imageUrl: image.imageUrl,
          };
        }),
        ingredients: data.ingredients.map((ingredient: Ingredient) =>
          ingredient.ingredientId.toString(),
        ),
        productTypeId: justDataProduct.data.productType.id.toString(),
      };

      const currentValues = form.getValues();

      if (JSON.stringify(currentValues) !== JSON.stringify(newValues)) {
        form.reset(newValues);
      }
    }
  }, [justDataProduct, form]);

  const onSubmit = async (values: z.infer<typeof EditProductSafeTypes>) => {
    console.log({ values });
    setIsLoading(true);
    // clearAllImages();

    try {
      // const response = await axios.put(
      //   `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
      //   values,
      // );
      // // Check if the status is not 201 (created)
      // if (response.status !== 201) {
      //   toast.error("Error creating product");
      //   console.log("Error creating product");
      // }
      // toast.success("Product created successfully");
      // clearAllImages();
      // form.reset({
      //   quantity: 1,
      //   discountPercentage: 0,
      //   // productTypeId: "",
      //   expireDate: "",
      //   ingredients: [],
      //   productName: "",
      //   productDescription: "",
      //   usage: "",
      //   details: "",
      //   images: [],
      // });
      // router.refresh();
      // return response.data;
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log({ ingredientsList });

  if (isLoadingFetch) return <ProductCUSkeleton />;

  return (
    <div className="flex min-h-screen w-[90%] flex-col">
      {/* <Button onClick={clearAllImages}>Clear Images</Button> */}
      <FormValues form={form} onSubmit={onSubmit}>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mb-16">
          {!isLoading ? (
            <div className="grid w-full flex-1 auto-rows-max gap-4">
              <ProductControllerHeader
                isSubmitting={isLoading}
                title="Chỉnh sửa sản phẩm"
              />

              <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                  <ProductDetailCard
                    form={form}
                    productName="productName"
                    descriptionName="productDescription"
                    usage="usage"
                    details="details"
                    disabled={isLoading}
                  />

                  <MultiSelectsIngredients
                    name="ingredients"
                    form={form}
                    ingredients={ingredientsList}
                  />

                  <Stock
                    form={form}
                    name="discountPrice"
                    stockProps={stockProps}
                    disabled={isLoading}
                  />

                  <ProductCategory
                    form={form}
                    name="productTypeId"
                    formLabel="Các loại sản phẩm..."
                    productCategories={productCategories.data}
                  />

                  <ExpireDateSelect
                    form={form}
                    name="expireDate"
                    formLabel="Ngày hết hạn"
                  />
                </div>
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                  <FormImagesProductControl
                    productId={+productId}
                    edit
                    title="Hình ảnh sản phẩm"
                    description="Hãy thêm hình ảnh sản phẩm của bạn"
                    form={form}
                    name="images"
                  >
                    <ProductImage />
                  </FormImagesProductControl>
                </div>
              </div>
            </div>
          ) : (
            <ProductCUSkeleton />
          )}
        </main>
      </FormValues>
    </div>
  );
};
