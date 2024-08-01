import { ImagesDemo } from "@/lib/db";
import Image from "next/image";
import BlurFade from "../magic/blur-fade";

export const DemoProducts = () => {
  return (
    <div className="z-20 flex items-center justify-center px-10">
      {ImagesDemo.map((imageUrl, index) => {
        return (
          <BlurFade key={imageUrl.imageURL} delay={0.25 + index * 0.05} inView>
            <Image
              src={imageUrl.imageURL}
              alt={`demo-product-${index}`}
              width={500}
              height={500}
              className="size-[467px] cursor-pointer rounded-3xl object-cover transition duration-200 hover:scale-105"
            />
          </BlurFade>
        );
      })}
    </div>
  );
};
