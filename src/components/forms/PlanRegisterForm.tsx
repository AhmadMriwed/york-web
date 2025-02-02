"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { UserFormValidation } from "@/lib/validation";
import SubmitButton from "../buttons/SubmitButton";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { toast } from "sonner";
import { storePlanRegister } from "@/lib/action/root_action";

const PlanRegisterForm = ({
  training_plan_id,
  onRegistrationSuccess,
}: {
  training_plan_id: number | null;
  onRegistrationSuccess: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);

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

      toast.success("Registration successful");
      form.reset();
      onRegistrationSuccess();
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
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
          label="Full name"
          placeholder="John Doe"
          iconSrc="/icons/user.svg"
          iconAlt="user"
          required={true}
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="John@gmail.com"
          iconSrc="/icons/mail.svg"
          iconAlt="email"
          required={true}
        />
        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone Number"
          placeholder="+963 999 999 999"
          required={true}
        />
        <SubmitButton isLoading={isLoading}>Register</SubmitButton>
      </form>
    </Form>
  );
};

export default PlanRegisterForm;
