"use client";

import { CarouselCustomized } from "@/components/_global-components-reused/carousel-customized";
import { ProductItemEffectHoverEffectHover } from "@/components/_global-components-reused/navbar-svg-components/product-item-effect-hover";
import { TextGenerateEffect } from "@/components/aceternity-ui/text-generate-effect";
import { CarouselItem } from "@/components/ui/carousel";
import { Lipsticks, products } from "@/lib/db";
import Image from "next/image";
import { ElementRef, RefObject, forwardRef, useRef } from "react";

interface LipBalmProps {
  ref: React.Ref<HTMLDivElement>;
}

export const LipBalm = forwardRef<HTMLDivElement>(({}, ref) => {
  const lipBalmRef = useRef<ElementRef<"div">>(null);
  const organicLipstickRef = useRef<ElementRef<"div">>(null);
  const lipstickRef = useRef<ElementRef<"div">>(null);
  const giftSetRef = useRef<ElementRef<"div">>(null);

  // const handleScrollPosition = (
  //   // ref: RefObject<HTMLDivElement>,
  //   refLabel: string,
  // ) => {
  //   const refMap: Record<string, RefObject<HTMLDivElement>> = {
  //     lipBalmRef,
  //     organicLipstickRef,
  //     lipstickRef,
  //     giftSetRef,
  //   };

  //   const ref = refMap[refLabel as keyof typeof refMap];

  //   if (ref?.current) {
  //     ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  //   }
  // };

  const text = `Mang đến cho bạn đôi môi mềm mịn và căng mọng tự nhiên, son dưỡng
  Môi Mộc được làm từ 100% nguyên liệu hữu cơ như dầu dừa, sáp ong và
  tinh dầu hoa hồng. Sản phẩm không chứa chất bảo quản và hóa chất độc
  hại, đảm bảo an toàn tuyệt đối cho đôi môi của bạn.`;

  return (
    <>
      <div className="flex items-center gap-x-2 px-6">
        <Image
          src="/about-moi-moc-images/son-duong-moc.png"
          width={500}
          height={300}
          className="h-[320px] w-full rounded-xl object-cover 2xl:h-[500px]"
          alt="suong-duong-moc"
        />

        <div className="flex flex-col">
          <h1 className="text-center text-4xl font-bold text-moi_moc_green">
            Son Dưỡng Môi Mộc
          </h1>
          <span className="p-2 text-moi_moc_green">
            <TextGenerateEffect
              words={text}
              filter={false}
              classNameText="font-light text-moi_moc_green"
            />
          </span>
        </div>
      </div>

      <div className="my-6" ref={ref}>
       

        <div className="mt-5 overflow-hidden px-14">
          <CarouselCustomized title="Son Dưỡng Môi Mộc">
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
          </CarouselCustomized>
        </div>
      </div>
    </>
  );
});

LipBalm.displayName = "LipBalm";
