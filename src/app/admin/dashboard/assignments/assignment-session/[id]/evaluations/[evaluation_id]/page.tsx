"use client";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import "@/components/assignments/assignmentSessionA/assignmentSessionAdd/style.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button, Input, InputGroup, Header } from "rsuite";
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
  EyeIcon,
  Link,
} from "lucide-react";
import { GoChecklist } from "react-icons/go";
import { Dropdown, IconButton } from "rsuite";
import { More } from "@rsuite/icons";
import { PiToggleRightFill } from "react-icons/pi";
import { CiCalendarDate, CiExport, CiTimer } from "react-icons/ci";
import { IoMdMore } from "react-icons/io";
import dayjs from "dayjs";
import {
  MdTitle,
  MdSubtitles,
  MdCategory,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import StudentResultsTable from "@/components/assignments/assignmentSessionA/StudentResultsTable ";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Control, FieldValues, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiFlag, FiPlay, FiPlus } from "react-icons/fi";
import { IoArrowBackSharp } from "react-icons/io5";
import { FaCheckCircle, FaRedo, FaRegNewspaper } from "react-icons/fa";

import { AiOutlineFieldTime } from "react-icons/ai";
import {
  deleteEndForm,
  deleteEvaluation,
  deleteStartForm,
  changeEvaluationStatus,
  fetchEvaluationById,
  updateEvaluationSettings,
  generateUrl,
  getEvaluationUsers,
  generateUrlForTrainer,
  getTrainees,
} from "@/lib/action/evaluation_action";

import Loading from "@/components/Pars/Loading";
import { toast } from "sonner";
import { Evaluation } from "@/types/adminTypes/assignments/assignExamTypes";
import CustomFormField, {
  FormFieldType,
} from "@/components/review/CustomFormField";
import ImageUploader from "@/components/upload/ImageUploader";
import { Modal, TimePicker } from "antd";
import { createEndFormF, createStartFormF } from "@/lib/action/exam_action";
import { Snippet } from "@heroui/react";
import AddNewStudentModal from "@/components/assignments/AddStudentModal";
import { StudentDataType } from "@/types/adminTypes/evaluation/evaluationTypes";
import TraineesTable from "@/components/assignments/TraineesTable";
import TrainerTable from "@/components/assignments/TrainerTable";

