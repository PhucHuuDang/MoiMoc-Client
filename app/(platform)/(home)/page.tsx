import { Logo } from "@/components/_global-components-reused/logo";
import { Navbar } from "@/components/_global-components-reused/navbar";
import { TypewriterEffectSmooth } from "@/components/aceternity-ui/typewriter-effect";
import Image from "next/image";

export default function HomePage() {
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
    <div className="min-h-screen">
      {/* <Navbar /> */}

      <div className="relative w-full">
        <Image
          src="/images/banner-home.jpeg"
          alt="banner"
          height={0}
          width={1000}
          className="aspect-video h-[100vh] w-full object-cover pt-20"
        />
        <div className="absolute bottom-56 left-48">
          <div className="text-center text-white">
            <TypewriterEffectSmooth words={words} />
          </div>
        </div>
      </div>
    </div>
  );
}
