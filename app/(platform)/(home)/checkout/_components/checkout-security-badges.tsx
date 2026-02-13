"use client";

import { Shield, Lock, Headphones, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckoutSecurityBadgesProps {
  className?: string;
}

const badges = [
  {
    icon: Lock,
    title: "Thanh toán an toàn",
    description: "Mã hóa SSL 256-bit bảo vệ mọi giao dịch",
  },
  {
    icon: Shield,
    title: "Bảo mật thông tin",
    description: "Tuân thủ tiêu chuẩn PCI DSS quốc tế",
  },
  {
    icon: RotateCcw,
    title: "Đổi trả dễ dàng",
    description: "Hoàn trả miễn phí trong vòng 7 ngày",
  },
  {
    icon: Headphones,
    title: "Hỗ trợ 24/7",
    description: "Đội ngũ luôn sẵn sàng hỗ trợ bạn",
  },
];

const paymentChips = [
  { label: "COD", sublabel: "Tiền mặt" },
  { label: "PayOS", sublabel: "Ví điện tử" },
  { label: "Stripe", sublabel: "Quốc tế" },
  { label: "Visa / Mastercard", sublabel: "Thẻ tín dụng" },
];

export const CheckoutSecurityBadges = ({
  className,
}: CheckoutSecurityBadgesProps) => {
  return (
    <div
      className={cn("w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", className)}
    >
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-moi_moc_green/5 rounded-full border border-moi_moc_green/15 mb-3">
          <Shield className="w-4 h-4 text-moi_moc_green" aria-hidden="true" />
          <span className="text-xs font-semibold text-moi_moc_green uppercase tracking-wider">
            An toàn & Bảo mật
          </span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">
          Chúng tôi bảo vệ bạn
        </h2>
        <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">
          Mọi giao dịch đều được mã hóa và bảo mật theo tiêu chuẩn quốc tế
        </p>
      </div>

      {/* Security Badges Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {badges.map((badge, index) => {
          const Icon = badge.icon;
          return (
            <div
              key={index}
              className="group flex flex-col items-center text-center p-5 rounded-3xl bg-white border border-gray-100 hover:border-moi_moc_green/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="w-12 h-12 rounded-xl bg-moi_moc_green/10 flex items-center justify-center mb-3 group-hover:bg-moi_moc_green/15 group-hover:scale-105 transition-all duration-300">
                <Icon
                  className="w-6 h-6 text-moi_moc_green"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">
                {badge.title}
              </h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                {badge.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Payment Methods */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <p className="text-xs font-medium text-gray-400 text-center mb-4 uppercase tracking-wider">
          Phương thức thanh toán được hỗ trợ
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {paymentChips.map((chip, index) => (
            <div
              key={index}
              className="flex flex-col items-center px-5 py-2.5 bg-white rounded-3xl border border-gray-100 hover:border-moi_moc_green/20 transition-all duration-200 hover:shadow-sm"
            >
              <span className="text-sm font-semibold text-gray-800">
                {chip.label}
              </span>
              <span className="text-[10px] text-gray-400 mt-0.5">
                {chip.sublabel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
