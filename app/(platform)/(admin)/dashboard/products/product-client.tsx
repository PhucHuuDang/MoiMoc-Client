"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { ProductDetailCard } from "./_products_components/product-detail-card";
import { AddProductSafeTypes } from "@/safe-types-zod/admin/product-types";
import { ProductControllerHeader } from "./_products_components/header-naviagate-product";
import { FormValues } from "@/components/_global-components-reused/form/form-values";
import { Stock } from "./_products_components/stock";
import { ProductCategory } from "./_products_components/product-category";
import { ProductStatus } from "./_products_components/product-status";
import { ProductImage } from "./_products_components/product-image";
import { ArchiveProduct } from "./_products_components/archive-product";
import { ImageUpload } from "@/components/_global-components-reused/image-upload";
import { FormImagesProductControl } from "@/components/_global-components-reused/form/form-images-product-control";

export function ProductClient() {
  const form = useForm<z.infer<typeof AddProductSafeTypes>>({
    resolver: zodResolver(AddProductSafeTypes),
    defaultValues: {
      quantity: 1,
      price: 100,
    },
  });

  const onSubmit = (values: z.infer<typeof AddProductSafeTypes>) => {
    console.log({ values });
  };

  const stockProps = {
    price: "price",
    discountPrice: "discountPrice",
    quantity: "quantity",
    discountPercent: "discountPercent",
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
            <ProductControllerHeader />

            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <ProductDetailCard
                  form={form}
                  productName="productName"
                  descriptionName="productDescription"
                />

                {/* TODO: add the name of stock  */}
                <Stock
                  form={form}
                  name="discountPrice"
                  stockProps={stockProps}
                />

                <ProductCategory
                  form={form}
                  name="productTypeId"
                  formLabel="Category for the product"
                />
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <ProductStatus />
                <FormImagesProductControl form={form} name="imagesProduct">
                  <ProductImage />
                </FormImagesProductControl>
                {/* <ProductImage form={form} name="imagesProduct" /> */}
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button size="sm">Save Product</Button>
            </div>
          </div>
        </main>
      </FormValues>
    </div>
  );
}
