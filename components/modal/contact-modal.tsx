"use client";

import { isValidPhone } from "@/regex-validation/phone-number";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactSchemaTypes, RegisterSchemaTypes } from "@/safe-types-zod";
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
import { useContactDialogModal } from "@/hooks/use-contact-dialog-modal";
import { useFormStatus } from "react-dom";

export const ContactModal = () => {
  const { pending } = useFormStatus();
  const contactModal = useContactDialogModal();
  const form = useForm<z.infer<typeof ContactSchemaTypes>>({
    resolver: zodResolver(ContactSchemaTypes),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      askContent: "",
    },
  });

  // console.log(form.watch());

  const onSubmit = async (values: z.infer<typeof ContactSchemaTypes>) => {
    // console.log({ values });
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
        title="Contact to us now!"
        classNameTitle="text-xl"
        description="Let's ask or give us your ask question in Moi Moc..."
      />
    </>
  );

  const body = (
    <FormValues onSubmit={onSubmit} form={form}>
      <FormItemsControl
        form={form}
        name="name"
        placeholder="Your name..."
        label="Name"
      />

      <FormItemsControl
        form={form}
        name="phone"
        placeholder="+84..."
        label="Phone"
      />

      <FormItemsControl
        form={form}
        name="email"
        type="email"
        placeholder="your email"
        label="Email"
      />

      <FormItemsControl
        form={form}
        name="askContent"
        placeholder="give us your ask question"
        label="Ask content"
      />

      <div className="flex items-center justify-end gap-x-2">
        <DialogClose asChild>
          <Button className="w-24" variant="moiMoc">
            Call with us
          </Button>
        </DialogClose>
        <FormSubmit
          // disabled={pending}
          variant="moiMoc"
          className="w-24 text-end"
        >
          Send to us
        </FormSubmit>
      </div>
    </FormValues>
  );

  const footer = (
    <div className="flex items-center gap-x-1 text-moi_moc_green underline">
      <span>
        Our mission is to help you to solve your problem and improve the
        products,{" "}
        <span className="cursor-pointer font-bold transition duration-200 hover:scale-110">
          so don&apos;t hesitate to ask us!
        </span>
      </span>
    </div>
  );

  return (
    <DialogModal
      body={body}
      isOpen={contactModal.isOpen}
      onClose={contactModal.onClose}
      header={header}
      footer={footer}
    />
  );
};
