"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { useForm, Control } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUploader from "@/components/upload/ImageUploader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Settings, XIcon } from "lucide-react";
import { MdAssignment, MdUpdate } from "react-icons/md";
import { FiPlay, FiFlag, FiPlus } from "react-icons/fi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { cn, formatDateForMySQL } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import Header from "@/components/headers/header";
import { updateExamValidationSchema } from "@/lib/admin/assignmentValidation";
import {
  Assignment,
  StartFormType,
  EndFormType,
  Type,
  Requirement,
  Condition,
} from "@/types/adminTypes/assignments/assignmentsTypes";
import { useFetch, useFetchWithId } from "@/hooks/useFetch";
import {
  fetchAssignmentById,
  fetchStartFormById,
  fetchExamCondations,
  fetchExamTypes,
  fetchEndFormById,
  fetchExamRequirementFields,
} from "@/lib/action/assignment_action";
import { toast } from "sonner";
import { Checkbox, Modal } from "antd";
import { icons } from "@/constants/icons";
import axios from "axios";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import StartInterfaceModal from "@/components/assignments/StartInterfaceModal";
import EndInterfaceModal from "@/components/assignments/EndInterfaceModal";

dayjs.extend(customParseFormat);

const UpdateAssignmentPage = () => {
  const [showStartingInterfaceModal, setShowStartingInterfaceModal] =
    useState<boolean>(false);

  const [showEndingInterfaceModal, setShowEndingInterfaceModal] =
    useState<boolean>(false);

  const [showAddStartingInterfaceModal, setShowAddStartingInterfaceModal] =
    useState<boolean>(false);

  const [showAddEndingInterfaceModal, setShowAddEndingInterfaceModal] =
    useState<boolean>(false);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { id, assignment_id } = useParams();

  const convertToHHMM = (time: string): string => {
    if (time.includes("Hour")) {
      const hours = parseInt(time.replace(/\D/g, ""), 10);
      return `${hours < 10 ? "0" + hours : hours}:00`;
    }
    if (time.includes("Minutes")) {
      const minutes = parseInt(time.replace(/\D/g, ""), 10);
      return `00:${minutes < 10 ? "0" + minutes : minutes}`;
    }
    return time;
  };

  const { data: examTypes, isLoading: typeLoading } =
    useFetch<Type[]>(fetchExamTypes);

  const { data: examCondations, isLoading: condationLoading } =
    useFetch<Condition[]>(fetchExamCondations);

  const { data: requirementsField, isLoading: requiredLoading } = useFetch<
    Requirement[]
  >(fetchExamRequirementFields);

  console.log(requirementsField);

  const {
    data: assignment,
    isLoading,
    error,
    refetch: refetchAssignment,
  } = useFetchWithId<Assignment>(fetchAssignmentById, Number(assignment_id));

  console.log(assignment);

  const startFormId =
    assignment?.start_forms?.length! > 0 ? assignment?.start_forms[0].id : null;
  const endFormId =
    assignment?.end_forms?.length! > 0 ? assignment?.end_forms[0].id : null;

  const {
    data: startForm,
    isLoading: startFormLoading,
    error: startFormError,
    refetch: refetchStartForm,
  } = useFetchWithId<StartFormType>(fetchStartFormById, endFormId!);

  const {
    data: endForm,
    isLoading: endFormLoading,
    error: endFormError,
    refetch: refetchEndForm,
  } = useFetchWithId<EndFormType>(fetchEndFormById, startFormId!);

  type FormValues = z.infer<typeof updateExamValidationSchema>;
  console.log(assignment);

  console.log(typeof assignment?.forms[0]?.id);

  const form = useForm<FormValues>({
    resolver: zodResolver(updateExamValidationSchema),
    defaultValues: {
      form_id: assignment?.forms[0]?.id,
      code: assignment?.code || "",
      title: assignment?.title || "",
      sub_title: assignment?.sub_title || "",
      status: assignment?.status || "",
      exam_type_id: assignment?.exam_type_id || undefined,
      duration_in_minutes: assignment?.duration_in_minutes || undefined,
      exam_section_id: Number(id),
      image: assignment?.image!,
      exam_config: assignment?.exam_config
        ? {
            condition_exams_id: assignment.exam_config.id?.toString() || "",
            date_view: assignment.exam_config.date_view || undefined,
            view_answer: assignment.exam_config.view_answer || "manually",
            view_results: assignment.exam_config.view_results || "",
            count_return_exam:
              assignment.exam_config.count_return_exam || undefined,
            count_questions_page:
              assignment.exam_config.count_questions_page || undefined,
            time_questions_page:
              assignment.exam_config.time_questions_page || "",
            language: assignment.exam_config.language || "",
            start_date: assignment.exam_config.start_date
              ? new Date(assignment.exam_config.start_date)
              : undefined,
            end_date: assignment.exam_config.end_date
              ? new Date(assignment.exam_config.end_date)
              : undefined,
          }
        : undefined,
      start_form: assignment?.start_forms?.[0]
        ? {
            title: assignment.start_forms[0].title || "",
            sub_title: assignment.start_forms[0].sub_title || "",
            description: assignment.start_forms[0].description || "",
            show_configration: assignment.start_forms[0].show_configration || 0,
            show_condition: assignment.start_forms[0].show_condition || 0,
          }
        : undefined,
      start_form_image: assignment?.start_forms[0]?.image!,
      end_form: assignment?.end_forms?.[0]
        ? {
            title: assignment.end_forms[0].title || "",
            sub_title: assignment.end_forms[0].sub_title || "",
            description: assignment.end_forms[0].description || "",
            url: assignment.end_forms[0].url || "",
          }
        : undefined,
      end_form_image: assignment?.end_forms[0]?.image!,

      exam_condition: {
        condition_exams_id:
          assignment?.exam_config?.condition_exams?.map((c) => c.id) || [],
      },
      field_requirement: {
        field_requirement_id:
          assignment?.field_requirements?.map((f) => f.id) || [],
      },
    },
  });

  useEffect(() => {
    if (assignment) {
      form.reset({
        form_id: Number(assignment_id),
        code: assignment?.code || "",
        title: assignment?.title || "",
        sub_title: assignment?.sub_title || "",
        status: assignment?.status || "",
        exam_type_id: assignment?.exam_type_id || undefined,
        duration_in_minutes: assignment?.duration_in_minutes || undefined,
        exam_section_id: Number(id),
        image: assignment?.image || undefined,
        exam_config: assignment?.exam_config
          ? {
              date_view: assignment.exam_config.date_view || undefined,
              view_answer: assignment.exam_config.view_answer || "manually",
              view_results: assignment.exam_config.view_results || "",
              count_return_exam:
                assignment.exam_config.count_return_exam || undefined,
              count_questions_page:
                assignment.exam_config.count_questions_page || undefined,
              time_questions_page:
                assignment.exam_config.time_questions_page || "",
              language: assignment.exam_config.language || "",
              start_date: assignment.exam_config.start_date
                ? new Date(assignment.exam_config.start_date)
                : undefined,
              end_date: assignment.exam_config.end_date
                ? new Date(assignment.exam_config.end_date)
                : undefined,
            }
          : undefined,
        start_form: startForm
          ? {
              title: startForm.title || "",
              sub_title: startForm.sub_title || "",
              description: startForm.description || "",
              show_configration: startForm.show_configration || 1,
              show_condition: startForm.show_condition || 1,
            }
          : undefined,
        start_form_image: startForm?.image!,
        end_form: endForm
          ? {
              title: endForm.title || "",
              sub_title: endForm.sub_title || "",
              description: endForm.description || "",
              url: endForm.url || "",
            }
          : undefined,
        end_form_image: endForm?.image!,
        exam_condition: {
          condition_exams_id:
            assignment?.exam_config?.condition_exams?.map((c) => c.id) || [],
        },
        field_requirement: {
          field_requirement_id:
            assignment?.field_requirements?.map((f) => f.id) || [],
        },
      });
    }
  }, [assignment, assignment_id, id, form]);

  const onSubmit = async (values: FormValues) => {
    console.log(values);
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("form_id", assignment?.forms[0]?.id.toString()!);
      if (values.code !== assignment?.code) {
        formData.append("code", values.code || "");
      }

      formData.append("title", values.title);
      formData.append("sub_title", values.sub_title || "");
      formData.append("status", values.status || "");

      formData.append(
        "duration_in_minutes",
        values.duration_in_minutes?.toString() || ""
      );
      formData.append("exam_type_id", values.exam_type_id?.toString() || "");
      formData.append(
        "exam_section_id",
        values.exam_section_id?.toString() || ""
      );

      if (values.image) {
        if (values.image instanceof File) {
          formData.append("image", values.image);
        } else if (typeof values.image === "string") {
          if (values.image !== assignment?.image) {
            formData.append("image", values.image);
          }
        }
      }

      if (values.exam_config) {
        Object.entries(values.exam_config).forEach(([key, value]) => {
          const currentValue =
            assignment?.exam_config?.[
              key as keyof typeof assignment.exam_config
            ];

          if (value !== currentValue && value !== undefined && value !== null) {
            if (key === "start_date" || key === "end_date") {
              if (value) {
                formData.append(
                  `exam_config[${key}]`,
                  formatDateForMySQL(value as Date)
                );
              }
            } else if (key === "time_exam") {
              const timeExam = convertToHHMM((value as string) || "");
              formData.append(`exam_config[${key}]`, timeExam);
            } else {
              formData.append(`exam_config[${key}]`, String(value));
            }
          }
        });
      }

      // Handle start form
      if (values.start_form) {
        Object.entries(values.start_form).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(`start_form[${key}]`, String(value));
          }
        });
      }
      if (values.start_form_image) {
        console.log("Image:", values.start_form_image);
        if (values.image instanceof File) {
          formData.append("start_form_image", values.start_form_image);
        } else if (typeof values.start_form_image === "string") {
          formData.append("start_form_image", values.start_form_image);
        }
      }

      // Handle end form
      if (values.end_form) {
        Object.entries(values.end_form).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (key === "image") {
              if (value instanceof File) {
                formData.append("end_form[image]", value);
              } else if (
                typeof value === "string" &&
                !value.startsWith("http")
              ) {
                formData.append("end_form[image]", value);
              }
            } else {
              formData.append(`end_form[${key}]`, String(value));
            }
          }
        });
      }

      if (values.end_form_image) {
        console.log("Image:", values.end_form_image);
        if (values.image instanceof File) {
          formData.append("end_form_image", values.end_form_image);
        } else if (typeof values.end_form_image === "string") {
          formData.append("end_form_image", values.end_form_image);
        }
      }

      if (values.exam_condition?.condition_exams_id?.length) {
        values.exam_condition.condition_exams_id.forEach((id, index) => {
          formData.append(
            `exam_condition[condition_exams_id][${index}]`,
            String(id)
          );
        });
      }

      if (values.field_requirement?.field_requirement_id?.length) {
        const validIds = requirementsField?.map((r) => r.id) || [];
        const uniqueIds = values.field_requirement.field_requirement_id.filter(
          (value, index, self) =>
            self.indexOf(value) === index && validIds.includes(value)
        );

        uniqueIds.forEach((id, index) => {
          formData.append(
            `field_requirement[field_requirement_id][${index}]`,
            String(id)
          );
        });
      }

      const response = await axios.post(
        `/assignment/exams/update-all`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Exam updated successfully");
        router.push(
          `/admin/dashboard/assignments/assignment-session/${id}/assignments/${assignment_id}`
        );
        refetchAssignment();
        return response.data;
      }
      throw new Error(response.data?.message || "Failed to update exam");
    } catch (error: any) {
      console.error("Error updating exam:", error);
      toast.error(error.response?.data?.details || "Failed to update exam");
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigateToQuestionsPage = () => {
    router.push(
      `/admin/dashboard/assignments/assignment-session/${id}/assignments/${assignment_id}/questions`
    );
  };

  return (
    <div className="mx-auto p-4 sm:p-6 max-w-7xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Header title="Update Assignment" />
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="lg:col-span-3 space-y-4 sm:space-y-6">
              <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                  <div className="flex-1">
                    <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                      <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        label="Title :"
                        name="title"
                        placeholder="Enter a Title .. "
                      />
                      <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        label="SubTitle :"
                        name="sub_title"
                        placeholder="Enter a subtitle .. "
                      />
                    </div>
                    <div className="grid grid-cols-1 mt-4 gap-2 sm:gap-3 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="exam_type_id"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Exam Type : </FormLabel>
                            <Select
                              onValueChange={(value) =>
                                field.onChange(Number(value))
                              }
                              value={field.value?.toString()}
                              disabled
                            >
                              <FormControl>
                                <SelectTrigger className="flex rounded-md border bg-gray-100 dark:bg-gray-700 focus-within:border-primary-color1 focus:ring-1 focus:outline-none">
                                  <SelectValue placeholder="Select exam type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {examTypes?.map((type: Type) => (
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
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="flex rounded-md border bg-gray-100 dark:bg-gray-700 focus-within:border-primary-color1 focus:ring-1 focus:outline-none">
                                  <SelectValue placeholder="Select exam status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">
                                  InActive
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 mt-4 gap-3 sm:gap-4 md:grid-cols-2">
                      <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        label="Code :"
                        name="code"
                        placeholder="#1234 .. "
                      />
                      <FormField
                        control={form.control}
                        name="exam_config.language"
                        render={({ field }) => (
                          <FormItem className="-mt-1.5">
                            <FormLabel>Exam Language : </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="dark:bg-gray-700 bg-gray-100 ">
                                  <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="dark:bg-gray-800">
                                <SelectItem value="en">English</SelectItem>
                                <SelectItem value="ar">Arabic</SelectItem>
                                <SelectItem value="fn">Franch</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 mt-2">
                      <FormField
                        control={form.control}
                        name="exam_config.start_date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="mt-2">Start Date :</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl className="mt-8">
                                  <div className="relative">
                                    <Button
                                      type="button"
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 bg-gray-100 relative dark:bg-gray-700 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value as Date, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      {field.value ? (
                                        <button
                                          type="button"
                                          className="absolute right-3 top-4 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            field.onChange(null);
                                          }}
                                        >
                                          <XIcon className="h-4 w-4 opacity-70" />
                                        </button>
                                      ) : (
                                        <CalendarIcon className="absolute right-3 top-4 -translate-y-1/2 h-4 w-4 opacity-50" />
                                      )}
                                    </Button>
                                  </div>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value || undefined}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="exam_config.end_date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel className="mt-2">End Date : </FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl className="mt-8">
                                  <div className="relative">
                                    <Button
                                      type="button"
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 bg-gray-100 relative dark:bg-gray-700 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value as Date, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      {field.value ? (
                                        <button
                                          type="button"
                                          className="absolute right-3 top-4 -translate-y-1/2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            field.onChange(null);
                                          }}
                                        >
                                          <XIcon className="h-4 w-4 opacity-70" />
                                        </button>
                                      ) : (
                                        <CalendarIcon className="absolute right-3 top-4 -translate-y-1/2 h-4 w-4 opacity-50" />
                                      )}
                                    </Button>
                                  </div>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value || undefined}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="w-52 mx-auto">
                    <CustomFormField
                      fieldType={FormFieldType.SKELETON}
                      control={form.control}
                      name="image"
                      label="Image"
                      renderSkeleton={(field) => (
                        <FormControl>
                          <ImageUploader
                            file={field.value}
                            existingUrl={
                              typeof field.value === "string" && field.value
                                ? field.value.startsWith("http")
                                  ? field.value
                                  : `${process.env.NEXT_PUBLIC_ASSIGNMENT_STORAGE_URL}/${field.value}`
                                : undefined
                            }
                            onChange={(file) => {
                              field.onChange(file);
                            }}
                          />
                        </FormControl>
                      )}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 p-1.5 mt-8 sm:mt-16">
                  {startForm ? (
                    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center mb-4 sm:mb-6">
                        <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl mr-3 sm:mr-4">
                          <FiPlay className="text-blue-600 dark:text-blue-300 text-xl sm:text-2xl" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white">
                            {startForm?.title}
                          </h3>
                          <p className="text-blue-500 dark:text-blue-400 text-sm sm:text-base font-medium mt-1">
                            {startForm?.sub_title}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                        {startForm?.description}
                      </p>
                      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700">
                        <Button
                          onClick={() => setShowStartingInterfaceModal(true)}
                          type="button"
                          className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-color1 hover:bg-primary-color2 text-white rounded-lg"
                        >
                          Show
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center mb-4 sm:mb-6">
                          <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900/70 rounded-xl mr-3 sm:mr-4">
                            <FiPlay className="text-blue-600 dark:text-blue-300 text-xl sm:text-2xl" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white">
                              Starting Interface
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base font-medium mt-1">
                              Not Configured
                            </p>
                          </div>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base text-center italic">
                            No starting interface has been configured yet
                          </p>
                        </div>
                        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700 text-center">
                          <Button
                            onClick={() =>
                              setShowAddStartingInterfaceModal(true)
                            }
                            type="button"
                            className="px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center mx-auto"
                          >
                            <FiPlus className="mr-2" />
                            Add Starting Interface
                          </Button>
                        </div>
                      </div>
                      <AddStartFormInterface
                        isModalOpen={showAddStartingInterfaceModal}
                        setIsModalOpen={setShowAddStartingInterfaceModal}
                        control={form.control}
                      />
                    </>
                  )}
                  {endForm ? (
                    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center mb-4 sm:mb-6">
                        <div className="p-2 sm:p-3 bg-green-100 dark:bg-green-900/50 rounded-xl mr-3 sm:mr-4">
                          <FiFlag className="text-green-600 dark:text-green-300 text-xl sm:text-2xl" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white">
                            {endForm?.title}
                          </h3>
                          <p className="text-green-500 dark:text-green-400 text-sm sm:text-base font-medium mt-1">
                            {endForm?.sub_title}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                        {endForm?.description}
                      </p>
                      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700">
                        <Button
                          type="button"
                          onClick={() => setShowEndingInterfaceModal(true)}
                          className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-color1 hover:bg-primary-color2 text-white rounded-lg"
                        >
                          Show
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center mb-4 sm:mb-6">
                          <div className="p-2 sm:p-3 bg-green-100 dark:bg-green-900/70 rounded-xl mr-3 sm:mr-4">
                            <FiFlag className="text-green-600 dark:text-green-300 text-xl sm:text-2xl" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white">
                              Ending Interface
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base font-medium mt-1">
                              Not Configured
                            </p>
                          </div>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700/50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base text-center italic">
                            No Ending interface has been configured yet
                          </p>
                        </div>
                        <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700 text-center">
                          <Button
                            onClick={() => setShowAddEndingInterfaceModal(true)}
                            type="button"
                            className="px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center mx-auto"
                          >
                            <FiPlus className="mr-2" />
                            Add Ending Interface
                          </Button>
                        </div>
                      </div>
                      <AddEndFormInterface
                        isModalOpen={showAddEndingInterfaceModal}
                        setIsModalOpen={setShowAddEndingInterfaceModal}
                        control={form.control}
                      />
                    </>
                  )}
                </div>
                <div className="w-full flex items-end justify-end mt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary-color1 hover:bg-primary-color1 hover:shadow-lg"
                  >
                    {isSubmitting ? (
                      <div>
                        <Loader2 className="size-6 inline-block mr-2 animate-spin" />{" "}
                        Updating..
                      </div>
                    ) : (
                      <div>
                        <MdUpdate className="size-6 inline-block mr-2" /> Update
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1 space-y-6 sm:space-y-8">
              <Accordion
                type="single"
                collapsible
                className="w-full space-y-4 sm:space-y-4"
              >
                <AccordionItem
                  value="item-1"
                  className="bg-white dark:bg-gray-900 p-2 sm:p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700"
                >
                  <AccordionTrigger className="h-11 p-1">
                    <div className="flex items-center h-16 gap-2 sm:gap-4">
                      <Settings className="text-xl text-primary-color1" />
                      <p className="text-sm px-0.5 sm:text-base">
                        Assignment Settings
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 sm:space-y-6 dark:text-white">
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
                                className="flex rounded-md border bg-gray-100 dark:bg-gray-700 focus-within:border-primary-color1 focus:ring-1 focus:outline-none"
                                placeholder="e.g. 3"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="exam_config.count_questions_page"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Questions Per Page :</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                                className="flex rounded-md border bg-gray-100 dark:bg-gray-700 focus-within:border-primary-color1 focus:ring-1 focus:outline-none"
                                placeholder="e.g. 3"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="exam_config.view_results"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Results Display :</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue="manually"
                            >
                              <FormControl>
                                <SelectTrigger className="dark:bg-gray-700 bg-gray-100">
                                  <SelectValue placeholder="Select option" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="dark:bg-gray-700 bg-gray-100">
                                <SelectItem value="after_completion">
                                  After Finish
                                </SelectItem>
                                <SelectItem value="manually">Manual</SelectItem>
                                <SelectItem value="after_each_answer">
                                  After Each Answer
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="exam_config.view_answer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Answers Display :</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue="manually"
                            >
                              <FormControl>
                                <SelectTrigger className="dark:bg-gray-700 bg-gray-100">
                                  <SelectValue placeholder="Select option" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="dark:bg-gray-700 bg-gray-100">
                                <SelectItem value="after_completion">
                                  After Finish
                                </SelectItem>
                                <SelectItem value="manually">Manual</SelectItem>
                                <SelectItem value="after_each_answer">
                                  After Each Answer
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="exam_config.time_questions_page"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time per Page :</FormLabel>
                            <TimePicker
                              format="HH:mm"
                              value={
                                field.value
                                  ? dayjs(
                                      typeof field.value === "string" &&
                                        field.value.includes(":")
                                        ? field.value
                                        : `00:${field.value}`.slice(-5),
                                      "HH:mm"
                                    )
                                  : null
                              }
                              onChange={(time, timeString) => {
                                if (timeString) {
                                  field.onChange(timeString);
                                } else {
                                  field.onChange(
                                    assignment?.exam_config
                                      ?.time_questions_page || ""
                                  );
                                }
                              }}
                              className="w-full bg-gray-100 dark:bg-gray-700 p-1.5 border-none dark:text-white"
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="exam_config.count_return_exam"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Exam Repeat Count :</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                                className="flex rounded-md border bg-gray-100 dark:bg-gray-700 focus-within:border-primary-color1 focus:ring-1 focus:outline-none"
                                placeholder="e.g. 3"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="item-2"
                  className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700"
                >
                  <AccordionTrigger className="h-11 p-1">
                    <div className="flex items-center h-16 gap-2 sm:gap-4">
                      <MdAssignment className="text-3xl text-primary-color1" />
                      <p className="text-sm px-0.5 sm:text-base">
                        Assignment Conditions
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="mt-2">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="exam_condition.condition_exams_id"
                        render={({ field }) => {
                          const currentValues = field.value || [];
                          return (
                            <FormItem className="space-y-3">
                              <div className="flex flex-col space-y-2">
                                {examCondations?.map((condition: Condition) => (
                                  <FormItem
                                    key={condition.id}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={currentValues.includes(
                                          condition.id
                                        )}
                                        onChange={(e) => {
                                          const newValue = [...currentValues];
                                          const conditionIndex =
                                            newValue.indexOf(condition.id);

                                          if (e.target.checked) {
                                            if (conditionIndex === -1) {
                                              newValue.push(condition.id);
                                            }
                                          } else {
                                            if (conditionIndex > -1) {
                                              newValue.splice(
                                                conditionIndex,
                                                1
                                              );
                                            }
                                          }
                                          field.onChange(newValue);
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {condition.name}
                                    </FormLabel>
                                  </FormItem>
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-3"
                  className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700"
                >
                  <AccordionTrigger className="h-11 p-1">
                    <div className="flex items-center h-16 gap-2 sm:gap-4">
                      <Image
                        src={icons.requirement}
                        height={6}
                        width={6}
                        alt="requiremet"
                        className="size-6"
                      />
                      <p className="text-sm px-0.5 sm:text-base">
                        Assignment Requirements
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="mt-2">
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="field_requirement.field_requirement_id"
                        render={({ field }) => {
                          const currentValues = field.value || [];
                          return (
                            <FormItem className="space-y-3">
                              <div className="flex flex-col space-y-2">
                                {requirementsField?.map(
                                  (requirement: Requirement) => (
                                    <FormItem
                                      key={requirement.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={currentValues.includes(
                                            requirement.id
                                          )}
                                          onChange={(e) => {
                                            const newValue = e.target.checked
                                              ? [
                                                  ...currentValues,
                                                  requirement.id,
                                                ]
                                              : currentValues.filter(
                                                  (id) => id !== requirement.id
                                                );
                                            field.onChange(newValue);
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {requirement.name}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                )}
                              </div>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <button type="submit" className="w-full">
                  <div
                    className="border flex border-gray-200 cursor-pointer gap-6 p-6 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden"
                    onClick={navigateToQuestionsPage}
                  >
                    <Image
                      src="/icons/question-mark.svg"
                      width={24}
                      height={24}
                      className=""
                      alt="question mark"
                    />
                    <h1 className="text-medium">Questions Page</h1>
                  </div>
                </button>
              </Accordion>
            </div>
          </div>
        </form>
      </Form>
      {/* start modal */}
      <StartInterfaceModal
        open={showStartingInterfaceModal}
        onCancel={() => {
          setShowStartingInterfaceModal(false);
        }}
        startFormId={assignment?.start_forms[0]?.id!}
        type="assignment"
        refetchStartForm={refetchStartForm}
      />

      <EndInterfaceModal
        open={showEndingInterfaceModal}
        onCancel={() => {
          setShowEndingInterfaceModal(false);
        }}
        endFormId={assignment?.end_forms[0]?.id!}
        type="assignment"
        refetchEndForm={refetchEndForm}
      />
    </div>
  );
};

export default UpdateAssignmentPage;

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  control: Control<any>;
};

const AddStartFormInterface = ({
  isModalOpen,
  setIsModalOpen,
  control,
}: Props) => {
  return (
    <Modal
      title="Starting Interface"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      width={800}
    >
      <div className="mt-4">
        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={control}
          name="start_form_image"
          label="Image"
          renderSkeleton={(field) => (
            <FormControl>
              <ImageUploader
                file={field.value}
                onChange={(file) => field.onChange(file)}
              />
            </FormControl>
          )}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="md:col-span-1">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={control}
            label="Title:"
            name="start_form.title"
            placeholder="Enter title"
          />
        </div>

        <div className="md:col-span-1">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={control}
            label="Subtitle:"
            name="start_form.sub_title"
            placeholder="Enter subtitle"
          />
        </div>
      </div>

      <div className="flex items-start flex-1 mt-4">
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={control}
          label="Description:"
          name="start_form.description"
          placeholder="Enter description"
        />
      </div>

      <div className="flex gap-2 md:gap-6 md:flex-row flex-col mt-4">
        <FormField
          control={control}
          name="start_form.show_condition"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2">
              <FormControl className="mt-0.5">
                <input
                  type="checkbox"
                  checked={field.value === 1}
                  onChange={(e) => field.onChange(e.target.checked ? 1 : 0)}
                  className="h-4 w-4 rounded border-gray-300 text-primary-color1 focus:ring-primary-color1"
                />
              </FormControl>
              <FormLabel className="text-base">Show Conditions</FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="start_form.show_configration"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-2">
              <FormControl className="mt-0.5">
                <input
                  type="checkbox"
                  checked={field.value === 1}
                  onChange={(e) => field.onChange(e.target.checked ? 1 : 0)}
                  className="h-4 w-4 rounded border-gray-300 text-primary-color1 focus:ring-primary-color1"
                />
              </FormControl>
              <FormLabel className="text-base">Show Configuration</FormLabel>
            </FormItem>
          )}
        />
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button
          type="button"
          className="bg-primary-color1 hover:bg-primary-color2"
          onClick={() => setIsModalOpen(false)}
        >
          Ok
        </Button>
      </div>
    </Modal>
  );
};

const AddEndFormInterface = ({
  isModalOpen,
  setIsModalOpen,
  control,
}: Props) => {
  return (
    <Modal
      title="Ending Interface"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      width={800}
    >
      <CustomFormField
        fieldType={FormFieldType.SKELETON}
        control={control}
        name="end_form_image"
        label="Image"
        renderSkeleton={(field) => (
          <FormControl>
            <ImageUploader
              file={field.value}
              onChange={(file) => {
                field.onChange(file);
              }}
            />
          </FormControl>
        )}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          label="Title:"
          name="end_form.title"
          placeholder="Enter title"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          label="Subtitle:"
          name="end_form.sub_title"
          placeholder="Enter subtitle"
        />

        <div className="md:col-span-2">
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={control}
            label="Description:"
            name="end_form.description"
            placeholder="Enter description"
          />
        </div>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={control}
          label="URL:"
          name="end_form.url"
          placeholder="Enter URL"
        />
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button
          type="button"
          className="bg-primary-color1 hover:bg-primary-color2"
          onClick={() => setIsModalOpen(false)}
        >
          Ok
        </Button>
      </div>
    </Modal>
  );
};
