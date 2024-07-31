import { cn } from "@/lib/utils";

interface CircleUIProps {
  className?: string;
}

export const CircleUI = ({ className }: CircleUIProps) => {
  return (
    // <div className="h-[1834px] w-[1834px]">
    <div
      className={cn(
        "absolute z-0 h-96 w-96 rounded-[917px] [background:radial-gradient(50%_50%_at_50%_50%,rgba(87.81,138.11,23.79,0.5)_0%,rgba(118.2,171.25,104.94,0.38)_42%,rgba(217,217,217,0)_100%)]",
        className,
      )}
    />
    // </div>
  );
};
