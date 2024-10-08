"use client";
import { motion } from "framer-motion";
import { ImagesSlider } from "@/components/aceternity-ui/images-slider";
import { TypewriterEffectSmooth } from "@/components/aceternity-ui/typewriter-effect";

export const Banner = () => {
  const images = [
    // "/banner/bg-3.jpg",
    "/banner/lipsticks-banner.jpg",
    "/banner/bg-4.jpg",
    // "/banner/bg-5.jpg",
    // "/banner/banner-first.png",
    // "/images/banner-home.jpeg",
    // "https://cdn.pixabay.com/photo/2016/02/28/22/32/lips-1227699_1280.jpg",
  ];

  const words = [
    {
      text: "Tự nhiên...",
      className: "whitespace-nowrap text-3xl font-light text-white ",
    },
    {
      text: "như chính bạn!",
      className:
        "whitespace-nowrap text-5xl font-light text-white text-[#87d5a4] ",
    },
  ];
  return (
    <div className="relative">
      <ImagesSlider className="h-[45rem]" images={images}>
        <motion.div
          initial={{
            opacity: 0,
            y: -80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="z-50"
        >
          {/* <motion.div className="absolute bottom-14 left-14 z-50">
            <motion.div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white z-50">
              <TypewriterEffectSmooth words={words} />
            </div>
          </motion.div> */}
        </motion.div>
      </ImagesSlider>

      <motion.div
        initial={{
          opacity: 0,
          y: -80,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        className="absolute bottom-14 left-14"
      >
        {/* <div className="text-center text-white">
          <TypewriterEffectSmooth words={words} />
        </div> */}
      </motion.div>
    </div>
  );
};
