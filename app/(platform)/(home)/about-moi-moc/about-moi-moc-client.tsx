"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "@/lib/motion";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Footer } from "@/components/_global-components-reused/footer";
import { Logo } from "@/components/_global-components-reused/logo";
import {
  ParallaxScroll,
  ParallaxScrollSkeleton,
} from "@/components/aceternity-ui/parallax-scroll";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ImagesNotfound } from "../../(admin)/dashboard/about-moi-moc/_components-about-moi-moc/images-notfound";
import { ImageModelTypes } from "@/types";
import { useReducedMotion } from "@/lib/hooks/use-reduced-motion";
import { useVideoLazyLoad } from "@/lib/hooks/use-video-lazy-load";

export default function AboutMoiMocClient() {
  const [activeTab, setActiveTab] = useState("story");
  const prefersReducedMotion = useReducedMotion();

  // Lazy load videos
  const heroVideo = useVideoLazyLoad<HTMLVideoElement>();
  const secondVideo = useVideoLazyLoad<HTMLVideoElement>();

  const {
    data: imagesModels,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["images-models"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/images-models`,
      );

      if (response.status !== 200 && !response.data) {
        return [];
      }

      return response.data as ImageModelTypes[];
    },
  });

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0 : 0.5 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
      },
    },
  };

  return (
    <div className="min-h-screen bg-main_background_color text-green-900 font-body">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      <main>
        {/* Hero Section with Video Background */}
        <motion.section
          className="relative"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <video
            ref={heroVideo.videoRef}
            autoPlay
            playsInline
            preload="none"
            className="h-full w-full"
            loop
            muted
            poster="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1920&h=1080&fit=crop"
            style={{
              objectFit: "fill",
            }}
          >
            <source
              data-src="https://cdn.pixabay.com/video/2023/08/06/174860-852215326_large.mp4"
              type="video/mp4"
            />
          </video>

          <Logo
            height={100}
            width={250}
            fill="#fff"
            className="absolute left-8 top-4 z-10"
          />

          <div className="absolute inset-0 glass-card-dark flex flex-col items-center justify-center">
            <div className="flex items-center justify-center flex-col">
              {imagesModels && imagesModels?.length > 0 ? (
                <ParallaxScroll
                  images={imagesModels}
                  className="h-[50rem] 2xl:h-[60rem]"
                  classNameFirstImage="h-[420px]"
                  classNameThirdImage="h-[420px]"
                  classNameSecondImage="h-[420px]"
                />
              ) : isError ? (
                <ImagesNotfound />
              ) : (
                <ParallaxScrollSkeleton className="h-[55rem]" />
              )}
            </div>
          </div>
        </motion.section>

        {/* Brand Story Section */}
        <motion.section
          className="relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
        >
          <video
            ref={secondVideo.videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            poster="https://images.unsplash.com/photo-1545289414-1c3cb1c06238?w=1920&h=900&fit=crop"
            className="h-[600px] 2xl:h-[900px] w-full"
            style={{ objectFit: "cover" }}
          >
            <source
              data-src="https://cdn.pixabay.com/video/2023/06/04/165773-833149609_large.mp4"
              type="video/mp4"
            />
          </video>
          <div
            className="absolute inset-0 glass-card-dark bg-opacity-30 flex flex-col items-center
              justify-center px-4"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-heading font-light text-white italic text-center max-w-3xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            >
              Từ thiên nhiên, <br /> cho vẻ đẹp tự nhiên
            </motion.h2>
          </div>
          <Logo
            height={100}
            width={250}
            fill="#fff"
            className="absolute left-8 top-4 z-10"
          />
        </motion.section>

        {/* Content Tabs Section */}
        <motion.div
          className="container my-16 px-4"
          initial="hidden"
          whileInView="visible"
          variants={staggerContainer}
        >
          <Tabs
            defaultValue="story"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <TabsList className="grid w-full grid-cols-3 mb-8 shadow-soft">
              <TabsTrigger
                value="story"
                className="font-body transition-smooth data-[state=active]:shadow-soft-lg"
              >
                Câu chuyện
              </TabsTrigger>
              <TabsTrigger
                value="vision"
                className="font-body transition-smooth data-[state=active]:shadow-soft-lg"
              >
                Tầm nhìn
              </TabsTrigger>
              <TabsTrigger
                value="mission"
                className="font-body transition-smooth data-[state=active]:shadow-soft-lg"
              >
                Sứ mệnh
              </TabsTrigger>
            </TabsList>

            <motion.div variants={fadeInUp}>
              <TabsContent value="story">
                <Card
                  className="shadow-soft-lg cursor-pointer transition-smooth hover:shadow-soft
                  border-none overflow-hidden group"
                >
                  <CardContent className="p-8 md:p-10 space-y-6">
                    <h3
                      className="text-3xl md:text-4xl font-heading font-bold text-green-800 
                      group-hover:text-[var(--about-primary)] transition-smooth"
                    >
                      Câu chuyện thương hiệu
                    </h3>
                    <p className="text-lg md:text-xl leading-relaxed font-body text-gray-700">
                      Môi Mộc ra đời với mong muốn mang đến những sản phẩm son
                      môi hoàn toàn từ thiên nhiên Việt Nam. Chúng tôi sử dụng
                      các nguyên liệu như quả gấc, dầu dừa, dầu oliu, sáp ong,
                      và hoa hồng. Kỹ thuật điều đường nhiệt thấp được áp dụng
                      để bảo toàn dưỡng chất, giúp duy trì độ ẩm và phòng tránh
                      khô, nứt môi.
                    </p>
                    <div
                      className="h-1 w-24 bg-gradient-to-r from-pink-500 to-purple-600 
                      rounded-full transition-smooth group-hover:w-32"
                      aria-hidden="true"
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vision">
                <Card
                  className="shadow-soft-lg cursor-pointer transition-smooth hover:shadow-soft 
                  border-none overflow-hidden group"
                >
                  <CardContent className="p-8 md:p-10 space-y-6">
                    <h3
                      className="text-3xl md:text-4xl font-heading font-bold text-green-800
                      group-hover:text-[var(--about-primary)] transition-smooth"
                    >
                      Tầm nhìn
                    </h3>
                    <p className="text-lg md:text-xl leading-relaxed font-body text-gray-700">
                      Môi Mộc hướng đến việc trở thành niềm tự hào của người
                      Việt trên thị trường mỹ phẩm quốc tế. Chúng tôi cam kết
                      xây dựng một thương hiệu mỹ phẩm Việt hữu cơ sạch, an toàn
                      và chất lượng, là sự lựa chọn hàng đầu cho những ai hướng
                      đến lối sống lành mạnh và vẻ đẹp tự nhiên.
                    </p>
                    <div
                      className="h-1 w-24 bg-gradient-to-r from-pink-500 to-purple-600 
                      rounded-full transition-smooth group-hover:w-32"
                      aria-hidden="true"
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mission">
                <Card
                  className="shadow-soft-lg cursor-pointer transition-smooth hover:shadow-soft 
                  border-none overflow-hidden group"
                >
                  <CardContent className="p-8 md:p-10 space-y-6">
                    <h3
                      className="text-3xl md:text-4xl font-heading font-bold text-green-800
                      group-hover:text-[var(--about-primary)] transition-smooth"
                    >
                      Sứ mệnh
                    </h3>
                    <p className="text-lg md:text-xl leading-relaxed font-body text-gray-700">
                      Sứ mệnh của Môi Mộc là mang lại cho bạn một đời sống đẹp,
                      an toàn và lành mạnh. Chúng tôi tin rằng vẻ đẹp thực sự
                      đến từ sự tự nhiên và an toàn. Với nguồn nguyên liệu sẵn
                      có từ thiên nhiên Việt Nam, chúng tôi cam kết tạo ra những
                      sản phẩm phù hợp với làn da người Việt, mang đến cho bạn
                      sự tự tin và rạng rỡ mỗi ngày.
                    </p>
                    <div
                      className="h-1 w-24 bg-gradient-to-r from-pink-500 to-purple-600 
                      rounded-full transition-smooth group-hover:w-32"
                      aria-hidden="true"
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </motion.div>
          </Tabs>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
