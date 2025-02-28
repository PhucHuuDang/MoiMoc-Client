"use client";
import { forwardRef } from "react";

import Image from "next/image";

import { CarouselCustomized } from "@/components/_global-components-reused/carousel-customized";
import { ProductItemEffectHover } from "@/components/_global-components-reused/navbar-svg-components/product-item-effect-hover";
import { CarouselItem } from "@/components/ui/carousel";
import { useParentDataContext } from "@/provider/parent-data-provider";

interface LipBalmProps {
  // ref: React.Ref<HTMLDivElement>;
  productDetail?: boolean;
}

export const LipBalm = forwardRef<HTMLDivElement, LipBalmProps>(
  ({ productDetail }, ref) => {
    const productsList = useParentDataContext();

    const text = `Mang đến cho bạn đôi môi mềm mịn và căng mọng tự nhiên, son dưỡng
  Môi Mộc được làm từ 100% nguyên liệu hữu cơ như dầu dừa, sáp ong và
  tinh dầu hoa hồng. Sản phẩm không chứa chất bảo quản và hóa chất độc
  hại, đảm bảo an toàn tuyệt đối cho đôi môi của bạn.`;

    const productsTransformed = productsList?.map((product) => {
      return {
        productId: product.productId,
        id: product.id,
        productName: product.productName,
        productDescription: product.productDescription,
        mainImage: product.productImages[0].imageUrl,
        price: product.price,
        discountPrice: product.discountPrice,
        discountPercentage: product.discountPercentage,
        quantity: product.quantity,
      };
    });

    return (
      <>
        {/* ** this is the technique prevent breaking the image */}

        {!productDetail && (
          // <div
          //   className="relative w-full h-[400px] md:h-[600px] 2xl:h-[950px] bg-no-repeat bg-cover
          //     bg-center aspect-square md:aspect-[16/9]"
          //   style={{
          //     backgroundImage: `url(https://images.pexels.com/photos/28851912/pexels-photo-28851912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)`,
          //     // width: "100%",
          //   }}
          // >
          //   {/* make the whole background a little bit dark */}
          //   {/* <div className="absolute inset-0 bg-black/10" /> */}
          //   <div className="relative pt-28 h-screen"></div>
          // </div>

          <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]">
            <Image
              src="https://images.pexels.com/photos/28851912/pexels-photo-28851912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="lipbalm-banner-image"
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
            {/* <div className="absolute inset-0 bg-black bg-opacity-30" />
<div className="absolute inset-0 flex items-center justify-center">
  <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold text-center px-4">
    Discover Our Collection
  </h2>
</div> */}
          </div>
        )}

        <div className="" ref={ref}>
          <div className="overflow-hidden px-14">
            <CarouselCustomized title="Son Dưỡng Màu Tự nhiên">
              {productsTransformed?.map((product) => {
                return (
                  <CarouselItem
                    key={product.id}
                    className="md:basis-1/2 lg:basis-1/5 aspect-square"
                  >
                    <ProductItemEffectHover product={product} />
                  </CarouselItem>
                );
              })}
            </CarouselCustomized>
          </div>
        </div>
      </>
    );
  },
);

LipBalm.displayName = "LipBalm";
