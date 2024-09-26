"use client";

import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

interface FloatArrowProps {
  onScrollTop: () => void;
  visible: boolean;
}

export const FloatArrow = ({ onScrollTop, visible }: FloatArrowProps) => {
  return (
    <div
      className={`fixed bottom-0 right-0 p-4 transition-all duration-200 ease-in-out ${visible ? "opacity-100 blur-0" : "opacity-0 blur-md"}`}
    >
      <ArrowUp
        className="hoverAnimate size-14 rounded-full border border-moi_moc_green bg-main_background_color p-4 text-moi_moc_green"
        onClick={onScrollTop}
      />
    </div>
  );
};
