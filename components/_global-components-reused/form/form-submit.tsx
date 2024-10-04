"use client";

"use client";

import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/animata/spinner";

interface FormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "moiMoc"
    | "dynamic";
}

export const FormSubmit = ({
  children,
  disabled,
  className,
  variant = "default",
}: FormSubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending || disabled}
      type="submit"
      variant={variant}
      size="sm"
      className={cn("", className)}
    >
      {disabled
        ? (
            <Spinner
              childSize="size-6"
              outerSize="size-8"
              className="bg-gradient-to-bl from-moi_moc_green to-blue-400"
            />
          ) && children
        : children}
    </Button>
  );
};
