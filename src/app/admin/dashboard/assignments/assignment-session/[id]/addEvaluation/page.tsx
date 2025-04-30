"use client";
import React, { useState } from "react";

import { useParams, useRouter } from "next/navigation";
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

  type FormValues = z.infer<typeof addEvaluationValidationSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(addEvaluationValidationSchema),
    defaultValues: {
      title: "",
      sub_title: "",
      status: "",
      number_of_questions: undefined,
      duration_in_minutes: undefined,
      evaluation_type_id: undefined,
      exam_section_id: id ? Number(id) : undefined,
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const submissionData = {
        ...values,
        number_of_questions: Number(values.number_of_questions),
        duration_in_minutes: Number(values.duration_in_minutes),
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
                {/* Number of Questions */}
                <FormField
                  control={form.control}
                  name="number_of_questions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Questions :</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className="flex rounded-md border border-dark-500 bg-gray-100 dark:bg-gray-700 focus-within:border ring-primary-color1 focus:ring-1  focus:outline-none focus-within:border-primary-color1"
                          placeholder="Enter number of questions.."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Duration in Minutes */}

                <FormField
                  control={form.control}
                  name="duration_in_minutes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration in Minutes :</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                          className="flex rounded-md border border-dark-500 bg-gray-100 dark:bg-gray-700 focus-within:border ring-primary-color1 focus:ring-1  focus:outline-none focus-within:border-primary-color1"
                          placeholder="Enter number of minutes.."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="evaluation_type_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Evaluation Type : </FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value?.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="flex rounded-md border border-dark-500 bg-gray-100 dark:bg-gray-700 focus-within:border ring-primary-color1 focus:ring-1  focus:outline-none focus-within:border-primary-color1">
                            <SelectValue placeholder="Select exam type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {evaluationTypes?.map((type: Type) => (
                            <SelectItem
                              key={type.id}
                              value={type.id.toString()}
                            >
                              {type.type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status : </FormLabel>
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
