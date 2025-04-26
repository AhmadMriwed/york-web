


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
import { CiCalendarDate, CiExport, CiTimer } from "react-icons/ci";
import { IoMdMore } from "react-icons/io";
import { BiSelectMultiple } from "react-icons/bi";


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
import { IoArrowBackSharp } from "react-icons/io5";
import { FaArrowRight, FaCalendarAlt, FaCheckCircle, FaClock, FaLanguage, FaQuestionCircle, FaRedo, FaRegNewspaper } from "react-icons/fa";
import { RiSlideshowLine } from "react-icons/ri";
import { AiOutlineFieldTime } from "react-icons/ai";
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
  const { id, assignment_id } = useParams();
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const router = useRouter();


  const fakeExamData =
  {
    id: 1,
    examTime: "2 Hours",
    resultsDisplay: "Manual",
    examDate: "2023-06-15",
    examType: "Multiple Choice",
    questionsPerPage: "5 Questions",
    timePerPage: "10 Minutes",
    requireAnswerBeforeNext: true,
    examRepeatCount: "3 Attempts",
    examLanguage: "English",
    displayCorrectionLadder: "Manual"
  };


  const [isSubmittingExamConditions, setIsSubmittingExamConditions] = useState(false);
  const [isSubmittingExamRequirments, setIsSubmittingExamRequirments] = useState(false);
  const [isSubmittingExamSettings, setIsSubmittingExamSettings] = useState(false);
  const [isEdittingExamSettings, setIsEdittingExamSettings] = useState(false);
  const [isEdittingExamConditions, setIsEdittingExamConditions] = useState(false);
  const [isEdittingExamRequirments, setIsEdittingExamRequirments] = useState(false);
  const [isThereAddFieldForExamRequirments, setIsThereAddFieldForExamRequirments] = useState(false);

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

  const editExamRequirmentsSchema = z.object({
    label: z.string().min(1, 'Label is required'),
    type: z.string().min(1, 'Type is required')
  })
  type RequirmentsFormValue = z.infer<typeof editExamRequirmentsSchema>;

  const formForRequirments = useForm<RequirmentsFormValue>({
    resolver: zodResolver(editExamRequirmentsSchema),
    defaultValues: {
      label: "",
      type: ""
    }
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
  const onSubmitExamRequirments = async (values: RequirmentsFormValue) => {
    setIsSubmittingExamRequirments(true);
    try {
      const submissionData = {
        ...values,
      };

      console.log("Form submitted:", submissionData);
      formForRequirments.reset();

    } catch (error) {
      console.error("Failed to create assignment:", error);
    } finally {
      setIsSubmittingExamRequirments(false);
      setIsThereAddFieldForExamRequirments(false);
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
    <div className={`relative px-1 sm:p-4  min-h-screen  ${mode === "dark" ? " text-white" : " text-dark"}`}>
      <div className="absolut w-full h-full bg-white opacity-50 dark:opacity-60 dark:bg-dark " />
      <div className="flex justify-between items-start mb-5 pt-2">
        <Header className="flex justify-start items-center gap-2 max-sm:pt-1 max-sm:px-3 text-[var(--primary-color1)] hover:text-[var(--primary-color2)]">
          <IoArrowBackSharp
            className="text-primary-color1 text-xl sm:text-2xl cursor-pointer"

            onClick={() => router.back()}
          />
          <h3 className="text-[21px] sm:text-2xl font-semibold tracking-wider">Exam Details</h3>
        </Header>
      </div>
      <div className="flex flex-col  gap-5 xl:grid xl:grid-cols-4  ">


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
                { icon: <EditIcon className="text-primary-color1 size-5 max-sm:size-4" />, text: "Edit", action: () => router.push(`/admin/dashboard/assignments/assignment-session/${id}/assignments/${assignment_id}/updateAssignment`) },
                { icon: <TrashIcon className="text-primary-color1 size-5 max-sm:size-4" />, text: "Delete", action: () => { } },
                { icon: <CiExport className="text-primary-color1 size-5 max-sm:size-4" />, text: "Export to Excel", action: () => { } },
                { icon: <PiToggleRightFill className="text-primary-color1 size-5 max-sm:size-4" />, text: exam.status === "Active" ? "Deactivate" : "Activate", action: () => { } },
                { icon: <MdVisibility className="text-primary-color1 size-5 max-sm:size-4" />, text: "Preview Exam", action: () => { } }
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

          <div className=" px-6 grid grid-cols-1 sm:grid-cols-7 gap-6 max-sm:px-4 max-sm:gap-4 pt-4">

            <div className="sm:col-span-3 ">
              <Image
                src={exam.image}
                alt="Exam Image"
                width={600}
                height={600}
                className="object-cover rounded-lg"
                priority
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
                    { icon: <View className="text-primary-color1 size-5 max-sm:size-4" />, text: "Show More", action: () => router.push(`/admin/dashboard/assignments/assignment-session/${id}/assignments/${assignment_id}/start-interface`) },
                    { icon: <EditIcon className="text-primary-color1 size-5 max-sm:size-4" />, text: "Edit", action: () => {/* Edit logic */ } },
                    { icon: <TrashIcon className="text-primary-color1 size-5 max-sm:size-4" />, text: "Delete", action: () => {/* Delete logic */ } },

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
                <Image
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
                    { icon: <View className="text-primary-color1 size-5 max-sm:size-4" />, text: "Show More", action: () => router.push(`/admin/dashboard/assignments/assignment-session/${id}/assignments/${assignment_id}/end-interface`) },
                    { icon: <EditIcon className="text-primary-color1 size-5 max-sm:size-4" />, text: "Edit", action: () => { } },
                    { icon: <TrashIcon className="text-primary-color1 size-5 max-sm:size-4" />, text: "Delete", action: () => { } },

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
                <Image
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

        <div className="xl:col-span-1 ">
          <Accordion
            type="single"
            collapsible
            className="w-full  space-x-2 max-xl:grid max-xl:grid-cols-2 max-lg:grid-cols-1"
          >

            <AccordionItem
              value="item-1"
              className="bg-white mt-4 xl:mt-0 sm:mx-1  dark:bg-gray-900 px-4 py-3  rounded-lg shadow border border-gray-200 dark:border-gray-700"
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
                {isEdittingExamSettings ? (
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
                        <div className="flex items-center justify-end mt-3">



                          <Button
                            type="submit"
                            appearance="primary"
                            className="py-0 !bg-primary-color1 !px-4"
                          >
                            {isSubmittingExamSettings ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                <h4 className="tracking-wide py-0 my-0">Saving...</h4>
                              </>
                            ) : (
                              <h4 className="tracking-wide py-0 my-0">Save</h4>
                            )}
                          </Button></div>
                      </div>
                    </form>
                  </Form>
                ) : (

                  <div className="grid grid-cols-1 gap-6 pt-4">

                    <div className="flex items-center space-x-4">
                      <div className="p-[6px] bg-gray-100 dark:bg-gray-600 rounded-lg">
                        <CiTimer className="text-lg " />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Exam Time</p>
                        <p className="text-gray-900 font-medium dark:text-gray-100">{fakeExamData.examTime}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="p-[6px] bg-gray-100 dark:bg-gray-600 rounded-lg">
                        <RiSlideshowLine className="text-lg " />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Results Display</p>
                        <p className="text-gray-900 font-medium dark:text-gray-100">{fakeExamData.resultsDisplay}</p>
                      </div>
                    </div>


                    <div className="flex items-center space-x-4">
                      <div className="p-[6px] bg-gray-100 dark:bg-gray-600 rounded-lg">
                        <CiCalendarDate className="text-lg" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Exam Date</p>
                        <p className="text-gray-900 font-medium dark:text-gray-100">{fakeExamData.examDate}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="p-[6px] bg-gray-100 dark:bg-gray-600 rounded-lg">
                        <BiSelectMultiple className="text-lg" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Exam Type</p>
                        <p className="text-gray-900 font-medium dark:text-gray-100">{fakeExamData.examType}</p>
                      </div>
                    </div>


                    <div className="flex items-center space-x-4">
                      <div className="p-[6px] bg-gray-100 dark:bg-gray-600 rounded-lg">
                        <FaRegNewspaper className="text-lg" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Questions Per Page</p>
                        <p className="text-gray-900 font-medium dark:text-gray-100">{fakeExamData.questionsPerPage}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="p-[6px] bg-gray-100 dark:bg-gray-600 rounded-lg">
                        <AiOutlineFieldTime className="text-lg" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Time Per Page</p>
                        <p className="text-gray-900 font-medium dark:text-gray-100">{fakeExamData.timePerPage}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="p-[6px] bg-gray-100 dark:bg-gray-600 rounded-lg">
                        <FaRedo className="text-lg " />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Exam Repeat Count</p>
                        <p className="text-gray-900 font-medium dark:text-gray-100">{fakeExamData.examRepeatCount}</p>
                      </div>
                    </div>

                    {/* Exam Language */}
                    <div className="flex items-center space-x-4">
                      <div className="p-[6px] bg-gray-100 dark:bg-gray-600 rounded-lg">
                        <FaLanguage className="text-lg" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Exam Language</p>
                        <p className="text-gray-900 font-medium dark:text-gray-100">{fakeExamData.examLanguage}</p>
                      </div>
                    </div>

                    {/* Display Correction Ladder */}
                    <div className="flex items-center space-x-4">
                      <div className="p-[6px] bg-gray-100 dark:bg-gray-600 rounded-lg">
                        <FaCheckCircle className="text-lg" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Display Correction Ladder</p>
                        <p className="text-gray-900 font-medium dark:text-gray-100">{fakeExamData.displayCorrectionLadder}</p>
                      </div>
                    </div>


                    <div className="flex justify-end mt-3">
                      <Button
                        appearance="primary"
                        className="py-0 !bg-primary-color1 !px-4"
                        onClick={() => setIsEdittingExamSettings(true)}
                      >
                        <h4 className="tracking-wide py-0 my-0">Edit</h4>

                      </Button>
                    </div>
                  </div>


                )}



              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-2"
              className="bg-white dark:bg-gray-900 px-4 py-3  rounded-lg shadow border border-gray-200 dark:border-gray-700"
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
                {isEdittingExamConditions ? (
                  <Form {...formForConditions}>
                    <form onSubmit={formForConditions.handleSubmit(onSubmitExamConditions)} className="space-y-6 mt-2">
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
                      <div className="flex items-center justify-end mt-3">

                        <Button
                          type="submit"
                          appearance="primary"
                          className="py-0 !bg-primary-color1 !px-4"
                        >
                          {isSubmittingExamConditions ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              <h4 className="">Saving...</h4>
                            </>
                          ) : (
                            <h4 className="">Save</h4>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                ) : (
                  <div className="mt-2 flex flex-col gap-y-1">
                    <p>exam condition 1</p>
                    <p>exam condition 1</p>
                    <p>exam condition 1</p>
                    <div className="flex items-center justify-end mt-3">

                      <Button
                        appearance="primary"
                        className="py-0 !bg-primary-color1 !px-4"
                        onClick={() => setIsEdittingExamConditions(true)}
                      >
                        <h4 className="tracking-wide py-0 my-0">Edit</h4>

                      </Button>
                    </div>
                  </div>
                )}

              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="bg-white dark:bg-gray-900 px-4 py-3  rounded-lg shadow border border-gray-200 dark:border-gray-700"
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
                {
                  isEdittingExamRequirments ? (<div>

                    <div className="">

                      <table className="w-[400px] xl:w-full border-none">
                        <tbody className="divide-y divide-gray-300  dark:divide-gray-600">

                          <tr className="">
                            <th className="px-3 py-3 xl:px-2  text-left font-medium  border-none">Id</th>
                            <td className="px-3 py-3 xl:px-2  text-left  border-none">number</td>
                            <td className="px-3 py-3 xl:px-2  text-left  border-none">    <TrashIcon className="size-4 text-red-500" /></td>
                          </tr>

                          <tr className="">
                            <th className="px-3 py-3 xl:px-2  text-left font-medium  border-none">First Name</th>
                            <td className="px-3 py-3 xl:px-2  text-left  border-none">text field</td>
                            <td className="px-3 py-3 xl:px-2  text-left  border-none">    <TrashIcon className="size-4 text-red-500" /></td>

                          </tr>

                          <tr className="">
                            <th className="px-3 py-3 xl:px-2  text-left font-medium  border-none">Last Name</th>
                            <td className="px-3 py-3 xl:px-2  text-left  border-none">text field</td>
                            <td className="px-3 py-3 xl:px-2  text-left  border-none">    <TrashIcon className="size-4 text-red-500" /></td>

                          </tr>

                          <tr className="">
                            <th className="px-3 py-3 xl:px-2  text-left font-medium  border-none">Email</th>
                            <td className="px-3 py-3 xl:px-2  text-left  border-none">text field</td>
                            <td className="px-3 py-3 xl:px-2  text-left  border-none">    <TrashIcon className="size-4 text-red-500" /></td>

                          </tr>
                        </tbody>
                      </table>

                      {isThereAddFieldForExamRequirments &&
                        <Form {...formForRequirments}>
                          <form onSubmit={formForRequirments.handleSubmit(onSubmitExamRequirments)} className="space-y-4 mt-3">
                            <FormField
                              control={formForRequirments.control}
                              name="label"
                              render={({ field }) => (
                                <FormItem>
                                  <FormControl>
                                    <Input
                                      type="text"
                                      placeholder="Label"
                                      {...field}
                                      className="dark:bg-gray-800"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={formForRequirments.control}
                              name="type"
                              render={({ field }) => (
                                <FormItem>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue="text field"
                                  >
                                    <FormControl>
                                      <SelectTrigger className="dark:bg-gray-800">
                                        <SelectValue placeholder="Select option" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="dark:!bg-gray-800">
                                      <SelectItem value="text field" className="dark:!bg-gray-800">
                                        text field
                                      </SelectItem>

                                      <SelectItem value="text area">
                                        text area
                                      </SelectItem>
                                      <SelectItem value="drop-down list">
                                        drop-down list
                                      </SelectItem>
                                      <SelectItem value="number">number</SelectItem>
                                      <SelectItem value="email address">email address</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="flex items-center justify-end mt-3">
                              <Button
                                type="submit"
                                appearance="primary"
                                className="py-0 !bg-primary-color1 !px-4"
                              >
                                <h4 className="tracking-wide py-0 my-0">Add</h4>

                              </Button>
                            </div>
                          </form>
                        </Form>} {!isThereAddFieldForExamRequirments &&
                      <div className="w-full flex items-center justify-end mt-4 gap-3">
                       
                          <Button

                            onClick={() => { isThereAddFieldForExamRequirments ? setIsThereAddFieldForExamRequirments(false) : setIsThereAddFieldForExamRequirments(true) }}
                            appearance="primary"
                            className="py-0 !bg-primary-color1 !px-4"
                          >
                            <h4 className="tracking-wide py-0 my-0">Add Field</h4>

                          </Button>


                        <Button
                          appearance="primary"
                          className="py-0 !bg-primary-color1 !px-4"
                          onClick={() => { setIsEdittingExamRequirments(false); setIsThereAddFieldForExamRequirments(false) }}

                        >
                          <h4 className="tracking-wide py-0 my-0">Done</h4>

                        </Button>

                      </div>
                        }
                    </div>
                  </div>) : (
                    <div>
                      <div className="pr-5">

                        <table className="w-[300px] xl:w-full border-none">
                          <tbody className="divide-y divide-gray-300  dark:divide-gray-600">

                            <tr className="">
                              <th className="px-3 py-3 xl:px-2 text-left font-medium  border-none">Id</th>
                              <td className="px-3 py-3 xl:px-2 text-right  border-none">number</td>
                            </tr>

                            <tr className="">
                              <th className="px-3 py-3 xl:px-2 text-left font-medium  border-none">First Name</th>
                              <td className="px-3 py-3 xl:px-2 text-right  border-none">text field</td>
                            </tr>

                            <tr className="">
                              <th className="px-3 py-3 xl:px-2 text-left font-medium  border-none">Last Name</th>
                              <td className="px-3 py-3 xl:px-2 text-right  border-none">text field</td>
                            </tr>

                            <tr className="">
                              <th className="px-3 py-3 xl:px-2 text-left font-medium  border-none">Email</th>
                              <td className="px-3 py-3 xl:px-2 text-right  border-none">text field</td>
                            </tr>
                          </tbody>
                        </table>

                      </div>
                      <div className="flex items-center justify-end mt-3">

                        <Button
                          appearance="primary"
                          className="py-0 !bg-primary-color1 !px-4"
                          onClick={() => setIsEdittingExamRequirments(true)}
                        >
                          <h4 className="tracking-wide py-0 my-0">Edit</h4>

                        </Button>
                      </div>
                    </div>

                  )
                }
              </AccordionContent>
            </AccordionItem>
            <div
              className="bg-white dark:bg-gray-900 px-4 py-3  rounded-lg shadow border border-gray-200 dark:border-gray-700"
            >
              <button onClick={() => { router.push(`/admin/dashboard/assignments/assignment-session/${id}/assignments/${assignment_id}/questions`) }} className="h-14 p-1">
                <div className="flex items-center  gap-2 sm:gap-4">
                  <GoChecklist className="text-xl sm:text-2xl text-primary-color1" />
                  <p className="text-sm sm:text-base">
                    Exam&apos;s Questions
                  </p>
                </div>
              </button>

            </div>
          </Accordion>
        </div>
      </div>



      <div className="mt-8 ">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Student Results</h2>
        <StudentResultsTable />
      </div>



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


const CustomButton = ({ title }: { title: string }) => {
  return (
    <Button appearance="subtle" className="">
      <h3>{title}</h3>
    </Button>
  )
}