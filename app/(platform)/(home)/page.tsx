import { Footer } from "@/components/_global-components-reused/footer";
import { Cover } from "@/components/aceternity-ui/cover";
import { ImagesSlider } from "@/components/aceternity-ui/images-slider";
import { TypewriterEffectSmooth } from "@/components/aceternity-ui/typewriter-effect";
import { NewlyProduct } from "@/components/custom/newly-product";
import { MoiMocMarquee } from "@/components/home-ui/moi-moc-marquee";
import { DemoProducts } from "@/components/home-ui/demo-product";
import { ProductIntroduction } from "@/components/home-ui/product-introduction";
import BlurFade from "@/components/magic/blur-fade";
import Image from "next/image";
import { Banner } from "./_components-home/banner";
import { ProductShowcase } from "./_components-home/product-showcase";
import { MessageMoiMoc } from "./_components-home/message-moi-moc";
import { ReviewFeedback } from "./_components-home/review-feedback";
import { verifyAuth } from "@/api/auth/verify-auth";

export default async function HomePage() {
  // const test = await verifyAuth();

  // console.log({ test });

  return (
    <div className="min-h-screen">
      {/* <Navbar /> */}

      <Banner />

      <ProductShowcase />

  

      <BlurFade inView delay={0.2}>
        <MessageMoiMoc />
      </BlurFade>

      <div className="relative overflow-hidden px-10 py-5">
        <BlurFade inView delay={0.25}>
          <ProductIntroduction />
        </BlurFade>
        <DemoProducts />
      </div>

      <BlurFade inView delay={0.25}>
        <div className="my-7">
          <MoiMocMarquee />
        </div>
      </BlurFade>

      <BlurFade inView delay={0.25}>
        <ReviewFeedback />
      </BlurFade>

      <div className="py-8">
        <BlurFade inView delay={0.35}>
          <Footer />
        </BlurFade>
      </div>
    </div>
  );
}
