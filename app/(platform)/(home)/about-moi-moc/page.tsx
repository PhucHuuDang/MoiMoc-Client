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

    // <div className="flex flex-col min-h-screen py-20">
    //   <main className="flex-grow">
    //     <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
    //       <div>
    //         <h2 className="text-2xl font-bold text-moi_moc_green mb-4">
    //           Câu chuyện thương hiệu
    //         </h2>
    //         <span className="text-moi_moc_green mb-4">
    //           Mỏi Mộc bắt nguồn từ ý tưởng cung cấp sản phẩm mỹ phẩm xanh, cao
    //           cấp. Cái tên nhấn mạnh vào sự an toàn, chất lượng và nguồn gốc tự
    //           nhiên của sản phẩm.
    //         </span>
    //         <span className="text-moi_moc_green">
    //           Chúng tôi mong muốn mang đến sản phẩm son hoàn toàn từ nguồn gốc
    //           tự nhiên và hoàn toàn từ thiên nhiên Việt Nam như quả gấc, dầu
    //           dừa, dầu oliu, sáp ong, hoa hồng... Điều đường nhiệt thấp là kỹ
    //           thuật chúng tôi áp dụng để bảo toàn dưỡng chất từ các loại quả,
    //           hạt, tinh dầu và bơ thực vật, giúp duy trì độ ẩm, phòng tránh khô,
    //           nứt, lành mạnh. Sản phẩm của chúng tôi đa dạng màu sắc theo nhu
    //           cầu và mong muốn của khách hàng: đáng thơ, đáng yêu, sang trọng,
    //           thanh nhã sắc tự nhiên và phù hợp với nhiều màu da.
    //         </span>
    //       </div>
    //       <div className="relative aspect-video lg:aspect-square">
    //         <Image
    //           // src="/placeholder.svg?height=384&width=512"
    //           src="/about-moi-moc-images/model.png"
    //           alt="Natural scenery"
    //           fill
    //           // style={{ objectFit: "cover" }}
    //           className="rounded-tl-xl rounded-tr-xl"
    //         />
    //       </div>
    //     </section>

    //     <Image
    //       height={229}
    //       width={1000}
    //       src="/about-moi-moc-images/carousel-grass.png"
    //       alt="grass"
    //       className="w-full h-[200px] object-cover"
    //     />

    //     <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto p-4 md:p-8">
    //       <div>
    //         <h2 className="text-2xl font-bold text-moi_moc_green mb-4">
    //           Tầm nhìn
    //         </h2>
    //         <span className="text-moi_moc_green font-semibold">
    //           Mỏi Mộc sẽ là niềm tự hào của người Việt trên thị trường mỹ phẩm
    //           quốc tế. Mỏi Mộc sẽ là thương hiệu mỹ phẩm Việt hữu cơ sạch, an
    //           toàn và chất lượng tự tin và là sự lựa chọn hàng đầu của khách
    //           hàng hướng đến lối sống lành mạnh và vẻ đẹp tự nhiên.
    //         </span>
    //       </div>
    //       <div>
    //         <h2 className="text-2xl font-bold text-moi_moc_green mb-4">
    //           Sứ mệnh
    //         </h2>
    //         <span className="text-green-800 font-semibold">
    //           Chúng tôi ra đời với sứ mệnh mang lại cho bạn một đời sống đẹp, an
    //           toàn và lành mạnh. Với nguồn nguyên liệu sẵn có từ thiên nhiên mà
    //           chúng ta vẫn sử dụng hằng ngày trong đời sống hàng ngày, phù hợp
    //           với làn da của người Việt. Chúng tôi tin rằng một đời sống đẹp là
    //           một đời sống lành mạnh, trong sạch và an toàn. Chúng tôi cam kết
    //           mang đến cho bạn những sản phẩm từ thiên nhiên, để những đôi môi
    //           ngọt ngào trên khuôn mặt rạng rỡ của bạn.
    //         </span>
    //       </div>
    //     </section>

    //     <section className="w-full">
    //       <div className="relative w-full aspect-[2/1]">
    //         <div
    //           className="relative h-[600px] 2xl:h-[80%] bg-no-repeat bg-cover bg-center"
    //           style={{
    //             backgroundImage:
    //               // "url('/about-moi-moc-images/lipstick-models.png')",
    //               "url('https://scontent.fsgn5-10.fna.fbcdn.net/v/t39.30808-6/463455434_122096755718575833_2284850166400960507_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFJ3D60AssDP7QO-tHrB93yXmkw8qqjKWBeaTDyqqMpYPG2ytHKaIuqrCcrKCpT-uBoLoWFDbR4mzqe1ooiBWcx&_nc_ohc=-xBDAVsA20AQ7kNvgFeWDmD&_nc_zt=23&_nc_ht=scontent.fsgn5-10.fna&_nc_gid=AWB0jh5hv6lVYZ7e6YU_YgH&oh=00_AYA2Cqoc3oI_tye0eeUVLNeoq6lHfmgjnJcS56drY3YKrQ&oe=67145CF5')",
    //           }}
    //         >
    //           {/* <Image
    //             // src="/placeholder.svg?height=384&width=768"
    //             src="/about-moi-moc-images/lipstick-models.png"
    //             alt="Close-up of lips"
    //             fill
    //             style={{ objectFit: "cover" }}
    //             className="w-full h-[700px]"
    //           /> */}

    //           <div className="absolute inset-0 flex items-center justify-center">
    //             <div className="text-center text-white">
    //               <TypewriterEffectSmooth words={words} />
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </section>
    //   </main>

    //   <Footer />
    //</div>
  );
};

export default AboutMoiMocPage;
