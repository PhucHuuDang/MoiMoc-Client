"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckoutHeader } from "./_components/checkout-header";
import { MapPin, Phone } from "lucide-react";
import { DeliveryMethod } from "./_components/delivery-method";
import { ReceivingInformation } from "./_components/receiving-information";
import { PaymentMethod } from "./_components/payment-method";
import { OrderDetail } from "./_components/order-detail";
import { Footer } from "@/components/_global-components-reused/footer";
import { Separator } from "@/components/ui/separator";
import { DiscountCode } from "./_components/discount-code";
import { FormValues } from "@/components/_global-components-reused/form/form-values";
import { z } from "zod";
import { Checkout, CheckoutSchemaTypes } from "@/safe-types-zod/checkout";
import { Path, PathValue, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthContext } from "@/provider/auth-provider";
import { useLoginDiaLogModal } from "@/hooks/login-dialog-modal";
import { useEffect } from "react";
import { FormItemsControl } from "@/components/_global-components-reused/form/form-items-control";
import { truncateText } from "@/app/lodash-config/truncate";
import { useCartStore } from "@/store/use-cart-store";
import { useFromStore } from "@/store/use-from-store";
import { toast } from "sonner";

export const CheckoutClient = () => {
  const auth = useAuthContext();

  // console.log(auth?.user);

  const loginModal = useLoginDiaLogModal();

  const form = useForm<z.infer<typeof CheckoutSchemaTypes>>({
    resolver: zodResolver(CheckoutSchemaTypes),
    defaultValues: {
      method: "standard",
      paymentMethod: "receive-order-payment",
      // address: {
      //   name: "Harry Dang", //** we can set default in here
      // },

      // user: {
      //   name: auth?.user?.name,
      //   phoneAuth: auth?.user?.phoneAuth,
      //   email: auth?.user?.email,
      //   avatar: auth?.user?.avatar,
      //   role: auth?.user?.role,
      // },

      // name: auth?.user?.name,
      phone: auth?.user?.phoneAuth,

      address: `Vinhomes Grandpark, Tòa s503, Nguyễn Xiển, phường Long Thạnh Mỹ,
      Thành phố Thủ Đức`,
    },
  });

  const onSubmit = async (values: z.infer<typeof CheckoutSchemaTypes>) => {
    // if (!auth?.isAuth) {
    //   loginModal.onOpen();
    //   return;
    // }

    console.log({ values });
  };

  const cart = useFromStore(useCartStore, (state) => state.orders);

  // console.log({ products });
  const products = cart?.map((product) => {
    const truncateDescription = truncateText(product.productDescription, 200);

    return {
      productId: product.id,
      productName: product.productName,
      quantityOrder: product.quantityOrder!,
      price: product.price,
      discountPrice: product.discountPrice,
      discountPercentage: product.discountPercentage,
      imageUrl: product.mainImage,
      productDescription: truncateDescription,
    };
  });

  // console.log({ cart });

  useEffect(() => {
    if (!auth?.isAuth) {
      loginModal.onOpen();
      return;
    } else {
      form.setValue("user", {
        id: auth?.user?.id,
        name: auth?.user?.name,
        phoneAuth: auth?.user?.phoneAuth,
        email: auth?.user?.email,
        avatar: auth?.user?.avatar,
        role: auth?.user?.role,
      });

      if (cart && cart.length > 0) {
        const products = cart.map((product) => ({
          productId: product.id,
          productName: product.productName,
          quantityOrder: product.quantityOrder!,
          price: product.price,
          discountPrice: product.discountPrice,
          discountPercentage: product.discountPercentage,
          imageUrl: product.mainImage,
          productDescription: truncateText(product.productDescription, 200),
        }));
        form.setValue("products", products); // Correctly assign the array
      } else {
        toast.info("Có vẻ như giỏ hàng của bạn đang trống");
      }

      // form.setValue("name", auth?.user?.name);
      form.setValue("phone", auth?.user?.phoneAuth);
    }
  }, [auth?.isAuth, auth?.user, form, products]);

  return (
    <div className="h-full overflow-x-hidden pt-20">
      <div className="flex items-center justify-center py-10 pt-20">
        <CheckoutHeader />
      </div>
      <FormValues form={form} onSubmit={onSubmit}>
        <div className="my-5 flex justify-center gap-x-8">
          <div className="flex flex-col items-center gap-y-8">
            <ReceivingInformation
              form={form}
              address="address"
              phone="phone"
              name="user.name"
            />

            <FormItemsControl
              type="hidden"
              name="user"
              // value={auth?.user}
              form={form}
            />

            <DeliveryMethod form={form} name="method" />

            <PaymentMethod form={form} name="paymentMethod" />
            <DiscountCode form={form} name="discountCode" />
          </div>

          <OrderDetail form={form} name="products" />
        </div>
      </FormValues>
      <Separator className="mx-1 my-16 h-0.5 bg-moi_moc_green" />

      <div className="py-8">
        <Footer />
      </div>
    </div>
  );
};
