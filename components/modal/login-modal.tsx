"use client";

import { isValidPhone } from "@/regex-validation/phone-number";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchemaTypes } from "@/safe-types-zod";
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
import { useRegisterDiaLogModal } from "@/hooks/register-dialog-modal";
import { FormValues } from "../_global-components-reused/form/form-values";

export const LoginModal = () => {
  const loginModal = useLoginDiaLogModal();
  const registerModal = useRegisterDiaLogModal();

  const toggle = () => {
    loginModal.onClose();
    registerModal.onOpen();
  };

  const form = useForm<z.infer<typeof LoginSchemaTypes>>({
    resolver: zodResolver(LoginSchemaTypes),
    defaultValues: {
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginSchemaTypes>) => {
    // console.log({ values });
    console.log("123");
    console.log({ values });
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
        title="Login"
        classNameTitle="text-xl"
        description="Welcome back to Moi Moc..."
      />
    </>
  );

  const body = (
    <FormValues form={form} onSubmit={onSubmit}>
      {/* <Form {...form}> */}
      {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5"> */}
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
      {/* </form> */}
      {/* </Form> */}
    </FormValues>
  );

  const footer = (
    <div className="flex items-center gap-x-1 text-moi_moc_green underline">
      You don't have account?{" "}
      <span
        onClick={toggle}
        className="cursor-pointer font-bold transition duration-200 hover:scale-110"
      >
        Let's register!
      </span>
    </div>
  );

  return (
    <DialogModal
      body={body}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      header={header}
      footer={footer}
    />
  );
};
