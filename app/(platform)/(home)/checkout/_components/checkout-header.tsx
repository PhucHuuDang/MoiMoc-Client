"use client";

import { Logo } from "@/components/_global-components-reused/logo";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export const CheckoutHeader = () => {
  return (
    <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
        <ol className="flex items-center gap-2 text-sm text-gray-600">
          <li>
            <Link
              href="/"
              className="flex items-center hover:text-moi_moc_green transition-colors duration-200"
              aria-label="Trang chủ"
            >
              <Home className="w-4 h-4" aria-hidden="true" />
              <span className="ml-1 hidden sm:inline">Trang chủ</span>
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </li>
          <li>
            <Link
              href="/products"
              className="hover:text-moi_moc_green transition-colors duration-200"
            >
              Sản phẩm
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </li>
          <li>
            <span
              className="text-moi_moc_green font-medium"
              aria-current="page"
            >
              Thanh toán
            </span>
          </li>
        </ol>
      </nav>

      {/* Main Header */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <Logo
          height={50}
          className="hoverAnimate w-auto h-12 sm:h-14 md:h-16"
        />

        <Separator
          className="hidden sm:block h-12 md:h-14 w-0.5 bg-green-950"
          orientation="vertical"
          aria-hidden="true"
        />

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-moi_moc_green text-center sm:text-left">
          Thanh toán
        </h1>
      </div>
    </header>
  );
};
