"use client";

import { cn } from "@/lib/utils";
import { SVGProps } from "../../../interface/interface-navbar";
import { useRouter } from "next/navigation";
import { useSheetCart } from "@/hooks/use-sheet-cart";

export const CartNavbarSVG = ({
  width = 25,
  height = 25,
  className,
}: SVGProps) => {
  const router = useRouter();
  const sheetCart = useSheetCart();

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("cursor-pointer", className)}
      // onClick={() => router.push("/cart")}
      onClick={sheetCart.onOpen}
    >
      <path
        d="M3.95223 12.5303C4.51178 9.73259 4.79156 8.33371 5.716 7.43274C5.88686 7.26622 6.07171 7.11468 6.26851 6.9798C7.33328 6.25 8.75986 6.25 11.613 6.25H13.3869C16.2401 6.25 17.6667 6.25 18.7314 6.9798C18.9282 7.11468 19.1131 7.26622 19.2839 7.43274C20.2084 8.33371 20.4881 9.73259 21.0477 12.5303C21.851 16.547 22.2527 18.5553 21.3281 19.9785C21.1606 20.2361 20.9652 20.4745 20.7454 20.6892C19.5312 21.875 17.4831 21.875 13.3869 21.875H11.613C7.5168 21.875 5.46869 21.875 4.25455 20.6892C4.03471 20.4745 3.8393 20.2361 3.67188 19.9785C2.74723 18.5553 3.1489 16.547 3.95223 12.5303Z"
        stroke="#003C14"
        strokeWidth="1.5"
      />
      <ellipse
        opacity="0.5"
        cx="15.6252"
        cy="9.37467"
        rx="1.04167"
        ry="1.04167"
        fill="#003C14"
      />
      <circle
        opacity="0.5"
        cx="9.37516"
        cy="9.37467"
        r="1.04167"
        fill="#003C14"
      />
      <path
        opacity="0.5"
        d="M9.375 6.24967V5.20801C9.375 3.48212 10.7741 2.08301 12.5 2.08301C14.2259 2.08301 15.625 3.48212 15.625 5.20801V6.24967"
        stroke="#003C14"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
