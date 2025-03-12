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
  const locale = useLocale();
  const t = useTranslations("Certificates");

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

      toast.success("Message sent successfully!");
      form.reset();
    } catch (error: any) {
      console.error("Submission failed:", error);
      toast.error(error.message || "Failed to send message. Please try again.");
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
            lang={locale}
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="last_name"
            placeholder={t("Form.lastname")}
            iconSrc="/icons/user.svg"
            iconAlt="user"
            required
            lang={locale}
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
            lang={locale}
          />
          <CustomFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            placeholder="Phone Number"
            required
            lang={locale}
          />
        </div>

        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="message"
          placeholder={t("Form.message")}
          required
          lang={locale}
        />

        <SubmitButton isLoading={isLoading}>{t("Form.send")}</SubmitButton>
      </form>
    </Form>
  );
};

export default ContactUsForm;
