"use client";

import { products } from "@/lib/db";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { ProductItemEffectHover } from "./navbar-svg-components/product-item-effect-hover";
import AutoPlay from "embla-carousel-autoplay";

interface CarouselCustomizedProps {
  children?: React.ReactNode;
  title?: string;
}

export const CarouselCustomized = ({
  children,
  title,
}: CarouselCustomizedProps) => {
  return (
    <>
      {title && (
        <h1 className="my-14 text-center text-4xl font-bold text-moi_moc_green">
          {title}
        </h1>
      )}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[AutoPlay({ delay: 2000, stopOnInteraction: false })]}
        className="rounded-xl"
      >
        <CarouselContent>{children}</CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};
