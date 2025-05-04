// "use client";
// import { images } from "@/constants/images";
// import { Modal, Space } from "antd";
// import Image from "next/image";
// import {
//   FaClock,
//   FaCalendarAlt,
//   FaBook,
//   FaUserAlt,
//   FaQuestionCircle,
//   FaInfoCircle,
//   FaCheckCircle,
//   FaPlayCircle,
//   FaPlay,
//   FaTimes,
// } from "react-icons/fa";
// import React, { useState } from "react";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Form } from "@/components/ui/form";
// import { toast } from "sonner";
// import CustomFormField, {
//   FormFieldType,
// } from "@/components/review/CustomFormField";
// import { Loader2, Router } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { usePathname, useRouter } from "next/navigation";

// const UserFormValidation = z.object({
//   first_name: z.string().min(2, "First name must be at least 2 characters."),
//   last_name: z.string().min(2, "Last name must be at least 2 characters."),
//   email: z.string().email("Invalid email address"),
// });

// const Page = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const form = useForm<z.infer<typeof UserFormValidation>>({
//     resolver: zodResolver(UserFormValidation),
//     defaultValues: {
//       first_name: "",
//       last_name: "",
//       email: "",
//     },
//   });

//   const onSubmit = async ({
//     first_name,
//     last_name,
//     email,
//   }: z.infer<typeof UserFormValidation>) => {
//     setIsLoading(true);
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 4000));
//       router.push("/exam/questions/1");
//       setIsModalOpen(false);
//     } catch (error) {
//       toast.error("Failed to start exam");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   // Sample exam data - replace with your actual data
//   const examInfo = {
//     title: "Final Medical Examination",
//     description:
//       "This exam covers all topics studied during the semester including anatomy, physiology, and pathology.",
//     duration: "120 minutes",
//     date: "June 15, 2023",
//     totalQuestions: 50,
//     instructor: "Dr. Sarah Johnson",
//   };

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <main className="flex h-screen max-h-screen w-full items-center rounded-lg overflow-hidden">
//         <section className="remove-scrollbar container mb-16 w-[50%] h-full bg-white ">
//           <div className="max-w-[600px] mx-auto py-12 px-6">
//             <div className="mb-8">
//               <h1 className="text-3xl font-bold text-[#037f85] mb-2">
//                 {examInfo.title}
//               </h1>
//               <p className="text-2xl font-semibold mb-6 text-center text-gray-700">
//                 Exam Titlee
//               </p>

//               {/* Test Instructions Section */}
//               <div className="bg-blue-50 rounded-lg p-6 border border-blue-100 mb-6">
//                 <h2 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
//                   <FaInfoCircle className="mr-2 text-blue-600" /> Test
//                   Instructions
//                 </h2>

//                 <div className="space-y-3 text-blue-900">
//                   <div className="flex items-start">
//                     <FaCheckCircle className="mt-1 mr-3 text-blue-600 min-w-[20px]" />
//                     <p>
//                       This test consists of{" "}
//                       <span className="font-bold">7 questions</span>.
//                     </p>
//                   </div>

//                   <div className="flex items-start">
//                     <FaCheckCircle className="mt-1 mr-3 text-blue-600 min-w-[20px]" />
//                     <p>
//                       The time to solve one question is{" "}
//                       <span className="font-bold">2 minutes</span>.
//                     </p>
//                   </div>

//                   <div className="flex items-start">
//                     <FaCheckCircle className="mt-1 mr-3 text-blue-600 min-w-[20px]" />
//                     <p>
//                       Make sure you have enough time and then start the test.
//                     </p>
//                   </div>

//                   <div className="pt-2 mt-3 border-t border-blue-200">
//                     <p className="text-lg font-semibold text-blue-700">
//                       Good luck!
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Exam Details Section */}
//               <div className="bg-[#f8fafc] rounded-lg p-6 border border-gray-200 mb-6">
//                 <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
//                   <FaBook className="mr-2 text-[#037f85]" /> Exam Details
//                 </h2>

