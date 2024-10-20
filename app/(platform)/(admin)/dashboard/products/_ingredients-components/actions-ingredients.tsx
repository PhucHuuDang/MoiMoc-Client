"use client";

import { ActionsControl } from "@/components/_global-components-reused/actions-control";
import { ConfirmModal } from "@/components/_global-components-reused/confirm-modal";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Edit, Trash2 } from "lucide-react";
import { Actions } from "react-use/lib/useMap";
import { EditProduct } from "../_products_components/edit-product";
import { SheetControlSystem } from "../../orders/_orders-components/sheet-control-system";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { EditIngredient } from "./edit-ingredient";
import { IngredientsTypes } from "../types-data-fetch/product-return-types";

interface ActionsIngredientsProps {
  ingredientId: number;
  ingredient: string;
}

export const ActionsIngredients = ({
  ingredientId,
  ingredient,
}: ActionsIngredientsProps) => {
  const client = useQueryClient();
  const [isPending, setIsPending] = useState<boolean>(false);

  // const {
  //   data: ingredientDetails,
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ["ingredients"],
  //   queryFn: async () => {
  //     const data = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/ingredients`,
  //     );

  //     return data;
  //   },
  // });

  // console.log("data: ", ingredientDetails?.data);

  const handleDelete = async (ingredientId: number) => {
    setIsPending(true);

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/ingredients/${ingredientId}`,
      );

      if (response.status === 200) {
        toast.success("Xoá thành phần thành công!");
        client.invalidateQueries({ queryKey: ["ingredients"] });
      }
    } catch (error) {
      console.log({ error });
      toast.error("Đã xảy ra lỗi khi xoá sản phẩm");
    } finally {
      setIsPending(false);
    }
  };

  // const ingredient = ingredientDetails?.data?.find(
  //   (item: IngredientsTypes) => item.id === ingredientId,
  // );

  // if (isLoading) return <span className="font-semibold">Loading...</span>;

  return (
    <ActionsControl>
      <EditIngredient
        defaultValues={{ ingredient }}
        ingredientId={ingredientId}
      />

      <ConfirmModal
        action={() => handleDelete(ingredientId)}
        title="Xoá thành phần này"
        description="Bạn có chắc chắn muốn xoá thành phần này không?"
        trigger={
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="text-red-600 w-full"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Xoá vĩnh viễn
          </DropdownMenuItem>
        }
        isPending={isPending}
      />
    </ActionsControl>
  );
};
