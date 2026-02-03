"use client";

import { MenuIcon, Search } from "lucide-react";

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
import { useAuthContext } from "@/provider/auth-provider";
import { UserItemsControl } from "./user-items-control";
import { AnimatePresence } from "framer-motion";
import { motion } from "@/lib/motion";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { JSX, useState } from "react";
import { Button } from "../ui/button";

export const Navbar = () => {
  const auth = useAuthContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const role = auth?.user?.role;

  const height = 24;
  const hoverAnimate =
    "hover:scale-110 transition duration-200  p-0.5 rounded-lg";

  const cart = useFromStore(useCartStore, (state) => state.orders);

  const NavContent = (): JSX.Element => {
    return (
      <>
        <Search
          className={`${hoverAnimate} size-8 cursor-pointer text-moi_moc_text_green`}
        />
        <div className="size-4" />
        <ProductNavbar height={height} className={hoverAnimate} />
        <AboutMoiMocNavbar height={height} className={hoverAnimate} />
        <div className="hidden md:flex">
          <Logo className={hoverAnimate} />
        </div>
        <ContactNavbar height={height} className={hoverAnimate} />
        {!auth?.isAuth ? (
          <LoginNavbarSVG height={height} className={hoverAnimate} />
        ) : (
          <>
            <UserItemsControl />
          </>
        )}

        <div className="size-6" />

        {/* <div className="relative">
          <CartNavbarSVG height={35} className={hoverAnimate} />
          <div
            className="absolute top-0 -right-2.5 border p-1 border-slate-600 rounded-full size-4
              justify-center flex items-center text-moi_moc_green"
          >
            {cart?.length}
          </div>
        </div> */}

        <div className="relative">
          <CartNavbarSVG height={35} className={hoverAnimate} />

          <AnimatePresence>
            {cart && cart.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-moi_moc_green text-[10px] text-white font-bold"
              >
                {cart.length}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </>
    );
  };

  return (
    <div className="fixed top-0 z-50 h-14 w-full border mx-auto">
      <div
        className="flex items-center justify-between gap-x-4 bg-main_background_color px-4 md:px-6
          lg:px-20 py-2"
      >
        <div className="flex items-center gap-2 md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="size-8" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:w-[240px] md:w-[300px]">
              <nav className="flex flex-col items-start gap-4 mt-8">
                <NavContent />
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex md:hidden justify-center flex-1">
          <Logo className={hoverAnimate} />
        </div>

        <nav
          className="hidden md:flex md:items-center md:justify-between md:mx-auto md:gap-1 lg:gap-4
            w-full"
        >
          <NavContent />
        </nav>
      </div>
      <Separator className="bg-green-950" />
    </div>
  );
};
