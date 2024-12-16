"use client";

import { CarouselCustomized } from "@/components/_global-components-reused/carousel-customized";
import { ProductItemEffectHover } from "@/components/_global-components-reused/navbar-svg-components/product-item-effect-hover";
import { CarouselItem } from "@/components/ui/carousel";
import { useParentDataContext } from "@/provider/parent-data-provider";
import { useCartStore } from "@/store/use-cart-store";
import Image from "next/image";
import { forwardRef } from "react";

interface LipBalmInJarProps {}

export const LipBalmInJar = forwardRef<HTMLDivElement, LipBalmInJarProps>(
  ({}, ref) => {
    const addOrder = useCartStore((state) => state.addOrder);
    // cart.

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
      <div className="my-14 w-full" ref={ref}>
        {/* <div
          className="relative w-full h-[400px] md:h-[600px] lg:h-[1000px] bg-no-repeat bg-cover
            bg-center aspect-square md:aspect-[16/9]"
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/28851851/pexels-photo-28851851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
          }}
        >
          <div className="relative pt-28 h-screen" />
        </div> */}

        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]">
          <Image
            src="https://images.pexels.com/photos/28851851/pexels-photo-28851851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="lipbalm-in-jar-banner-image"
            fill
            style={{
              objectFit: "cover",
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 75vw, 50vw"
            loading="lazy"
            className="rounded-lg"
          />
          {/* <div className="absolute inset-0 bg-black bg-opacity-30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold text-center px-4">
              Discover Our Collection
            </h2>
          </div> */}
        </div>

        <div className="overflow-hidden px-14">
          <CarouselCustomized title="Son Dưỡng Dạng Hũ">
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
  },
);

LipBalmInJar.displayName = "LipBalmInJar";
