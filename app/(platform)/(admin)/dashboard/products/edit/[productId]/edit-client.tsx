"use client";

import { useEffect, useRef, useState } from "react";
import { useMountedState } from "react-use";
import NotFound from "@/app/(platform)/(home)/[productId]/not-found";
import { z } from "zod";
import { capitalize } from "lodash";

import { clientGetData } from "@/api/actions/get-data-api";
import { useQuery } from "@tanstack/react-query";
import ProductCUSkeleton from "../../_products_components/product-cu-skeleton";
import { IngredientsTypes } from "@/types/product-types";
import {
  Ingredient,
  ProductImage as ProductImageTypes,
} from "@/types/product-detail-types";
import { EditProductSafeTypes } from "@/safe-types-zod/admin/product-types";
import { Path, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { ProductCategoryTypes } from "../../types-data-fetch/product-return-types";
import { ProductEditTypes } from "@/types";
import { usePathname } from "next/navigation";
interface EditClientProps {
  productId: string;
  productCategories: ProductCategoryTypes[];
  editProductData: ProductEditTypes;
  ingredientsList: { value: string; label: string }[];
}
export const EditClient = ({
  productId,
  ingredientsList,
  editProductData,
  productCategories,
}: EditClientProps) => {
  const addImage = useImagesProductStore((state) => state.addImage);
  const initializedRef = useRef(false);
  const isMountedState = useMountedState();
  const [isLoading, setIsLoading] = useState<boolean>(false);
 

  const form = useForm<z.infer<typeof EditProductSafeTypes>>({
    resolver: zodResolver(EditProductSafeTypes),
  });

  const {
    data: justDataProduct,
    isLoading: isLoadingFetch,
    isError,
  } = useQuery({
    queryKey: ["justDataProduct", productId],
    queryFn: async () => await clientGetData(`/products/search/${productId}`),
    enabled: !!productId, // Only fetch if productId is available
    initialData: editProductData,
    refetchOnMount: false,
  });

  const price = form.watch("price");

  const discountPercentage = form.watch("discountPercentage");

  useEffect(() => {
    if (
      !initializedRef.current &&
      isMountedState() &&
      justDataProduct?.productImages
    ) {
      // Clear and add images only once
      // localStorage.setItem("images-product-store", JSON.stringify([]));
      localStorage.removeItem("images-product-store");
      justDataProduct.productImages.forEach((image: { imageUrl: string }) =>
        addImage(image.imageUrl),
      );

      // Set form images if they differ from product images
      const formImages = form.getValues("images");
      const defaultImages = justDataProduct.productImages.map(
        (img: { imageUrl: string }) => img.imageUrl,
      );
      if (JSON.stringify(formImages) !== JSON.stringify(defaultImages)) {
        form.reset({ images: defaultImages });
      }

      initializedRef.current = true; // Set as initialized
    }

    

    // Clear images on component unmount
    return () => localStorage.removeItem("images-product-store");
    // localStorage.setItem("images-product-store", JSON.stringify([]));
  }, [isMountedState, addImage, localStorage.removeItem]);

  // Populate form fields with justDataProduct data once when it changes
  useEffect(() => {
    if (justDataProduct) {
      const newValues = {
        expireDate: justDataProduct.expireDate,
        ingredients: justDataProduct.ingredients.map(
          (ing: { ingredientId: number }) => ing.ingredientId.toString(),
        ),
        productTypeId: justDataProduct.productType?.id.toString(),
        quantity: justDataProduct.quantity,
        details: justDataProduct.details,
        usage: justDataProduct.usage,
        productName: justDataProduct.productName,
        productDescription: justDataProduct.productDescription,
        price: justDataProduct.price,
        discountPrice: justDataProduct.discountPrice ?? undefined,
        discountPercentage: justDataProduct.discountPercentage ?? undefined,
      };

      // Only reset form values if they differ from current values
      const currentValues = form.getValues();
      if (JSON.stringify(currentValues) !== JSON.stringify(newValues)) {
        form.reset(newValues);
      }
    }
  }, [justDataProduct, form]);

  // Calculate and set discount price if discountPercentage changes
  useEffect(() => {
    if (price && discountPercentage) {
      const discountPrice = price - (price * discountPercentage) / 100;
      form.setValue("discountPrice", discountPrice);
    } else if (discountPercentage?.toString() === "") {
      form.setValue("discountPrice", undefined);
    }
  }, [price, discountPercentage, form]);

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

  // console.log({ ingredientsList });

  const stockProps = {
    price: "price",
    discountPrice: "discountPrice",
    quantity: "quantity",
    discountPercentage: "discountPercentage",
  };

  if (isLoadingFetch) return <ProductCUSkeleton />;
  if (isError || !justDataProduct?.productId) return <NotFound />;

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
                    // name="discountPrice"
                    stockProps={stockProps}
                    disabled={isLoading}
                  />

                  <ProductCategory
                    form={form}
                    name="productTypeId"
                    formLabel="Các loại sản phẩm..."
                    productCategories={productCategories}
                  />

                  <ExpireDateSelect
                    form={form}
                    name="expireDate"
                    formLabel="Ngày hết hạn"
                  />
                </div>
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                  <FormImagesProductControl
                    // productId={+productId}
                    // edit
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
