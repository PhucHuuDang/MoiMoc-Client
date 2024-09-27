"use client";

import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Separator } from "../ui/separator";
import { Logo } from "./logo";
import { AboutMoiMocNavbar } from "./navbar-svg-components/about-moi-moc-navbar";
import { ContactNavbar } from "./navbar-svg-components/contact-navbar";
import { LoginNavbarSVG } from "./navbar-svg-components/login-navbar-svg";
import { ProductNavbar } from "./navbar-svg-components/product-navbar";
import { LanguageNavbarSVG } from "./navbar-svg-components/language-navbar-SVG";
import { CartNavbarSVG } from "./navbar-svg-components/cart-navbar-SVG";
import { useFromStore } from "@/store/use-from-store";
import { useCartStore } from "@/store/use-cart-store";

export const Navbar = () => {
  const router = useRouter();
  const height = 24;
  const hoverAnimate =
    "hover:scale-110 transition duration-200  p-0.5 rounded-lg";

  const handleRedirect = (path: string = "/") => {
    router.push(path);
  };

  const cart = useFromStore(useCartStore, (state) => state.orders);

  return (
    <div className="fixed top-0 z-50 h-14 w-full border mx-auto">
      <div className="flex items-center justify-between gap-x-4 bg-main_background_color px-20 py-2">
        <Search
          className={`${hoverAnimate} size-8 cursor-pointer text-moi_moc_text_green`}
        />

        <div className="size-8" />
        <ProductNavbar height={height} className={hoverAnimate} />
        <AboutMoiMocNavbar height={height} className={hoverAnimate} />
        <Logo className={hoverAnimate} onRedirect={handleRedirect} />
        <ContactNavbar height={height} className={hoverAnimate} />
        <LoginNavbarSVG height={height} className={hoverAnimate} />
        <LanguageNavbarSVG height={height} className={hoverAnimate} />
        <div className="relative">
          <CartNavbarSVG height={35} className={hoverAnimate} />
          <div
            className="absolute top-0 -right-2.5 border p-1 border-slate-600 rounded-full size-4
              justify-center flex items-center text-moi_moc_green"
          >
            {cart?.length}
          </div>
        </div>
      </div>
      <Separator className="bg-green-950" />
    </div>
  );
};
