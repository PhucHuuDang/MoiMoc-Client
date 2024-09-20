import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell } from "@/components/ui/table";
import { useConfirm } from "@/hooks/use-confirm";
import { MoreHorizontal } from "lucide-react";

interface ActionsProps {
  // onEdit: () => void;
  onDelete: () => void;
}

export const Actions = ({ onDelete }: ActionsProps) => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Delete Product",
    "Are you sure you want to delete this product?",
  );

  const handleDelete = async () => {
    const ok = await confirm();

    if (ok) {
      onDelete();
    }
  };

  return (
    <>
      <ConfirmDialog />
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </>
  );
};
