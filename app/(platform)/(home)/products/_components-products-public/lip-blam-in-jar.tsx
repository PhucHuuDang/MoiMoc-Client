"use client";

import { CarouselCustomized } from "@/components/_global-components-reused/carousel-customized";
import { ProductItemEffectHover } from "@/components/_global-components-reused/navbar-svg-components/product-item-effect-hover";
import { TextGenerateEffect } from "@/components/aceternity-ui/text-generate-effect";
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

    const text = `Công thức độc đáo từ các thành phần tự nhiên như dầu cám gạo và
    tinh dầu hạnh nhân, son kem hữu cơ Môi Mộc mang lại cảm giác mềm
    mại và mịn màng cho đôi môi. Sản phẩm không chứa parabens,
    phthalates, đảm bảo an toàn tuyệt đối`;

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
        {/* <div className="flex">
          <Image
            src="/about-moi-moc-images/model-organic-lipstick.png"
            alt="model-organic"
            width={800}
            height={600}
            className="max-h-svh w-full object-cover 2xl:h-full"
          />

          <div className="relative w-full">
            <Image
              src="/about-moi-moc-images/background-organic-lipstick.png"
              alt="background-organic"
              height={800}
              width={800}
              className="max-h-svh w-full object-cover 2xl:h-full"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h1 className="text-4xl font-bold text-white">
                Son Môi Hữu Cơ Môi Mộc
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
        </div> */}

        {/* <div>
          <Image
            alt="lip-balm-natural-color"
            height={700}
            width={800}
            // src="/product-images/lip-balm-natural-color.jpg"
            src="https://images.pexels.com/photos/28851851/pexels-photo-28851851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            className="h-[600px] 2xl:h-[85%] w-full object-cover"
          />
        </div> */}

        {/* ** this is the technique prevent breaking the image */}
        <div
          className="relative h-[600px] 2xl:h-[80%] bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/28851851/pexels-photo-28851851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
          }}
        >
          {/* make the whole background a little bit dark */}
          {/* <div className="absolute inset-0 bg-black/10" /> */}
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
