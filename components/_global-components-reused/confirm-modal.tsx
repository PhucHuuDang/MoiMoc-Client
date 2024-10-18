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

  title: string;
  description: string;
}

export const ConfirmModal = ({
  action,
  isPending,
  trigger,
  title,
  description,
}: ConfirmModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>

      <AlertDialogContent aria-disabled={true}>
        <AlertDialogHeader>
          <AlertTitle>{title}</AlertTitle>
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
