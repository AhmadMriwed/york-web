"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { SubscribeValidation, UserFormValidation } from "@/lib/validation";
import SubmitButton from "../buttons/SubmitButton";
import CustomFormField, { FormFieldType } from "../review/CustomFormField";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";
import { Subscribe } from "@/lib/action/root_action";
import { Button } from "../ui/button";

const SubscribeForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("TrainingPlan");

  const toastMessages = useTranslations("Toast");

  const form = useForm<z.infer<typeof SubscribeValidation>>({
    resolver: zodResolver(SubscribeValidation),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = async ({
    name,
    email,
  }: z.infer<typeof SubscribeValidation>) => {
    setIsLoading(true);
    try {
      console.log("hello");
      const userData = {
        name: name,
        email,
      };
      await Subscribe(userData);

      toast.success(toastMessages("planRegisterForm.success"));
      form.reset();
    } catch (error) {
      toast.error("planRegisterForm.error");
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
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          placeholder={t("Form.full_name_placeholder")}
          iconSrc="/icons/user.svg"
          iconAlt="user"
          required={true}
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          placeholder={t("Form.email_placeholder")}
          iconSrc="/icons/mail.svg"
          iconAlt="email"
          required={true}
        />
        <SubmitButton
          isLoading={isLoading}
          className="w-fit bg-primary-color1 text-white"
        >
          {t("register")}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default SubscribeForm;
