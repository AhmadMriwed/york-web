"use client";
import React, { useState } from "react";
import { FiPlus, FiInfo, FiImage, FiFile } from "react-icons/fi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IoArrowBackSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
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
import ImageUploader from "@/components/upload/ImageUploader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { message, Switch, Upload } from "antd";
import CustomInput from "@/components/inputs/custom-field/CustomInput";
import { Settings } from "lucide-react";
import { MdAssignment } from "react-icons/md";
import { Checkbox } from "@heroui/react";
import { Modal } from "antd";
import {
  FiPlay,
  FiFlag,
  FiTag,
  FiType,
  FiFileText,
  FiFolder,
  FiLink,
} from "react-icons/fi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2 } from "lucide-react";
import InterfaceModal from "@/components/assignments/interfaceCard";
import Image from "next/image";
import Header from "@/components/headers/header";

const addExamValidationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subTitle: z.string().optional(),
  course: z.string().min(1, "Course is required"),
  file: z.string().optional(),
  image: z.string().optional(),
  examTime: z.string().min(1, "Exam time is required"),
  examType: z.string(),
  examCode: z.string(),
  startDate: z.date(),
  endDate: z.date(),
  status: z.string(),
  examLanguage: z.string(),
  resultsDisplay: z.string().min(1, "Results display status is required"),
  examDate: z.string().optional(),
  questionsPerPage: z.string().min(1, "Questions per page is required"),
  timePerPage: z.string().optional(),
  requireAnswerBeforeNext: z.boolean().default(true),
  examRepeatCount: z.string().optional(),
  displayCorrectionLadder: z
    .string()
    .min(1, "Correction ladder status is required"),
  conditions: z.object({
    condition1: z.boolean().default(false),
    condition2: z.boolean().default(false),
    condition3: z.boolean().default(false),
    condition4: z.boolean().default(false),
  }),
  requirements: z
    .object({
      requireId: z.boolean().default(false),
      requireFirstName: z.boolean().default(false),
      requireLastName: z.boolean().default(false),
      requireEmail: z.boolean().default(false),
    })
    .optional(),
});

