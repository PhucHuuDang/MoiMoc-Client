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

interface ConfirmModalProps {
  // open: boolean;
  // onOpenChange: (open: boolean) => void;
  isPending: boolean;
  action: () => void;

  trigger: React.ReactNode;

  tittle: string;
  description: string;
}

export const ConfirmModal = ({
  action,
  isPending,
  trigger,
  tittle,
  description,
}: ConfirmModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const client = useQueryClient();

  // const handleIsActive = async () => {
  //   const response = await axios.put(
  //     `${process.env.NEXT_PUBLIC_API_URL}/delivery-methods/active/${deliveryMethodId}`,

  //     { active: !active },
  //   );

  //   console.log({ response });

  //   return response.status === 200;
  // };
  // const {
  //   mutate: toggleActive,
  //   isPending,
  //   isError,
  //   error,
  // } = useMutation({
  //   mutationFn: handleIsActive,
  //   onSuccess: () => {
  //     toast.success("Thay đổi trạng thái thành công");
  //     client.invalidateQueries({ queryKey: ["delivery-methods"] });
  //     setIsOpen(false);
  //   },
  //   onError: (error) => {
  //     toast.error("Thay đổi trạng thái thất bại");
  //     console.error({ error });
  //   },
  // });

  // console.log({ isPending, isError, error });

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        {/* <Switch checked={active} className="text-primary" /> */}
        {trigger}
      </AlertDialogTrigger>

      <AlertDialogContent aria-disabled={true}>
        <AlertDialogHeader>
          <AlertTitle>{tittle}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Hủy</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              action();
              setIsOpen(false);
            }}
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
