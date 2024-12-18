"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DeliverySafeTypes } from "@/safe-types-zod/admin/delivery-safe-types";
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

export const DeliveryNewMethod = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const client = useQueryClient();

  const form = useForm<z.infer<typeof DeliverySafeTypes>>({
    resolver: zodResolver(DeliverySafeTypes),
  });

  // const onSubmit = async (values: z.infer<typeof DeliverySafeTypes>) => {
  //   console.log({ values });
  //   try {
  //     setIsLoading(true);
  //     const response = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API_URL}/delivery-methods`,
  //       values,
  //     );

  //     console.log({ response });

  //     if (response.status === 201) {
  //       toast.success("Thêm phương thức giao hàng thành công");
  //       form.reset({
  //         method: "",
  //         price: 0,
  //         estimatedDays: "",
  //       });
  //     }
  //   } catch (error) {
  //     toast.error("Thêm phương thức giao hàng thất bại");
  //     console.log({ error });
  //   } finally {
  //     setIsLoading(false);
  //     setIsDialogOpen(false); // Đóng dialog sau khi thành công
  //   }
  // };

  const addNewMethodApi = async (values: z.infer<typeof DeliverySafeTypes>) => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/delivery-methods`,
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
      toast.success("Thêm phương thức giao hàng thành công");
      form.reset({
        method: "",
        price: 0,
        estimatedDays: "",
      });
      client.invalidateQueries({ queryKey: ["delivery-methods"] });
      setIsDialogOpen(false);
    },
    onError: (error: any) => {
      toast.error("Thêm phương thức giao hàng thất bại");
      console.error({ error });
    },
    // onSettled: () => {
    //   setIsLoading(false);
    // },
  });

  const onSubmit = (values: z.infer<typeof DeliverySafeTypes>) => {
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
          <Plus className="mr-2 h-4 w-4" /> Thêm mới phương thức giao hàng
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Thêm mới phương thức giao hàng</DialogTitle>
          <DialogDescription>
            Thêm mới phương thức giao hàng để cung cấp cho khách hàng của bạn
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
                "Thêm phương thức"
              )}
            </FormSubmit>
          </DialogFooter>
        </FormValues>
      </DialogContent>
    </Dialog>
  );
};