const RenderIconButton = (props: any, ref: any) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  return (
    <IconButton
      {...props}
      ref={ref}
      icon={<More className="size-6 max-sm:size-5" />}
      size="lg"
      circle
      className={`${
        mode === "dark"
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
      className={`${
        mode === "dark"
          ? "!text-[var(--light-bg-color)]"
          : "!text-[var(--dark-color)]"
      } !bg-transparent hover:!bg-gray-100 dark:hover:!bg-gray-700 transition-colors`}
    />
  );
};
const editExamSettingsSchema = z.object({
  count_questions_page: z.number().min(1),

  view_results: z.enum(["after_completion", "manually", "after_each_answer"]),
  view_answer: z.enum(["after_completion", "manually", "after_each_answer"]),
  count_return_exam: z.number().min(0),
});

const Page = () => {
  const { id, evaluation_id } = useParams();
  const [assignmentData, setAssignmentData] = useState<Evaluation | null>(null);
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const [isExamStatusChanged, setIsExamStatusChanged] = useState(false);
  const [isExamDeleted, setIsExamDeleted] = useState(false);
  const [isViewAnsersChanged, setIsViewAnswersChanged] = useState(false);
  const [isStartFormDeleted, setIsStartFormDeleted] = useState(false);
  const [isEndFormDeleted, setIsEndFormDeleted] = useState(false);
  const [isThereErrorWhileFetchData, setIsThereErrorWhileFetchData] =
    useState(false);
  const [refetchStudensResults, setRefetchStudentsResult] = useState(false);

  const [showAddStartingInterfaceModal, setShowAddStartingInterfaceModal] =
    useState<boolean>(false);

  const [isAddStudentModalOpen, setIsAddStudentModalOpen] =
    useState<boolean>(false);

  const [examUsers, setExamUsers] = useState();

  const [isSubmittingExamSettings, setIsSubmittingExamSettings] =
    useState(false);
  const [isEdittingExamSettings, setIsEdittingExamSettings] = useState(false);
  const [trainees, setTrainees] = useState<StudentDataType[]>([]);

  const [
    openGenerateTraineeEvaluationUrlModal,
    setOpenGenerateTraineeEvaluationUrlModal,
  ] = useState(false);

  const [isSuccessGenerateUrl, setIsSuccessGenerateUrl] = useState(false);

  const [showAddEndingInterfaceModal, setShowAddEndingInterfaceModal] =
    useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        if (!id) {
          throw new Error("Missing session ID in URL");
        }
        console.log("try to fetch data");
        const data = await fetchEvaluationById(Number(evaluation_id));
        console.log(data);
        setIsThereErrorWhileFetchData(false);

        if (!data) {
          throw new Error("no data");
        }
        setAssignmentData(data?.data);

        console.log(assignmentData);
      } catch (err) {
        setIsThereErrorWhileFetchData(true);
        setError(
          err instanceof Error ? err.message : "Failed to fetch session"
        );
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [
    isExamDeleted,
    isEndFormDeleted,
    isStartFormDeleted,
    isExamStatusChanged,
    isSuccess,
    isViewAnsersChanged,
    isSuccessGenerateUrl,
  ]);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        if (!id) {
          throw new Error("Missing session ID in URL");
        }
        if (assignmentData?.evaluation_type?.id === 1) {
          const users = await getEvaluationUsers(Number(evaluation_id));
          console.log(users.data);
          setExamUsers(users.data);
        } else {
          const response = await getTrainees(Number(id));

          const responseData = response?.data || [];

          if (!Array.isArray(responseData)) {
            throw new Error("Invalid trainees data format");
          }

          const mappedData = responseData.map((trainee) => ({
            key: trainee.id.toString(),
            id: trainee.id,
            first_name: trainee.first_name || "N/A",
            last_name: trainee.last_name || "N/A",
            id_number: trainee.id_number || "N/A",
            assignment_user_id: trainee.assignment_user_id,
            email: trainee.email || "N/A",
            submission_time:
              trainee.assignment_user?.answers?.[0]?.submission_time,
            duration:
              trainee.assignment_user?.answers?.[0]
                ?.time_to_stay_until_the_answer,
            grade: parseFloat(trainee.assignment_user?.grade || "0"),
            correct_answers_count:
              trainee.assignment_user?.correct_answers_count || 0,
            wrong_answers_count:
              trainee.assignment_user?.wrong_answers_count || 0,
            status: trainee.status || "Not Started",
            answers: trainee.assignment_user?.answers || [],
          }));

          setTrainees(mappedData);
        }

        console.log(assignmentData);
      } catch (err) {
        setIsThereErrorWhileFetchData(true);
        setError(
          err instanceof Error ? err.message : "Failed to fetch session"
        );
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [assignmentData?.evaluation_type?.id, refetchStudensResults]);

  type FormValues = z.infer<typeof editExamSettingsSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(editExamSettingsSchema),
    defaultValues: {
      count_questions_page: 1,
      // time_questions_page: "00:00",
      view_results: "manually",
      view_answer: "manually",
      count_return_exam: 0,
    },
  });

  useEffect(() => {
    if (assignmentData) {
      const { evaluation_config } = assignmentData;
      form.reset({
        count_questions_page: evaluation_config?.count_questions_page,

        view_results: evaluation_config?.view_results as
          | "after_completion"
          | "manually"
          | "after_each_answer",
        view_answer: evaluation_config?.view_answer as
          | "after_completion"
          | "manually"
          | "after_each_answer",
        count_return_exam: evaluation_config?.count_return_exam,
      });
    }
  }, [assignmentData, form]);

  const onSubmitExamSittings = async (values: FormValues) => {
    setIsSubmittingExamSettings(true);
    try {
      const payload = {
        ...values,
        exam_id: null,
        evaluation_id: Number(evaluation_id),
        condition_exams_id: null,
        old_condition_exams_id: null,
      };
      console.log(payload);
      console.log(assignmentData?.evaluation_config.id);
      const response = await updateEvaluationSettings(
        payload,
        Number(assignmentData?.evaluation_config.id)
      );
      console.log("API Response:", response);

      toast.success("Settings updated successfully", {
        description: "The evaluation settings has been updated successfully.",
        duration: 4000,
      });
      setIsEdittingExamSettings(false);
      setIsSuccess(!isSuccess);
    } catch (error: any) {
      console.error("Submission Error:", error);
      toast.error("Oops! Something went wrong", {
        description: error.message,
        duration: 5000,
      });
    } finally {
      setIsSubmittingExamSettings(false);
    }
  };
  const changgeExamStatus = async () => {
    const toastId = toast.loading("changing evaluation status ...");
    try {
      const response = await changeEvaluationStatus(Number(evaluation_id));
      console.log("API Response:", response);

      toast.success("Status updated successfully", {
        description: "The evaluation status has been updated successfully.",
        duration: 4000,
        id: toastId,
      });
      setIsExamStatusChanged((prev) => !prev);
    } catch (error: any) {
      console.error("Submission Error:", error);
      toast.error("Oops! Something went wrong", {
        description: error.message,
        duration: 5000,
        id: toastId,
      });
    } finally {
    }
  };

  const deletteExam = async () => {
    try {
      const response = await deleteEvaluation(Number(evaluation_id));
      console.log("API Response:", response);

      toast.success("Evaluation deleted successfully", {
        description: "The evaluation has been deleted successfully.",
        duration: 4000,
      });
      setIsExamDeleted((prev) => !prev);
    } catch (error: any) {
      console.error("Submission Error:", error);
      toast.error("Oops! Something went wrong", {
        description: error.message,
        duration: 5000,
      });
    } finally {
    }
  };

  const deletteStartForm = async (id: number) => {
    if (id) {
      const toastId = toast.loading("deleting start form ...");
      try {
        const response = await deleteStartForm(Number(id));
        console.log("API Response:", response);

        toast.success("Start Form deleted successfully", {
          id: toastId,
          description: "The Start from  has been deleted successfully.",
          duration: 4000,
        });
        setIsStartFormDeleted((prev) => !prev);
      } catch (error: any) {
        console.error("Submission Error:", error);
        toast.error("Oops! Something went wrong", {
          id: toastId,
          description: error.message,
          duration: 5000,
        });
      } finally {
      }
    }
  };
  const deletteEndForm = async (id: number) => {
    if (id) {
      const toastId = toast.loading("deleting start form ...");
      try {
        const response = await deleteEndForm(Number(id));
        console.log("API Response:", response);

        toast.success("End Form deleted successfully", {
          id: toastId,
          description: "The End from  has been deleted successfully.",
          duration: 4000,
        });
        setIsEndFormDeleted((prev) => !prev);
      } catch (error: any) {
        console.error("Submission Error:", error);
        toast.error("Oops! Something went wrong", {
          id: toastId,
          description: error.message,
          duration: 5000,
        });
      } finally {
      }
    }
  };

  const generate = async () => {
    const toastId = toast.loading("generating url ...");
    try {
      const response = await generateUrl(Number(evaluation_id));
      console.log("API Response:", response);

      toast.success("URL has been created  successfully", {
        duration: 300,
        id: toastId,
      });
      setIsSuccessGenerateUrl((prev) => !prev);
    } catch (error: any) {
      console.error("Submission Error:", error);
      toast.error("Oops! Something went wrong", {
        description: error.message,
        duration: 5000,
        id: toastId,
      });
    } finally {
    }
  };

  return (
    <div
      className={`relative px-1 sm:p-4  min-h-screen  ${
        mode === "dark" ? " text-white" : " text-dark"
      }`}
    >
      <div className="absolut w-full h-full bg-white opacity-50 dark:opacity-60 dark:bg-dark " />
      <div className="flex justify-between items-start mb-5 pt-2">
        <Header className="flex justify-start items-center gap-2 max-sm:pt-1 max-sm:px-3 text-[var(--primary-color1)] hover:text-[var(--primary-color2)]">
          <IoArrowBackSharp
            className="text-primary-color1 text-xl sm:text-xl cursor-pointer"
            onClick={() => router.back()}
          />
          <h3 className="text-[21px] sm:text-2xl font-semibold tracking-wider">
            Evaluation Details
          </h3>
        </Header>
      </div>

      {loading ? (
        <Loading />
      ) : isThereErrorWhileFetchData ? (
        <div className="flex justify-center my-20  ">
          <h1 className="sm:text-2xl">No Data To Display</h1>
        </div>
      ) : (
        <>
          <div className="flex flex-col  gap-5 xl:grid xl:grid-cols-4  ">
            <div
              className={`rounded-xl col-span-3 shadow-lg ${
                mode === "dark" ? "bg-gray-900" : "bg-white"
              } max-sm:rounded-lg pb-5`}
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col items-start justify-start  pb-3 sm:py-2 px-5 max-sm:px-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-start gap-2">
                      <MdTitle className="w-6 h-6 text-primary-color1 max-sm:w-4 max-sm:h-4" />
                      <h1 className="text-[17px]  line-clamp-1 sm:text-[22px] font-bold">
                        {assignmentData?.title}
                      </h1>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        assignmentData?.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {assignmentData?.status}
                    </span>
                  </div>
                  <div className="flex flex-col items-start justify-start pl-2 sm:pl-3 -mt-5 sm:-mt-3 sm:gap-1">
                    {assignmentData?.sub_title && (
                      <div className="flex items-center justify-center gap-2">
                        <MdSubtitles className="w-5 h-5 text-primary-color1 max-sm:w-4 max-sm:h-4" />
                        <h4 className="text-[15px] sm:text-[17px] font-medium text-gray-700 dark:text-gray-300 ">
                          {assignmentData?.sub_title}
                        </h4>
                      </div>
                    )}

                    {assignmentData?.code && (
                      <div className="flex items-center justify-center gap-2 -mt-1 sm:mt-0">
                        <Hash className="w-4 h-4 text-primary-color1 max-sm:w-4 max-sm:h-4" />
                        <p className="text-[12px] sm:text-sm text-gray-500">
                          {assignmentData?.code}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <Dropdown
                  renderToggle={RenderIconButton}
                  placement="bottomEnd"
                  className="[&_.dropdown-menu]:min-w-[220px] pr-3 max-sm:[&_.dropdown-menu]:min-w-[180px] max-sm:pr-1"
                >
                  {[
                    {
                      icon: <EditIcon className=" size-5 max-sm:size-4" />,
                      text: "Edit",
                      action: () =>
                        router.push(
                          `/admin/dashboard/assignments/assignment-session/${id}/evaluations/${evaluation_id}/updateEvaluation`
                        ),
                    },
                    {
                      icon: (
                        <TrashIcon className=" text-red-500 hover:text-red-700 size-5 max-sm:size-4" />
                      ),
                      text: "Delete",
                      action: () => {
                        deletteExam();
                      },
                    },
                    // ...(assignmentData?.evaluation_config?.view_answer !==
                    // "manually"
                    //   ? [
                    //       {
                    //         icon: (
                    //           <input
                    //             type="checkbox"
                    //             onChange={() => EditeAnswersView()}
                    //             className="size-5 max-sm:size-4 accent-primary-color1"
                    //           />
                    //         ),
                    //         text: "Answers View",
                    //         action: () => {},
                    //       },
                    //     ]
                    //   : []),

                    {
                      icon: (
                        <PiToggleRightFill className=" size-5 max-sm:size-4" />
                      ),
                      text:
                        assignmentData?.status === "Active"
                          ? "Deactivate"
                          : "Activate",
                      action: () => {
                        changgeExamStatus();
                      },
                    },

                    {
                      icon: <Link className=" size-5 max-sm:size-4" />,
                      text: "Generate Url",
                      action: () => {
                        assignmentData?.evaluation_type.id === 1
                          ? generate()
                          : setOpenGenerateTraineeEvaluationUrlModal(true);
                      },
                    },
                  ].map((item, index) => (
                    <Dropdown.Item
                      key={index}
                      className="!flex !items-center !px-3 !py-3 text-lg transition-colors max-sm:!px-2 max-sm:!py-3 gap-3 max-sm:text-[16px]"
                      onClick={item.action}
                    >
                      {item.icon}
                      <span className="max-sm:text-[16px] text-[17px]">
                        {item.text}
                      </span>
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              </div>
              <GenerateTraineeEvaluationUrlModal
                setIsSuccessGenerateUrl={setIsSuccessGenerateUrl}
                isModalOpen={openGenerateTraineeEvaluationUrlModal}
                setIsModalOpen={setOpenGenerateTraineeEvaluationUrlModal}
              />

              <div className=" px-6 grid grid-cols-1 sm:grid-cols-8 gap-6 max-sm:px-4 max-sm:gap-4 pt-4">
                <div className="max-sm:px-4 max-sm:py-2 sm:col-span-3 ">
                  <Image
                    src={
                      assignmentData?.image
                        ? `${process.env.NEXT_PUBLIC_ASSIGNMENT_STORAGE_URL}/${assignmentData?.image}`
                        : "/register.png"
                    }
                    alt="Evaluation Image"
                    width={400}
                    height={200}
                    className="object-cover aspect-[9/6] rounded-lg"
                    priority
                  />
                </div>

                <div className=" sm:col-span-5   space-y-1 sm:space-y-4  ">
                  <InfoItem
                    icon={
                      <Languages className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
                    }
                    label="Language"
                    value={assignmentData?.evaluation_config?.language || " "}
                  />

                  <InfoItem
                    icon={
                      <MdCategory className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
                    }
                    label="Evaluation Type"
                    value={assignmentData?.evaluation_type?.type || " "}
                  />

                  <InfoItem
                    icon={
                      <Calendar className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
                    }
                    label="Start Date"
                    value={`${
                      assignmentData?.evaluation_config?.start_date || " "
                    }`}
                  />
                  <InfoItem
                    icon={
                      <Calendar className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
                    }
                    label="End Date"
                    value={`${
                      assignmentData?.evaluation_config?.end_date || " "
                    }`}
                  />

                  <InfoItem
                    icon={
                      <ListOrdered className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
                    }
                    label="Questions"
                    value={`${assignmentData?.number_of_questions || "0"}`}
                  />

                  <div className="flex items-center gap-3 md:gap-4">
                    <InfoItem
                      icon={<Users className="w-5 h-5 max-sm:w-4 max-sm:h-4" />}
                      label="Students"
                      value={`${(examUsers || []).length}`}
                    />

                    <InfoItem
                      icon={
                        <Percent className="w-5 h-5 max-sm:w-4 max-sm:h-4" />
                      }
                      label="Passing "
                      value={`${assignmentData?.grade_percentage}%`}
                    />
                  </div>

                  {assignmentData?.evaluation_type.id === 1 &&
                    assignmentData?.url && (
                      <Snippet
                        symbol=""
                        variant="bordered"
                        className="pb-2 hide-scrollbar"
                        onCopy={() => {
                          navigator.clipboard.writeText(
                            `https://york-web-wheat.vercel.app/evaluations/trainer/${assignmentData?.url}`
                          );
                          return false;
                        }}
                      >
                        {assignmentData?.url}
                      </Snippet>
                    )}
                  {assignmentData?.evaluation_type.id === 2 &&
                    assignmentData?.url && (
                      <Snippet
                        symbol=""
                        variant="bordered"
                        className="pb-2 hide-scrollbar"
                        onCopy={() => {
                          navigator.clipboard.writeText(
                            `https://york-web-wheat.vercel.app/evaluations/trainee/${assignmentData?.url}`
                          );
                          return false;
                        }}
                      >
                        {assignmentData?.url}
                      </Snippet>
                    )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 xl:px-10 p-1.5 mt-8 sm:mt-16 px-4 xl:gap-7 sm:px-6 ">
                {assignmentData?.start_forms[0]?.id ? (
                  <div className="relative bg-white dark:bg-gray-800 p-4 sm:p-6 pt-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl mr-3 sm:mr-4">
                        <FiPlay className="text-blue-600 dark:text-blue-300 text-xl sm:text-2xl" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white">
                          {assignmentData?.start_forms[0]?.title}
                        </h3>
                        <div className="absolute right-2 top-2">
                          <Dropdown
                            renderToggle={VerticalRenderIconButton}
                            placement="bottomEnd"
                            className="[&_.dropdown-menu]:min-w-[220px] pr-3 max-sm:[&_.dropdown-menu]:min-w-[180px] max-sm:pr-1"
                          >
                            {[
                              {
                                icon: (
                                  <EditIcon className="text-primary-color1 size-5 max-sm:size-4" />
                                ),
                                text: "Edit",
                                action: () =>
                                  router.push(
                                    `/admin/dashboard/assignments/assignment-session/${id}/evaluations/${evaluation_id}/start-interface/${assignmentData?.start_forms[0]?.id}/update`
                                  ),
                              },
                              {
                                icon: (
                                  <TrashIcon className="text-red-500 size-5 max-sm:size-4" />
                                ),
                                text: "Delete",
                                action: () => {
                                  if (assignmentData)
                                    deletteStartForm(
                                      Number(assignmentData?.start_forms[0].id)
                                    );
                                },
                              },
                            ].map((item, index) => (
                              <Dropdown.Item
                                key={index}
                                className="!flex !items-center !px-3 !py-3 text-lg transition-colors max-sm:!px-2 max-sm:!py-3 gap-3 max-sm:text-[16px]"
                                onClick={item.action}
                              >
                                {item.icon}
                                <span className="max-sm:text-[16px] text-[17px]">
                                  {item.text}
                                </span>
                              </Dropdown.Item>
                            ))}
                          </Dropdown>
                        </div>
                        <p className="text-blue-500 dark:text-blue-400 text-sm sm:text-base font-medium mt-1">
                          {assignmentData?.start_forms[0]?.sub_title}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                      {assignmentData?.start_forms[0]?.description}
                    </p>
                    <div className="flex items-center justify-end mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700">
                      <button
                        onClick={() => {
                          router.push(
                            `/admin/dashboard/assignments/assignment-session/${id}/evaluations/${evaluation_id}/start-interface/${assignmentData?.start_forms[0]?.id}`
                          );
                        }}
                        type="button"
                        className="w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-color1 hover:bg-primary-color2 text-white rounded-lg"
                      >
                        Show
                      </button>
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
                        <button
                          onClick={() => setShowAddStartingInterfaceModal(true)}
                          type="button"
                          className="px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center mx-auto"
                        >
                          <FiPlus className="mr-2" />
                          Add Starting Interface
                        </button>
                      </div>
                    </div>
                    <AddStartFormInterface
                      isModalOpen={showAddStartingInterfaceModal}
                      setIsModalOpen={setShowAddStartingInterfaceModal}
                      control={form.control}
                      form_id={Number(assignmentData?.forms[0]?.id)}
                      setissucess={setIsSuccess}
                      issucess={isSuccess}
                    />
                  </>
                )}
                {assignmentData?.end_forms[0]?.id ? (
                  <div className="relative bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 h-fit">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="p-2 sm:p-3 bg-green-100 dark:bg-green-900/50 rounded-xl mr-3 sm:mr-4">
                        <FiFlag className="text-green-600 dark:text-green-300 text-xl sm:text-2xl" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white">
                          {assignmentData?.end_forms[0]?.title}
                        </h3>
                        <div className="absolute right-2 top-2">
                          <Dropdown
                            renderToggle={VerticalRenderIconButton}
                            placement="bottomEnd"
                            className="[&_.dropdown-menu]:min-w-[220px] pr-3 max-sm:[&_.dropdown-menu]:min-w-[180px] max-sm:pr-1"
                          >
                            {[
                              {
                                icon: (
                                  <EditIcon className="text-primary-color1 size-5 max-sm:size-4" />
                                ),
                                text: "Edit",
                                action: () =>
                                  router.push(
                                    `/admin/dashboard/assignments/assignment-session/${id}/evaluations/${evaluation_id}/end-interface/${assignmentData?.end_forms[0]?.id}/update`
                                  ),
                              },
                              {
                                icon: (
                                  <TrashIcon className="text-red-500 size-5 max-sm:size-4" />
                                ),
                                text: "Delete",
                                action: () => {
                                  if (assignmentData)
                                    deletteEndForm(
                                      Number(assignmentData?.end_forms[0].id)
                                    );
                                },
                              },
                            ].map((item, index) => (
                              <Dropdown.Item
                                key={index}
                                className="!flex !items-center !px-3 !py-3 text-lg transition-colors max-sm:!px-2 max-sm:!py-3 gap-3 max-sm:text-[16px]"
                                onClick={item.action}
                              >
                                {item.icon}
                                <span className="max-sm:text-[16px] text-[17px]">
                                  {item.text}
                                </span>
                              </Dropdown.Item>
                            ))}
                          </Dropdown>
                        </div>

                        <p className="text-green-500 dark:text-green-400 text-sm sm:text-base font-medium mt-1">
                          {assignmentData?.end_forms[0]?.sub_title}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                      {assignmentData?.end_forms[0]?.description}
                    </p>
                    <div className="flex items-center justify-end  mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-100 dark:border-gray-700">
                      <Button
                        onClick={() => {
                          router.push(
                            `/admin/dashboard/assignments/assignment-session/${id}/evaluations/${evaluation_id}/end-interface/${assignmentData?.end_forms[0]?.id}`
                          );
                        }}
                        type="button"
                        className="w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-primary-color1 hover:bg-primary-color2 text-white rounded-lg"
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
                      form_id={Number(assignmentData?.forms[0]?.id)}
                      setissucess={setIsSuccess}
                      issucess={isSuccess}
                    />
                  </>
                )}
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
                        Evaluation Settings
                      </p>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent>
                    {isEdittingExamSettings ? (
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(onSubmitExamSittings)}
                          className="space-y-6"
                        >
                          <div className="space-y-4 sm:space-y-6 dark:text-white">
                            {/* <FormField
                              control={form.control}
                              name="duration_in_minutes"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Duration in Minutes: </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="text"
                                      placeholder=""
                                      {...field}
                                      onChange={(value) =>
                                        field.onChange(Number(value))
                                      }
                                      className="dark:bg-gray-800"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            /> */}

                            <FormField
                              control={form.control}
                              name="count_questions_page"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Questions Per Page : </FormLabel>

                                  <FormControl>
                                    <Input
                                      type="number"
                                      {...field}
                                      onChange={(value) =>
                                        field.onChange(Number(value))
                                      }
                                      className="dark:bg-gray-800"
                                    />
                                  </FormControl>

                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            {/* <FormField
                              control={form.control}
                              name="time_questions_page"
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
                                          assignmentData?.evaluation_config
                                            ?.time_questions_page || ""
                                        );
                                      }
                                    }}
                                    className="w-full bg-gray-100 dark:bg-gray-700 p-1.5 border-none dark:text-white"
                                  />
                                  <FormMessage />
                                </FormItem>
                              )}
                            /> */}

                            <FormField
                              control={form.control}
                              name="count_return_exam"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>
                                    Evaluation Repeat Count :
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      placeholder="e.g. 3"
                                      {...field}
                                      onChange={(value) =>
                                        field.onChange(Number(value))
                                      }
                                      className="dark:bg-gray-800"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="view_results"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Result View :</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue="manually"
                                  >
                                    <FormControl>
                                      <SelectTrigger className="dark:bg-gray-800">
                                        <SelectValue placeholder="Select option" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="dark:bg-gray-800">
                                      <SelectItem value="after_completion">
                                        After Finish
                                      </SelectItem>
                                      <SelectItem value="manually">
                                        Manually
                                      </SelectItem>
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
                              name="view_answer"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Result View :</FormLabel>
                                  <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue="manually"
                                  >
                                    <FormControl>
                                      <SelectTrigger className="dark:bg-gray-800">
                                        <SelectValue placeholder="Select option" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent className="dark:bg-gray-800">
                                      <SelectItem value="after_completion">
                                        After Finish
                                      </SelectItem>
                                      <SelectItem value="manually">
                                        Manually
                                      </SelectItem>
                                      <SelectItem value="after_each_answer">
                                        After Each Answer
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="flex items-center justify-end mt-3 gap-3">
                              <button
                                className="py-[7px] bg-transparent border-primary-color1 border-1 rounded-[8px]  !px-4"
                                onClick={() => setIsEdittingExamSettings(false)}
                              >
                                Cancel
                              </button>

                              <button
                                type="submit"
                                className="py-0 text-white flex justify-center items-center gap-2 !bg-primary-color1 !px-4 rounded-lg"
                              >
                                {isSubmittingExamSettings ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    <p className="tracking-wide py-2 my-0">
                                      Saving...
                                    </p>
                                  </>
                                ) : (
                                  <p className="tracking-wide py-2 text-white  my-0">
                                    Save
                                  </p>
                                )}
                              </button>
                            </div>
                          </div>
                        </form>
                      </Form>
                    ) : (
                      <div className="grid grid-cols-1 gap-6 pt-4">
                        {/* <div className="flex items-center space-x-4">
                          <div className="p-[6px] bg-gray-100 dark:bg-gray-600 rounded-lg">
                            <CiTimer className="text-lg " />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                              Duration in Minutes
                            </p>
                            <p className="text-gray-900 font-medium dark:text-gray-100">
                              {assignmentData?.duration_in_minutes}
                            </p>
                          </div>
                        </div> */}

                        <div className="flex items-center space-x-4">
                          <div className="p-[6px] bg-gray-100 dark:bg-gray-600 rounded-lg">
                            <FaRegNewspaper className="text-lg" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                              Questions Per Page
                            </p>
                            <p className="text-gray-900 font-medium dark:text-gray-100">
                              {
                                assignmentData?.evaluation_config
                                  ?.count_questions_page
                              }
                            </p>
                          </div>
                        </div>

                        {/* <div className="flex items-center space-x-4">
                          <div className="p-[6px] bg-gray-100 dark:bg-gray-600 rounded-lg">
                            <AiOutlineFieldTime className="text-lg" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                              Time Per Page
                            </p>
                            <p className="text-gray-900 font-medium dark:text-gray-100">
                              {
                                assignmentData?.evaluation_config
                                  ?.time_questions_page
                              }
                            </p>
                          </div>
                        </div> */}

                        <div className="flex items-center space-x-4">
                          <div className="p-[6px] bg-gray-100 dark:bg-gray-600 rounded-lg">
                            <FaRedo className="text-lg " />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                              Evaluation Repeat Count
                            </p>
                            <p className="text-gray-900 font-medium dark:text-gray-100">
                              {
                                assignmentData?.evaluation_config
                                  ?.count_return_exam
                              }
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="p-[6px] bg-gray-100 dark:bg-gray-600 rounded-lg">
                            <FaCheckCircle className="text-lg" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                              Results View
                            </p>
                            <p className="text-gray-900 font-medium dark:text-gray-100">
                              {assignmentData?.evaluation_config?.view_results}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="p-[6px] bg-gray-100 dark:bg-gray-600 rounded-lg">
                            <FaCheckCircle className="text-lg" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                              Answers View
                            </p>
                            <p className="text-gray-900 font-medium dark:text-gray-100">
                              {assignmentData?.evaluation_config?.view_answer}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-end mt-3">
                          <Button
                            appearance="primary"
                            className=" !bg-primary-color1 py-2 !px-4"
                            onClick={() => setIsEdittingExamSettings(true)}
                          >
                            <p className="tracking-wide py-0 my-0">Edit</p>
                          </Button>
                        </div>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>

                {assignmentData?.evaluation_type.id === 1 && (
                  <AccordionItem
                    value="item-3"
                    className="bg-white dark:bg-gray-900 px-4 py-3  rounded-lg shadow border border-gray-200 dark:border-gray-700"
                  >
                    <AccordionTrigger className="h-14 p-1">
                      <div className="flex items-center  gap-2 sm:gap-4">
                        <GoChecklist className="text-xl sm:text-2xl text-primary-color1" />
                        <p className="text-sm sm:text-base">
                          Evaluation Requirments
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="mt-2 flex flex-col gap-y-1">
                        {assignmentData?.field_requirements?.map((r) => {
                          return <p key={r.id}>{r?.name || "Unknown field"}</p>;
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                )}
                <div className="bg-white dark:bg-gray-900 px-4 py-3  rounded-lg shadow border border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => {
                      router.push(
                        `/admin/dashboard/assignments/assignment-session/${id}/evaluations/${evaluation_id}/questions?form_id=${assignmentData?.forms[0]?.id}&configId=${assignmentData?.evaluation_config?.id}&questionsType=${assignmentData?.evaluation_config?.question_type_for_all}`
                      );
                    }}
                    className="h-14 p-1"
                  >
                    <div className="flex items-center  gap-2 sm:gap-4">
                      <GoChecklist className="text-xl sm:text-2xl text-primary-color1" />
                      <p className="text-sm sm:text-base">
                        Evaluation&apos;s Questions
                      </p>
                    </div>
                  </button>
                </div>
              </Accordion>
            </div>
          </div>

          <div className="mt-8 ">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Student Results :
            </h2>
            {assignmentData?.evaluation_type.id === 2 && (
              <div className="w-full flex justify-end mb-4">
                <Button
                  className="bg-primary-color1 hover:!bg-primary-color2 text-white"
                  onClick={() => setIsAddStudentModalOpen(true)}
                >
                  Add student
                </Button>
                <AddNewStudentModal
                  isModalOpen={isAddStudentModalOpen}
                  setIsModalOpen={setIsAddStudentModalOpen}
                  setRefetchStudentsResult={setRefetchStudentsResult}
                />
              </div>
            )}
            {assignmentData?.evaluation_type.id === 2 ? (
              <TraineesTable data={trainees} />
            ) : (
              <TrainerTable data={examUsers} />
            )}
          </div>
        </>
      )}

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
  <div className="flex items-center gap-3 px-3 rounded-lg  transition-colors max-sm:gap-2 max-sm:p-2">
    <div className="flex items-center gap-2">
      {icon && (
        <span className="text-[var(--primary-color1)] max-sm:[&>svg]:w-4 max-sm:[&>svg]:h-4">
          {icon}
        </span>
      )}
      <div className="text-[14px] font-medium text-gray-600 dark:text-gray-400 max-sm:text-[13px]">
        {label}
      </div>
    </div>
    <div className="text-[15px] text-gray-600 dark:text-gray-200 font-semibold  max-sm:text-[12px]">
      {value}
    </div>
  </div>
);

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  control: Control<any>;
  form_id: number;
  setissucess: any;
  issucess: any;
};

