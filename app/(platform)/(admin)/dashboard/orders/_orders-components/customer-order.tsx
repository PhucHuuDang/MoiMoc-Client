import { Badge } from "@/components/ui/badge";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

interface CustomerOrderProps {
  id: number;
  userName: string;
  email: string;
  type: string;
  status: string;
  date: string;
  amount: string;
  isActive: boolean;
  onActive: (id: number) => void;
}

export const CustomerOrder = ({
  id,
  userName,
  email,
  type,
  status,
  date,
  amount,
  isActive,
  onActive,
}: CustomerOrderProps) => {
  return (
    <TableBody>
      <TableRow
        className={`${isActive && "bg-accent rounded-lg"} cursor-pointer`}
        onClick={() => onActive(id)}
      >
        <TableCell>
          <div className="font-medium">{userName}</div>
          <div className="hidden text-sm text-muted-foreground md:inline">
            {email}
          </div>
        </TableCell>
        <TableCell className="hidden sm:table-cell">{type}</TableCell>
        <TableCell className="hidden sm:table-cell">
          <Badge className="text-xs text-foreground">{status}</Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell">{date}</TableCell>
        <TableCell className="text-right">{amount}</TableCell>
      </TableRow>
    </TableBody>
  );
};
