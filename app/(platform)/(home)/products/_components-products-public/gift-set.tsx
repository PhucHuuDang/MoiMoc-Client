"use client";

import { CarouselCustomized } from "@/components/_global-components-reused/carousel-customized";
import { ProductItemEffectHover } from "@/components/_global-components-reused/navbar-svg-components/product-item-effect-hover";
import { TextGenerateEffect } from "@/components/aceternity-ui/text-generate-effect";
import { CircleUI } from "@/components/custom/circle-ui";
import { CarouselItem } from "@/components/ui/carousel";
import { useParentDataContext } from "@/provider/parent-data-provider";
import Image from "next/image";
import { forwardRef } from "react";

interface GiftSetProps {}

export const GiftSet = forwardRef<HTMLDivElement, GiftSetProps>(({}, ref) => {
  const text = `Set Quà Tặng Môi Mộc là lựa chọn hoàn hảo cho những ai tìm kiếm món quà ý nghĩa và độc đáo. Với sự phối màu hợp lý giữa các sản phẩm, set quà tặng đảm bảo vẻ đẹp hài hòa cho đôi môi. Đặc biệt, giá thành được giảm đáng kể so với mua lẻ từng sản phẩm. Tất cả các sản phẩm trong set quà tặng đều làm từ nguyên liệu hữu cơ, không chứa chất bảo quản hay hóa chất độc hại, đảm bảo an toàn tuyệt đối. Set quà tặng Môi Mộc không chỉ là món quà hoàn hảo cho người thân yêu mà còn là cách tuyệt vời để tự thưởng cho chính mình. 
  Hãy để Môi Mộc cùng bạn lan tỏa vẻ đẹp tự nhiên và tinh tế trong mỗi nụ cười!`;

  const productsList = useParentDataContext();

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
    <div className="my-6 w-full" ref={ref}>
      <div className="relative w-full">
        <Image
          src="/about-moi-moc-images/background-gift-set.png"
          alt="background-organic-solid"
          height={600}
          width={600}
          className="max-h-svh w-full object-cover 2xl:h-full"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-white">
            Set quà tặng Môi Mộc
          </h1>
          <div className="mt-2 p-2 px-6 text-white">
            <TextGenerateEffect
              words={text}
              classNameText="text-white font-light "
              filter={false}
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden px-14">
        <CarouselCustomized title="Set Quà Tặng">
          {productsTransformed?.map((product) => {
            return (
              <CarouselItem
                key={product.id}
                className="md:basis-1/2 lg:basis-1/5"
              >
                <ProductItemEffectHover product={product} />
              </CarouselItem>
            );
          })}
        </CarouselCustomized>
      </div>
    </div>
  );
});

GiftSet.displayName = "GiftSet";
