"use client";

import Link from "next/link";
import { Logo } from "./logo";
import { useForm } from "react-hook-form";
import { RegisterGetDiscountSchemaTypes } from "@/safe-types-zod/register-get-discount";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormValues } from "./form/form-values";
import { FormItemsControl } from "./form/form-items-control";
import { Facebook, Instagram } from "lucide-react";

const SupportLinks = [
  {
    label: "Chính sách vận chuyển",
    // link: "/shipping-policy"
    link: "/",
  },

  {
    label: "Chính sách đổi trả",
    // link: "/return-policy"
    link: "/",
  },

  {
    label: "Chính sách bảo mật",
    // link: "/privacy-policy"
    link: "/",
  },

  {
    label: "Chính sách thanh toán",
    // link: "/payment-policy"
    link: "/",
  },

  {
    label: "Chính sách bảo hành",
    // link: "/warranty-policy"
    link: "/",
  },
];

const ContactLinks = [
  {
    label: "Email",
    info: "danghuuphuc001@gmail.com ",
  },
  {
    label: "Phone number",
    info: "+84 123 456 789",
  },
];

export const Footer = () => {
  const form = useForm<z.infer<typeof RegisterGetDiscountSchemaTypes>>({
    resolver: zodResolver(RegisterGetDiscountSchemaTypes),
    defaultValues: {
      registerEmail: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterGetDiscountSchemaTypes>) => {
    console.log({ values });
  };

  const hoverAnimate =
    "hover:scale-110 transition duration-200  p-0.5 rounded-lg";

  return (
    <div className="">
      <div className="item-center my-8 flex justify-center">
        <Logo width={401} height={100} className={hoverAnimate} />
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 px-10 md:grid-cols-3 2xl:px-20">
        <div className="flex flex-col items-start">
          <h1 className="text-lg font-semibold text-moi_moc_green">
            Support for customers
          </h1>
          {SupportLinks.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.link}
                className={`text-center text-moi_moc_green ${hoverAnimate}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex flex-col gap-y-1">
          <FormValues onSubmit={onSubmit} form={form}>
            <FormItemsControl
              form={form}
              name="registerEmail"
              placeholder="Input your email"
              label="Register to get discount!"
              classNameLabel="text-xl font-semibold text-moi_moc_green"
            />
          </FormValues>

          <div className="flex items-center gap-x-1">
            <h1 className="text-lg font-semibold text-moi_moc_green">
              Follow us:
            </h1>
            <div className="flex items-center justify-center gap-x-2">
              <Facebook
                className={`size-8 cursor-pointer text-moi_moc_green ${hoverAnimate}`}
              />

              <Instagram
                className={`size-8 cursor-pointer text-moi_moc_green ${hoverAnimate}`}
              />
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-lg font-semibold text-moi_moc_green">
            Contact us
          </h1>

          {ContactLinks.map((contact, index) => {
            return (
              <div className="text-moi_moc_green" key={contact.label}>
                <span className="tex-lg font-semibold">{contact.label}</span>
                <span>{contact.info}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
