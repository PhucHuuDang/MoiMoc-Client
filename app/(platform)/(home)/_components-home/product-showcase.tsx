"use client";

import { DirectionAwareHover } from "@/components/aceternity-ui/direction-aware-hover";
import Link from "next/link";

type ImageProps = {
  url: string;
  title: string;
  href: string;
};
export const ProductShowcase = () => {
  const images: ImageProps[] = [
    {
      url: "/products-showcase/lipsticks-moi-moc-delete-logo.jpg",
      title: "Son dưỡng môi màu tự nhiên",
      href: "/products",
    },
    {
      url: "/products-showcase/lip-scrub.jpg",
      title: "Tẩy tế bào chết môi",
      href: "/products",
    },
    {
      url: "/products-showcase/lip-balm-in-jar.jpg",
      title: "Son dưỡng môi màu tự nhiên trong hũ",
      href: "/products",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
        {images.map((image: ImageProps, index: number): JSX.Element => {
          return (
            <DirectionAwareHover
              imageUrl={image.url}
              backgroundOpacity="bg-black/20"
              key={index}
            >
              <div className="flex items-start flex-col">
                <h2 className="text-2xl font-bold mb-2">{image.title}</h2>
                <Link
                  href={image.href}
                  className="text-slate-100 text-sm lg:text-base border-moi_moc_green h-6 w-32 rounded-xl
                    bg-[#438a60] transition duration-200 hover:scale-110 hover:bg-[#326a49]
                    text-center"
                  onClick={() => {}}
                >
                  Xem thêm
                </Link>
              </div>
            </DirectionAwareHover>
          );
        })}
      </div>
    </section>
  );
};
