"use client";

import { DirectionAwareHover } from "@/components/aceternity-ui/direction-aware-hover";
import { motion } from "@/lib/motion";
import Link from "next/link";
import { JSX } from "react";
import { ArrowRight } from "lucide-react";

type ImageProps = {
  url: string;
  title: string;
  description: string;
  href: string;
};

export const ProductShowcase = () => {
  const images: ImageProps[] = [
    {
      url: "/products-showcase/lipsticks-moi-moc-delete-logo.jpg",
      title: "Son dưỡng môi màu tự nhiên",
      description: "Rạng rỡ với màu sắc từ thiên nhiên",
      href: "/products",
    },
    {
      url: "/products-showcase/lip-scrub.jpg",
      title: "Tẩy tế bào chết môi",
      description: "Làn môi mềm mại, sẵn sàng đón màu",
      href: "/products",
    },
    {
      url: "/products-showcase/lip-balm-in-jar.jpg",
      title: "Son dưỡng môi trong hũ",
      description: "Nuôi dưỡng môi mọi lúc mọi nơi",
      href: "/products",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-16 md:px-8 md:py-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Khám phá bộ sưu tập
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Sản phẩm 100% từ thiên nhiên, an toàn và hiệu quả cho đôi môi của bạn
        </p>
      </motion.div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {images.map((image: ImageProps, index: number): JSX.Element => {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <DirectionAwareHover
                imageUrl={image.url}
                backgroundOpacity="bg-black/30"
              >
                <div className="flex flex-col gap-3 p-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {image.title}
                  </h3>
                  <p className="text-white/80 text-sm md:text-base">
                    {image.description}
                  </p>
                  <Link
                    href={image.href}
                    className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-full
                      bg-moi_moc_green hover:bg-moi_moc_green/90 text-white font-medium
                      transition-all duration-300 hover:gap-3 w-fit
                      shadow-lg hover:shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Xem ngay
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </DirectionAwareHover>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
