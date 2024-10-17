"use client";

import Spinner from "@/components/animata/spinner";
import { AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

interface ToggleStatusPaymentProps {
  // open: boolean;
  // onOpenChange: (open: boolean) => void;
  paymentMethodId: number;
  status: boolean;
}

export const ToggleStatusPayment = ({
  paymentMethodId,
  status,
}: ToggleStatusPaymentProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const client = useQueryClient();

  const handleIsStatus = async () => {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/payment-methods/status/${paymentMethodId}`,

      { status: !status },
    );

    console.log({ response });

    return response.status === 200;
  };
  const {
    mutate: toggleStatus,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: handleIsStatus,
    onSuccess: () => {
      toast.success("Thay đổi trạng thái thành công");
      client.invalidateQueries({ queryKey: ["payment-methods"] });
      setIsOpen(false);
    },
    onError: (error) => {
      toast.error("Thay đổi trạng thái thất bại");
      console.error({ error });
    },
  });

  console.log({ isPending, isError, error });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger>
        {/* <DropdownMenuItem> */}
        <div
          className="w-full h-8 px-2 rounded-md mx-auto focus:bg-accent hover:bg-accent
            text-accent-foreground"
        >
          {status ? "Vô hiệu hóa" : "Kích hoạt"} phương thức thanh toán
        </div>
        {/* </DropdownMenuItem> */}
      </AlertDialogTrigger>
      <AlertDialogContent aria-disabled={true}>
        <AlertDialogHeader>
          <AlertTitle>
            {status ? "Vô hiệu hóa" : "Kích hoạt"} phương thức thanh toán
          </AlertTitle>
          <AlertDescription>
            {status
              ? "Bạn có chắc chắn muốn vô hiệu hóa phương thức thanh toán này?"
              : "Bạn có chắc chắn muốn kích hoạt phương thức thanh toán này?"}
          </AlertDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => toggleStatus()}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Spinner className="size-5" />
                Đang xử lý...
              </>
            ) : (
              "Đồng ý"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
