import { cn } from "@/lib/utils";
import { SVGProps } from "./interface-navbar";

export const LanguageNavbarSVG = ({
  width = 17,
  height = 15,
  viewBox = "0 0 17 15",
  fill = "none",
  className,
}: SVGProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 15"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      className={cn("cursor-pointer", className)}
    >
      <path
        d="M2.29297 0.454545L6.83842 13.2741H6.96626L11.5117 0.454545H12.9038L7.61257 15H6.19212L0.900923 0.454545H2.29297ZM16.7248 0.454545V15H15.3967V0.454545H16.7248Z"
        fill="#003C14"
      />
    </svg>
  );
};
