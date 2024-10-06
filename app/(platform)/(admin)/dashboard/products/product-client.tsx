"use client";

import { useEffect, useRef, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, Path, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { ProductDetailCard } from "./_products_components/product-detail-card";
import { AddProductSafeTypes } from "@/safe-types-zod/admin/product-types";
import { ProductControllerHeader } from "./_products_components/header-naviagate-product";
import { FormValues } from "@/components/_global-components-reused/form/form-values";
import { Stock } from "./_products_components/stock";
import { ProductCategory } from "./_products_components/product-category";
import { MultiSelectsIngredients } from "./_products_components/multi-select-ingredients";
import { ProductImage } from "./_products_components/product-image";
import { ArchiveProduct } from "./_products_components/archive-product";
import { ImageUpload } from "@/components/_global-components-reused/image-upload";
import { FormImagesProductControl } from "@/components/_global-components-reused/form/form-images-product-control";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { ProductCategoryTypes } from "./types-data-fetch/product-return-types";
import { useFormStatus } from "react-dom";
import Loading from "@/app/(platform)/loading";
import { useWindowScroll } from "react-use";
import { FloatArrow } from "@/app/(platform)/(home)/products/_components-products-public/float-arrow";
import { Logo } from "@/components/_global-components-reused/logo";
import Spinner from "@/components/animata/spinner";

interface ProductClientProps {
  ingredientsList: { value: string; label: string }[];
  productCategories: ProductCategoryTypes[];
}

export function ProductClient({
  ingredientsList,
  productCategories,
}: ProductClientProps) {
  const refHead = useRef<HTMLDivElement>(null);

  const { y } = useWindowScroll();

  const form = useForm<z.infer<typeof AddProductSafeTypes>>({
    resolver: zodResolver(AddProductSafeTypes),
    defaultValues: {
      quantity: 1,
    },
  });

  const onScrollTop = () => {
    refHead.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const { pending } = useFormStatus();

  const price = form.watch("price");
  const discountPercentage = form.watch("discountPercentage");
  // console.log({ price, discountPercentage });

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

  const onSubmit = async (values: z.infer<typeof AddProductSafeTypes>) => {
    console.log({ values });
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        values,
      );

      // Check if the status is not 201 (created)
      if (response.status !== 201) {
        toast.error("Error creating product");
        console.log("Error creating product");
      }

      toast.success("Product created successfully");

      form.reset();

      return response.data;
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const stockProps = {
    price: "price",
    discountPrice: "discountPrice",
    quantity: "quantity",
    discountPercentage: "discountPercentage",
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <FormValues
        form={form}
        onSubmit={onSubmit}
        classNameForm="flex flex-col sm:gap-4 sm:py-4 sm:pl-14"
      >
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mb-16">
          {/* <FormSubmit variant="moiMoc">Submit</FormSubmit> */}
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <ProductControllerHeader isSubmitting={isLoading} />

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

                {/* TODO: fetch api to render in here */}

                <MultiSelectsIngredients
                  name="ingredients"
                  form={form}
                  ingredients={ingredientsList}
                />

                {/* TODO: add the name of stock  */}
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
                  productCategories={productCategories}
                />
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                {/* <MultiSelectsIngredients /> */}
                <FormImagesProductControl
                  title="Hình ảnh sản phẩm"
                  description="Hãy thêm hình ảnh sản phẩm của bạn"
                  form={form}
                  name="imageUrl"
                >
                  <ProductImage />
                </FormImagesProductControl>
                {/* <ProductImage form={form} name="imagesProduct" /> */}
              </div>
            </div>
            {/* <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button size="sm">Save Product</Button>
            </div> */}
          </div>
        </main>
      </FormValues>

      <FloatArrow onScrollTop={onScrollTop} visible={y >= 1452} />
    </div>
  );
}
