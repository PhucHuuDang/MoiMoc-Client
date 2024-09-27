"use client";

import { useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { DirectionAwareHover } from "@/components/aceternity-ui/direction-aware-hover";

export const ProductShowcase = () => {
  const [hovered, setHovered] = useState<number | null>(null);

  const images = [
    {
      url: "/products-showcase/lipbalm-natural.png",
      alt: "Son dưỡng môi màu tự nhiên",
    },
    {
      url: "/products-showcase/lip-scrub.png",
      alt: "Tẩy tế bào chết môi",
    },
    {
      url: "/products-showcase/lipbalm-in-jar.png",
      alt: "Son dưỡng môi màu tự nhiên trong hũ",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((image, index) => {
          return (
            <DirectionAwareHover
              imageUrl={image.url}
              backgroundOpacity="bg-black/20"
            >
              <div className="flex items-start flex-col">
                <h2 className="text-2xl font-bold mb-2">{image.alt}</h2>
                <Button
                  variant="moiMoc"
                  className="text-slate-100 border-moi_moc_green h-6 w-32 rounded-2xl"
                  onClick={() => {}}
                >
                  Xem thêm
                </Button>
              </div>
            </DirectionAwareHover>

            // <div
            //   className="relative aspect-square rounded-2xl overflow-hidden"
            //   key={index}
            //   onMouseOver={() => setHovered(index)}
            //   onMouseLeave={() => setHovered(null)}
            // >
            //   <Image
            //     src={image.url}
            //     alt={image.alt}
            //     fill
            //     style={{ objectFit: "cover" }}
            //   />
            //   <div
            //     className={` absolute inset-0 bg-opacity-30 flex items-center justify-center rounded-2xl
            //     transition-all transform
            //     ${hovered === index ? "opacity-100 scale-100 bg-black/15" : "opacity-0 scale-95 "} `}
            //   >
            //     <div className="text-center text-white">
            //       <h3 className="text-xl font-bold mb-2">{image.alt}</h3>
            //       <Button
            //         variant="moiMoc"
            //         className="text-slate-100 border-moi_moc_green"
            //       >
            //         Xem thêm
            //       </Button>
            //     </div>
            //   </div>
            // </div>
          );
        })}
      </div>
    </section>
  );
};
