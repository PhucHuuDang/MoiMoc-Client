"use client";

import { products } from "@/lib/db";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { ProductItemEffectHoverEffectHover } from "./navbar-svg-components/product-item-effect-hover";

export const CarouselCustomized = () => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      // className="w-full"
    >
      <CarouselContent>
        {products.map((product) => {
          return (
            <CarouselItem
              key={product.id}
              className="md:basis-1/2 lg:basis-1/5"
            >
              <ProductItemEffectHoverEffectHover product={product} />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
