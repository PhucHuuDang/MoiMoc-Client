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
import { FormSelectControl } from "@/components/_global-components-reused/form/form-select-control";
import { SelectItem } from "@/components/ui/select";
import { IngredientSafeTypes } from "@/safe-types-zod/admin/ingredient-types";

interface EditIngredient {
  defaultValues: z.infer<typeof IngredientSafeTypes>;
  ingredientId: number;
}

export const EditIngredient = ({
  defaultValues,
  ingredientId,
}: EditIngredient) => {
  const form = useForm<z.infer<typeof IngredientSafeTypes>>({
    resolver: zodResolver(IngredientSafeTypes),
    defaultValues,
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const client = useQueryClient();

  const editInfoMethod = async (
    values: z.infer<typeof IngredientSafeTypes>,
  ) => {
    const hasChanged = values.ingredient.toLowerCase() === defaultValues.ingredient.toLowerCase();

    if (hasChanged) {
      toast.info("Không có thông tin nào thay đổi");
      setIsOpen(false);
      return false;
    }

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/ingredients/${ingredientId}`,
        values,
      );

      if (response.status === 200) {
        toast.success("Thành phần đã được chỉnh sửa thành công");
        return true;
      }
    } catch (error) {
      console.error("Lỗi cập nhật thành phần", error);
      // toast.error("Đã xảy ra lỗi khi chỉnh sửa thành phần");
      return false;
    } finally {
      setIsOpen(false);
    }
  };

  const { pushDataAction, isPending, isSuccess } = usePushDataActions(
    editInfoMethod,
    form,
    { ingredient: "" },
    {
      onSuccess: () => {
        // toast.success("Chỉnh sửa phương thức thanh toán thành công");
        client.invalidateQueries({ queryKey: ["ingredients"] });
        setIsOpen(false);
      },
      onError: (error) => {
        console.error("Lỗi cập nhật thành phần", error);
        toast.error("Đã xảy ra lỗi khi chỉnh sửa thành phần");
      },
    },
  );

  const onSubmit = async (values: z.infer<typeof IngredientSafeTypes>) => {
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
          <DialogTitle>Chỉnh sửa thành phần</DialogTitle>
          <DialogDescription>
            Thay đổi thông tin của thành phần.
          </DialogDescription>
        </DialogHeader>
        <FormValues form={form} onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <FormItemsControl
              form={form}
              name="ingredient"
              label="Tên thành phần"
              disabled={isPending}
              placeholder="Hãy nhập tên thành phần"
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
                "Chỉnh sửa"
              )}
            </FormSubmit>
          </DialogFooter>
        </FormValues>
      </DialogContent>
    </Dialog>
  );
};
