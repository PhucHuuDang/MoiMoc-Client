import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    // bg-[#FFF6E5]
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-main_background_color
        text-[#4A4A4A] p-4"
    >
      <div className="relative w-full max-w-xl text-center">
        <div className="text-[200px] font-bold leading-none opacity-20">
          404
        </div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-40 h-40 bg-[#FFD485] rounded-full flex items-center justify-center">
            <svg
              className="w-40 h-40"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Shopping bag body */}
              <path
                d="M60 80H140V160C140 171.046 131.046 180 120 180H80C68.9543 180 60 171.046 60 160V80Z"
                fill="#3F3F3F"
              />
              {/* Bag handles */}
              <path
                d="M70 80C70 57.9086 87.9086 40 110 40V40C132.091 40 150 57.9086 150 80"
                stroke="#3F3F3F"
                strokeWidth="12"
                strokeLinecap="round"
              />
              {/* Magnifying glass */}
              <circle
                cx="135"
                cy="115"
                r="20"
                stroke="#FFD485"
                strokeWidth="6"
              />
              <line
                x1="150"
                y1="130"
                x2="170"
                y2="150"
                stroke="#FFD485"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Red X in magnifying glass */}
              <path
                d="M125 105L145 125M145 105L125 125"
                stroke="#FF5A5A"
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Question mark */}
              <path
                d="M90 100C90 94.4772 94.4772 90 100 90C105.523 90 110 94.4772 110 100C110 103.114 108.37 105.884 105.888 107.5C103.227 109.239 101 112.193 101 115.5V120"
                stroke="#FFD485"
                strokeWidth="8"
                strokeLinecap="round"
              />
              <circle cx="101" cy="135" r="4" fill="#FFD485" />
            </svg>
          </div>
        </div>
      </div>
      <h1 className="text-4xl font-bold mt-8 mb-4">Không tìm thấy sản phẩm</h1>
      <span className="text-xl mb-8 max-w-md text-center">
        Chúng tôi đã tìm kiếm từ cao đến thấp nhưng không thể tìm thấy sản phẩm
        bạn đang tìm kiếm. Nó có thể không còn có sẵn.
      </span>
      <Button asChild className="bg-[#FF7A5A] hover:bg-[#FF5A3A] text-white">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
