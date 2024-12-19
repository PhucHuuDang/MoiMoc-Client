import { Logo } from "@/components/_global-components-reused/logo";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const MessageMoiMoc = () => {
  return (
    <section>
      {/* <div className="relative w-full aspect-[2/1] h-full"> */}
      {/* <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="w-full h-[600px] 2xl:h-[800px]"
          style={{ objectFit: "fill" }}
          poster="/images/grass-posted.jpeg"
        >
          <source
            src="https://cdn.pixabay.com/video/2024/06/23/217947_large.mp4"
            type="video/mp4"
          />
        </video> */}

      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]">
        <Image
          src="/images/grass-poster.jpeg"
          alt="message-moi-moc-banner-image"
          fill
          style={{
            objectFit: "cover",
          }}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 75vw, 50vw"
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          // loading="lazy"
          className="rounded-lg"
        />
        <div className="absolute inset-0 bg-black/10" />
        <div
          className="font-semibold absolute inset-0 flex items-center justify-center max-w-3xl
            mx-auto px-4 text-center flex-col gap-4"
        >
          <blockquote className="text-lg font-light md:text-2xl text-white italic">
            "Chúng tôi mong muốn mang đến sản phẩm son hoàn toàn từ nguồn gốc tự
            nhiên và hoàn toàn từ thiên nhiên Việt Nam như quả gấc, dầu dừa, dầu
            oliu, sáp ong, hoa hồng... Điều đường nhiệt thấp là kỹ thuật chúng
            tôi áp dụng để bảo toàn dưỡng chất từ các loại quả, hạt, tinh dầu và
            bơ thực vật, giúp duy trì độ ẩm, phòng tránh khô, nứt, lành mạnh."
          </blockquote>

          <Logo height={100} width={200} fill="#fff" />

          <Link
            href="/products"
            // variant="moiMoc"
            className="text-white text-sm border-moi_moc_green h-6 w-32 rounded-lg bg-[#438a60]
              hover:scale-110 hover:bg-[#326a49] hover:underline text-center transition-all
              duration-200"
          >
            Xem thêm
          </Link>
        </div>
      </div>
    </section>
  );
};
