


"use client";
import { useParams } from "next/navigation";
import React, { useContext, useState } from "react";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import "@/components/assignments/assignmentSessionA/assignmentSessionAdd/style.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Modal, Button, Input, InputGroup, Header } from "rsuite";
import {
  Calendar,
  Users,
  Clock,
  Languages,
  Percent,
  ListOrdered,

  EditIcon,
  TrashIcon,
  Hash,
  Settings,
  Loader2,
  View,

} from "lucide-react";
import { GoChecklist } from "react-icons/go";
import { Dropdown, IconButton } from "rsuite";
import { More } from "@rsuite/icons";
import { PiToggleRightFill } from "react-icons/pi";
import { CiExport } from "react-icons/ci";
import { IoMdMore } from "react-icons/io";


import { MdTitle, MdSubtitles, MdCategory, MdVisibility, MdVisibilityOff, MdOutlineAppSettingsAlt } from "react-icons/md";
import StudentResultsTable from "@/components/assignments/assignmentSessionA/StudentResultsTable ";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { FiFlag, FiPlay } from "react-icons/fi";
const RenderIconButton = (props: any, ref: any) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  return (
    <IconButton
      {...props}
      ref={ref}
      icon={<More className="size-6 max-sm:size-5" />}
      size="lg"
      circle
      className={`${mode === "dark"
        ? "!text-[var(--light-bg-color)]"
        : "!text-[var(--dark-color)]"
        } !bg-transparent hover:!bg-gray-100 dark:hover:!bg-gray-700 transition-colors`}
    />
  );
};
const VerticalRenderIconButton = (props: any, ref: any) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  return (
    <IconButton
      {...props}
      ref={ref}
      icon={<IoMdMore className="size-6 max-sm:size-5" />}
      size="lg"
      circle
      className={`${mode === "dark"
        ? "!text-[var(--light-bg-color)]"
        : "!text-[var(--dark-color)]"
        } !bg-transparent hover:!bg-gray-100 dark:hover:!bg-gray-700 transition-colors`}
    />
  );
};

