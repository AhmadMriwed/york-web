"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import SubmitButton from "../buttons/SubmitButton";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { toast } from "sonner";
import { CretificateFormValidation } from "@/lib/validation";

const CretificateForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof CretificateFormValidation>>({
    resolver: zodResolver(CretificateFormValidation),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      code: "",
      message: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof CretificateFormValidation>
  ) => {
    setIsLoading(true);
    try {
      const userData = {
        first_name: values.first_name,
        last_name: values.last_name,
        code: values.code,
        email: values.email,
        message: values.message,
      };

      form.reset();
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
        <h2 className=" text-gray-300 textba text-center text-base">
          The cretificate is not found , it may have been issued by a
          non-official entity.please consult the academy to verify the
          certificate .{" "}
        </h2>
        <div className="grid md:grid-cols-2 gap-3 ">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="first_name"
            placeholder="First Name"
            iconSrc="/icons/user.svg"
            iconAlt="user"
            required={true}
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="last_name"
            placeholder="Last Name"
            iconSrc="/icons/user.svg"
            iconAlt="user"
            required={true}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-3 ">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            placeholder="Email"
            iconSrc="/icons/mail.svg"
            iconAlt="email"
            required={true}
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="code"
            placeholder="Cretificate Code "
            iconSrc="/icons/code.svg"
            iconAlt="code"
          />
        </div>
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="message"
          placeholder="Your message here..."
          required={true}
        />
        <SubmitButton isLoading={isLoading}>send</SubmitButton>
      </form>
    </Form>
  );
};

export default CretificateForm;
