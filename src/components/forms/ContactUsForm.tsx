"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { ContactUsFormValidation, UserFormValidation } from "@/lib/validation";
import SubmitButton from "../buttons/SubmitButton";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { toast } from "sonner";

const ContactUsForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof ContactUsFormValidation>>({
    resolver: zodResolver(ContactUsFormValidation),
    defaultValues: {
      first_name: "",
      last_name : "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ContactUsFormValidation>) => {
    setIsLoading(true);
    try {
      const userData = {
        full_name: values.first_name,
        last_name:values.last_name,
        phone: values.phone,
        email: values.email,
        message: values.message,
      };
      
      // Assuming storePlanRegister is an async function that handles the registration
    //   await storePlanRegister(userData);

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
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          placeholder="Phone Number"
          required={true}
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

export default ContactUsForm;