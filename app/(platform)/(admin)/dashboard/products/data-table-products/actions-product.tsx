"use client";

import { ActionsControl } from "@/components/_global-components-reused/actions-control";
import { ConfirmModal } from "@/components/_global-components-reused/confirm-modal";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Edit, Trash2 } from "lucide-react";
import { Actions } from "react-use/lib/useMap";
import { EditProduct } from "../_products_components/edit-product";
import { SheetControlSystem } from "../../orders/_orders-components/sheet-control-system";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";

interface ActionsProductProps {
  productId: number;
}

export const ActionsProduct = ({ productId }: ActionsProductProps) => {
  const client = useQueryClient();
  const [isPending, setIsPending] = useState<boolean>(false);

  const handleDelete = async (productId: number) => {
    setIsPending(true);

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
      );

      if (response.status === 200) {
        toast.success("Xoá sản phẩm thành công!");
        client.invalidateQueries({ queryKey: ["products"] });
      }
    } catch (error) {
      console.log({ error });
      toast.error("Đã xảy ra lỗi khi xoá sản phẩm");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <ActionsControl>
      {/* <ConfirmModal
        action={() => {}}
        title="Edit sản phẩm"
        description="Bạn có chắc chắn muốn edit sản phẩm này không?"
        trigger={<EditProduct />}
        isPending={false}
      /> */}

      <EditProduct productId={productId} />
      {/* <SheetControlSystem /> */}

      <ConfirmModal
        action={() => handleDelete(productId)}
        title="Xoá sản phẩm"
        description="Bạn có chắc chắn muốn xoá sản phẩm này không?"
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
