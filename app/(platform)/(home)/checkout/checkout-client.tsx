"use client";

import { CheckoutHeader } from "./_components/checkout-header";
import { DeliveryMethod } from "./_components/delivery-method";
import { ReceivingInformation } from "./_components/receiving-information";
import { PaymentMethod } from "./_components/payment-method";
import { OrderDetail } from "./_components/order-detail";
import { Footer } from "@/components/_global-components-reused/footer";
import { Separator } from "@/components/ui/separator";
import { DiscountCode } from "./_components/discount-code";
import { CheckoutProgress } from "./_components/checkout-progress";
import { CheckoutSecurityBadges } from "./_components/checkout-security-badges";
import { FormValues } from "@/components/_global-components-reused/form/form-values";
import { z } from "zod";
import { CheckoutSchemaTypes } from "@/safe-types-zod/checkout";
import { useForm } from "react-hook-form";
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
      phone: "",
      address: "",
      discountCode: "",
      products: [],
      user: {
        // id: "",
        name: "",
        phoneAuth: "",
        email: "",
        avatar: "",
        role: "",
        designation: "",
      },
    },
  });

  const onSubmit = async (values: z.infer<typeof CheckoutSchemaTypes>) => {
    if (!auth?.isAuth || !auth?.user || !auth?.token) {
      loginModal.onOpen();
      return;
    }

    const ok = await confirm();

    if (ok) {
      console.log("Submitting values:", { values });
      setIsLoading(true);

      try {
        if (values.paymentMethod === "payOs") {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/payos/payment`,
            values,
          );

          if (response.status === 201) {
            toast.success("Thanh toán thành công");
            const { paymentUrl } = await response.data;
            router.push(paymentUrl);
          }
        } else if (values.paymentMethod === "stripe") {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/stripe/payment`,
            values,
            {
              headers: {
                Authorization: `Bearer ${auth.token}`,
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

  // useEffect(() => {
  //   if (cart && cart.length > 0) {
  //     const products = cart.map((product) => ({
  //       productId: product.id,
  //       productName: product.productName,
  //       quantityOrder: product.quantityOrder!,
  //       price: product.price,
  //       discountPrice: product.discountPrice,
  //       discountPercentage: product.discountPercentage,
  //       imageUrl: product.mainImage,
  //       productDescription: truncateText(product.productDescription, 100),
  //     }));
  //     form.setValue("products", products);
  //   }

  //   form.setValue("phone", auth?.user?.phoneAuth);

  //   if (!auth?.isAuth) {
  //     return;
  //   } else {
  //     form.setValue("user", {
  //       id: auth?.user?.id,
  //       name: auth?.user?.name,
  //       phoneAuth: auth?.user?.phoneAuth,
  //       email: auth?.user?.email,
  //       avatar: auth?.user?.avatar,
  //       role: auth?.user?.role,
  //       designation: auth?.user?.designation,
  //     });
  //   }
  // }, [auth?.isAuth, auth?.user, auth?.token, form, cart]);

  useEffect(() => {
    if (!cart) return;

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

    form.reset({
      ...form.getValues(),
      phone: auth?.user?.phoneAuth ?? "",
      products,
      user: auth?.user
        ? {
            id: auth.user.id ?? "",
            name: auth.user.name ?? "",
            phoneAuth: auth.user.phoneAuth ?? "",
            email: auth.user.email ?? "",
            avatar: auth.user.avatar ?? "",
            role: auth.user.role ?? "",
            designation: auth.user.designation ?? "",
          }
        : form.getValues("user"),
    });
  }, [auth?.user, cart]);

  return (
    <>
      <ConfirmDialog />

      <div className=" bg-gray-50/30 ">
        {/* Header Section */}
        <div className="w-full pt-16 sm:pt-20 pb-4 sm:pb-6">
          <CheckoutHeader />
        </div>

        {/* Progress Indicator */}
        <div className="w-full pb-5 sm:pb-6">
          <CheckoutProgress currentStep={3} />
        </div>

        {/* Main Content */}
        <FormValues form={form} onSubmit={onSubmit}>
          <div className="w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 pb-8 relative">
              {/* Left Column - Form Sections */}
              <div className="flex flex-col gap-5">
                <ReceivingInformation
                  form={form}
                  address="address"
                  phone="phone"
                  name="user.name"
                />

                {/* <FormItemsControl  type="hidden" name="user" form={form} /> */}

                <DeliveryMethod form={form} name="method" />

                <PaymentMethod form={form} name="paymentMethod" />

                <DiscountCode form={form} name="discountCode" />
              </div>
              {/* Right Column - Order Summary (Sticky on Desktop) */}
              <div className="lg:h-fit lg:sticky lg:top-24 lg:z-10">
                <OrderDetail
                  form={form}
                  name="products"
                  disabled={!form.watch("address")}
                  isSubmitting={isLoading}
                />
              </div>
            </div>
          </div>
        </FormValues>

        {/* Security Badges */}
        <div className="w-full py-10 sm:py-12 bg-transparent  border-t border-gray-100">
          <CheckoutSecurityBadges />
        </div>

        <Separator className="h-px bg-gray-200" />

        {/* Footer */}
        <div className="w-full py-8 sm:py-12">
          <Footer />
        </div>
      </div>
    </>
  );
};
