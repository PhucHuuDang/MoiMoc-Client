import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title?: string;
  center?: boolean;
  description?: string;
  classNameTitle?: string;
  classNameDescription?: string;
}
export const Header = ({
  title,
  center,
  description,
  classNameTitle,
  classNameDescription,
}: HeaderProps) => {
  return (
    <>
      <DialogTitle
        className={cn(
          `${center && "text-moi_moc_green text-center font-semibold"}`,
          classNameTitle,
        )}
      >
        {title}
      </DialogTitle>
      <DialogDescription
        className={cn("text-moi_moc_green", classNameDescription)}
      >
        {description}
      </DialogDescription>
    </>
  );
};
