"use client";
import { motion } from "framer-motion";
import { ImagesSlider } from "@/components/aceternity-ui/images-slider";
import { TypewriterEffectSmooth } from "@/components/aceternity-ui/typewriter-effect";

export const Banner = () => {
  const images = [
    "/banner/banner-first.png",
    "/images/banner-home.jpeg",
    "/banner/banner-first.png",
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
        className="z-50 flex flex-col justify-center items-center"
      >
        {/* <motion.p
            className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent
              bg-gradient-to-b from-neutral-50 to-neutral-400 py-4"
          >
            The hero section slideshow <br /> nobody asked for
          </motion.p> */}
        {/* <button
            className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20
              text-white mx-auto text-center rounded-full relative mt-4"
          >
            <span>Join now →</span>
            <div
              className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto
                from-transparent via-emerald-500 to-transparent"
            />
          </button> */}
        <motion.div className="absolute bottom-14 left-14">
          {/* <motion.div className="absolute inset-0 flex items-center justify-center"> */}
          <div
            className="text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50
              to-neutral-400"
          >
            {/* <div
            className="text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50
              to-neutral-400"
          > */}
            <TypewriterEffectSmooth words={words} />
          </div>
        </motion.div>
      </motion.div>
    </ImagesSlider>
  );
};
