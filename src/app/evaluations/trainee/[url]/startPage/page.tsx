"use client";
import { images } from "@/constants/images";
import { Modal, Space, Input, Result } from "antd";
import Image from "next/image";
import {
  FaClock,
  FaCalendarAlt,
  FaBook,
  FaUserAlt,
  FaQuestionCircle,
  FaInfoCircle,
  FaCheckCircle,
  FaPlayCircle,
  FaPlay,
  FaTimes,
  FaPauseCircle,
  FaLock,
} from "react-icons/fa";
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import CustomFormField, {
  FormFieldType,
} from "@/components/review/CustomFormField";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { assignUser } from "@/lib/action/user/userr_action";
import { icons } from "@/constants/icons";
import {
  getEvaluationByUrl,
  loginTrainer,
} from "@/lib/action/evaluation_action";
import { Evaluation } from "@/types/adminTypes/assignments/assignExamTypes";
import { AxiosError } from "axios";

const trainerSchema = z.object({
  id_number: z.string().min(1, "Student ID is required"),
  password: z.string(),
});

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [evaluationData, setEvaluationData] = useState<Evaluation | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<{
    message: string;
    isEvaluationEnded: boolean;
  } | null>(null);
  const router = useRouter();
  const { url } = useParams();

  const [idNumberInput, setIdNumberInput] = useState("");

  useEffect(() => {
    const fetchEvaluationData = async () => {
      try {
        const data = await getEvaluationByUrl(String(url));
        if (!data) {
          throw new Error("No evaluation data found");
        }
        setEvaluationData(data.data);
      } catch (err) {
        let errorMessage = "This evaluation cannot be started.";
        let isEvaluationEnded = false;

        if (err instanceof AxiosError) {
          if (err.response?.status === 403) {
            const serverMessage = err.response.data?.message?.toLowerCase();
            if (serverMessage?.includes("ended")) {
              errorMessage =
                "This evaluation has already ended and cannot be started.";
              isEvaluationEnded = true;
            } else {
              errorMessage =
                "This evaluation is inactive and cannot be started.";
            }
          } else if (err.response?.status === 404) {
            errorMessage = "evaluation not found. Please check the URL.";
          }
        } else if (err instanceof Error) {
          errorMessage = err.message || errorMessage;
        }

        setError({ message: errorMessage, isEvaluationEnded });
      } finally {
        setIsFetching(false);
      }
    };

    fetchEvaluationData();
  }, [url]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    const payload: any = {
      id_number: values.id_number,
      password: values.password,
    };
    try {
      const response = await loginTrainer(Number(evaluationData?.id), payload);
      toast.success("Registration success", {
        description: "The registration has been completed successfully.",
        duration: 4000,
      });

      form.reset();
      setIsModalOpen(false);
      router.push(`/evaluations/trainee/${url}/students`);
    } catch (error: any) {
      if (error.message.includes("already been taken")) {
        setIdNumberInput(payload.id_number);
        setIsModalOpen(false);
      } else {
        let errorMessage = error.message || "Failed to register trainer";
        if (error.response?.status === 403) {
          errorMessage =
            error.response.data?.message ||
            "This evaluation is not currently available";
        }

        toast.error("Oops! Something went wrong", {
          description: errorMessage,
          duration: 5000,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  type TrainerFormValues = z.infer<typeof trainerSchema>;
  const form = useForm<TrainerFormValues>({
    resolver: zodResolver(trainerSchema),
    defaultValues: {
      id_number: "",
      password: "",
    },
  });

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-[#037f85]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-6 ">
        <Result
          status="403"
          title="Evaluation Access Restricted"
          subTitle={
            <span className="text-gray-600">
              {error.isEvaluationEnded ? (
                <>
                  This evaluation has already{" "}
                  <span className="font-bold text-primary-color1">ended</span>.
                  <br />
                  The submission period is closed.
                </>
              ) : (
                <>
                  This evaluation is currently{" "}
                  <span className="font-bold text-primary-color1">
                    inactive
                  </span>
                  .
                  <br />
                  You will be notified once it becomes available.
                </>
              )}
            </span>
          }
        />
        <p className="text-gray-500 text-sm italic mt-4">
          Details: <span className="text-red-500">{error.message}</span>
        </p>
      </div>
    );
  }

  if (!evaluationData) {
    return (
      <div className="flex items-start my-20 justify-center h-screen">
        <p className="text-red-500">Failed to load evaluation data</p>
      </div>
    );
  }

  const formattedExamInfo = {
    title: evaluationData?.title,
    description: evaluationData?.sub_title,
    image: evaluationData?.start_forms[0]?.image,
    date: evaluationData?.evaluation_config?.start_date
      ? new Date(
          evaluationData?.evaluation_config?.start_date
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null,
    totalQuestions: evaluationData?.number_of_questions,
    instructor: "Dr. Instructor Name",
    examType: evaluationData?.evaluation_type?.type,
    examDescription: evaluationData?.start_forms[0]?.description,
    endDate: evaluationData?.evaluation_config?.end_date
      ? new Date(
          evaluationData?.evaluation_config?.end_date
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : null,
  };

  return (
    <>
      <main className="flex max-md:flex-col-reverse md:h-screen md:max-h-screen max-md:min-h-screen w-full items-center rounded-lg overflow-hidden max-md:overflow-auto">
        <section className="max-md:w-full scrollbar-hide container mb-16 w-[50%] h-full bg-white overflow-y-auto">
          <div className="max-w-[600px] mx-auto py-12 pt-28 md:pt-[120px] px-6">
            <div className="mb-8">
              <h1 className="text-2xl text-center md:text-3xl font-bold text-[#037f85] mb-3">
                {formattedExamInfo.title}
              </h1>

              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100 mb-6">
                <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                  <FaInfoCircle className="mr-2 text-blue-600" /> Evaluation
                  Instructions
                </h2>
                <div className="space-y-3 text-blue-900">
                  <div className="flex items-start">
                    <FaCheckCircle className="mt-1 mr-3 text-blue-600 min-w-[20px]" />
                    <p>
                      This evaluation consists of{" "}
                      <span className="font-bold">
                        {formattedExamInfo.totalQuestions} questions
                      </span>
                      .
                    </p>
                  </div>

                  <div className="flex items-start">
                    <FaCheckCircle className="mt-1 mr-3 text-blue-600 min-w-[20px]" />
                    <p>
                      Evaluation type:{" "}
                      <span className="font-bold">
                        {formattedExamInfo.examType}
                      </span>
                      .
                    </p>
                  </div>
                  <div className="flex items-start">
                    <FaCheckCircle className="mt-1 mr-3 text-blue-600 min-w-[20px]" />
                    <p>{formattedExamInfo.examDescription}</p>
                  </div>
                  <div className="pt-2 mt-3 border-t border-blue-200">
                    <p className="text-lg font-semibold text-blue-700">
                      Good luck!
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#f8fafc] rounded-lg p-6 border border-gray-200 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <FaBook className="mr-2 text-[#037f85]" /> Evaluation Details
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-3 text-[#037f85] w-5 h-5" />
                      <div>
                        <p className="text-sm text-gray-500">Start Date</p>
                        <p className="font-medium">{formattedExamInfo.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-3 text-[#037f85] w-5 h-5" />
                      <div>
                        <p className="text-sm text-gray-500">End Date</p>
                        <p className="font-medium">
                          {formattedExamInfo.endDate}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <FaQuestionCircle className="mr-3 text-[#037f85] w-5 h-5" />
                      <div>
                        <p className="text-sm text-gray-500">Total Questions</p>
                        <p className="font-medium">
                          {formattedExamInfo.totalQuestions}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  onClick={showModal}
                  className="w-full bg-[#037f85] hover:bg-[#036a70] text-white h-10 rounded-lg text-lg font-medium"
                >
                  Start Evaluation
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="max-md:hidden flex items-center justify-center w-[50%] bg-[#037f85]/20 h-[90vh] md:min-h-screen z-50">
          <Image
            src={
              formattedExamInfo.image
                ? `${process.env.NEXT_PUBLIC_ASSIGNMENT_STORAGE_URL}/${formattedExamInfo.image}`
                : images.onlineTest
            }
            width={480}
            height={480}
            alt="Online evaluation illustration"
            className="h-full w-full object-cover"
          />
        </div>
      </main>

      {/* Start Evaluation Modal */}
      <Modal
        title={
          <div className="flex items-center">
            <FaPlayCircle className="mr-2 text-[#037f85]" />
            <span>Start The Evaluation</span>
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={
          <Space className="mt-4">
            <Button
              onClick={handleCancel}
              disabled={isLoading}
              variant={"outline"}
              className="border-gray-500 text-gray-500 hover:bg-gray-100"
            >
              <FaTimes />
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              className="bg-[#037f85] hover:bg-[#036a70]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" /> Starting..
                </>
              ) : (
                <>
                  <FaPlay className="text-xs size-2 h-1" />
                  Start Evaluation
                </>
              )}
            </Button>
          </Space>
        }
      >
        <p className="mb-4">Fill in the form before starting the evaluation.</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 flex-1 mb-4"
          >
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="id_number"
              label={"ID Number"}
              placeholder={"Enter your ID number"}
              iconSrc={icons.id}
              iconAlt="id"
              required={true}
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="password"
              label={"Password"}
              placeholder={"Enter your password"}
              iconSrc={icons.lock}
              iconAlt="lock"
              required={true}
            />
          </form>
        </Form>
      </Modal>
    </>
  );
};

export default Page;
