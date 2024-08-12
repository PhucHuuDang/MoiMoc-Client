"use client";

import Image from "next/image";
import { GlareCard } from "../aceternity-ui/glare-card";

interface ProductItemGlareCardProps {}

export const ProductItemGlareCard = () => {
  return (
    <GlareCard className="flex cursor-pointer flex-col items-center justify-center">
      <Image
        src="/images/alchemistry.png"
        alt="home-carousel"
        height={500}
        width={500}
        className="size-full cursor-pointer rounded-3xl object-cover transition duration-200 hover:scale-105"
        onClick={() => console.log("click")}

        // quality={100}
      />
    </GlareCard>
  );
};
