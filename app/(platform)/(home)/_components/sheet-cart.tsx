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
import { useAuthContext } from "@/provider/auth-provider";
import { useLoginDiaLogModal } from "@/hooks/login-dialog-modal";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SheetCartProps {
  // handleCheckout: () => void;
}

export const SheetCart = ({}: SheetCartProps) => {
  const router = useRouter();
  const sheetCart = useSheetCart();
  const auth = useAuthContext();
  const loginModal = useLoginDiaLogModal();

  const handleCheckout = () => {
    if (!auth?.isAuth) {
      // sheetCart.onClose();
      toast.info("Vui lòng đăng nhập để tiếp tục thanh toán");
      loginModal.onOpen();

      return;
    }

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
      <SheetContent style={{ maxWidth: "47vw" }}>
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

        <ScrollArea className="h-48 lg:h-96 2xl:h-[60%]">
          <TooltipProvider delayDuration={200}>
            {cart?.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </TooltipProvider>
        </ScrollArea>

        <SheetFooter className="w-full">
          {cartCondition && (
            <div className="mb-5 w-full flex flex-col">
              <div className="item-start flex gap-1">
                <span className="text-lg font-bold text-zinc-600">
                  Tạm tính:
                </span>
                <span className="text-lg font-bold text-[#ff6347]">
                  {formatCurrency(total)}
                  {/* {total} */}
                </span>
              </div>

              <div className="my-6 flex flex-col items-center gap-y-5 w-full justify-center">
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
            </div>
          )}

          {!cartCondition && (
            <SheetClose asChild>
              <div
                className="item-center flex animate-bounce cursor-pointer items-center justify-center gap-1
                  text-center text-moi_moc_green duration-1000 hover:text-slate-600
                  hover:underline w-full"
              >
                <ShoppingBag /> Trở lại mua sắm
              </div>
            </SheetClose>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