//                 <div className="space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="flex items-center">
//                       <FaClock className="mr-3 text-[#037f85] w-5 h-5" />
//                       <div>
//                         <p className="text-sm text-gray-500">Duration</p>
//                         <p className="font-medium">{examInfo.duration}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center">
//                       <FaCalendarAlt className="mr-3 text-[#037f85] w-5 h-5" />
//                       <div>
//                         <p className="text-sm text-gray-500">Date</p>
//                         <p className="font-medium">{examInfo.date}</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="flex items-center">
//                       <FaQuestionCircle className="mr-3 text-[#037f85] w-5 h-5" />
//                       <div>
//                         <p className="text-sm text-gray-500">Total Questions</p>
//                         <p className="font-medium">{examInfo.totalQuestions}</p>
//                       </div>
//                     </div>
//                     <div className="flex items-center">
//                       <FaUserAlt className="mr-3 text-[#037f85] w-5 h-5" />
//                       <div>
//                         <p className="text-sm text-gray-500">Instructor</p>
//                         <p className="font-medium">{examInfo.instructor}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-8">
//                 <Button
//                   color="yellow"
//                   onClick={showModal}
//                   className="w-full bg-[#037f85] hover:bg-[#036a70] text-white h-10 rounded-lg text-lg font-medium"
//                 >
//                   Start Exam
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </section>

//         <div className="flex items-center justify-center w-[50%] bg-[#037f85]/20 min-h-screen z-50">
//           <Image
//             src={images.onlineTest}
//             width={480}
//             height={480}
//             alt="Online exam illustration"
//             className="object-contain"
//           />
//         </div>
//       </main>

//       <Modal
//         title={
//           <div className="flex items-center">
//             <FaPlayCircle className="mr-2 text-primary-color1" />
//             <span>Start The Exam</span>
//           </div>
//         }
//         open={isModalOpen}
//         onCancel={handleCancel}
//         footer={
//           <Space className="mt-4">
//             <Button
//               onClick={handleCancel}
//               disabled={isLoading}
//               color="danger"
//               variant={"outline"}
//               className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white "
//             >
//               <FaTimes />
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               onClick={form.handleSubmit(onSubmit)}
//               className="bg-primary-color1 hover:bg-primary-color2"
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className=" animate-spin" /> Starting..
//                 </>
//               ) : (
//                 <>
//                   <FaPlay className=" text-xs size-2 h-1" />
//                   Start Exam
//                 </>
//               )}
//             </Button>
//           </Space>
//         }
//       >
//         <p className="mb-4">Fill in the form before starting the test.</p>
//         <Form {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-6 flex-1 text-white mb-4"
//           >
//             {/* Your form fields remain the same */}
//             <CustomFormField
//               fieldType={FormFieldType.INPUT}
//               control={form.control}
//               name="first_name"
//               label={"First Name : "}
//               placeholder={"Enter your first name "}
//               iconSrc="/icons/user.svg"
//               iconAlt="user"
//               required={true}
//             />
//             <CustomFormField
//               fieldType={FormFieldType.INPUT}
//               control={form.control}
//               name="last_name"
//               label={"Last Name : "}
//               placeholder={"Enter your last name "}
//               iconSrc="/icons/user.svg"
//               iconAlt="user"
//               required={true}
//             />
//             <CustomFormField
//               fieldType={FormFieldType.INPUT}
//               control={form.control}
//               name="email"
//               label={"Email : "}
//               placeholder={"Enter your email"}
//               iconSrc="/icons/mail.svg"
//               iconAlt="email"
//               required={true}
//             />
//           </form>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default Page;







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
import { fetchAssignmentById, fetchExamFiles } from "@/lib/action/user/userr_action";
import Loading from "@/components/Pars/Loading";

const UserFormValidation = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters."),
  last_name: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Invalid email address"),
});

