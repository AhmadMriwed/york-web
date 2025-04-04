"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomFormField, { FormFieldType } from "../review/CustomFormField";
import SubmitButton from "../buttons/SubmitButton";
import Image from "next/image";

// Define Zod schema for form validation
const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  question: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export function NewConversationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      question: "",
    },
  });

  // Define submit handler
  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      console.log("Form Data:", data);
      // Simulate form submission
      setTimeout(() => {
        setIsLoading(false);
        alert("Form submitted successfully!");
      }, 1000);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 bg-gray-100 p-6 rounded-lg relative -top-8 h-fit"
      >
        {/* Name Field */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          placeholder="Name"
          iconSrc="/icons/user.svg"
          iconAlt="user"
          required={true}
        />

        {/* Email Field */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          placeholder="Email"
          iconSrc="/icons/mail.svg"
          iconAlt="email"
        />
        {/* Phone Field */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="phone"
          placeholder="Phone"
          iconSrc="/icons/phone.svg"
          iconAlt="email"
        />
        {/* Question Field */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="question"
          placeholder="Question"
          iconSrc="/icons/question.svg"
          iconAlt="question"
          required={true}
        />

        {/* Submit Button */}
        <SubmitButton isLoading={isLoading}>
          <Image src={"/icons/send.svg"} height={22} width={22} alt="send" />
          <p>Start Chat</p>
        </SubmitButton>
      </form>
    </Form>
  );
}

export default NewConversationForm;
