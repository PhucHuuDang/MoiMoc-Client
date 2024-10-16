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
import { Switch } from "@/components/ui/switch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

interface ActiveDialogProps {
  // open: boolean;
  // onOpenChange: (open: boolean) => void;
  deliveryMethodId: number;
  active: boolean;
}

export const ActiveDialog = ({
  deliveryMethodId,
  active,
}: ActiveDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const client = useQueryClient();

  const handleIsActive = async () => {
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/delivery-methods/active/${deliveryMethodId}`,

      { active: !active },
    );

    console.log({ response });

    return response.status === 200;
  };
  const {
    mutate: toggleActive,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: handleIsActive,
    onSuccess: () => {
      toast.success("Thay đổi trạng thái thành công");
      client.invalidateQueries({ queryKey: ["delivery-methods"] });
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
        <Switch checked={active} className="text-primary" />
      </AlertDialogTrigger>

      <AlertDialogContent aria-disabled={true}>
        <AlertDialogHeader>
          <AlertTitle>
            {active ? "Vô hiệu hóa" : "Kích hoạt"} phương thức giao hàng
          </AlertTitle>
          <AlertDescription>
            {active
              ? "Bạn có chắc chắn muốn vô hiệu hóa phương thức giao hàng này?"
              : "Bạn có chắc chắn muốn kích hoạt phương thức giao hàng này?"}
          </AlertDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => toggleActive()}
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