const UpdateAssignmentPage = () => {
  const [showStartingInterfaceModal, setShowStartingInterfaceModal] =
    useState<boolean>(false);
  const [showEndingInterfaceModal, setShowEndingInterfaceModal] =
    useState<boolean>(false);

  const [showRequirementDailog, setShowRequirementDailog] =
    useState<boolean>(false);

  const mockModalData = {
    title: "Starting Interface ",
    subTitle: "Essential documentation for new users",
    description:
      "This comprehensive guide will walk you through all the key features of our platform. You'll learn how to set up your account, navigate the interface, and use advanced tools to maximize your productivity. Our documentation includes step-by-step tutorials and best practices gathered from thousands of successful users.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    files: [
      {
        name: "User Manual.pdf",
        url: "https://example.com/files/user-manual.pdf",
      },
      {
        name: "Quick Start Guide.docx",
        url: "https://example.com/files/quick-start.docx",
      },
      {
        name: "API Reference v2.3",
        url: "https://example.com/files/api-reference.pdf",
      },
    ],
    link: "https://help.example.com/getting-started",
  };
  const mockModalData2 = {
    title: "Ending Interface ",
    subTitle: "Essential documentation for new users",
    description:
      "This comprehensive guide will walk you through all the key features of our platform. You'll learn how to set up your account, navigate the interface, and use advanced tools to maximize your productivity. Our documentation includes step-by-step tutorials and best practices gathered from thousands of successful users.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    files: [
      {
        name: "User Manual.pdf",
        url: "https://example.com/files/user-manual.pdf",
      },
      {
        name: "Quick Start Guide.docx",
        url: "https://example.com/files/quick-start.docx",
      },
      {
        name: "API Reference v2.3",
        url: "https://example.com/files/api-reference.pdf",
      },
    ],
    link: "https://help.example.com/getting-started",
  };

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  type FormValues = z.infer<typeof addExamValidationSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(addExamValidationSchema),
    defaultValues: {
      title: "",
      subTitle: "",
      course: "",
      file: "",
      image: "",
      examTime: "2 Hours",
      resultsDisplay: "Manual",
      examDate: "",
      examType: "",
      questionsPerPage: "5 Questions",
      timePerPage: "",
      requireAnswerBeforeNext: true,
      examRepeatCount: "",
      examLanguage: "",
      displayCorrectionLadder: "Manual",
      requirements: {
        requireId: false,
        requireFirstName: false,
        requireLastName: false,
        requireEmail: false,
      },
    },
  });

  const handleCancel = () => {
    form.reset();
    router.back();
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const submissionData = {
        ...values,
      };

      console.log("Form submitted:", submissionData);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/admin/dashboard/assignments");
    } catch (error) {
      console.error("Failed to create assignment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto p-4 sm:p-6 max-w-7xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Header title="Update  Assignment" />

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Main form section (3/4 width) */}
            <div className="lg:col-span-3 space-y-4 sm:space-y-6">
              <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
                  <div className="flex-1">
                    <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                      {/* Title */}
                      <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        label="Title :"
                        name="title"
                        placeholder="Enter a Title .. "
                      />
                      {/* Subtitle */}
                      <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        label="SubTitle :"
                        name="subTitle"
                        placeholder="Enter a SubTitle .. "
                      />
                    </div>

                    <div className="grid grid-cols-1 mt-4 gap-2 sm:gap-3 md:grid-cols-2">
                      {/* Assignment Type  */}
                      <FormField
                        control={form.control}
                        name="examType"
                        render={({ field }) => (
                          <FormItem className="col-span-1">
                            <FormLabel className="p-0.5">
                              Select a Type :
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="dark:bg-gray-700 bg-gray-100 focus:ring-primary-color1">
                                  <SelectValue placeholder="Select a Type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="dark:bg-gray-800">
                                <SelectItem value="type 1">type 1</SelectItem>
                                <SelectItem value="type 2">type 2</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {/* assignment language  */}
                      <FormField
                        control={form.control}
                        name="examLanguage"
                        render={({ field }) => (
                          <FormItem className="col-span-1">
                            <FormLabel className="">
                              Select a Language :
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="dark:bg-gray-700 bg-gray-100 focus:ring-primary-color1">
                                  <SelectValue placeholder="Select a Type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="dark:bg-gray-800">
                                <SelectItem value="english">
                                  English{" "}
                                </SelectItem>
                                <SelectItem value="arabic">Arabic</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 mt-4 gap-3 sm:gap-4 md:grid-cols-2">
                      {/* Assignment Code  */}
                      <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        label="Code :"
                        name="examCode"
                        placeholder="#1234 .. "
                      />
                      {/* assignment language  */}
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem className="col-span-1">
                            <FormLabel className="mb-1">Status :</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="dark:bg-gray-700 p-1 bg-gray-100 focus:ring-primary-color1">
                                  <SelectValue placeholder="Select a status" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="dark:bg-gray-800">
                                <SelectItem value="active">Active </SelectItem>
                                <SelectItem value="inActive">
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
                      {/* Date Range */}
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Start Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 bg-gray-100 dark:bg-gray-700 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                style={{ zIndex: 1000 }}
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                  style={{ zIndex: 1000 }}
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>End Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 dark:bg-gray-700 bg-gray-100 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                style={{ zIndex: 1000 }}
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) =>
                                    date > new Date() ||
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                  style={{ zIndex: 1000 }}
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* File upload */}
                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                      <FormItem className="w-full md:w-auto mt-4 md:mt-0">
                        <FormLabel>Assignment Photo : </FormLabel>
                        <ImageUploader
                          onUploadSuccess={(fileId) => field.onChange(fileId)}
                          multiple={true}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Interface sections */}
                <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 p-1.5 mt-8 sm:mt-16">
                  {/* Starting Interface Card */}
                  <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl mr-3 sm:mr-4">
                        <FiPlay className="text-blue-600 dark:text-blue-300 text-xl sm:text-2xl" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white">
                          Starting Interface
                        </h3>
                        <p className="text-blue-500 dark:text-blue-400 text-sm sm:text-base font-medium mt-1">
                          Sub title
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Ex corporis voluptates incidunt nihil ducimus? Molestias
                      vero quaerat eos ipsum ea earum necessitatibus,
                      reprehenderit commodi repellat, odit odio iure veniam
                      excepturi.
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

                  {/* Ending Interface Card */}
                  <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="p-2 sm:p-3 bg-green-100 dark:bg-green-900/50 rounded-xl mr-3 sm:mr-4">
                        <FiFlag className="text-green-600 dark:text-green-300 text-xl sm:text-2xl" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white">
                          Ending Interface
                        </h3>
                        <p className="text-green-500 dark:text-green-400 text-sm sm:text-base font-medium mt-1">
                          Sub title
                        </p>
                      </div>
                    </div>

                    <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Ex corporis voluptates incidunt nihil ducimus? Molestias
                      vero quaerat eos ipsum ea earum necessitatibus,
                      reprehenderit commodi repellat, odit odio iure veniam
                      excepturi.
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
                </div>
              </div>
            </div>

            {/* Assignment settings sidebar (1/4 width) */}
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
                  <AccordionTrigger className=" h-11  p-1">
                    <div className="flex items-center  h-16 gap-2 sm:gap-4">
                      <Settings className="text-xl  text-primary-color1" />
                      <p className="text-sm  px-0.5 sm:text-base">
                        Assignment Settings
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 sm:space-y-6 dark:text-white">
                      {/* Exam Time */}
                      <FormField
                        control={form.control}
                        name="examTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Exam Time : </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="dark:bg-gray-800">
                                  <SelectValue placeholder="Select time" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="dark:bg-gray-800">
                                <SelectItem value="30 Minutes">
                                  30 Minutes
                                </SelectItem>
                                <SelectItem value="1 Hour">1 Hour</SelectItem>
                                <SelectItem value="2 Hours">2 Hours</SelectItem>
                                <SelectItem value="3 Hours">3 Hours</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Exam Language */}
                      <FormField
                        control={form.control}
                        name="examLanguage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Exam Language : </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="dark:bg-gray-800">
                                  <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="dark:bg-gray-800">
                                <SelectItem value="english">English</SelectItem>
                                <SelectItem value="arabic">العربية</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Exam Date */}
                      <FormField
                        control={form.control}
                        name="examDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Exam Date :</FormLabel>
                            <FormControl>
                              <Input
                                type="date"
                                {...field}
                                className="dark:bg-gray-800"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Questions Per Page */}
                      <FormField
                        control={form.control}
                        name="questionsPerPage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Questions Per Page : </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue="5 Questions"
                            >
                              <FormControl>
                                <SelectTrigger className="dark:bg-gray-800">
                                  <SelectValue placeholder="Select number" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="dark:bg-gray-800">
                                {[1, 2, 3, 5, 10].map((num) => (
                                  <SelectItem
                                    key={num}
                                    value={`${num} Questions`}
                                  >
                                    {num} {num === 1 ? "Question" : "Questions"}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Results Display */}
                      <FormField
                        control={form.control}
                        name="resultsDisplay"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Results Display :</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue="Manual"
                            >
                              <FormControl>
                                <SelectTrigger className="dark:bg-gray-800">
                                  <SelectValue placeholder="Select option" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="dark:bg-gray-800">
                                <SelectItem value="AfterFinish">
                                  After Finish
                                </SelectItem>
                                <SelectItem value="Manual">Manual</SelectItem>
                                <SelectItem value="PerAnswer">
                                  Per Answer
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Time Per Page */}
                      <FormField
                        control={form.control}
                        name="timePerPage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Time Per Page :</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. 15 minutes"
                                {...field}
                                className="dark:bg-gray-800"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Exam Repeat Count */}
                      <FormField
                        control={form.control}
                        name="examRepeatCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Exam Repeat Count :</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="e.g. 3"
                                {...field}
                                className="dark:bg-gray-800"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Display Correction Ladder */}
                      <FormField
                        control={form.control}
                        name="displayCorrectionLadder"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Display Correction Ladder :</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                              defaultValue="Manual"
                            >
                              <FormControl>
                                <SelectTrigger className="dark:bg-gray-800">
                                  <SelectValue placeholder="Select option" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="dark:bg-gray-800">
                                <SelectItem value="AfterFinish">
                                  After Finish
                                </SelectItem>
                                <SelectItem value="Manual">Manual</SelectItem>
                                <SelectItem value="PerAnswer">
                                  Per Answer
                                </SelectItem>
                              </SelectContent>
                            </Select>
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
                  <AccordionTrigger className=" h-11  p-1">
                    <div className="flex items-center  h-16 gap-2 sm:gap-4">
                      <MdAssignment className="text-xl  text-primary-color1" />
                      <p className="text-sm  px-0.5 sm:text-base">
                        Assignment Condations
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="mt-2">
                    <div className="space-y-4">
                      {/* Condition 1 */}
                      <FormField
                        control={form.control}
                        name="conditions.condition1"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                isSelected={field.value}
                                onValueChange={field.onChange}
                                color="primary"
                              >
                                Item Name 1
                              </Checkbox>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      {/* Condition 2 */}
                      <FormField
                        control={form.control}
                        name="conditions.condition2"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                isSelected={field.value}
                                onValueChange={field.onChange}
                                color="primary"
                              >
                                Item Name 2
                              </Checkbox>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      {/* Condition 3 */}
                      <FormField
                        control={form.control}
                        name="conditions.condition3"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                isSelected={field.value}
                                onValueChange={field.onChange}
                                color="primary"
                              >
                                Item Name 3
                              </Checkbox>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      {/* Condition 4 */}
                      <FormField
                        control={form.control}
                        name="conditions.condition4"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                isSelected={field.value}
                                onValueChange={field.onChange}
                                color="primary"
                              >
                                Item Name 4
                              </Checkbox>
                            </FormControl>
                          </FormItem>
                        )}
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
                        src={"/icons/form.svg"}
                        className="w-6 h-6 "
                        alt="form"
                        width={4}
                        height={4}
                      />
                      <p className="text-sm px-0.5 sm:text-base">
                        Start Form Requirements
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="mt-2">
                    <div className="space-y-4">
                      {/* ID Requirement */}
                      <div className="flex items-center space-x-2">
                        <FormField
                          control={form.control}
                          name="requirements.requireId"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="h-5 w-5 mr-2 rounded border-gray-300 text-primary-color1 focus:ring-primary-color1"
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                ID
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* First Name Requirement */}
                      <div className="flex items-center space-x-2">
                        <FormField
                          control={form.control}
                          name="requirements.requireFirstName"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="h-5 w-5 mr-2 rounded border-gray-300 text-primary-color1 focus:ring-primary-color1"
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                First Name
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Last Name Requirement */}
                      <div className="flex items-center space-x-2">
                        <FormField
                          control={form.control}
                          name="requirements.requireLastName"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="h-5 w-5 mr-2 rounded border-gray-300 text-primary-color1 focus:ring-primary-color1"
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Last Name
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>

                      {/* Email Requirement */}
                      <div className="flex items-center space-x-2">
                        <FormField
                          control={form.control}
                          name="requirements.requireEmail"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onChange={field.onChange}
                                  className="h-5 w-5 mr-2 rounded border-gray-300 data-[state=checked]:bg-primary-color1 data-[state=checked]:text-white focus:ring-primary-color1"
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <div
                  className={cn(
                    "border flex border-gray-200 cursor-pointer gap-6 p-6 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden"
                  )}
                  onClick={() => router.push("/")}
                >
                  <Image
                    src={"/icons/question-mark.svg"}
                    width={24}
                    height={24}
                    className=""
                    alt="quetion mark"
                  />
                  <h1 className="text-medium">Questions Page</h1>
                </div>
              </Accordion>
            </div>
          </div>
        </form>
      </Form>

      {/* Modals */}
      <InterfaceModal
        open={showStartingInterfaceModal}
        onCancel={() => setShowStartingInterfaceModal(false)}
        {...mockModalData}
        mode="exam"
        type="starting"
      />
      <InterfaceModal
        open={showEndingInterfaceModal}
        onCancel={() => setShowEndingInterfaceModal(false)}
        {...mockModalData2}
      />
    </div>
  );
};

export default UpdateAssignmentPage;
