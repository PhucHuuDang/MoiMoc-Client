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
import { useEffect, useState } from "react";
import { FormItemsControl } from "@/components/_global-components-reused/form/form-items-control";
import { truncateText } from "@/app/lodash-config/truncate";
import { useCartStore } from "@/store/use-cart-store";
import { useFromStore } from "@/store/use-from-store";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import axios from "axios";
import { useRouter } from "next/navigation";

export const CheckoutClient = () => {
  const auth = useAuthContext();
  const [ConfirmDialog, confirm] = useConfirm(
    "Thanh toán",
    "Tôi muốn tiến hành thanh toán với đơn hàng của mình?",
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const loginModal = useLoginDiaLogModal();

  const form = useForm<z.infer<typeof CheckoutSchemaTypes>>({
    resolver: zodResolver(CheckoutSchemaTypes),
    defaultValues: {
      method: "standard",
      paymentMethod: "receive-order-payment",

      phone: auth?.user?.phoneAuth,
    },
  });

  const onSubmit = async (values: z.infer<typeof CheckoutSchemaTypes>) => {
    // Ensure the user is authenticated
    if (!auth?.isAuth || !auth?.user || !auth?.token) {
      loginModal.onOpen(); // Open login modal if not authenticated
      return;
    }

    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };

    // Confirm the action with the user
    const ok = await confirm();

    if (ok) {
      console.log("Submitting values:", { values });

      setIsLoading(true);

      try {
        if (values.paymentMethod === "payOs") {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/payos/payment`,
            // `http://localhost:3002/payos/payment`,
            values,
            // {
            //   headers: {
            //     Authorization: `Bearer ${auth.token}`, // Include the token
            //     // "Content-Type": "application/json", // Explicitly set content type
            //   },
            // },
          );

          if (response.status === 201) {
            toast.success("Thanh toán thành công");
            const { paymentUrl } = await response.data;
            router.push(paymentUrl);
          }
        } else if (values.paymentMethod === "stripe") {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/stripe/payment`,
            // `http://localhost:3002/stripe/payment`,
            values,
            {
              headers: {
                Authorization: `Bearer ${auth.token}`, // Include the token
              },
            },
          );

          if (response.status === 201) {
            toast.success("Thanh toán thành công");
            const { paymentUrl } = await response.data;

            router.push(paymentUrl);
          }
        }
      } catch (error) {
        console.log({ error });
        toast.error("Thanh toán thất bại");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const cart = useFromStore(useCartStore, (state) => state.orders);

  const products = cart?.map((product) => {
    const truncateDescription = truncateText(product.productDescription, 80);
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

  useEffect(() => {
    if (cart && cart.length > 0) {
      const products = cart.map((product) => ({
        productId: product.id,
        productName: product.productName,
        quantityOrder: product.quantityOrder!,
        price: product.price,
        discountPrice: product.discountPrice,
        discountPercentage: product.discountPercentage,
        imageUrl: product.mainImage,
        productDescription: truncateText(product.productDescription, 100),
      }));
      form.setValue("products", products); // Correctly assign the array
    }

    // form.setValue("name", auth?.user?.name);
    form.setValue("phone", auth?.user?.phoneAuth);

    if (!auth?.isAuth) {
      // loginModal.onOpen();
      return;
    } else {
      form.setValue("user", {
        id: auth?.user?.id,
        name: auth?.user?.name,
        phoneAuth: auth?.user?.phoneAuth,
        email: auth?.user?.email,
        avatar: auth?.user?.avatar,
        role: auth?.user?.role,
        designation: auth?.user?.designation,
      });
    }
  }, [auth?.isAuth, auth?.user, auth?.token, form, products]);

  return (
    <>
      <ConfirmDialog />

      <div className="h-full overflow-x-hidden pt-20">
        <div className="flex items-center justify-center py-5 md:py-10 pt-20">
          <CheckoutHeader />
        </div>
        <FormValues form={form} onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4 md:gap-x-8 p-1 md:p-2">
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

            <OrderDetail form={form} name="products" disabled={isLoading} />
          </div>
        </FormValues>

        <Separator className="mx-1 my-16 h-0.5 bg-moi_moc_green" />

        <div className="py-4 md:py-8">
          <Footer />
        </div>
      </div>
    </>
  );
};
