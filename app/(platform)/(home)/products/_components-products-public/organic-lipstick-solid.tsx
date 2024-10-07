"use client";

import { CarouselCustomized } from "@/components/_global-components-reused/carousel-customized";
import { ProductItemEffectHover } from "@/components/_global-components-reused/navbar-svg-components/product-item-effect-hover";
import { TextGenerateEffect } from "@/components/aceternity-ui/text-generate-effect";
import { CarouselItem } from "@/components/ui/carousel";
import { products } from "@/lib/db";
import { useParentDataContext } from "@/provider/parent-data-provider";
import Image from "next/image";
import { forwardRef } from "react";

interface OrganicLipStickSolidProps {}

export const OrganicLipStickSolid = forwardRef<
  HTMLDivElement,
  OrganicLipStickSolidProps
>(({}, ref) => {
  const text = `Với độ bám màu cao và chất son lì mịn, son thỏi hữu cơ Môi Mộc giúp bạn tự tin với đôi môi sắc nét và quyến rũ. Thành phần chiết xuất từ quả gấc và tinh chất trà xanh giúp nuôi dưỡng và bảo vệ môi khỏi tác động của môi trường.`;

  const productsList = useParentDataContext();

  const productsTransformed = productsList?.map((product) => {
    return {
      productId: product.productId,
      id: product.id,
      productName: product.productName,
      productDescription: product.productDescription,
      mainImage: product.productImages[0].imageUrl,
      price: product.price,
      discountPrice: product.discountPrice,
      discountPercentage: product.discountPercentage,
      quantity: product.quantity,
    };
  });
  return (
    <div className="my-6 w-full" ref={ref}>
      <div className="flex">
        <div className="relative w-full">
          <Image
            src="/about-moi-moc-images/background-organic-lipstick-solid.png"
            alt="background-organic-solid"
            height={600}
            width={600}
            className="max-h-svh w-full object-cover 2xl:h-full"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-white">
              Son Thỏi Hữu Cơ Môi Mộc
            </h1>
            <div className="mt-2 p-2 px-6 text-white">
              <TextGenerateEffect
                words={text}
                classNameText="text-white font-light "
                filter={false}
              />
            </div>
          </div>
        </div>

        <Image
          src="/about-moi-moc-images/model-organic-lipstick-solid-1.png"
          alt="model-organic-solid"
          width={600}
          height={600}
          className="max-h-svh w-full object-cover 2xl:h-full"
        />
      </div>
      <div className="overflow-hidden px-14">
        <CarouselCustomized title="Son Thỏi Hữu Cơ">
          {productsTransformed?.map((product) => {
            return (
              <CarouselItem
                key={product.id}
                className="md:basis-1/2 lg:basis-1/5"
              >
                <ProductItemEffectHover product={product} />
              </CarouselItem>
            );
          })}
        </CarouselCustomized>
      </div>
    </div>
  );
});

OrganicLipStickSolid.displayName = "OrganicLipStickSolid";
