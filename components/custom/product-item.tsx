"use client";

import Image from "next/image";

interface ProductItemProps {}

export const ProductItem = () => {
  return (
    <Image
      src="/images/alchemistry.png"
      alt="home-carousel"
      height={500}
      width={500}
      className="h-80 w-64 cursor-pointer rounded-3xl object-cover transition duration-200 hover:scale-105"
      // quality={100}
    />
  );
};
