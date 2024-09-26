import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, CircleDashed, ShoppingCart } from "lucide-react";

import { cn } from "@/lib/utils";
import { toast } from "sonner";

const wait = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

interface StatusButtonProps {
  handleAddToCart: (e: React.MouseEvent) => void;
  className?: string;
}

export default function StatusButton({
  handleAddToCart,
  className,
}: StatusButtonProps) {
  const [status, setStatus] = useState<
    "loading" | "Add to cart" | "Added to cart"
  >();
  const isEnabled = !status || status === "Add to cart";

  const changeStatus = async (e: React.MouseEvent) => {
    if (!isEnabled) {
      return;
    }

    setStatus("loading");
    console.log("loading 1");
    await wait(700);
    handleAddToCart(e);
    toast.success("Added to cart");
    setStatus("Added to cart");
    console.log("Added to cart 2");

    await wait(500);
    setStatus("Add to cart");
    console.log("Add to cart last 3");
  };

  console.log(status === "Added to cart");

  const hoverAnimation =
    "group-hover:scale-110 duration-300 transition cursor-pointer";

  return (
    <button
      onClick={(e) => changeStatus(e)}
      disabled={!isEnabled}
      className={cn(
        `group relative overflow-hidden rounded-md text-sm bg-slate-200 size-10
        font-semibold text-white transition-colors duration-300 flex items-center
        justify-center`,
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          // Remount the component so that the animation can be restarted
          // key={status}
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 15 }}
          transition={{ duration: 0.075 }}
          // className={cn("flex items-center justify-center gap-1")}
        >
          {status === "Added to cart" && (
            <motion.span
              className="h-fit w-fit"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.075, type: "spring" }}
            >
              <CheckCircle2
                className={`size-8 fill-white stroke-teal-500 group-hover:stroke-teal-600 ${hoverAnimation}`}
              />
            </motion.span>
          )}
          {status == "loading" ? (
            <CircleDashed className="size-8 animate-spin" />
          ) : (
            (status === "Add to cart" || !status) && (
              <ShoppingCart
                className={`size-10 cursor-pointer rounded-lg p-1 text-slate-600 duration-200
                  hover:scale-110 hover:bg-slate-200 hover:text-slate-800 hover:shadow-lg`}
              />
            )
            // (status ?? (
            //   <ShoppingCart className="size-10 text-red-500 bg-red-500 z-50 flex items-center" />
            // ))
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}