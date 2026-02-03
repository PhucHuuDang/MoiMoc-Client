"use client";

import { motion } from "@/lib/motion";
import { ImagesSlider } from "@/components/aceternity-ui/images-slider";
import { TypewriterEffectSmooth } from "@/components/aceternity-ui/typewriter-effect";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, Heart, Shield, Sparkles } from "lucide-react";
import Link from "next/link";

export const Banner = () => {
  const images = [
    "/banner/banner-home-page.jpg",
    "/banner/lipsticks-banner.jpg",
    "/banner/bg-4.jpg",
    "/banner/lipsticks-banner.jpg",
    "/banner/bg-6.jpg",
    "/banner/banner-first.png",
  ];

  const words = [
    {
      text: "Tự nhiên...",
      className:
        "whitespace-nowrap text-4xl md:text-5xl lg:text-6xl font-light text-white",
    },
    {
      text: "như chính bạn!",
      className:
        "whitespace-nowrap text-5xl md:text-6xl lg:text-7xl font-light text-[#87d5a4]",
    },
  ];

  const trustBadges = [
    { icon: Leaf, text: "100% Tự nhiên" },
    { icon: Heart, text: "An toàn cho môi" },
    { icon: Shield, text: "Không chất bảo quản" },
    { icon: Sparkles, text: "Made in Vietnam" },
  ];

  return (
    <div className="relative">
      <ImagesSlider
        className="h-[calc(100vh-4rem)] min-h-[600px]"
        images={images}
      >
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="z-50 flex h-full items-center justify-center px-4"
        >
          <div className="max-w-5xl text-center">
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-6"
            >
              <span className="inline-block rounded-full bg-white/10 backdrop-blur-md px-6 py-2 text-sm font-medium text-white border border-white/20">
                🌿 Vẻ đẹp từ thiên nhiên Việt
              </span>
            </motion.div>

            {/* Main Headline */}
            <div className="mb-8">
              <TypewriterEffectSmooth words={words} />
            </div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-10 text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed"
            >
              Son môi hữu cơ từ quả gấc, dầu dừa và sáp ong. Nuôi dưỡng đôi môi
              mềm mại, rạng rỡ tự nhiên mỗi ngày.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/products">
                <Button
                  size="lg"
                  className="bg-moi_moc_green hover:bg-moi_moc_green/90 text-white px-8 py-6 text-lg
                    rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105
                    group"
                >
                  Khám phá sản phẩm
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/about-moi-moc">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20
                    px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Về Môi Mộc
                </Button>
              </Link>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={badge.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                  className="flex flex-col items-center gap-2 bg-white/5 backdrop-blur-sm rounded-2xl p-4
                    border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <badge.icon className="h-6 w-6 text-[#87d5a4]" />
                  <span className="text-sm text-white/80">{badge.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/60 text-sm">Vuốt xuống</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/30 rounded-full p-1"
            >
              <div className="w-1 h-2 bg-white/60 rounded-full mx-auto" />
            </motion.div>
          </div>
        </motion.div>
      </ImagesSlider>
    </div>
  );
};
