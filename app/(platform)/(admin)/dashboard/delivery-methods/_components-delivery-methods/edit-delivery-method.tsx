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

interface EditDeliveryMethodProps {
  defaultValues: z.infer<typeof DeliverySafeTypes>;
  deliveryMethodId: number;
}

export const EditDeliveryMethod = ({
  defaultValues,
  deliveryMethodId,
}: EditDeliveryMethodProps) => {
  const form = useForm<z.infer<typeof DeliverySafeTypes>>({
    resolver: zodResolver(DeliverySafeTypes),
    defaultValues,
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const client = useQueryClient();

  const editInfoMethod = async (values: z.infer<typeof DeliverySafeTypes>) => {
    const hasChanged =
      values.method === defaultValues.method &&
      values.price == defaultValues.price &&
      values.estimatedDays === defaultValues.estimatedDays;

    if (hasChanged) {
      toast.info("Không có thông tin nào thay đổi");
      setIsOpen(false);
      return false;
    }

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/delivery-methods/${deliveryMethodId}`,
        values,
      );

      if (response.status === 200) {
        toast.success("Phương thức vận chuyển đã được chỉnh sửa thành công");
        return true;
      }
    } catch (error) {
      console.error("Lỗi cập nhật phương thức vận chuyển", error);
      // toast.error("Đã xảy ra lỗi khi chỉnh sửa phương thức vận chuyển");
      return false;
    } finally {
      setIsOpen(false);
    }
  };

  const { pushDataAction, isPending, isSuccess } = usePushDataActions(
    editInfoMethod,
    form,
    { method: "", price: 0, estimatedDays: "" },
    {
      onSuccess: () => {
        // toast.success("Chỉnh sửa phương thức vận chuyển thành công");
        client.invalidateQueries({ queryKey: ["delivery-methods"] });
        setIsOpen(false);
      },
      onError: (error) => {
        console.error("Lỗi cập nhật phương thức vận chuyển", error);
        toast.error("Đã xảy ra lỗi khi chỉnh sửa phương thức vận chuyển");
      },
    },
  );

  const onSubmit = async (values: z.infer<typeof DeliverySafeTypes>) => {
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
          <DialogTitle>Chỉnh sửa phương thức vận chuyển</DialogTitle>
          <DialogDescription>
            Thay đổi thông tin của phương thức vận chuyển.
          </DialogDescription>
        </DialogHeader>
        <FormValues form={form} onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <FormItemsControl
              form={form}
              name="method"
              label="Tên phương thức vận chuyển"
              disabled={isPending}
              placeholder="Hãy nhập tên phương thức vận chuyển"
            />
            <FormItemsControl
              form={form}
              name="price"
              label="Giá của phương thức vận chuyển"
              disabled={isPending}
              placeholder="Hãy nhập giá của phương thức vận chuyển"
            />
            <FormItemsControl
              form={form}
              name="estimatedDays"
              label="Thời gian ước tính"
              disabled={isPending}
              placeholder="Thời gian ước tính giao hàng"
            />
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
