"use client";
import { ImagesDemo } from "@/lib/db";
import Image from "next/image";
import BlurFade from "../magic/blur-fade";
import { GlareCard } from "../aceternity-ui/glare-card";

export const DemoProducts = () => {
  return (
    <div
      className="grid grid-cols-1 gap-5 px-4 sm:px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        xl:px-10 w-full"
    >
      {ImagesDemo.map(({ imageURL }: { imageURL: string }, index: number) => {
        return (
          <BlurFade
            key={imageURL}
            delay={0.25 + index * 0.05}
            inView
            blur="8px"
            className="flex items-center justify-evenly"
          >
            <GlareCard>
              <Image
                src={imageURL}
                alt={`demo-product-${index}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="cursor-pointer object-cover transition duration-200 hover:scale-105"
              />
            </GlareCard>
          </BlurFade>
        );
      })}
    </div>
  );
};
