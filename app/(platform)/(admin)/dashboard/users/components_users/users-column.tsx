import { Checkbox } from "@/components/ui/checkbox";
import { vietnameseDate } from "@/handle-transform/format-date-vietnam";
import { ColumnDef } from "@tanstack/react-table";
// import { Actions } from "../data-table-products/actions";
import { capitalize } from "lodash";
import { ActionsIngredients } from "../../products/_ingredients-components/actions-ingredients";
import { UserProfile } from "@/types/user-types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ActionsUser } from "./user-actions";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
// import { ActionsIngredients } from "./actions-ingredients";

export const usersColumn: ColumnDef<UserProfile["user"]>[] = [
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
    accessorKey: "Avatar",
    header: () => <div className="">Avatar</div>,
    cell: ({ row }) => {
      const username = row.getValue("name") as string;

      return (
        <Avatar>
          <AvatarImage
            src="/about-moi-moc-images/avatar-placeholder.gif"
            alt={`${username} avatar`}
          />
          <AvatarFallback>
            {username
              .split(" ")
              .map((n: any) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      );
    },
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const username = capitalize(row.getValue("name"));

      return <div className="text-primary font-bold">{username}</div>;
    },
    enableSorting: true,
  },

  {
    accessorKey: "phoneAuth",
    header: () => <div className="">Phone</div>,
    cell: ({ row }) => {
      return (
        <div className="">{capitalize(row.getValue("phoneAuth")) ?? null}</div>
      );
    },
  },
  {
    accessorKey: "email",
    header: () => <div className="">Email</div>,
    cell: ({ row }) => {
      return (
        <div className="">{capitalize(row.getValue("email")) ?? null}</div>
      );
    },
  },

  {
    accessorKey: "role",
    header: () => <div className="">Role</div>,
    cell: ({ row }) => {
      const role = capitalize(row.getValue("role"));

      return (
        <div className={`${role === "Admin" && "text-primary font-bold"}`}>
          {capitalize(row.getValue("role"))}
        </div>
      );
    },
  },

  {
    accessorKey: "designation",
    header: () => <div className="">Designation</div>,
    cell: ({ row }) => {
      return (
        <div className="">
          {capitalize(row.getValue("designation")) ?? null}
        </div>
      );
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
    header: () => <div className="">Actions</div>,

    cell: ({ row }) => {
      const userId = Number(row.original.id);

      return <ActionsUser userId={userId} />;
    },
  },
];
