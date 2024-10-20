import { Checkbox } from "@/components/ui/checkbox";
import { vietnameseDate } from "@/handle-transform/format-date-vietnam";
import { ColumnDef } from "@tanstack/react-table";
import { Actions } from "../data-table-products/actions";
import { capitalize } from "lodash";
import { ActionsIngredients } from "./actions-ingredients";

export type IngredientsColumns = {
  id: number;
  ingredient: string;
  createdAt: string;
  updatedAt: string;
};

export const columnsIngredients: ColumnDef<IngredientsColumns>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => {
      return (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      );
    },

    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "ingredient",
    header: () => <div className="">Ingredient</div>,
    cell: ({ row }) => {
      return <div className="">{capitalize(row.getValue("ingredient"))}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="">Created At</div>,
    cell: ({ row }) => {
      const createdAt = vietnameseDate(row.getValue("createdAt"));

      return <div className="">{createdAt}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="">Updated At</div>,
    cell: ({ row }) => {
      const updatedAt = vietnameseDate(row.getValue("updatedAt"));

      return <div className="">{updatedAt}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const ingredientId = Number(row.original.id);
      const ingredientValue = row.original.ingredient;

      return (
        <ActionsIngredients
          ingredientId={ingredientId}
          ingredient={ingredientValue}
        />
      );
    },
  },
];
