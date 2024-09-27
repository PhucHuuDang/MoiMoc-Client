import { Button } from "@/components/ui/button";
import Image from "next/image";

export const MessageMoiMoc = () => {
  return (
    <section className="w-full h-[600px] 2xl:h-[800px]">
      <div className="relative w-full aspect-[2/1] h-full">
        <Image
          alt="message-moi-moc"
          src="/background-message.png"
          fill
          style={{ objectFit: "cover" }}
          className="w-full"
        />

        <div
          className="text-moi_moc_green font-semibold absolute inset-0 flex items-center
            justify-center max-w-3xl mx-auto px-4 text-center flex-col gap-4"
        >
          <blockquote className="text-xl md:text-2xl text-green-800 mb-4">
            "Chúng tôi mong muốn mang đến sản phẩm son hoàn toàn từ nguồn gốc tự
            nhiên và hoàn toàn từ thiên nhiên Việt Nam như quả gấc, dầu dừa, dầu
            oliu, sáp ong, hoa hồng... Điều đường nhiệt thấp là kỹ thuật chúng
            tôi áp dụng để bảo toàn dưỡng chất từ các loại quả, hạt, tinh dầu và
            bơ thực vật, giúp duy trì độ ẩm, phòng tránh khô, nứt, lành mạnh."
          </blockquote>

          <Image
            src="/marquee-moi-moc.png"
            alt="moi-moc-logo"
            width={200}
            height={100}
            className="object-cover"
          />

          <Button variant="moiMoc" className="h-8 w-36 rounded-2xl">
            Xem thêm
          </Button>
        </div>
      </div>
    </section>
  );
};