const Page = () => {
  const { assignment_id } = useParams();
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const router = useRouter();


  const [isSubmittingExamConditions, setIsSubmittingExamConditions] = useState(false);
  const [isSubmittingExamSettings, setIsSubmittingExamSettings] = useState(false);


  const editExamSettingsSchema = z.object({
    examTime: z.string().min(1, "Exam time is required"),
    examType: z.string(),
    startDate: z.date(),
    endDate: z.date(),
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
  });
  type FormValues = z.infer<typeof editExamSettingsSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(editExamSettingsSchema),
    defaultValues: {
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
    },
  });



  const editExamConditionsSchema = z.object({
    conditions: z.object({
      condition1: z.boolean().default(false),
      condition2: z.boolean().default(false),
      condition3: z.boolean().default(false),
      condition4: z.boolean().default(false),
    }),
  });
  type ConditionsFormValues = z.infer<typeof editExamConditionsSchema>;
  const formForConditions = useForm<ConditionsFormValues>({
    resolver: zodResolver(editExamConditionsSchema),
    defaultValues: {
      conditions: {
        condition1: false,
        condition2: false,
        condition3: false,
        condition4: false,

      }
    }
  });
  const onSubmitExamConditions = async (values: ConditionsFormValues) => {
    setIsSubmittingExamConditions(true);
    try {
      const submissionData = {
        ...values,
      };

      console.log("Form submitted:", submissionData);

    } catch (error) {
      console.error("Failed to create assignment:", error);
    } finally {
      setIsSubmittingExamConditions(false);
    }

  };
  const onSubmitExamSittings = async (values: FormValues) => {
    setIsSubmittingExamSettings(true);
    try {
      const submissionData = {
        ...values,
      };

      console.log("Form submitted:", submissionData);

    } catch (error) {
      console.error("Failed to create assignment:", error);
    } finally {
      setIsSubmittingExamSettings(false);
    }

  };


  // Exam Data
  const exam = {
    image: "/register.png",
    subtitle: "Mid-term Examination",
    title: "Advanced Mathematics",
    language: "English",
    percentage: 40,
    numberOfQuestions: 50,
    numberOfStudents: 120,
    durationMinutes: 90,
    type: "Multiple Choice",
    code: "MATH202",
    status: "Active",
    startDate: "2024-03-15",
    endDate: "2024-03-17",
    showAnswers: true,
  };
  const [previewOpen, setPreviewOpen] = useState(false);
  return (
    <div className={`relative sm:p-4  min-h-screen  ${mode === "dark" ? " text-white" : " text-dark"}`}>
      <div className="absolut w-full h-full bg-white opacity-50 dark:opacity-60 dark:bg-dark "/>
      <div className="flex justify-between items-start mb-5 pt-2">
        <Header className="flex items-center px-5 sm:px-2 py-2 gap-2 text-[var(--primary-color1)] hover:text-[var(--primary-color2)]">
          <h3 className="text-[21px] sm:text-2xl font-semibold tracking-wider">Exam Details</h3>
        </Header>
      </div>
      <div className="grid grid-cols-4 gap-5 ">


        <div className={`rounded-xl col-span-3 shadow-lg ${mode === "dark" ? "bg-gray-900" : "bg-white"} max-sm:rounded-lg pb-5`}>
          <div className="flex justify-between items-start">
            <div className="flex flex-col items-start justify-start  pb-3 sm:py-2 px-5 max-sm:px-2">
              <div className="flex items-center gap-3">

                <div className="flex items-center justify-start gap-2">
                  <MdTitle className="w-6 h-6 text-primary-color1 max-sm:w-4 max-sm:h-4" />
                  <h1 className="text-[15px] sm:text-[22px] font-bold">
                    {exam.title}
                  </h1>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${exam.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                    }`}
                >
                  {exam.status}
                </span>
              </div>
              <div className="flex flex-col items-start justify-start pl-2 sm:pl-3 -mt-6 sm:-mt-3 sm:gap-1">


                <div className="flex items-center justify-center gap-2">
                  <MdSubtitles className="w-5 h-5 text-primary-color1 max-sm:w-4 max-sm:h-4" />
                  <h1 className="text-[15px] sm:text-xl font-medium text-gray-700 dark:text-gray-300 ">
                    {exam.subtitle}
                  </h1>
                </div>
                <div className="flex items-center justify-center gap-2 -mt-3 sm:-mt-1">
                  <Hash className="w-4 h-4 text-primary-color1 max-sm:w-4 max-sm:h-4" />
                  <p className="text-sm text-gray-500">{exam.code}</p>
                </div>
              </div>

            </div>
            <Dropdown
              renderToggle={RenderIconButton}
              placement="bottomEnd"
              className="[&_.dropdown-menu]:min-w-[220px] pr-3 max-sm:[&_.dropdown-menu]:min-w-[180px] max-sm:pr-1"
            >
              {[
                { icon: <EditIcon className="text-primary-color1 size-5 max-sm:size-4" />, text: "Edit" },
                { icon: <TrashIcon className="text-primary-color1 size-5 max-sm:size-4" />, text: "Delete" },
                { icon: <CiExport className="text-primary-color1 size-5 max-sm:size-4" />, text: "Export to Excel" },
                { icon: <PiToggleRightFill className="text-primary-color1 size-5 max-sm:size-4" />, text: exam.status === "Active" ? "Deactivate" : "Activate" },
                { icon: <MdVisibility className="text-primary-color1 size-5 max-sm:size-4" />, text: "Preview Exam" }
              ].map((item, index) => (
                <Dropdown.Item
                  key={index}
                  className="!flex !items-center !px-3 !py-3 text-lg transition-colors max-sm:!px-2 max-sm:!py-3 gap-3 max-sm:text-[16px]"
                  onClick={() => { }}
                >
                  {item.icon}
                  <span className="max-sm:text-[16px] text-[17px]">{item.text}</span>
                </Dropdown.Item>
              ))}
            </Dropdown>
          </div>

          <div className=" px-6 grid grid-cols-1 sm:grid-cols-7 gap-6 max-sm:px-4 max-sm:gap-4 pt-4">

            <div className="sm:col-span-3 ">
              <img
                src={exam.image}
                alt="Exam Image"
                width={600}
                height={600}
                className="object-cover rounded-lg"
              />
            </div>


            <div className=" sm:col-span-4   space-y-6  max-sm:space-y-4 ">


              <div className="flex items-center gap-3 md:gap-5">
                <InfoItem
                  icon={<Languages className="w-5 h-5 max-sm:w-4 max-sm:h-4" />}
                  label="Language"
                  value={exam.language}
                />
                <InfoItem
                  icon={<Percent className="w-5 h-5 max-sm:w-4 max-sm:h-4" />}
                  label="Passing %"
                  value={`${exam.percentage}%`}
                />
              </div>
              <InfoItem
                icon={<Calendar className="w-5 h-5 max-sm:w-4 max-sm:h-4" />}
                label="Exam Period"
                value={`${exam.startDate} - ${exam.endDate}`}
              />
              <div className="flex items-center gap-3 md:gap-5">
                <InfoItem
                  icon={<Clock className="w-5 h-5 max-sm:w-4 max-sm:h-4" />}
                  label="Duration"
                  value={`${exam.durationMinutes} mins`}
                />
                <InfoItem
                  icon={<ListOrdered className="w-5 h-5 max-sm:w-4 max-sm:h-4" />}
                  label="Questions"
                  value={exam.numberOfQuestions}
                />
              </div>
              <InfoItem
                icon={<MdCategory className="w-5 h-5 max-sm:w-4 max-sm:h-4" />}
                label="Exam Type"
                value={exam.type}
              />
              <div className="flex items-center gap-3 md:gap-5">
                <InfoItem
                  icon={<Users className="w-5 h-5 max-sm:w-4 max-sm:h-4" />}
                  label="Registered Students"
                  value={exam.numberOfStudents}
                />
                {exam.showAnswers ? (
                  <div className="flex items-center gap-3 max-sm:gap-2 pl-2 mt-2">
                    <MdVisibility className="w-5 h-5 text-green-500 max-sm:w-4 max-sm:h-4" />
                    <span className="text-[16px] max-sm:text-sm">Answers Visible</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 max-sm:gap-2 pl-2 mt-2">

                    <MdVisibilityOff className="w-5 h-5 text-red-500 max-sm:w-4 max-sm:h-4" />
                    <span className="text-lg max-sm:text-sm">Answers Hidden</span>
                  </div>
                )}

              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 p-1.5 mt-8 sm:mt-16">
            {/* Starting Interface Card */}
            <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start">
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
                <Dropdown
                  renderToggle={VerticalRenderIconButton}
                  placement="bottomEnd"
                  className="[&_.dropdown-menu]:min-w-[220px] pr-3 max-sm:[&_.dropdown-menu]:min-w-[180px] max-sm:pr-1"
                >
                  {[
                    { icon: <View className="text-primary-color1 size-5 max-sm:size-4" />, text: "Show More",  action: () => router.push(`${assignment_id}/start-interface`) },
                    { icon: <EditIcon className="text-primary-color1 size-5 max-sm:size-4" />, text: "Edit",    action: () => {/* Edit logic */} },
                    { icon: <TrashIcon className="text-primary-color1 size-5 max-sm:size-4" />, text: "Delete",    action: () => {/* Delete logic */} },

                  ].map((item, index) => (
                    <Dropdown.Item
                      key={index}
                      className="!flex !items-center !px-3 !py-3 text-lg transition-colors max-sm:!px-2 max-sm:!py-3 gap-3 max-sm:text-[16px]"
                      onClick={item.action}
                    >
                      {item.icon}
                      <span className="max-sm:text-[16px] text-[17px]">{item.text}</span>
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              </div>


              <div className="w-full ">
                <img
                  src={`https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80`}
                  alt={'START INTERFACE'}
                  className=" rounded-lg object-contain border border-gray-200 dark:border-gray-600"
                  width={500}
                  height={500}
                />
              </div>

            </div>

            {/* Ending Interface Card */}
            <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex justify-between items-start">

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
                <Dropdown
                  renderToggle={VerticalRenderIconButton}
                  placement="bottomEnd"
                  className="[&_.dropdown-menu]:min-w-[220px] pr-3 max-sm:[&_.dropdown-menu]:min-w-[180px] max-sm:pr-1"
                >
                  {[
                    { icon: <View className="text-primary-color1 size-5 max-sm:size-4" />, text: "Show More",  action: () => router.push(`${assignment_id}/end-interface`) },
                    { icon: <EditIcon className="text-primary-color1 size-5 max-sm:size-4" />, text: "Edit", action: () => {} },
                    { icon: <TrashIcon className="text-primary-color1 size-5 max-sm:size-4" />, text: "Delete", action: () => {} },

                  ].map((item, index) => (
                    <Dropdown.Item
                      key={index}
                      className="!flex !items-center !px-3 !py-3 text-lg transition-colors max-sm:!px-2 max-sm:!py-3 gap-3 max-sm:text-[16px]"
                      onClick={item.action}
                    >
                      {item.icon}
                      <span className="max-sm:text-[16px] text-[17px]">{item.text}</span>
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              </div>

              <div className="w-full ">
                <img
                  src={`https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80`}
                  alt={'START INTERFACE'}
                  className=" rounded-lg object-contain border border-gray-200 dark:border-gray-600"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 space-y-2 sm:space-y-4">
          <Accordion
            type="single"
            collapsible
            className="w-full space-y-2 sm:space-y-4"
          >

            <AccordionItem
              value="item-1"
              className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700"
            >
              <AccordionTrigger className="h-14 p-1">
                <div className="flex items-center h-14 gap-2 sm:gap-4">
                  <Settings className="text-xl sm:text-2xl text-primary-color1" />
                  <p className="text-sm sm:text-base">
                    Exam Settings
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmitExamSittings)} className="space-y-6">
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
                      <Button
                        type="submit"
                        disabled={isSubmittingExamSettings}
                        className="bg-primary-color1 hover:bg-primary-color2 text-white w-full py-3"
                      >
                        {isSubmittingExamSettings ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          "Save"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>

              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-2"
              className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700"
            >
              <AccordionTrigger className="h-14 p-1">
                <div className="flex items-center h-14 gap-2 sm:gap-4">
                  <MdOutlineAppSettingsAlt className="text-xl sm:text-2xl text-primary-color1" />
                  <p className="text-sm sm:text-base">
                    Exam Conditions
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Form {...formForConditions}>
                  <form onSubmit={formForConditions.handleSubmit(onSubmitExamConditions)} className="space-y-6">
                    <FormField
                      control={formForConditions.control}
                      name="conditions.condition1"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              color="primary"
                            />
                          </FormControl>
                          <FormLabel className="space-y-1 leading-none">
                            Item Name 1
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={formForConditions.control}
                      name="conditions.condition2"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              color="primary"
                            />
                          </FormControl>
                          <FormLabel className="space-y-1 leading-none">
                            Item Name 1
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={formForConditions.control}
                      name="conditions.condition3"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              color="primary"
                            />
                          </FormControl>
                          <FormLabel className="space-y-1 leading-none">
                            Item Name 1
                          </FormLabel>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={formForConditions.control}
                      name="conditions.condition4"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              color="primary"
                            />
                          </FormControl>
                          <FormLabel className="space-y-1 leading-none">
                            Item Name 1
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                    <Button
                      type="submit"
                      disabled={isSubmittingExamConditions}
                      className="bg-primary-color1 hover:bg-primary-color2 text-white w-full py-3"
                    >
                      {isSubmittingExamConditions ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save"
                      )}
                    </Button>
                  </form>
                </Form>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700"
            >
              <AccordionTrigger className="h-14 p-1">
                <div className="flex items-center  gap-2 sm:gap-4">
                  <GoChecklist className="text-xl sm:text-2xl text-primary-color1" />
                  <p className="text-sm sm:text-base">
                    Exam Requirments
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent>

              </AccordionContent>
            </AccordionItem>
            <div
              className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700"
            >
              <button onClick={() => {router.push(`${assignment_id}/questions`)}} className="h-14 p-1">
                <div className="flex items-center  gap-2 sm:gap-4">
                  <GoChecklist className="text-xl sm:text-2xl text-primary-color1" />
                  <p className="text-sm sm:text-base">
                    Exam's Questions
                  </p>
                </div>
              </button>
             
            </div>
          </Accordion>
        </div>
      </div>



      <div className="mt-8 px-3 sm:px-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Student Results</h2>
        <StudentResultsTable />
      </div>


      <Modal open={previewOpen} onClose={() => setPreviewOpen(false)} className="">
        <Modal.Header className="">
          <Modal.Title className="text-2xl font-bold">Exam Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2">Sample Question</h3>
              <p className="mb-4">What is the square root of 144?</p>
              <div className="space-y-2">
                <InputGroup>
                  <InputGroup.Addon>A</InputGroup.Addon>
                  <Input value="12" disabled />
                </InputGroup>
                <InputGroup>
                  <InputGroup.Addon>B</InputGroup.Addon>
                  <Input value="14" disabled />
                </InputGroup>
              </div>
            </div>
            <Button
              appearance="primary"
              block
              className="bg-[var(--primary-color1)] hover:bg-[var(--primary-color2)]"
            >
              Submit Answer
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {mode === "dark" && (
        <style>
          {`
.rs-modal-title{
  color: white !important
}
.rs-modal-header-close {
  color: white !important
}
.rs-modal-content {
  color: white !important;
}
.rs-modal-content {
  background-color: #374151 !important;
}
          `}
        </style>
      )}
    </div>
  );
};

export default Page;

const InfoItem = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}) => (
  <div className="flex items-center gap-3 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors max-sm:gap-2 max-sm:p-2">
    <div className="flex items-center gap-2">
      {icon && (
        <span className="text-[var(--primary-color1)] max-sm:[&>svg]:w-4 max-sm:[&>svg]:h-4">
          {icon}
        </span>
      )}
      <div className="text-[15px] font-medium text-gray-600 dark:text-gray-400 max-sm:text-[13px]">
        {label}
      </div>
    </div>
    <div className="text-[16px] text-gray-600 dark:text-gray-200 font-semibold  max-sm:text-[12px]">
      {value}
    </div>
  </div>
);
