import Image from "next/image";
import { AboutMoiMocClient } from "./about-moi-moc-client";
import Link from "next/link";
import { Footer } from "@/components/_global-components-reused/footer";
import { TypewriterEffectSmooth } from "@/components/aceternity-ui/typewriter-effect";

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
    // <div className="min-h-screen">
    //   <AboutMoiMocClient />
    // </div>

    <div className="flex flex-col min-h-screen py-20">
      <main className="flex-grow">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto p-4 md:p-8">
          <div>
            <h2 className="text-2xl font-bold text-moi_moc_green mb-4">
              Câu chuyện thương hiệu
            </h2>
            <p className="text-moi_moc_green mb-4">
              Mỏi Mộc bắt nguồn từ ý tưởng cung cấp sản phẩm mỹ phẩm xanh, cao
              cấp. Cái tên nhấn mạnh vào sự an toàn, chất lượng và nguồn gốc tự
              nhiên của sản phẩm.
            </p>
            <p className="text-moi_moc_green">
              Chúng tôi mong muốn mang đến sản phẩm son hoàn toàn từ nguồn gốc
              tự nhiên và hoàn toàn từ thiên nhiên Việt Nam như quả gấc, dầu
              dừa, dầu oliu, sáp ong, hoa hồng... Điều đường nhiệt thấp là kỹ
              thuật chúng tôi áp dụng để bảo toàn dưỡng chất từ các loại quả,
              hạt, tinh dầu và bơ thực vật, giúp duy trì độ ẩm, phòng tránh khô,
              nứt, lành mạnh. Sản phẩm của chúng tôi đa dạng màu sắc theo nhu
              cầu và mong muốn của khách hàng: đáng thơ, đáng yêu, sang trọng,
              thanh nhã sắc tự nhiên và phù hợp với nhiều màu da.
            </p>
          </div>
          <div className="relative aspect-video lg:aspect-square">
            <Image
              src="/placeholder.svg?height=384&width=512"
              alt="Natural scenery"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-lg"
            />
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto p-4 md:p-8">
          <div>
            <h3 className="text-xl font-bold text-moi_moc_green mb-4">
              Tầm nhìn
            </h3>
            <p className="text-moi_moc_green">
              Mỏi Mộc sẽ là niềm tự hào của người Việt trên thị trường mỹ phẩm
              quốc tế. Mỏi Mộc sẽ là thương hiệu mỹ phẩm Việt hữu cơ sạch, an
              toàn và chất lượng tự tin và là sự lựa chọn hàng đầu của khách
              hàng hướng đến lối sống lành mạnh và vẻ đẹp tự nhiên.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-moi_moc_green mb-4">
              Sứ mệnh
            </h3>
            <p className="text-green-800">
              Chúng tôi ra đời với sứ mệnh mang lại cho bạn một đời sống đẹp, an
              toàn và lành mạnh. Với nguồn nguyên liệu sẵn có từ thiên nhiên mà
              chúng ta vẫn sử dụng hằng ngày trong đời sống hàng ngày, phù hợp
              với làn da của người Việt. Chúng tôi tin rằng một đời sống đẹp là
              một đời sống lành mạnh, trong sạch và an toàn. Chúng tôi cam kết
              mang đến cho bạn những sản phẩm từ thiên nhiên, để những đôi môi
              ngọt ngào trên khuôn mặt rạng rỡ của bạn.
            </p>
          </div>
        </section>

        <section className="w-full">
          <div className="relative w-full aspect-[2/1]">
            <Image
              // src="/placeholder.svg?height=384&width=768"
              src="/images/banner-home.jpeg"
              alt="Close-up of lips"
              fill
              style={{ objectFit: "cover" }}
              className="w-full"
            />
            {/* <div
              className="absolute bottom-4 md:bottom-8 left-4 md:left-8 text-white text-2xl md:text-4xl
                font-bold"
            >
              <p>tự nhiên...</p>
              <p>như chính bạn!</p>
            </div> */}

            <div className="absolute bottom-56 left-48">
              <div className="text-center text-white">
                <TypewriterEffectSmooth words={words} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutMoiMocPage;
