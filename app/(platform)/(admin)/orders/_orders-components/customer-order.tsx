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
}

export const CustomerOrder = ({
  id,
  userName,
  email,
  type,
  status,
  date,
  amount,
}: CustomerOrderProps) => {
  return (
    <TableBody>
      <TableRow className="bg-accent">
        <TableCell>
          <div className="font-medium">{userName}</div>
          <div className="hidden text-sm text-muted-foreground md:inline">
            {email}
          </div>
        </TableCell>
        <TableCell className="hidden sm:table-cell">{type}</TableCell>
        <TableCell className="hidden sm:table-cell">
          <Badge className="text-xs">{status}</Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell">{date}</TableCell>
        <TableCell className="text-right">{amount}</TableCell>
      </TableRow>
    </TableBody>
  );
};