interface ExamData {
  id: number;
  code: string;
  title: string;
  sub_title: string;
  status: string;
  image: string | null;
  number_of_questions: number;
  duration_in_minutes: number;
  grade_percentage: number | null;
  exam_type: {
    id: number;
    type: string;
    hint: string | null;
    description: string;
  };
  exam_section_id: number;
  exam_type_id: number;
  created_at: string;
  updated_at: string;
  exam_config: {
    id: number;
    exam_id: number;
    evaluation_id: number | null;
    time_exam: string;
    start_date: string;
    end_date: string;
    view_results: string;
    view_answer: string;
    date_view: string;
    count_questions_page: number;
    time_questions_page: string;
    required_page_next: boolean;
    count_return_exam: number;
    language: string;
    created_at: string;
    updated_at: string;
  };
}


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
  const [examData, setExamData] = useState<ExamData | null>(null);
  const [examFiles, setExamFiles] = useState<ExamFile[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const router = useRouter();
  const { assignment_id } = useParams();

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        // Replace with your actual API call
        const data = await fetchAssignmentById(Number(assignment_id)); // Adjust the API endpoint
        const files = await fetchExamFiles()
        if (!data) {
          throw new Error("no data")
        }
        setExamData(data?.data);
        if (files) {
          console.log(files.data);
          setExamFiles(files?.data || []);
        }
      } catch (error) {
        console.error('Error fetching exam data:', error);
        toast.error("Failed to load exam data");
      } finally {
        setIsFetching(false);
      }
    };

    fetchExamData();
  }, []);




  // Function to get file icon based on file type
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <FaFilePdf className="text-red-500 text-xl" />;
      case 'doc':
      case 'docx':
        return <FaFileWord className="text-blue-500 text-xl" />;
      case 'xls':
      case 'xlsx':
        return <FaFileExcel className="text-green-500 text-xl" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <FaFileImage className="text-yellow-500 text-xl" />;
      default:
        return <FaFileAlt className="text-gray-500 text-xl" />;
    }
  };

  // Function to format file size
  const formatFileSize = (bytes: string) => {
    const size = parseInt(bytes);
    if (size < 1024) return `${size} bytes`;
    if (size < 1048576) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / 1048576).toFixed(1)} MB`;
  };



  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  });

  const onSubmit = async ({
    first_name,
    last_name,
    email,
  }: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 4000));
      router.push("/exam/questions/1");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to start exam");
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
    title: examData.title,
    description: examData.sub_title,
    duration: `${examData.duration_in_minutes} minutes`,
    date: new Date(examData.exam_config.start_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    totalQuestions: examData.number_of_questions,
    instructor: "Dr. Instructor Name", // You might need to fetch this separately
    examType: examData.exam_type.type,
    examDescription: examData.exam_type.description,
    endDate: new Date(examData.exam_config.end_date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };

  return (
    <>
      <main className="flex max-md:flex-col-reverse md:h-screen md:max-h-screen max-md:min-h-screen w-full items-center rounded-lg overflow-hidden max-md:overflow-auto">

        <section className="max-md:w-full remove-scrollbar container mb-16 w-[50%] h-full bg-white overflow-y-auto">
          <div className="max-w-[600px] mx-auto py-12 pt-28 md:pt-[120px] px-6">
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-[#037f85] ml-2 mb-3">
                {formattedExamInfo.title} :
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
                      <span className="font-bold">{formattedExamInfo.totalQuestions} questions</span>.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <FaCheckCircle className="mt-1 mr-3 text-blue-600 min-w-[20px]" />
                    <p>
                      The total duration is{" "}
                      <span className="font-bold">{formattedExamInfo.duration}</span>.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <FaCheckCircle className="mt-1 mr-3 text-blue-600 min-w-[20px]" />
                    <p>
                      Exam type: <span className="font-bold">{formattedExamInfo.examType}</span>.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <FaCheckCircle className="mt-1 mr-3 text-blue-600 min-w-[20px]" />
                    <p>
                      {formattedExamInfo.examDescription}
                    </p>
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
                        <p className="font-medium">{formattedExamInfo.duration}</p>
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
                        <p className="font-medium">{formattedExamInfo.totalQuestions}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FaCalendarAlt className="mr-3 text-[#037f85] w-5 h-5" />
                      <div>
                        <p className="text-sm text-gray-500">End Date</p>
                        <p className="font-medium">{formattedExamInfo.endDate}</p>
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
            src={images.onlineTest}
            width={480}
            height={480}
            alt="Online exam illustration"
            className="object-contain"
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
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="first_name"
              label={"First Name : "}
              placeholder={"Enter your first name "}
              iconSrc="/icons/user.svg"
              iconAlt="user"
              required={true}
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="last_name"
              label={"Last Name : "}
              placeholder={"Enter your last name "}
              iconSrc="/icons/user.svg"
              iconAlt="user"
              required={true}
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label={"Email : "}
              placeholder={"Enter your email"}
              iconSrc="/icons/mail.svg"
              iconAlt="email"
              required={true}
            />
          </form>
        </Form>
      </Modal>
    </>
  );
};

export default Page;