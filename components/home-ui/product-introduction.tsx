import Image from "next/image";
import Link from "next/link";

export const ProductIntroduction = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-16 sm:py-24 lg:py-32">
        <div
          className="relative z-10 flex flex-col items-center justify-between gap-8 md:flex-row
            md:gap-12 lg:gap-16"
        >
          <div className="relative w-full max-w-sm md:w-1/2 lg:w-2/5">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="/images/product-introduction.png"
                alt="son-duong-moc"
                width={487}
                height={665}
                className="w-full object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-6 text-center md:w-1/2 md:text-left lg:w-3/5">
            <h1 className="font-serif text-3xl font-bold text-moi_moc_green md:text-4xl lg:text-5xl">
              Son dưỡng Môi Mộc
            </h1>
            <p className="text-sm leading-relaxed text-green-800 md:text-base lg:text-lg">
              Mang đến cho bạn đôi môi mềm mịn và căng mọng tự nhiên, son dưỡng
              Môi Mộc được làm từ 100% nguyên liệu hữu cơ như dầu dừa, sáp ong
              và tinh dầu hoa hồng. Sản phẩm không chứa chất bảo quản và hóa
              chất độc hại, đảm bảo an toàn tuyệt đối cho đôi môi của bạn.
            </p>
            <button
              className="mt-4 self-center rounded-full bg-moi_moc_green px-8 py-3 text-sm font-semibold
                text-white transition-colors hover:bg-green-700 md:self-start lg:text-base"
            >
              <Link href="/products" prefetch>
                Tìm hiểu thêm
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
