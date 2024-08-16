"use client";

import { ElementRef, RefObject, useEffect, useRef } from "react";
import { useWindowScroll } from "react-use";

import { Lipsticks } from "@/lib/db";

import { LipBalm } from "./_components-about-moi-moc/lip-balm";
import { OrganicLipstick } from "./_components-about-moi-moc/organic-lipstick";
import { OrganicLipStickSolid } from "./_components-about-moi-moc/organic-lipstick-solid";
import { GiftSet } from "./_components-about-moi-moc/gift-set";
import { Footer } from "@/components/_global-components-reused/footer";
import { Separator } from "@/components/ui/separator";
import { FloatArrow } from "./_components-about-moi-moc/float-arrow";

export const AboutMoiMoc = () => {
  const homeRef = useRef<ElementRef<"div">>(null);
  const lipBalmRef = useRef<ElementRef<"div">>(null);
  const organicLipstickRef = useRef<ElementRef<"div">>(null);
  const lipstickRef = useRef<ElementRef<"div">>(null);
  const giftSetRef = useRef<ElementRef<"div">>(null);

  const { y } = useWindowScroll();

  useEffect(() => {
    console.log({ y });
  }, [y]);

  const onScrollTop = () => {
    homeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleScrollPosition = (
    // ref: RefObject<HTMLDivElement>,
    refLabel: string,
  ) => {
    const refMap: Record<string, RefObject<HTMLDivElement>> = {
      lipBalmRef,
      organicLipstickRef,
      lipstickRef,
      giftSetRef,
    };

    const ref = refMap[refLabel as keyof typeof refMap];

    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="h-full overflow-hidden pt-20" ref={homeRef}>
      <div className="my-6 flex items-center justify-evenly">
        {Lipsticks.map((lipstick) => {
          return (
            <div
              // ref={lipstick.refContent === }
              key={lipstick.refContent}
              className="hoverAnimate w-44 rounded-xl border border-moi_moc_green p-1.5 text-center font-semibold text-moi_moc_green"
              onClick={() => handleScrollPosition(lipstick.refContent)}
            >
              {lipstick.label}
            </div>
          );
        })}
      </div>

      <LipBalm ref={lipBalmRef} />
      <OrganicLipstick ref={organicLipstickRef} />
      <OrganicLipStickSolid ref={lipstickRef} />
      <GiftSet ref={giftSetRef} />
      <Separator className="mx-1 my-16 h-0.5 bg-moi_moc_green" />
      <Footer />
      <FloatArrow onScrollTop={onScrollTop} visible={y >= 1452} />
    </div>
  );
};
