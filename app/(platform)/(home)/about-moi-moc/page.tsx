"use client";

import { CarouselCustomized } from "@/components/_global-components-reused/carousel-customized";
import { TextGenerateEffect } from "@/components/aceternity-ui/text-generate-effect";
import { Lipsticks } from "@/lib/db";
import Image from "next/image";
import { ElementRef, RefObject, useRef } from "react";
import { LipBalm } from "./_components-about-moi-moc/lip-balm";
import { OrganicLipstick } from "./_components-about-moi-moc/organic-lipstick";
import { OrganicLipStickSolid } from "./_components-about-moi-moc/organic-lipstick-solid";

const AboutMoiMoc = () => {
  const lipBalmRef = useRef<ElementRef<"div">>(null);
  const organicLipstickRef = useRef<ElementRef<"div">>(null);
  const lipstickRef = useRef<ElementRef<"div">>(null);
  const giftSetRef = useRef<ElementRef<"div">>(null);

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

  const text = `Mang đến cho bạn đôi môi mềm mịn và căng mọng tự nhiên, son dưỡng
  Môi Mộc được làm từ 100% nguyên liệu hữu cơ như dầu dừa, sáp ong và
  tinh dầu hoa hồng. Sản phẩm không chứa chất bảo quản và hóa chất độc
  hại, đảm bảo an toàn tuyệt đối cho đôi môi của bạn.`;

  return (
    <div className="min-h-screen pt-20">
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

      {/* <div className="flex items-center gap-x-2 px-6">
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
              duration={10}
              filter={false}
              className="font-semibold text-moi_moc_green"
            />
          </span>
        </div>
      </div>

      <div className="my-6" ref={lipBalmRef}>
        <h1 className="text-center text-4xl font-bold text-moi_moc_green">
          Son Dưỡng Môi Mộc
        </h1>

        <div className="mt-5 overflow-hidden px-14">
          <CarouselCustomized />
        </div>
      </div> */}
      <LipBalm ref={lipBalmRef} />
      <OrganicLipstick ref={organicLipstickRef} />
      <OrganicLipStickSolid ref={lipstickRef} />
    </div>
  );
};

export default AboutMoiMoc;
