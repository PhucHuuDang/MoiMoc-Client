"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface CheckoutProgressProps {
  currentStep?: number;
  className?: string;
}

const steps = [
  { id: 1, name: "Thông tin", description: "Địa chỉ giao hàng" },
  { id: 2, name: "Vận chuyển", description: "Phương thức giao hàng" },
  { id: 3, name: "Thanh toán", description: "Phương thức thanh toán" },
  { id: 4, name: "Xác nhận", description: "Kiểm tra đơn hàng" },
];

export const CheckoutProgress = ({
  currentStep = 1,
  className,
}: CheckoutProgressProps) => {
  return (
    <nav
      aria-label="Tiến trình thanh toán"
      className={cn("w-full max-w-4xl mx-auto px-4", className)}
    >
      {/* Desktop Progress Bar */}
      <div className="hidden md:block bg-white/80 backdrop-blur-sm hover:shadow-md transition duration-300 rounded-3xl border border-moi_moc_green/15 shadow-sm p-6">
        <div className="flex items-start">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            const isUpcoming = currentStep < step.id;

            return (
              <div
                key={step.id}
                className="flex-1 flex flex-col items-center relative"
                aria-current={isCurrent ? "step" : undefined}
              >
                {/* Circle + Connector Row */}
                <div className="flex items-center w-full">
                  {/* Left spacer for first item */}
                  {index === 0 && <div className="flex-1" />}

                  {/* Connector before */}
                  {index > 0 && (
                    <div
                      className={cn(
                        "flex-1 h-0.5 transition-all duration-500",
                        isCompleted || isCurrent
                          ? "bg-moi_moc_green"
                          : "bg-gray-200",
                      )}
                      aria-hidden="true"
                    />
                  )}

                  {/* Step Circle */}
                  <div
                    className={cn(
                      "relative z-10 flex items-center justify-center w-11 h-11 rounded-full border-2 transition-all duration-300 shrink-0",
                      isCompleted &&
                        "bg-moi_moc_green border-moi_moc_green text-white",
                      isCurrent &&
                        "border-moi_moc_green text-moi_moc_green bg-white shadow-[0_0_0_4px_rgba(0,60,20,0.1)] scale-110",
                      isUpcoming && "border-gray-200 text-gray-400 bg-white",
                    )}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" aria-hidden="true" />
                    ) : (
                      <span className="text-sm font-bold">{step.id}</span>
                    )}
                  </div>

                  {/* Connector after */}
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "flex-1 h-0.5 transition-all duration-500",
                        isCompleted ? "bg-moi_moc_green" : "bg-gray-200",
                      )}
                      aria-hidden="true"
                    />
                  )}

                  {/* Right spacer for last item */}
                  {index === steps.length - 1 && <div className="flex-1" />}
                </div>

                {/* Step Label - in normal flow, centered under circle */}
                <div className="mt-3 text-center">
                  <p
                    className={cn(
                      "text-sm font-semibold transition-colors duration-300",
                      isCompleted || isCurrent
                        ? "text-moi_moc_green"
                        : "text-gray-400",
                    )}
                  >
                    {step.name}
                  </p>
                  <p
                    className={cn(
                      "text-xs mt-0.5 transition-colors duration-300",
                      isCurrent ? "text-moi_moc_green/70" : "text-gray-400",
                    )}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Progress Bar */}
      <div className="md:hidden bg-white/80 backdrop-blur-sm rounded-xl border border-moi_moc_green/15 shadow-sm p-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-moi_moc_green">
            Bước {currentStep} / {steps.length}
          </p>
          <p className="text-sm font-medium text-gray-700">
            {steps[currentStep - 1]?.name}
          </p>
        </div>

        {/* Step Dots + Progress Bar */}
        <div className="relative">
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-moi_moc_green h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
              role="progressbar"
              aria-valuenow={currentStep}
              aria-valuemin={1}
              aria-valuemax={steps.length}
              aria-label={`Tiến trình: ${currentStep} trong ${steps.length} bước`}
            />
          </div>

          {/* Step Dots */}
          <div className="flex justify-between mt-2">
            {steps.map((step) => {
              const isCompleted = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      isCompleted && "bg-moi_moc_green",
                      isCurrent &&
                        "bg-moi_moc_green ring-2 ring-moi_moc_green/30 ring-offset-1",
                      !isCompleted && !isCurrent && "bg-gray-200",
                    )}
                  />
                  <span
                    className={cn(
                      "text-[10px] mt-1 font-medium",
                      isCompleted || isCurrent
                        ? "text-moi_moc_green"
                        : "text-gray-400",
                    )}
                  >
                    {step.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
