"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormValues } from "@/components/_global-components-reused/form/form-values";
import { FormItemsControl } from "@/components/_global-components-reused/form/form-items-control";
import { useState } from "react";
import axios from "axios";
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
import { FormSubmit } from "@/components/_global-components-reused/form/form-submit";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "@/components/animata/spinner";
import { PaymentMethodsSafeTypes } from "@/safe-types-zod/admin/payment-methods-safe-types";
import { FormSelectControl } from "@/components/_global-components-reused/form/form-select-control";
import { SelectItem } from "@/components/ui/select";

export const typesMethod = [
  {
    value: "card",
    label: "Card",
  },
  {
    value: "cash",
    label: "Cash",
  },
  {
    value: "bank",
    label: "Bank",
  },
  {
    value: "credit",
    label: "Credit",
  },

  {
    value: "digital",
    label: "Digital",
  },
  {
    value: "other",
    label: "Other",
  },
];

export const AddPaymentMethod = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const client = useQueryClient();

  const form = useForm<z.infer<typeof PaymentMethodsSafeTypes>>({
    resolver: zodResolver(PaymentMethodsSafeTypes),
  });

  const addNewMethodApi = async (
    values: z.infer<typeof PaymentMethodsSafeTypes>,
  ) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/payment-methods`,
      values,
    );
    return response.data;
  };

  const {
    mutate: addNewMethod,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: addNewMethodApi,
    onSuccess: () => {
      toast.success("Thêm phương thức thanh toán thành công");
      form.reset({
        method: "",
        fee: "",
        type: "",
      });
      client.invalidateQueries({ queryKey: ["payment-methods"] });
      setIsDialogOpen(false);
    },
    onError: (error: any) => {
      toast.error("Thêm phương thức thanh toán thất bại");
      console.error({ error });
    },
    // onSettled: () => {
    //   setIsLoading(false);
    // },
  });

  const onSubmit = (values: z.infer<typeof PaymentMethodsSafeTypes>) => {
    // setIsLoading(true);
    addNewMethod(values);
  };

  // console.log({ isPending, isSuccess });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full sm:w-auto"
          onClick={() => setIsDialogOpen(true)} // Mở dialog khi click vào button
        >
          <Plus className="mr-2 h-4 w-4" /> Thêm mới phương thức thanh toán
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm mới phương thức thanh toán</DialogTitle>
          <DialogDescription>
            Thêm mới phương thức để cung cấp cho khách hàng của bạn
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
              placeholder="Hãy nhập phí của phương thức thanh toán nếu có"
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
                "Thêm phương thức"
              )}
            </FormSubmit>
          </DialogFooter>
        </FormValues>
      </DialogContent>
    </Dialog>
  );
};
