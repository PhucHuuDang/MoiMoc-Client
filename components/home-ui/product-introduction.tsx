import Image from "next/image";

export const ProductIntroduction = () => {
  return (
    <div className="z-10 flex items-center justify-center gap-x-1">
      <Image
        src="/images/product-introduction.png"
        alt="son-duong-moc"
        height={400}
        width={400}
        className="z-10 h-[600px] w-[440px] rounded-lg object-cover"
        // layout="responsive"
      />
      <div className="flex flex-col gap-y-4">
        <h1 className="text-4xl text-moi_moc_green">Son dưỡng Môi Mộc</h1>
        <span className="w-[500px] text-[#003c14]">
          Mang đến cho bạn đôi môi mềm mịn và căng mọng tự nhiên, son dưỡng Môi
          Mộc được làm từ 100% nguyên liệu hữu cơ như dầu dừa, sáp ong và tinh
          dầu hoa hồng. Sản phẩm không chứa chất bảo quản và hóa chất độc hại,
          đảm bảo an toàn tuyệt đối cho đôi môi của bạn.
        </span>
      </div>
    </div>
  );
};
