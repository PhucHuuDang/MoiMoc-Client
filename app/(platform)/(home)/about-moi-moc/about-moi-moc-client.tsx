"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Footer } from "@/components/_global-components-reused/footer";
import { TypewriterEffectSmooth } from "@/components/aceternity-ui/typewriter-effect";
import { Logo } from "@/components/_global-components-reused/logo";
import {
  ParallaxScroll,
  ParallaxScrollSkeleton,
} from "@/components/aceternity-ui/parallax-scroll";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ImagesNotfound } from "../../(admin)/dashboard/about-moi-moc/_components-about-moi-moc/images-notfound";
import { ImageModelTypes } from "@/types";

export default function AboutMoiMocClient() {
  const [activeTab, setActiveTab] = useState("story");

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

  return (
    <div className="min-h-screen bg-main_background_color text-green-900 mb-10">
      <main className="">
        <motion.section
          className="relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <video
            autoPlay
            playsInline
            preload="none"
            className="h-full w-full"
            loop
            muted
            style={{
              objectFit: "fill",
            }}
          >
            <source
              src="https://cdn.pixabay.com/video/2023/08/06/174860-852215326_large.mp4"
              type="video/mp4"
            />
          </video>

          <Logo
            height={100}
            width={250}
            fill="#fff"
            className="absolute left-8 top-4"
          />

          <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center">
            <div className="flex items-center justify-center flex-col">
             
              {imagesModels && imagesModels?.length > 0 ? (
                <ParallaxScroll
                  images={imagesModels}
                  className="h-[50rem] 2xl:h-[60rem]"
                  classNameFirstImage="h-[420px] "
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


        <motion.section
          className="relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="h-[600px] 2xl:h-[900px] w-full"
            style={{ objectFit: "cover" }}
          >
            <source
              src="https://cdn.pixabay.com/video/2023/06/04/165773-833149609_large.mp4"
              type="video/mp4"
            />
          </video>
          <div
            className="absolute inset-0 bg-black/5 bg-opacity-30 flex flex-col items-center
              justify-center"
          >
            <h2 className="text-4xl font-light text-white italic text-center">
              Từ thiên nhiên, <br /> cho vẻ đẹp tự nhiên
            </h2>
            {/* <Logo height={100} width={200} fill="#fff" /> */}

            {/* <TypewriterEffectSmooth words={words} /> */}
          </div>
          <Logo
            height={100}
            width={250}
            fill="#fff"
            className="absolute left-8 top-4"
          />
        </motion.section>

        <Tabs defaultValue="story" className="w-full container my-10">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="story">Câu chuyện</TabsTrigger>
            <TabsTrigger value="vision">Tầm nhìn</TabsTrigger>
            <TabsTrigger value="mission">Sứ mệnh</TabsTrigger>
          </TabsList>
          <TabsContent value="story">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-3xl font-bold text-green-800">
                  Câu chuyện thương hiệu
                </h3>
                <span className="text-lg leading-relaxed">
                  Môi Mộc ra đời với mong muốn mang đến những sản phẩm son môi
                  hoàn toàn từ thiên nhiên Việt Nam. Chúng tôi sử dụng các
                  nguyên liệu như quả gấc, dầu dừa, dầu oliu, sáp ong, và hoa
                  hồng. Kỹ thuật điều đường nhiệt thấp được áp dụng để bảo toàn
                  dưỡng chất, giúp duy trì độ ẩm và phòng tránh khô, nứt môi.
                </span>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="vision">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-3xl font-bold text-green-800">Tầm nhìn</h3>
                <span className="text-lg leading-relaxed">
                  Môi Mộc hướng đến việc trở thành niềm tự hào của người Việt
                  trên thị trường mỹ phẩm quốc tế. Chúng tôi cam kết xây dựng
                  một thương hiệu mỹ phẩm Việt hữu cơ sạch, an toàn và chất
                  lượng, là sự lựa chọn hàng đầu cho những ai hướng đến lối sống
                  lành mạnh và vẻ đẹp tự nhiên.
                </span>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="mission">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-3xl font-bold text-green-800">Sứ mệnh</h3>
                <span className="text-lg leading-relaxed">
                  Sứ mệnh của Môi Mộc là mang lại cho bạn một đời sống đẹp, an
                  toàn và lành mạnh. Chúng tôi tin rằng vẻ đẹp thực sự đến từ sự
                  tự nhiên và an toàn. Với nguồn nguyên liệu sẵn có từ thiên
                  nhiên Việt Nam, chúng tôi cam kết tạo ra những sản phẩm phù
                  hợp với làn da người Việt, mang đến cho bạn sự tự tin và rạng
                  rỡ mỗi ngày.
                </span>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
