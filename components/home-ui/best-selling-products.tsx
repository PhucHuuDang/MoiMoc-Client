import Image from "next/image";

export const BestSellingProducts = () => {
  return (
    <div className="grid grid-cols-3">
      <Image
        src={"/best-selling-products/amica.png"}
        alt="product-1"
        width={500}
        height={0}
        className="size-full rounded-e-2xl object-cover"
      />
      <div className="flex flex-col items-center justify-center gap-y-1">
        <h1 className="text-xl font-semibold text-moi_moc_green">
          Sản phẩm bán chạy
        </h1>
        <span className="text-center text-moi_moc_green">
          Môi mộc tự hào khi các sản phẩm mà chúng tôi tạo ra mang đến những
          thay đổi tuyệt vời trên đôi môi của bạn.
        </span>
      </div>

      <div className="flex flex-col gap-y-1">
        <Image
          src={"/best-selling-products/green-mask-demo.png"}
          alt="product-3"
          width={500}
          height={500}
          className="h-[553px] w-[516px] rounded-l-2xl object-cover 2xl:size-full"
        />
        <div className="flex items-center gap-x-1">
          <Image
            src={"/best-selling-products/green-mask.png"}
            alt="product-2"
            width={500}
            height={500}
            className="h-[295px] w-[241px] rounded-xl object-cover 2xl:size-full"
          />{" "}
          <Image
            src={"/best-selling-products/green-mask.png"}
            alt="product-4"
            width={500}
            height={500}
            className="h-[295px] w-[241px] rounded-xl object-cover 2xl:size-full"
          />
        </div>
      </div>
    </div>
  );
};
