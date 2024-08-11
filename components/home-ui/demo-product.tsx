"use client";
import { ImagesDemo } from "@/lib/db";
import Image from "next/image";
import BlurFade from "../magic/blur-fade";
import { GlareCard } from "../aceternity-ui/glare-card";

export const DemoProducts = () => {
  return (
    // <div className="z-20 flex items-center justify-center px-10">
    <div className="z-20 grid grid-cols-1 items-center justify-center gap-5 px-10 md:grid-cols-3">
      {ImagesDemo.map((imageUrl, index) => {
        return (
          <BlurFade key={imageUrl.imageURL} delay={0.25 + index * 0.05} inView>
            <GlareCard className="flex flex-col items-center justify-center">
              <Image
                src={imageUrl.imageURL}
                alt={`demo-product-${index}`}
                width={500}
                height={500}
                className="size-[467px] cursor-pointer rounded-3xl object-cover transition duration-200 hover:scale-105"
              />
            </GlareCard>
          </BlurFade>
        );
      })}
    </div>
  );
};
