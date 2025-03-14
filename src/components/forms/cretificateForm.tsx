"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import SubmitButton from "../buttons/SubmitButton";
import CustomFormField, { FormFieldType } from "../review/CustomFormField";
import { toast } from "sonner";
import { CertificateFormValidation } from "@/lib/validation";
import { CertificateReview } from "@/lib/action/root_action";
import { useLocale, useTranslations } from "next-intl";

const CertificateForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("Certificates");
  const toastMessages = useTranslations("Toast");

  const locale = useLocale();

  const form = useForm<z.infer<typeof CertificateFormValidation>>({
    resolver: zodResolver(CertificateFormValidation),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      certificate_code: "",
      message: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof CertificateFormValidation>
  ) => {
    try {
      await CertificateReview(values);
      toast.success(toastMessages("certificateForm.success"));
      form.reset();
    } catch (error: any) {
      toast.error(toastMessages("certificateForm.error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 flex-1 text-white"
      >
        <h2 className="text-gray-300 text-center text-base">
          {t("notFound.title")}
        </h2>
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
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="certificate_code"
            placeholder={t("Form.code")}
            iconSrc="/icons/code.svg"
            iconAlt="code"
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

export default CertificateForm;
