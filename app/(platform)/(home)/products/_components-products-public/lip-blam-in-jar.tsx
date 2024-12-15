"use client";

import { CarouselCustomized } from "@/components/_global-components-reused/carousel-customized";
import { ProductItemEffectHover } from "@/components/_global-components-reused/navbar-svg-components/product-item-effect-hover";
import { CarouselItem } from "@/components/ui/carousel";
import { useParentDataContext } from "@/provider/parent-data-provider";
import { useCartStore } from "@/store/use-cart-store";
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
        <div
          className="relative h-[400px] md:h-[600px] 2xl:h-[80%] bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/28851851/pexels-photo-28851851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
          }}
        >
          <div className="relative pt-28 h-screen"></div>
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
