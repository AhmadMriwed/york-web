"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { UserFormValidation } from "@/lib/validation";
import SubmitButton from "../buttons/SubmitButton";
import CustomFormField, { FormFieldType } from "../review/CustomFormField";
import { toast } from "sonner";
import { storePlanRegister } from "@/lib/action/root_action";
import { useLocale, useTranslations } from "next-intl";

const PlanRegisterForm = ({
  training_plan_id,
  onRegistrationSuccess,
}: {
  training_plan_id: number | null;
  onRegistrationSuccess: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("TrainingPlan");

  const toastMessages = useTranslations("Toast");

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  const onSubmit = async ({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);
    try {
      const userData = {
        training_plan_id: training_plan_id,
        full_name: name,
        phone,
        email,
      };
      await storePlanRegister(userData);

      toast.success(toastMessages("planRegisterForm.success"));
      form.reset();
      onRegistrationSuccess();
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
          label={t("Form.full_name_label")}
          placeholder={t("Form.full_name_placeholder")}
          iconSrc="/icons/user.svg"
          iconAlt="user"
          required={true}
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label={t("Form.email_label")}
          placeholder={t("Form.email_placeholder")}
          iconSrc="/icons/mail.svg"
          iconAlt="email"
          required={true}
        />
        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label={t("Form.phone_lable")}
          placeholder="+963 999 999 999"
          required={true}
        />
        <SubmitButton isLoading={isLoading}>{t("register")}</SubmitButton>
      </form>
    </Form>
  );
};

export default PlanRegisterForm;
