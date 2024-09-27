import Image from "next/image";
import Marquee from "../magic/marquee";

export const MoiMocMarquee = () => {
  const ConfirmIngredient = () => {
    return (
      <div
        className="flex h-12 items-center justify-evenly bg-moi_moc_green p-2 font-semibold
          text-white"
      >
        {Array.from({ length: 4 }).map((_, index) => {
          // console.log(index);

          return (
            <div
              // className={`md:hidden ${index < 2 ? "block" : "hidden md:block"}`}
              key={index}
            >
              100% from natural ingredients
            </div>
          );
        })}
      </div>
    );
  };

  return (
    // <div className="w-full">

    <div className="flex h-16 items-center justify-evenly">
      <Marquee pauseOnHover={false} className="[--duration:20s]">
        {Array.from({ length: 6 }).map((_, index) => {
          // console.log(index);

          return (
            <div
              // className={`md:hidden ${index < 2 ? "block" : "hidden md:block"}`}
              className="flex items-center justify-center"
              key={index}
            >
              <Image
                src="/marquee-moi-moc.png"
                width={248}
                height={52}
                alt="marquee-moi-moc"
              />
              <Image
                src="/marquee-dot.png"
                width={10}
                height={10}
                className="mx-10"
                alt="marquee-moi-moc"
              />
            </div>
          );
        })}
      </Marquee>
    </div>
  );
};
