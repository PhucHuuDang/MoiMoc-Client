"use client";

import { ActionsControl } from "@/components/_global-components-reused/actions-control";
import { ConfirmModal } from "@/components/_global-components-reused/confirm-modal";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Edit, Trash2 } from "lucide-react";
import { Actions } from "react-use/lib/useMap";
import { SheetControlSystem } from "../../orders/_orders-components/sheet-control-system";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { EditIngredient } from "../../products/_ingredients-components/edit-ingredient";

interface ActionsUserProps {
  userId: number;
  // ingredient: string;
}

export const ActionsUser = ({
  userId,
  // ingredient,
}: ActionsUserProps) => {
  const client = useQueryClient();
  const [isPending, setIsPending] = useState<boolean>(false);

  // const handleDelete = async (userId: number) => {
  //   setIsPending(true);

  //   try {
  //     const response = await axios.delete(
  //       `${process.env.NEXT_PUBLIC_API_URL}/ingredients/${ingredientId}`,
  //     );

  //     if (response.status === 200) {
  //       toast.success("Xoá thành phần thành công!");
  //       client.invalidateQueries({ queryKey: ["ingredients"] });
  //     }
  //   } catch (error) {
  //     console.log({ error });
  //     toast.error("Đã xảy ra lỗi khi xoá sản phẩm");
  //   } finally {
  //     setIsPending(false);
  //   }
  // };

  return (
    <ActionsControl>
      {/* <EditIngredient
        defaultValues={{ ingredient }}
        ingredientId={ingredientId}
      /> */}

      <ConfirmModal
        action={() => {}}
        title="Xoá thành phần này"
        description="Bạn có chắc chắn muốn xoá thành phần này không?"
        trigger={
          <DropdownMenuItem
            onSelect={(e) => e.preventDefault()}
            className="text-red-600 w-full"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Block người dùng
          </DropdownMenuItem>
        }
        isPending={isPending}
      />
    </ActionsControl>
  );
};
