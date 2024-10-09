"use client";

import { truncateText } from "@/app/lodash-config/truncate";
import StatusButton from "@/components/animata/status-button";
import { formatCurrency } from "@/handle-transform/formart-currency";
import { useCartStore } from "@/store/use-cart-store";
import { ProductProps } from "@/types";
import { ProductItemData } from "@/types/product-types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface ProductItemEffectHoverProps {
  product: ProductItemData;
}

export const ProductItemEffectHover = ({
  product,
}: ProductItemEffectHoverProps) => {
  const addOrder = useCartStore((state) => state.addOrder);

  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent, product: ProductItemData) => {
    e.stopPropagation();
    toast.success("Thêm sản phẩm vào giỏ hàng thành công");
    addOrder(product);
  };

  const discountPercentageToNumber = Number(product?.discountPercentage);

  const MAX_LENGTH = 54;

  return (
    <div className="relative flex w-full cursor-pointer flex-col gap-2">
      {+discountPercentageToNumber! > 0 && discountPercentageToNumber && (
        <div
          className="absolute right-0 top-0 z-10 m-0 flex items-center gap-1 rounded-l-lg
            rounded-t-xl bg-[#489bee] p-2 text-xs font-semibold text-white"
        >
          <span>Sale</span>
          <span>{`-${discountPercentageToNumber}%`}</span>
        </div>
      )}
      <div
        className="group relative aspect-square h-full w-full overflow-hidden rounded-xl"
        onClick={() => router.push(`/${product.productId}`)}
      >
        {/* <GlareCard className="flex flex-col items-center justify-center"> */}
        <Image
          fill
          alt={`product-${product.productName}`}
          src={product.mainImage}
          className="h-full w-full object-cover transition group-hover:scale-110"
          // className="absolute size-full object-cover transition group-hover:scale-110"
        />

        {/* can add here the icon cart or not */}
        {/* </GlareCard> */}
      </div>
      <div className="min-h-[56px] text-lg font-semibold">
        {/* {data?.serviceName} */}
        {product.productName}
      </div>
      <div className="h-[65px] font-light text-neutral-500">
        {truncateText(product.productDescription, MAX_LENGTH)}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-md mt-3 flex flex-row items-center gap-1">
          {discountPercentageToNumber && discountPercentageToNumber > 0 ? (
            <>
              <div className="flex flex-row items-center gap-2">
                <span className="font-bold text-[#ff6347]">
                  {/* {formatCurrency(product.discountPrice)} */}
                  {/* discount price */}
                  {formatCurrency(Number(product.discountPrice))}
                </span>
              </div>

              <h1 className="text-xl font-semibold text-neutral-500">|</h1>

              <div className="flex flex-row items-center gap-2">
                <del className="font-light text-[#ed9080]">
                  {formatCurrency(Number(product.price))}
                </del>{" "}
              </div>
            </>
          ) : (
            <div className="flex flex-row items-center gap-2">
              <div className="font-bold text-[#ff6347]">
                {formatCurrency(Number(product.price))}
              </div>{" "}
            </div>
          )}
        </div>

        {/* <ShoppingCart
          onClick={(e) => handleAddToCart(e, product)}
          className="size-10 cursor-pointer rounded-lg p-1 text-slate-600 duration-200
            hover:scale-110 hover:bg-slate-200 hover:text-slate-800 hover:shadow-lg"
        /> */}
        <StatusButton
          handleAddToCart={(e) => handleAddToCart(e, product)}
          className="w-10"
        />
      </div>
    </div>
  );
};
