"use client";

import { ElementRef, RefObject, useEffect, useRef } from "react";
import { useWindowScroll } from "react-use";

import { Lipsticks } from "@/lib/db";

import BlurFade from "@/components/magic/blur-fade";

import { LipBalm } from "./_components-products-public/lip-balm";
import { LipBalmInJar } from "./_components-products-public/lip-blam-in-jar";
import { LipScrubInJar } from "./_components-products-public/lip-scrub-in-jar";
import { Footer } from "@/components/_global-components-reused/footer";
import { Separator } from "@/components/ui/separator";
import { FloatArrow } from "./_components-products-public/float-arrow";
import { useParentDataContext } from "@/provider/parent-data-provider";

export const ProductsPublicClient = () => {
  const homeRef = useRef<ElementRef<"div">>(null);
  const lipBalmRef = useRef<ElementRef<"div">>(null);
  const organicLipstickRef = useRef<ElementRef<"div">>(null);
  const lipstickRef = useRef<ElementRef<"div">>(null);
  const giftSetRef = useRef<ElementRef<"div">>(null);

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

  const { y } = useWindowScroll();

  const delay = 0.25;

  const onScrollTop = () => {
    homeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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

  return (
    <div className="h-full overflow-hidden pt-20" ref={homeRef}>
      {/* <div className="my-6 flex items-center justify-evenly">
        {Lipsticks.map((lipstick, index) => {
          return (
            <BlurFade inView delay={0.2 + index * 0.1} key={lipstick.label}>
              <div
                // ref={lipstick.refContent === }
                key={lipstick.refContent}
                className="hoverAnimate w-44 rounded-xl border border-moi_moc_green p-1.5 text-center
                  font-semibold text-moi_moc_green"
                onClick={() => handleScrollPosition(lipstick.refContent)}
              >
                {lipstick.label}
              </div>
            </BlurFade>
          );
        })}
      </div> */}

      <BlurFade inView delay={delay}>
        <LipBalm ref={lipBalmRef} />
      </BlurFade>
      <BlurFade inView delay={delay}>
        <LipBalmInJar ref={organicLipstickRef} />
      </BlurFade>
      <BlurFade inView delay={delay}>
        <LipScrubInJar ref={lipstickRef} />
      </BlurFade>

      <BlurFade inView delay={delay}>
        <Separator className="mx-1 my-16 h-0.5 bg-moi_moc_green" />
      </BlurFade>
      <BlurFade inView delay={delay}>
        <Footer />
      </BlurFade>
      <FloatArrow onScrollTop={onScrollTop} visible={y >= 1452} />
    </div>
  );
};
