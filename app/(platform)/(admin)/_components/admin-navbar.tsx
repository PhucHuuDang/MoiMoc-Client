"use client";

import { Search } from "lucide-react";
import { Logo } from "@/components/_global-components-reused/logo";

export const AdminNavbar = () => {
  const height = 24;
  const hoverAnimate =
    "hover:scale-110 transition duration-200  p-0.5 rounded-lg";
  return (
    <div className="fixed top-0 z-50 h-14 w-full border">
      <div
        className="flex items-center justify-between gap-x-4 bg-main_background_color
          dark:bg-background px-20 py-2"
      >
        {/* <Search
          className={`${hoverAnimate} size-8 cursor-pointer text-moi_moc_text_green`}
        /> */}
        {/* <ProductNavbar height={height} className={hoverAnimate} /> */}
        {/* <AboutMoiMocNavbar height={height} className={hoverAnimate} /> */}
        <Logo className={hoverAnimate} />
        {/* <ContactNavbar height={height} className={hoverAnimate} /> */}
        {/* <LoginNavbarSVG height={height} className={hoverAnimate} /> */}
        {/* <LanguageNavbarSVG height={height} className={hoverAnimate} /> */}
        {/* <CartNavbarSVG height={35} className={hoverAnimate} /> */}
      </div>
    </div>
  );
};
