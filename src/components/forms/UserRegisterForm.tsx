"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { UserFormValidation } from "@/lib/validation";
// import { createUser } from "@/lib/actions/patient.actions";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../buttons/SubmitButton";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const UserRregisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
    // try {
    //   const userData = { name, email, phone };
    // //   const user = await createUser(userData);
    //   console.log(user);
    //   if (user) {
    //     router.push(`/patients/${user.$id}/register`);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }
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

export default UserRregisterForm;
