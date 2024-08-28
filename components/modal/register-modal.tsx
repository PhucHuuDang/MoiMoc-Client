"use client";

import { isValidPhone } from "@/regex-validation/phone-number";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchemaTypes, RegisterSchemaTypes } from "@/safe-types-zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components//ui/form";

import { Input } from "../ui/input";
import { FormSubmit } from "../_global-components-reused/form/form-submit";
import { DialogModal } from "../_global-components-reused/form/dialog-modal";
import { useLoginDiaLogModal } from "@/hooks/login-dialog-modal";
import { Header } from "../_global-components-reused/header";
import Image from "next/image";
import { FormItemsControl } from "../_global-components-reused/form/form-items-control";
import { DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";
import { FormPassword } from "../_global-components-reused/form/form-password";
import { FormValues } from "../_global-components-reused/form/form-values";
import { useRegisterDiaLogModal } from "@/hooks/register-dialog-modal";

export const RegisterModal = () => {
  const loginModal = useLoginDiaLogModal();
  const registerModal = useRegisterDiaLogModal();

  const toggle = () => {
    registerModal.onClose();
    loginModal.onOpen();
  };

  const form = useForm<z.infer<typeof RegisterSchemaTypes>>({
    resolver: zodResolver(RegisterSchemaTypes),
    defaultValues: {
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  // console.log(form.watch());

  const onSubmit = async (values: z.infer<typeof RegisterSchemaTypes>) => {
    // console.log({ values });
    // console.log("123");
    // console.log({ values });
    registerModal.onClose();
  };

  const header = (
    <>
      <Image
        alt="Moi Moc"
        src="/images/moimoc-logo-text.png"
        width={120}
        height={120}
        className="mx-auto"
      />
      <Header
        title="Register"
        classNameTitle="text-xl"
        description="Let's register account in Moi Moc..."
      />
    </>
  );

  const body = (
    <FormValues onSubmit={onSubmit} form={form}>
      <FormItemsControl
        form={form}
        name="phone"
        placeholder="*84..."
        label="Phone"
      />

      <FormPassword
        form={form}
        name="password"
        placeholder="your password"
        label="Password"
      />

      <FormPassword
        form={form}
        name="confirmPassword"
        placeholder="confirm your password"
        label="Confirm password"
      />

      <div className="flex items-center justify-end gap-x-2">
        <DialogClose asChild>
          <Button className="w-24" variant="outline">
            Cancel
          </Button>
        </DialogClose>
        <FormSubmit className="w-24 text-end" variant="moiMoc">
          Submit
        </FormSubmit>
      </div>
    </FormValues>
  );

  const footer = (
    <div className="flex items-center gap-x-1 text-moi_moc_green underline">
      Already have account?{" "}
      <span
        onClick={toggle}
        className="cursor-pointer font-bold transition duration-200 hover:scale-110"
      >
        Let's login!
      </span>
    </div>
  );

  return (
    <DialogModal
      body={body}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      header={header}
      footer={footer}
    />
  );
};
