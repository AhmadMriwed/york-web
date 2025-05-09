"use client";
import { images } from "@/constants/images";
import { Modal, Space } from "antd";
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
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFileImage,
  FaFileAlt,
  FaDownload,
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
import { getEvaluationByUrl } from "@/lib/action/evaluation_action";
import { Evaluation } from "@/types/adminTypes/assignments/assignExamTypes";

const createValidationSchema = (fieldRequirements: any) => {
  const schema: Record<string, any> = {
    id_number: z.string().min(1, "ID number is required"),
  };

  fieldRequirements.forEach((field: any) => {
    switch (field.name) {
      case "first_name":
        schema.first_name = z
          .string()
          .min(2, "First name must be at least 2 characters");
        break;
      case "last_name":
        schema.last_name = z
          .string()
          .min(2, "Last name must be at least 2 characters");
        break;
      case "email":
        schema.email = z.string().email("Invalid email address");
        break;
    }
  });

  return z.object(schema);
};
interface ExamFile {
  id: number;
  exam_id: number;
  file_id: number;
  file: {
    id: number;
    name: string;
    path: string;
    type: string;
    size: string;
  };
}

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [examData, setExamData] = useState<Evaluation | any>();
  const [examFiles, setExamFiles] = useState<ExamFile[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const router = useRouter();
  const { url } = useParams();

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const data = await getEvaluationByUrl(String(url));
        // const files = await fetchExamFiles();
        if (!data) {
          throw new Error("no data");
        }
        console.log(data.data);
        setExamData(data.data);
        // if (files) {
        //   console.log(files.data);
        //   setExamFiles(files?.data || []);
        // }
      } catch (error) {
        console.error("Error fetching evaluation data:", error);
        toast.error("Failed to load evaluation data");
      } finally {
        setIsFetching(false);
      }
    };

    fetchExamData();
  }, []);

  console.log(examData);

  // Function to get file icon based on file type
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "pdf":
        return <FaFilePdf className="text-red-500 text-xl" />;
      case "doc":
      case "docx":
        return <FaFileWord className="text-blue-500 text-xl" />;
      case "xls":
      case "xlsx":
        return <FaFileExcel className="text-green-500 text-xl" />;
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <FaFileImage className="text-yellow-500 text-xl" />;
      default:
        return <FaFileAlt className="text-gray-500 text-xl" />;
    }
  };

  const formatFileSize = (bytes: string) => {
    const size = parseInt(bytes);
    if (size < 1024) return `${size} bytes`;
    if (size < 1048576) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / 1048576).toFixed(1)} MB`;
  };

  const form = useForm<z.infer<ReturnType<typeof createValidationSchema>>>({
    resolver: zodResolver(
      createValidationSchema(examData?.field_requirements || [])
    ),
    defaultValues: {
      id_number: "",
      // Initialize all possible fields (they'll only be validated if required)
      first_name: "",
      last_name: "",
      email: "",
    },
  });

  const onSubmit = async (values: any) => {
    const toastId = toast.loading("Registering for exam ...");

    // Prepare payload with only the required fields
    const payload: any = {
      form_id: examData?.forms[0].id,
      id_number: values.id_number,
    };

    // Add only the fields that are required
    examData?.field_requirements?.forEach((field: any) => {
      payload[field.name] = values[field.name];
    });

    try {
      const response = await assignUser(payload);
      toast.success("Registration success", {
        description: "The registration has been completed successfully.",
        duration: 4000,
        id: toastId,
      });

      form.reset();
      setIsModalOpen(false);
      router.push(`/evaluations/${url}/intro?user_id=${response.data.id}`);
    } catch (error: any) {
      toast.error("Oops! Something went wrong", {
        description: error.message || "Failed to register user",
        duration: 5000,
        id: toastId,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-[#037f85]" />
      </div>
    );
  }

  if (!examData) {
    return (
      <div className="flex items-start my-20 justify-center h-screen">
        <p className="text-red-500">Failed to load exam data</p>
      </div>
    );
  }

  // Format the exam data for display
  const formattedExamInfo = {
    title: examData?.title,
    description: examData?.sub_title,
    image: examData?.start_forms[0]?.image,
    duration: `${examData?.duration_in_minutes} minutes`,
    date: examData?.evaluation_config?.start_date
      ? new Date(examData?.evaluation_config?.start_date).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        )
      : null,
    totalQuestions: examData?.number_of_questions,
    instructor: "Dr. Instructor Name", // You might need to fetch this separately
    examType: examData?.exam_type?.type,
    examDescription: examData?.start_forms[0]?.description,
    endDate: examData?.evaluation_config?.end_date
      ? new Date(examData?.evaluation_config?.end_date).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          }
        )
      : null,
  };

  return (
    <>
      <main className="flex max-md:flex-col-reverse md:h-screen md:max-h-screen max-md:min-h-screen w-full items-center rounded-lg overflow-hidden max-md:overflow-auto">
        <section className="max-md:w-full scrollbar-hide container mb-16 w-[50%] h-full bg-white overflow-y-auto">
          <div className="max-w-[600px]  mx-auto py-12 pt-28 md:pt-[120px] px-6">
            <div className="mb-8">
              <h1 className="text-2xl text-center md:text-3xl font-bold text-[#037f85] mb-3">
                {formattedExamInfo.title}
              </h1>

              {/* Test Instructions Section */}
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100 mb-6">
                <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                  <FaInfoCircle className="mr-2 text-blue-600" /> Test
                  Instructions
                </h2>

                <div className="space-y-3 text-blue-900">
                  <div className="flex items-start">
                    <FaCheckCircle className="mt-1 mr-3 text-blue-600 min-w-[20px]" />
                    <p>
                      This test consists of{" "}
                      <span className="font-bold">
                        {formattedExamInfo.totalQuestions} questions
                      </span>
                      .
                    </p>
                  </div>

                  <div className="flex items-start">
                    <FaCheckCircle className="mt-1 mr-3 text-blue-600 min-w-[20px]" />
                    <p>
                      The total duration is{" "}
                      <span className="font-bold">
                        {formattedExamInfo.duration}
                      </span>
                      .
                    </p>
                  </div>

                  <div className="flex items-start">
                    <FaCheckCircle className="mt-1 mr-3 text-blue-600 min-w-[20px]" />
                    <p>
                      Exam type:{" "}
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

              {/* Exam Details Section */}
              <div className="bg-[#f8fafc] rounded-lg p-6 border border-gray-200 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <FaBook className="mr-2 text-[#037f85]" /> Exam Details
                </h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <FaClock className="mr-3 text-[#037f85] w-5 h-5" />
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-medium">
                          {formattedExamInfo.duration}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-3 text-[#037f85] w-5 h-5" />
                      <div>
                        <p className="text-sm text-gray-500">Start Date</p>
                        <p className="font-medium">{formattedExamInfo.date}</p>
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
                </div>
              </div>

              {examFiles.length > 0 && (
                <div className="bg-[#f8fafc] rounded-lg p-6 border border-gray-200 mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FaBook className="mr-2 text-[#037f85]" /> Exam Materials
                  </h2>

                  <div className="space-y-3">
                    {examFiles.map((fileItem) => (
                      <div
                        key={fileItem.id}
                        className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center">
                          {getFileIcon(fileItem.file.name)}
                          <div className="ml-3">
                            <p className="font-medium text-gray-800 line-clamp-1">
                              {fileItem.file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(fileItem.file.size)}
                            </p>
                          </div>
                        </div>
                        <a
                          href={fileItem.file.path}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-[#037f85] hover:text-[#036a70] transition-colors"
                          title="Download"
                        >
                          <FaDownload />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8">
                <Button
                  color="yellow"
                  onClick={showModal}
                  className="w-full bg-[#037f85] hover:bg-[#036a70] text-white h-10 rounded-lg text-lg font-medium"
                >
                  Start Exam
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
            alt="Online exam illustration"
            className="h-full w-full object-cover"
          />
        </div>
      </main>

      <Modal
        title={
          <div className="flex items-center">
            <FaPlayCircle className="mr-2 text-primary-color1" />
            <span>Start The Exam</span>
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={
          <Space className="mt-4">
            <Button
              onClick={handleCancel}
              disabled={isLoading}
              color="danger"
              variant={"outline"}
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white "
            >
              <FaTimes />
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              className="bg-primary-color1 hover:bg-primary-color2"
            >
              {isLoading ? (
                <>
                  <Loader2 className=" animate-spin" /> Starting..
                </>
              ) : (
                <>
                  <FaPlay className=" text-xs size-2 h-1" />
                  Start Exam
                </>
              )}
            </Button>
          </Space>
        }
      >
        <p className="mb-4">Fill in the form before starting the test.</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 flex-1 text-white mb-4"
          >
            {/* Always show id_number */}
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

            {/* Dynamically show required fields */}
            {examData?.field_requirements?.map((field: any) => {
              switch (field.name) {
                case "first_name":
                  return (
                    <CustomFormField
                      key={field.id}
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="first_name"
                      label={"First Name"}
                      placeholder={"Enter your first name"}
                      iconSrc="/icons/user.svg"
                      iconAlt="user"
                      required={true}
                    />
                  );
                case "last_name":
                  return (
                    <CustomFormField
                      key={field.id}
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="last_name"
                      label={"Last Name"}
                      placeholder={"Enter your last name"}
                      iconSrc="/icons/user.svg"
                      iconAlt="user"
                      required={true}
                    />
                  );
                case "email":
                  return (
                    <CustomFormField
                      key={field.id}
                      fieldType={FormFieldType.INPUT}
                      control={form.control}
                      name="email"
                      label={"Email"}
                      placeholder={"Enter your email"}
                      iconSrc="/icons/mail.svg"
                      iconAlt="email"
                      required={true}
                    />
                  );
                default:
                  return null;
              }
            })}
          </form>
        </Form>
      </Modal>
    </>
  );
};

export default Page;
