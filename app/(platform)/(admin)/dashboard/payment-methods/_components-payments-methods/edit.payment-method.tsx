"use client";

import { z } from "zod";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { DeliverySafeTypes } from "@/safe-types-zod/admin/delivery-safe-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormValues } from "@/components/_global-components-reused/form/form-values";
import { FormItemsControl } from "@/components/_global-components-reused/form/form-items-control";
import { FormSubmit } from "@/components/_global-components-reused/form/form-submit";
import Spinner from "@/components/animata/spinner";
import axios from "axios";
import { usePushDataActions } from "@/hooks/use-create-actions";
import { toast } from "sonner";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { PaymentMethodsSafeTypes } from "@/safe-types-zod/admin/payment-methods-safe-types";
import { FormSelectControl } from "@/components/_global-components-reused/form/form-select-control";
import { typesMethod } from "./add-payment-methods";
import { SelectItem } from "@/components/ui/select";

interface EditPaymentMethod {
  defaultValues: z.infer<typeof PaymentMethodsSafeTypes>;
  paymentMethodId: number;
}

export const EditPaymentMethod = ({
  defaultValues,
  paymentMethodId,
}: EditPaymentMethod) => {
  const form = useForm<z.infer<typeof PaymentMethodsSafeTypes>>({
    resolver: zodResolver(PaymentMethodsSafeTypes),
    defaultValues,
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const client = useQueryClient();

  const editInfoMethod = async (
    values: z.infer<typeof PaymentMethodsSafeTypes>,
  ) => {
    const hasChanged =
      values.method === defaultValues.method &&
      values.fee === defaultValues.fee &&
      values.type === defaultValues.type;

    if (hasChanged) {
      toast.info("Không có thông tin nào thay đổi");
      setIsOpen(false);
      return false;
    }

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/payment-methods/${paymentMethodId}`,
        values,
      );

      if (response.status === 200) {
        toast.success("Phương thức thanh toán đã được chỉnh sửa thành công");
        return true;
      }
    } catch (error) {
      console.error("Lỗi cập nhật phương thức thanh toán", error);
      // toast.error("Đã xảy ra lỗi khi chỉnh sửa phương thức thanh toán");
      return false;
    } finally {
      setIsOpen(false);
    }
  };

  const { pushDataAction, isPending, isSuccess } = usePushDataActions(
    editInfoMethod,
    form,
    { method: "", fee: "", type: "" },
    {
      onSuccess: () => {
        // toast.success("Chỉnh sửa phương thức thanh toán thành công");
        client.invalidateQueries({ queryKey: ["payment-methods"] });
        setIsOpen(false);
      },
      onError: (error) => {
        console.error("Lỗi cập nhật phương thức thanh toán", error);
        toast.error("Đã xảy ra lỗi khi chỉnh sửa phương thức thanh toán");
      },
    },
  );

  const onSubmit = async (values: z.infer<typeof PaymentMethodsSafeTypes>) => {
    pushDataAction(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <Edit className="mr-2 h-4 w-4" />
          Chỉnh sửa
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa phương thức thanh toán</DialogTitle>
          <DialogDescription>
            Thay đổi thông tin của phương thức thanh toán.
          </DialogDescription>
        </DialogHeader>
        <FormValues form={form} onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <FormItemsControl
              form={form}
              name="method"
              label="Tên phương thức thanh toán"
              disabled={isPending}
              placeholder="Hãy nhập tên phương thức thanh toán"
            />
            <FormItemsControl
              form={form}
              name="fee"
              label="Phí của phương thức thanh toán"
              disabled={isPending}
              placeholder="Hãy nhập phí của phương thức thanh toán"
            />

            <FormSelectControl
              form={form}
              name="type"
              placeholder="Loại phương thức thanh toán"
            >
              {typesMethod.map((type) => {
                return (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                );
              })}
            </FormSelectControl>
          </div>

          <DialogFooter>
            <DialogClose
              className="w-32 outline-1 outline rounded-lg"
              disabled={isPending}
            >
              {/* <Button variant="outline">Hủy</Button> */}
              Hủy
            </DialogClose>
            <FormSubmit disabled={isPending}>
              {isPending ? (
                <>
                  <Spinner className="size-5" />
                  'Đang xử lý...'
                </>
              ) : (
                "Chỉhh sửa"
              )}
            </FormSubmit>
          </DialogFooter>
        </FormValues>
      </DialogContent>
    </Dialog>
  );
};
