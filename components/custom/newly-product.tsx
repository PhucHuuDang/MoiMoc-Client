"use client";

import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { ProductItem } from "./product-item";
import AutoPlay from "embla-carousel-autoplay";
import { CircleUI } from "./circle-ui";
import { Header } from "../_global-components-reused/header";

export const NewlyProduct = () => {
  return (
    <>
      <h1 className="py-4 text-center text-4xl text-moi_moc_green">
        Newly Product
      </h1>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[AutoPlay({ delay: 3000, stopOnInteraction: false })]}
        className="z-10 w-full"
      >
        <CarouselContent className="h-full p-4 px-10">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
              <div className="pl-1">
                <ProductItem />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* <CircleUI /> */}
    </>
  );
};
