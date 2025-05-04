"use client";
import React, { useState } from "react";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField, {
  FormFieldType,
} from "@/components/review/CustomFormField";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "@/components/headers/header";
import { Type } from "@/types/adminTypes/assignments/assignmentsTypes";
import {
  createEvaluation,
  fetchEvaluationTypes,
  fetchExamTypes,
} from "@/lib/action/assignment_action";
import { Input } from "@/components/ui/input";
import { useFetch } from "@/hooks/useFetch";
import { addEvaluationValidationSchema } from "@/lib/admin/evaluationValidation";
import { images } from "@/constants/images";
import { Loader2 } from "lucide-react";

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  const { data: evaluationTypes, isLoading: typeLoading } =
    useFetch<Type[]>(fetchEvaluationTypes);

  const searchParams = useSearchParams();

  const evaluation_type_id = searchParams.get("evaluation_type_id");

  type FormValues = z.infer<typeof addEvaluationValidationSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(addEvaluationValidationSchema),
    defaultValues: {
      title: "",
      sub_title: "",
      status: "",
      evaluation_type_id: Number(evaluation_type_id),
      exam_section_id: id ? Number(id) : undefined,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const submissionData = {
        ...values,
      };

      const response = await createEvaluation(submissionData);
      const evaluationId = response.data.id;
      router.push(
        `/admin/dashboard/assignments/assignment-session/${id}/evaluations/${evaluationId}/updateEvaluation`
      );
    } catch (error) {
      console.error("Failed to create evaluation:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto p-4 sm:p-6 max-w-7xl">
      <Header title="Create New Evaluation" />
      <div className="p-4 py-8 rounded-lg dark:bg-[#212A34] bg-white shadow-sm flex flex-col md:flex-row">
        <div className="w-full block  text-center my-2 md:hidden">
          <h1 className="text-2xl font-extrabold text-primary-color1 relative z-10 px-8 py-4">
            <span className="relative">
              {evaluationTypes?.[Number(evaluation_type_id) - 1]?.type}
              <span className="absolute bottom-0 left-0 w-full h-2 bg-primary-color2/30 -z-10 transform translate-y-1"></span>
            </span>
          </h1>
        </div>
        <Image
          src={images.evaluation}
          width={400}
          height={400}
          className="h-96 w-96 mx-auto"
          alt="assignment illustration"
          priority
        />
        <div className="flex-1 mx-2 md:mx-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="w-full hidden  text-center my-2 md:block">
                <h1 className="text-2xl font-extrabold text-primary-color1 relative z-10 px-8 py-4">
                  <span className="relative">
                    {evaluationTypes?.[Number(evaluation_type_id) - 1]?.type}
                    <span className="absolute bottom-0 left-0 w-full h-2 bg-primary-color2/30 -z-10 transform translate-y-1"></span>
                  </span>
                </h1>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                {/* Title */}
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  label="Title :"
                  name="title"
                  placeholder="Enter a title .. "
                  required
                />
                {/* Subtitle */}
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  label="SubTitle :"
                  name="sub_title"
                  placeholder="Enter a subtitle .. "
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                {/* Duration in Minutes */}

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <p className={"w-full gap-2 flex"}>
                        <FormLabel className="text-gray-700 dark:text-white">
                          Status :
                        </FormLabel>
                        <span className="text-red-400 text-2xl -mt-2 ">*</span>
                      </p>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="flex rounded-md border border-dark-500 bg-gray-100 dark:bg-gray-700 focus-within:border ring-primary-color1 focus:ring-1  focus:outline-none focus-within:border-primary-color1">
                            <SelectValue placeholder="Select Evaluation status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={"Active"}>Active</SelectItem>
                          <SelectItem value={"Inactive"}>InActive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary-color1 hover:bg-primary-color2 text-white"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Page;
