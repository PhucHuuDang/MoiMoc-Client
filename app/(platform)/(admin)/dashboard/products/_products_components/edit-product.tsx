"use client";

import { FormValues } from "@/components/_global-components-reused/form/form-values";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AddProductSafeTypes } from "@/safe-types-zod/admin/product-types";
import { useImagesProductStore } from "@/store/use-images-product-store";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useWindowScroll } from "react-use";
import { toast } from "sonner";
import { z } from "zod";
import { ProductControllerHeader } from "./header-naviagate-product";
import { ProductDetailCard } from "./product-detail-card";
import { Stock } from "./stock";
import { MultiSelectsIngredients } from "./multi-select-ingredients";
import { ProductCategory } from "./product-category";
import { ExpireDateSelect } from "./expired-date-select";
import { FormImagesProductControl } from "@/components/_global-components-reused/form/form-images-product-control";
import { ProductImage } from "./product-image";
import { FloatArrow } from "@/app/(platform)/(home)/products/_components-products-public/float-arrow";
import { useQueries, useQuery } from "@tanstack/react-query";
import { clientGetData } from "@/api/actions/get-data-api";
import { IngredientsTypes } from "../types-data-fetch/product-return-types";
import {
  Ingredient,
  ProductImage as ProductImageTypes,
} from "@/types/product-detail-types";
import ProductCUSkeleton from "./product-cu-skeleton";
import { capitalize } from "lodash";

interface EditProductProps {
  productId: number;
}

export const EditProduct = ({ productId }: EditProductProps) => {
  const clearAllImages = useImagesProductStore((state) => state.clearImages);

  const router = useRouter();

  const results = useQueries({
    queries: [
      {
        queryKey: ["justDataProduct", productId],
        // queryFn: async () => {
        //   const response = await axios.get(
        //     `http://localhost:3002/products/search/${productId}`,

        //   );
        //   return response.data;
        // },
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
  const isErrorFetch = results.some((result) => result.isError);
  const error = results.find((result) => result.error);
  const isFetching = results.some((result) => result.isFetching);
  const isError = results.some((result) => result.isError);
  const data = results.map((result) => result.data);

  console.log({ results });

  // console.log({ justDataProduct, productCategories });

  const form = useForm<z.infer<typeof AddProductSafeTypes>>({
    resolver: zodResolver(AddProductSafeTypes),
  });

  const stockProps = {
    price: "price",
    discountPrice: "discountPrice",
    quantity: "quantity",
    discountPercentage: "discountPercentage",
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const price = form.watch("price");
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

  console.log("url: ", process.env.NEXT_PUBLIC_API_URL);

  useEffect(() => {
    if (justDataProduct?.data) {
      // Compare current form values with new values before resetting
      const currentValues = form.getValues();
      const newValues = {
        quantity: justDataProduct.data?.quantity,
        details: justDataProduct.data?.details,
        usage: justDataProduct.data?.usage,
        productName: justDataProduct.data?.productName,
        productDescription: justDataProduct.data?.productDescription,
        price: justDataProduct.data?.price,
        discountPrice: justDataProduct.data?.discountPrice,
        discountPercentage: justDataProduct.data?.discountPercentage,
        expireDate: justDataProduct.data.expireDate,

        imageUrl: justDataProduct.data.productImages.map(
          (image: ProductImageTypes) => image.imageUrl,
        ),
        ingredients: justDataProduct.data.ingredients.map(
          (ingredient: Ingredient) => ingredient.ingredientId.toString(),
        ),
        productTypeId: justDataProduct.data.productType.id.toString(),
      };

      if (JSON.stringify(currentValues) !== JSON.stringify(newValues)) {
        // Only reset if the new values differ from the current values
        form.reset(newValues);
      }
    }
  }, [justDataProduct, form]);

  const onSubmit = async (values: z.infer<typeof AddProductSafeTypes>) => {
    console.log({ values });
    setIsLoading(true);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
        values,
      );

      // Check if the status is not 201 (created)
      if (response.status !== 201) {
        toast.error("Error creating product");
        console.log("Error creating product");
      }

      toast.success("Product created successfully");

      clearAllImages();
      form.reset({
        quantity: 1,
        discountPercentage: 0,
        // productTypeId: "",
        expireDate: "",
        ingredients: [],
        productName: "",
        productDescription: "",
        usage: "",
        details: "",
        imageUrl: [],
      });
      router.refresh();

      return response.data;
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const ingredientsList = ingredients.data?.map(
    (ingredient: IngredientsTypes) => ({
      value: ingredient.id.toString(),
      label: capitalize(ingredient.ingredient),
    }),
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <DropdownMenuItem
          onSelect={(e: Event): void => e.preventDefault()}
          className="text-blue-600 w-full"
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
      </SheetTrigger>
      <SheetContent style={{ minWidth: "95%" }} className="overflow-auto">
        <div className="flex min-h-screen w-[90%] flex-col">
          <FormValues form={form} onSubmit={onSubmit}>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mb-16">
              {!isFetching || !isLoading ? (
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
                        title="Hình ảnh sản phẩm"
                        description="Hãy thêm hình ảnh sản phẩm của bạn"
                        form={form}
                        name="imageUrl"
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
      </SheetContent>
    </Sheet>
  );
};