const AddEndFormInterface = ({
  isModalOpen,
  setIsModalOpen,
  control,
  form_id,
  setissucess,
  issucess,
}: Props) => {
  const addEndFormSchema = z.object({
    title: z.string(),
    sub_title: z.string().optional(),
    description: z.string().optional(),

    image: z
      .union([z.string().url(), z.instanceof(File)])
      .optional()
      .nullable(),

    url: z.string().optional(),
  });
  type EndFormValues = z.infer<typeof addEndFormSchema>;

  const addendinterfaceform = useForm<EndFormValues>({
    resolver: zodResolver(addEndFormSchema),
    defaultValues: {
      title: "",
      sub_title: "",
      description: "",
      image: null,
      url: "",
    },
  });
  const onSubmit = async (values: EndFormValues) => {
    const toastId = toast.loading("Creating end interface ...");
    try {
      const payload = {
        form_id: form_id,
        ...values,
      };

      const response = await createEndFormF(payload);
      console.log("API Response:", response);

      toast.success("Creating successfully", {
        description: "The end interface has been created successfully.",
        duration: 4000,
        id: toastId,
      });
      setissucess(!issucess);
      setIsModalOpen(false);
      addendinterfaceform.reset();
    } catch (error: any) {
      console.error("Submission Error:", error);
      toast.error("Oops! Something went wrong", {
        description: error.message || "Failed to create form",
        duration: 5000,
        id: toastId,
      });
    }
  };
  return (
    <Modal
      title="Add Interface"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      width={800}
    >
      <Form {...addendinterfaceform}>
        <form
          onSubmit={addendinterfaceform.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={addendinterfaceform.control}
            name="image"
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
              control={addendinterfaceform.control}
              label="Title:"
              name="title"
              placeholder="Enter title"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={addendinterfaceform.control}
              label="Subtitle:"
              name="sub_title"
              placeholder="Enter subtitle"
            />

            <div className="md:col-span-2">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={addendinterfaceform.control}
                label="Description:"
                name="description"
                placeholder="Enter description"
              />
            </div>

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={addendinterfaceform.control}
              label="URL:"
              name="url"
              placeholder="Enter URL"
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="rounded-[8px] hover:text-white px-3 py-[6px] bg-transparent border-1 border-primary-color1 hover:bg-primary-color1"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-white rounded-[8px] px-3 py-[px] bg-primary-color1 hover:bg-primary-color2"
            >
              Submit
            </button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

const AddStartFormInterface = ({
  isModalOpen,
  setIsModalOpen,
  form_id,
  setissucess,
  issucess,
}: Props) => {
  const addStartInterfaceSchema = z.object({
    title: z.string().optional(),
    sub_title: z.string().optional(),
    description: z.string().optional(),
    image: z
      .union([z.string().url(), z.instanceof(File)])
      .optional()
      .nullable(),
    show_configration: z.number().optional(),
    show_condition: z.number().optional(),
  });

  type StartFormValues = z.infer<typeof addStartInterfaceSchema>;

  const form = useForm<StartFormValues>({
    resolver: zodResolver(addStartInterfaceSchema),
    defaultValues: {
      title: "",
      sub_title: "",
      description: "",
      image: null,
      show_configration: 0,
      show_condition: 0,
    },
  });

  const onSubmit = async (values: StartFormValues) => {
    const toastId = toast.loading("Creating start interface ...");
    try {
      const payload = {
        form_id: form_id,
        ...values,
      };

      const response = await createStartFormF(payload);
      console.log("API Response:", response);

      toast.success("Creating successfully", {
        description: "The start interface has been created successfully.",
        duration: 4000,
        id: toastId,
      });
      setissucess(!issucess);
      setIsModalOpen(false);
      form.reset();
    } catch (error: any) {
      console.error("Submission Error:", error);
      toast.error("Oops! Something went wrong", {
        description: error.message || "Failed to create form",
        duration: 5000,
        id: toastId,
      });
    }
  };

  return (
    <Modal
      title="Add Interface"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      width={800}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="mt-4">
            <CustomFormField
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="image"
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
                control={form.control}
                label="Title:"
                name="title"
                placeholder="Enter title"
              />
            </div>

            <div className="md:col-span-1">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                label="Subtitle:"
                name="sub_title"
                placeholder="Enter subtitle"
              />
            </div>
          </div>

          <div className="flex items-start flex-1 mt-4">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              label="Description:"
              name="description"
              placeholder="Enter description"
            />
          </div>

          <div className="flex gap-2 md:gap-6 md:flex-row flex-col mt-4">
            <FormField
              control={form.control}
              name="show_condition"
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
              control={form.control}
              name="show_configration"
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
                  <FormLabel className="text-base">
                    Show Configuration
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="rounded-[8px] hover:text-white px-3 py-[6px] bg-transparent border-1 border-primary-color1 hover:bg-primary-color1"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-white rounded-[8px] px-3 py-[px] bg-primary-color1 hover:bg-primary-color2"
            >
              Submit
            </button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

const GenerateTraineeEvaluationUrlModal = ({
  setIsSuccessGenerateUrl,
  isModalOpen,
  setIsModalOpen,
}: {
  setIsSuccessGenerateUrl: any;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}) => {
  const generateTraineeEvaluationUrlSchema = z.object({
    id_number: z.string().min(1, "ID number is required"),
    password: z.string().min(1, "Password is required"),
    exam_section_id: z.number(),
  });

  const { id, evaluation_id } = useParams();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  type GenerateFormValues = z.infer<typeof generateTraineeEvaluationUrlSchema>;

  const form = useForm<GenerateFormValues>({
    resolver: zodResolver(generateTraineeEvaluationUrlSchema),
    defaultValues: {
      id_number: "",
      password: "",
      exam_section_id: Number(id),
    },
  });

  const onSubmit = async (values: GenerateFormValues) => {
    setIsSubmitting(true);
    try {
      const data = await generateUrlForTrainer(Number(evaluation_id), values);

      console.log(data);
      toast.success("Url generated successfully");
      setIsModalOpen(false);
      setIsSuccessGenerateUrl((prev: any) => !prev);
      form.reset();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to generate url"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      title="Generate URL"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      footer={null}
      width={800}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="md:col-span-1">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                label="ID Number:"
                name="id_number"
                placeholder="Enter ID number"
              />
            </div>
            <div className="md:col-span-1">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                label="Password:"
                name="password"
                placeholder="Enter password"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              className="rounded-[8px] hover:text-white px-3 py-[6px] bg-transparent border-1 border-primary-color1 hover:bg-primary-color1"
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-white rounded-[8px] px-3 py-[6px] bg-primary-color1 hover:bg-primary-color2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin mr-2" />
                  Generating...
                </div>
              ) : (
                "Generate"
              )}
            </button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
