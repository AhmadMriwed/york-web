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
import { useParams, usePathname, useRouter } from "next/navigation";
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
  examTime: z.string().min(1, "Exam time is required"),
  examLanguage: z.string(),
  startDate: z.date(),
  endDate: z.date(),
});

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { id } = useParams();

  type FormValues = z.infer<typeof addExamValidationSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(addExamValidationSchema),
    defaultValues: {
      title: "",
      subTitle: "",
      examTime: "2 Hours",
      examLanguage: "",
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const submissionData = {
        ...values,
      };
      console.log("Form submitted:", submissionData);
      // Add your API call here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push(
        `/admin/dashboard/assignments/assignment-session/${id}/updateAssignment`
      );
    } catch (error) {
      console.error("Failed to create assignment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto p-4 sm:p-6 max-w-7xl">
      <Header title="Create New Assignment" />
      <div
        className={`p-4 py-8 rounded-lg dark:bg-[#212A34] bg-white shadow-sm flex flex-col md:flex-row`}
      >
        <Image
          src={"/information/assignment.svg"}
          width={50}
          height={50}
          className="h-96 w-96 mx-auto"
          alt="exam"
        />
        <div className="flex-1 mx-2 md:mx-8 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

              <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
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
                          <SelectTrigger className=" dark:bg-gray-700 bg-gray-100">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="dark:bg-gray-800">
                          <SelectItem value="30 Minutes">30 Minutes</SelectItem>
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
                          <SelectTrigger className=" dark:bg-gray-700 bg-gray-100">
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
              </div>
              <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 ">
                {/* Date Range */}
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date : </FormLabel>
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
                              date > new Date() || date < new Date("1900-01-01")
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
                      <FormLabel>End Date : </FormLabel>
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
                              date > new Date() || date < new Date("1900-01-01")
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

              <div className="flex justify-end gap-4 ">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
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
                    "Create "
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
