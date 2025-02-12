"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import SubmitButton from "../buttons/SubmitButton";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { toast } from "sonner";
import { CertificateFormValidation } from "@/lib/validation";
import { CertificateReview } from "@/lib/action/root_action";

const CertificateForm = () => {
  const [isLoading, setIsLoading] = useState(false);

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
        className="space-y-6 flex-1 text-white"
      >
        <h2 className="text-gray-300 text-center text-base">
          The certificate is not found. It may have been issued by a
          non-official entity. Please consult the academy to verify the
          certificate.
        </h2>
        <div className="grid md:grid-cols-2 gap-3">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="first_name"
            placeholder="First Name"
            iconSrc="/icons/user.svg"
            iconAlt="user"
            required
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="last_name"
            placeholder="Last Name"
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
            placeholder="Email"
            iconSrc="/icons/mail.svg"
            iconAlt="email"
            required
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="certificate_code"
            placeholder="Certificate Code"
            iconSrc="/icons/code.svg"
            iconAlt="code"
            required
          />
        </div>
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="message"
          placeholder="Your message here..."
          required
        />
        <SubmitButton isLoading={isLoading}>Send</SubmitButton>
      </form>
    </Form>
  );
};

export default CertificateForm;
