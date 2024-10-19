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

      // address: `Vinhomes Grandpark, Tòa s503, Nguyễn Xiển, phường Long Thạnh Mỹ,
      // Thành phố Thủ Đức`,
    },
  });

  const onSubmit = async (values: z.infer<typeof CheckoutSchemaTypes>) => {
    // Ensure the user is authenticated
    if (!auth?.isAuth || !auth?.user || !auth?.token) {
      loginModal.onOpen(); // Open login modal if not authenticated
      return;
    }

    // Confirm the action with the user
    const ok = await confirm();

    if (ok) {
      console.log("Submitting values:", { values });

      setIsLoading(true);

      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/stripe/payment`,
          // `http://localhost:3002/stripe/payment`,
          values,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`, // Include the token
              // "Content-Type": "application/json", // Explicitly set content type
            },
          },
        );

        if (response.status === 201) {
          toast.success("Thanh toán thành công");
          const { paymentUrl } = await response.data;

          console.log({ paymentUrl });

          router.push(paymentUrl);
        }
      } catch (error) {
        console.log({ error });
        toast.error("Thanh toán thất bại");
      } finally {
        setIsLoading(false);
      }

      // try {
      //   // Send the POST request to the payment endpoint
      //   const response = await axios.post(
      //     `${process.env.NEXT_PUBLIC_API_URL}/stripe/payment`,
      //     values,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${auth.token}`, // Include the token
      //         "Content-Type": "application/json", // Explicitly set content type
      //       },
      //     },
      //   );

      //   console.log("Response:", { response });

      //   // Check if the payment was successful
      //   if (response.status === 201) {
      //     toast.success("Thanh toán thành công"); // Display success message
      //     console.log("Payment successful:", response.data); // Log the response data
      //   } else {
      //     toast.error("Thanh toán thất bại"); // Display failure message
      //   }
      // } catch (error: any) {
      //   // Enhanced error handling with more detailed logging
      //   if (error.response) {
      //     // The request was made, but the server responded with a status code outside the range of 2xx
      //     console.error("Error response data:", error.response.data);
      //     console.error("Error status:", error.response.status);
      //     console.error("Error headers:", error.response.headers);
      //     toast.error("Lỗi khi thanh toán, vui lòng thử lại.");
      //   } else if (error.request) {
      //     // The request was made, but no response was received
      //     console.error("Error request:", error.request);
      //     toast.error(
      //       "Không có phản hồi từ máy chủ, vui lòng kiểm tra kết nối.",
      //     );
      //   } else {
      //     // Something happened in setting up the request
      //     console.error("Error message:", error.message);
      //     toast.error("Đã xảy ra lỗi, vui lòng thử lại.");
      //   }
      // }
    }
  };

  const cart = useFromStore(useCartStore, (state) => state.orders);

  // console.log({ products });
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

  // console.log({ cart });

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
      });

    }
  }, [auth?.isAuth, auth?.user, auth?.token, form, products]);

  return (
    <>
      <ConfirmDialog />
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

            <OrderDetail form={form} name="products" disabled={isLoading} />
          </div>
        </FormValues>
        <Separator className="mx-1 my-16 h-0.5 bg-moi_moc_green" />

        <div className="py-8">
          <Footer />
        </div>
      </div>
    </>
  );
};
