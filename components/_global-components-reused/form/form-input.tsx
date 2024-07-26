"use client";

import { ElementType, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { IconType } from "react-icons";
import { Eye, EyeOff } from "lucide-react";
import { ControllerRenderProps } from "react-hook-form";

interface FormInputProps {
  type?: string;
  disabled?: boolean;
  placeholder?: string;
  id: string;
  required?: boolean;
  className?: string;
  icon?: IconType;
  error?: Record<string, string[]> | undefined;
  searchIcon?: React.ReactNode;
  defaultValue?: string;
  label?: string;
  labelClassName?: string;
  iconClassName?: string;
  typeInputPassword?: string;
  onToggle?: (e: React.MouseEvent<SVGElement>) => void;
  field?: ControllerRenderProps<any, any>;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      type,
      disabled,
      placeholder,
      id,
      required,
      className,
      searchIcon,
      error,
      icon: Icon,
      defaultValue = "",
      label,
      labelClassName,
      iconClassName,
      typeInputPassword,
      onToggle,
      field,
    },
    ref,
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? (
            <Label
              className={cn(
                "text-lg font-semibold text-neutral-200",
                labelClassName,
              )}
              htmlFor={id}
            >
              {label}
            </Label>
          ) : null}
          {Icon ? (
            <div className="relative">
              <div
                className={cn(
                  "absolute inset-y-0 left-0 flex items-center pl-2",
                  iconClassName,
                )}
              >
                <Icon />
              </div>
              <Input
                ref={ref}
                type={type}
                required={required}
                disabled={disabled || pending}
                placeholder={placeholder}
                id={id}
                name={id}
                defaultValue={defaultValue}
                className={cn("h-7 w-full py-1 pl-8 text-sm", className)}
                aria-describedby={`${id}-error`}
                style={{ paddingLeft: <Icon /> ? "2.5rem" : "1rem" }}
              />
            </div>
          ) : searchIcon ? (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                {searchIcon}
              </div>
              <Input
                ref={ref}
                type={type}
                required={required}
                disabled={disabled || pending}
                placeholder={placeholder}
                id={id}
                name={id}
                defaultValue={defaultValue}
                className={cn("h-7 w-full py-1 pl-8 text-sm", className)}
                aria-describedby={`${id}-error`}
                style={{ paddingLeft: searchIcon ? "3rem" : "1rem" }}
              />
            </div>
          ) : typeInputPassword ? (
            <div className="relative">
              <div
                className={cn(
                  "absolute inset-y-0 right-0 flex cursor-pointer items-center pr-4",
                  iconClassName,
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("first");
                }}
              >
                {typeInputPassword === "password" ? (
                  <EyeOff
                    className="size-6 cursor-pointer"
                    // onClick={(e) => {
                    //   e.stopPropagation();
                    //   onToggle?.();
                    // }}
                    onClick={(e) => onToggle?.(e)}
                  />
                ) : (
                  <Eye
                    className="size-6 cursor-pointer"
                    onClick={(e) => onToggle?.(e)}
                  />
                )}
              </div>
              <Input
                ref={ref}
                type={typeInputPassword}
                required={required}
                disabled={disabled || pending}
                placeholder={placeholder}
                {...field}
                id={id}
                name={id}
                defaultValue={defaultValue}
                className={cn("h-7 w-full py-1 text-sm", className)}
                aria-describedby={`${id}-error`}
                // style={{ paddingLeft: "2.5rem" }}
                // style={{ paddingLeft: <Icon /> ? "2.5rem" : "1rem" }}
              />
            </div>
          ) : (
            <Input
              ref={ref}
              type={type}
              required={required}
              disabled={disabled || pending}
              placeholder={placeholder}
              id={id}
              name={id}
              defaultValue={defaultValue}
              className={cn("h-7 w-full py-1 pl-4 text-sm", className)}
              aria-describedby={`${id}-error`}
            />
          )}
        </div>
      </div>
    );
  },
);

FormInput.displayName = "FormInput";
