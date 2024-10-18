"use client";

import { ActionsControl } from "@/components/_global-components-reused/actions-control";
import { ConfirmModal } from "@/components/_global-components-reused/confirm-modal";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Edit, Trash2 } from "lucide-react";
import { Actions } from "react-use/lib/useMap";
import { EditProduct } from "../_products_components/edit-product";
import { SheetControlSystem } from "../../orders/_orders-components/sheet-control-system";

interface ActionsProductProps {
  productId: number;
}

export const ActionsProduct = ({ productId }: ActionsProductProps) => {
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
        action={() => {}}
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
        isPending={false}
      />
    </ActionsControl>
  );
};
