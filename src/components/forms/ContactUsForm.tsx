"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { ContactUsFormValidation } from "@/lib/validation";
import SubmitButton from "../buttons/SubmitButton";
import CustomFormField, { FormFieldType } from "../review/CustomFormField";
import { toast } from "sonner";
import { contact_us } from "@/lib/action/root_action";
import { useLocale, useTranslations } from "next-intl";

const ContactUsForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const t = useTranslations("Certificates");
  const toastMessages = useTranslations("Toast");

  const form = useForm<z.infer<typeof ContactUsFormValidation>>({
    resolver: zodResolver(ContactUsFormValidation),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ContactUsFormValidation>) => {
    setIsLoading(true);
    try {
      await contact_us(values);

      toast.success(toastMessages("contactUsForm.success"));
      form.reset();
    } catch (error: any) {
      toast.error(toastMessages("contactUsForm.error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex-1 w-full p-2 text-white"
      >
        <div className="grid md:grid-cols-2 gap-3">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="first_name"
            placeholder={t("Form.firstname")}
            iconSrc="/icons/user.svg"
            iconAlt="user"
            required
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="last_name"
            placeholder={t("Form.lastname")}
            iconSrc="/icons/user.svg"
            iconAlt="user"
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            placeholder={t("Form.email")}
            iconSrc="/icons/mail.svg"
            iconAlt="email"
            required
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            placeholder="Phone Number"
            required
          />
        </div>

        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="message"
          placeholder={t("Form.message")}
          required
        />

        <SubmitButton isLoading={isLoading}>{t("Form.send")}</SubmitButton>
      </form>
    </Form>
  );
};

export default ContactUsForm;
