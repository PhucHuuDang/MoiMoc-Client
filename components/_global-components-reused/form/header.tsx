import { DialogDescription, DialogTitle } from "@/components/ui/dialog";

interface HeaderProps {
  title: string;
  center: boolean;
  description?: string;
}
export const Header = ({ title, center, description }: HeaderProps) => {
  return (
    <>
      <DialogTitle className={`${center && "text-center font-semibold"}`}>
        {title}
      </DialogTitle>
      <DialogDescription>{description}</DialogDescription>
    </>
  );
};
