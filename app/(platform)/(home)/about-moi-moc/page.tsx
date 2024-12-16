import Image from "next/image";
import { Footer } from "@/components/_global-components-reused/footer";
import { TypewriterEffectSmooth } from "@/components/aceternity-ui/typewriter-effect";
import AboutMoiMocClient from "./about-moi-moc-client";

import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Về Môi Mộc",
    description: "Câu chuyện về tầm nhìn và sứ mệnh của Môi Mộc",
  };
}

const AboutMoiMocPage = () => {
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
    <div className="min-h-screen pt-16">
      <AboutMoiMocClient />
    </div>


  );
};

export default AboutMoiMocPage;
