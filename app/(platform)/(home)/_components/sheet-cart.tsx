"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatCurrency } from "@/handle-transform/formart-currency";
import { useCartStore } from "@/store/use-cart-store";
import { useFromStore } from "@/store/use-from-store";
import { CreditCard, ShoppingBag } from "lucide-react";
import { CartItem } from "./cart-item";
import { useSheetCart } from "@/hooks/use-sheet-cart";
import { useRouter } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";

interface SheetCartProps {
  // handleCheckout: () => void;
}

export const SheetCart = ({}: SheetCartProps) => {
  const router = useRouter();
  const sheetCart = useSheetCart();

  const handleCheckout = () => {
    router.push("/checkout");
    sheetCart.onClose();
  };

  const cart = useFromStore(useCartStore, (state) => state.orders);

  const cartCondition = cart?.length! > 0;

  let total = 0;

  if (cart) {
    total = cart.reduce(
      (acc, product) =>
        acc +
        (Number(product.discountPercentage!) > 0
          ? Number(product?.discountPrice) * (product.quantityOrder as number)
          : Number(product.price) * (product.quantityOrder as number)),
      0,
    );
  }

  return (
    <Sheet open={sheetCart.isOpen} onOpenChange={sheetCart.onClose}>
      <SheetContent style={{ maxWidth: "45vw" }}>
        <SheetHeader className="my-4">
          <SheetTitle className="text-center text-lg">
            Giỏ hàng của bạn!
          </SheetTitle>
          <SheetDescription className="text-center">
            {cartCondition
              ? `Cảm ơn bạn vì đã quan tâm sản phẩm của chúng tôi 🎉`
              : "Giỏ hàng của bạn đang trống!"}
          </SheetDescription>
        </SheetHeader>

        <ul className="flex flex-col items-start gap-5 h-[400px] overflow-y-auto overflow-x-hidden">
          <TooltipProvider delayDuration={200}>
            {cart?.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </TooltipProvider>
        </ul>

        {cartCondition && (
          <div className="my-5">
            <div className="item-center flex gap-1">
              <span className="text-lg font-bold text-zinc-600">Tạm tính:</span>
              <span className="text-lg font-bold text-[#ff6347]">
                {formatCurrency(total)}
                {/* {total} */}
              </span>
            </div>
          </div>
        )}

        {cartCondition && (
          // <SheetFooter className="bg-red-500">
          <div className="my-6 flex flex-col items-center gap-y-5">
            <Button
              onClick={handleCheckout}
              variant="moiMoc"
              className="w-full gap-x-1 text-base transition duration-300 hover:scale-105 hover:text-lg"
            >
              <CreditCard className="h-6 w-6" /> Thanh toán
            </Button>

            <SheetClose asChild>
              <div
                className="flex cursor-pointer items-center gap-1 text-center text-slate-400 duration-200
                  hover:text-slate-600 hover:underline"
              >
                <ShoppingBag /> Tiếp tục mua sắm
              </div>
            </SheetClose>
          </div>

          // </SheetFooter>
        )}

        {!cartCondition && (
          <SheetClose asChild>
            <div
              className="item-center flex animate-bounce cursor-pointer items-center justify-center gap-1
                text-center text-moi_moc_green duration-1000 hover:text-slate-600
                hover:underline"
            >
              <ShoppingBag /> Trở lại mua sắm
            </div>
          </SheetClose>
        )}
      </SheetContent>
    </Sheet>
  );
};
