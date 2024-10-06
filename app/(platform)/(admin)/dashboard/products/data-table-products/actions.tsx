import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

interface ActionsProps {
  // onEdit: () => void;
  id: number;
}

export const Actions = ({ id }: ActionsProps) => {
  //* handleDelete in here

  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Product",
    "Are you sure you want to delete this product?",
  );

  const handleDelete = async () => {
    const ok = await confirm();

    if (ok) {
    }
  };

  return (
    <>
      <ConfirmDialog />
      {/* <TableCell> */}
      <>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="size-8 p-0">
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
            // disabled={deleteMutation.isPending}
            // onClick={() => onOpen(id)}
            >
              <Edit className="size-4 mr-2" />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              // disabled={deleteMutation.isPending}
              onClick={handleDelete}
            >
              <Trash className="size-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* </TableCell> */}
      </>
    </>
  );
};
