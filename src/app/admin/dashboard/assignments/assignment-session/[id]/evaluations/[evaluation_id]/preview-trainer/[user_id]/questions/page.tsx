"use client";

import { images } from "@/constants/images";
import { fetchEvaluationById } from "@/lib/action/evaluation_action";
import {
  getUserById,
  getQuestionsByFormId,
  getSolution,
} from "@/lib/action/user/userr_action";
import { Assignment } from "@/types/adminTypes/assignments/assignmentsTypes";
import {
  QuestionData,
  UserData,
} from "@/types/adminTypes/assignments/examTypes";
import { Input } from "antd";
import { BookmarkIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { toast } from "sonner";

type SolutionData = {
  pages: Array<{
    page_id: number;
    questions: Array<{
      question_form_id: number;
      fields: Array<{
        question_field_id: number;
        user_answer: string;
        correct_answer: string;
        status: "Correct" | "InCorrect";
      }>;
    }>;
  }>;
};

const AdminPreviewTraniee = () => {
  const { id, evaluation_id, user_id } = useParams();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [userData, setUserData] = useState<UserData>();
  const [examData, setExamData] = useState<Assignment>();
  const [solutionData, setSolutionData] = useState<SolutionData | null>(null);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const data = await getUserById(Number(user_id));
        const assignmentData = await fetchEvaluationById(Number(evaluation_id));
        if (!data || !assignmentData) {
          throw new Error("no data");
        }
        setUserData(data?.data!);
        setExamData(assignmentData.data!);
      } catch (error) {
        console.error("Error fetching evaluation data:", error);
        toast.error("Failed to load evaluation data");
      }
    };

    fetchExamData();
  }, []);

  const fetchSolutions = async () => {
    try {
      const response = await getSolution(Number(user_id));
      if (response?.data) {
        setSolutionData(response.data);
      }
    } catch (error) {
      console.error("Error fetching solutions:", error);
    }
  };

  const fetchQuestions = async (page: number) => {
    if (!examData?.forms[0]?.id) return;

    setIsLoading(true);
    const values = {
      form_id: Number(examData?.forms[0]?.id),
      page: page,
    };

    try {
      const response = await getQuestionsByFormId(values.form_id, values.page);
      if (response.data) {
        setQuestions(response.data);
        setTotalPages(response.meta.last_page);
        await fetchSolutions();
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast.error("Failed to load questions");
    } finally {
      setIsLoading(false);
    }
  };

  const getQuestionSolution = (questionId: number) => {
    if (!solutionData) return null;

    for (const page of solutionData.pages) {
      const question = page.questions.find(
        (q) => q.question_form_id === questionId
      );
      if (question) {
        return {
          userAnswer: question.fields[0]?.user_answer,
          correctAnswer: question.fields[0]?.correct_answer,
          status: question.fields[0]?.status,
        };
      }
    }
    return null;
  };

  useEffect(() => {
    if (examData?.forms[0]?.id) {
      fetchQuestions(currentPage);
    }
  }, [examData?.forms[0]?.id, currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    } else {
      router.push(
        `/admin/dashboard/assignments/assignment-session/${id}/evaluations/${evaluation_id}/preview-trainer/${user_id}/result`
      );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="shadow-md  border-b dark:border-none bg-white ">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-sm p-3 border-b border-gray-100 w-full">
            <div className="max-w-7xl mx-auto">
              <div className="md:hidden flex flex-col gap-2">
                <div className="flex justify-between items-center -mb-8">
                  <Image
                    src={images.logo}
                    height={40}
                    width={120}
                    alt="Logo"
                    className="h-20 object-contain"
                  />
                </div>

                <h2 className="text-lg font-bold text-primary-color1 text-center">
                  {examData?.title}
                </h2>

                <div className="flex justify-between items-center text-sm">
                  <div>
                    <p className="text-xs text-gray-600">Name:</p>
                    <p className="font-medium">
                      {userData?.first_name} {userData?.last_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">ID:</p>
                    <p className="font-medium">{userData?.id_number}</p>
                  </div>
                  <div className="flex items-center bg-teal-50 rounded-full px-3 py-1">
                    <BookmarkIcon className="h-3 w-3 mr-1 text-teal-600" />
                    <span className="font-medium text-teal-800">
                      {currentPage}
                    </span>
                    <span className="mx-1 text-teal-600">of</span>
                    <span className="font-medium text-teal-800">
                      {totalPages}
                    </span>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex h-20 items-center justify-between gap-4">
                <div className="flex-shrink-0">
                  <Image
                    src={images.logo}
                    height={100}
                    width={150}
                    alt="Logo"
                    className="h object-contain"
                  />
                </div>

                <h2 className="text-xl font-bold text-primary-color1 flex-1 text-center">
                  {examData?.title}
                </h2>

                <div className="flex gap-3 items-center">
                  <div className="flex divide-x divide-gray-300 px-2 rounded-lg">
                    <div className="px-3 py-1">
                      <p className="text-xs text-gray-600">Student Name</p>
                      <p className="font-medium text-gray-900">
                        {userData?.first_name} {userData?.last_name}
                      </p>
                    </div>
                    <div className="px-3 py-1">
                      <p className="text-xs text-gray-600">Student ID</p>
                      <p className="font-medium text-gray-900">
                        {userData?.id_number}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center bg-teal-50 rounded-full px-3 py-1 border border-teal-100">
                    <BookmarkIcon className="h-4 w-4 mr-2 text-teal-600" />
                    <span className="font-medium text-teal-800">
                      {currentPage}
                    </span>
                    <span className="mx-1 text-teal-600">of</span>
                    <span className="font-medium text-teal-800">
                      {totalPages}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto hide-scrollebar sm:mt-4 py-6 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-[50vh]">
              <Loader2 className="animate-spin h-12 w-12 text-[#037f85]" />
            </div>
          ) : (
            questions.map((question, index) => {
              const solution = getQuestionSolution(question.id);
              const userAnswer = solution?.userAnswer || "";
              const correctAnswer = solution?.correctAnswer || "";
              const isCorrect = solution?.status === "Correct";

              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl shadow-xs p-6 border ${
                    !userAnswer ? "border-red-200 bg-red-50" : "border-gray-100"
                  } hover:shadow-sm transition-shadow`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        <span className="text-primary-color1 font-bold">
                          Question {question.question_number}:
                        </span>{" "}
                        <div
                          dangerouslySetInnerHTML={{
                            __html: question?.question,
                          }}
                          className="ml-3 prose prose-img:max-w-[200px] prose-img:h-[200px] inline-block text-gray-700"
                        />
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {question.question_type_id === 1 && question.fields && (
                      <div className="space-y-2">
                        {question.fields.map((option, optionIndex) => {
                          const isSelected =
                            userAnswer === option.field.toString();
                          return (
                            <label
                              key={optionIndex}
                              className={`flex items-center p-3 rounded-lg border cursor-default transition-all ${
                                isSelected
                                  ? isCorrect
                                    ? "border-green-500 bg-green-50"
                                    : "border-red-500 bg-red-50"
                                  : "border-gray-200"
                              }`}
                            >
                              <Input
                                type="radio"
                                name={`answer-${index}`}
                                checked={isSelected}
                                readOnly
                                className="h-4 border-3 border-primary-color1 w-4 bg-primary-color1 checked:!bg-primary-color1 border-gray-300"
                              />
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: option.field,
                                }}
                                className="ml-3 prose prose-img:max-w-[200px] prose-img:h-[200px] text-gray-700"
                              />
                            </label>
                          );
                        })}
                      </div>
                    )}

                    {question.question_type_id === 2 && question.fields && (
                      <div className="space-y-2">
                        {question.fields.map((option, optionIndex) => {
                          const isSelected = Array.isArray(userAnswer)
                            ? userAnswer.includes(option.field.toString())
                            : userAnswer === option.field.toString();
                          return (
                            <label
                              key={optionIndex}
                              className={`flex items-center p-3 rounded-lg border cursor-default transition-all ${
                                isSelected
                                  ? isCorrect
                                    ? "border-green-500 bg-green-50"
                                    : "border-red-500 bg-red-50"
                                  : "border-gray-200"
                              }`}
                            >
                              <Input
                                type="checkbox"
                                checked={isSelected}
                                readOnly
                                className="h-4 w-4 text-indigo-600  focus:ring-indigo-500 rounded border-gray-300 bg-white dark:bg-white"
                              />
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: option.field,
                                }}
                                className="ml-3 prose prose-img:max-w-[200px] prose-img:h-[200px] text-gray-700"
                              />
                            </label>
                          );
                        })}
                      </div>
                    )}

                    {question.question_type_id === 3 && (
                      <div className="grid grid-cols-2 gap-3">
                        <label
                          className={`p-3 rounded-lg border cursor-default text-center transition-all ${
                            userAnswer === "true"
                              ? isCorrect
                                ? "border-green-500 bg-green-50"
                                : "border-red-500 bg-red-50"
                              : "border-gray-200"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`true-false-${index}`}
                            checked={userAnswer === "true"}
                            readOnly
                            className="hidden"
                          />
                          <span className="font-medium">True</span>
                        </label>
                        <label
                          className={`p-3 rounded-lg border cursor-default text-center transition-all ${
                            userAnswer === "false"
                              ? isCorrect
                                ? "border-green-500 bg-green-50"
                                : "border-red-500 bg-red-50"
                              : "border-gray-200"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`true-false-${index}`}
                            checked={userAnswer === "false"}
                            readOnly
                            className="hidden"
                          />
                          <span className="font-medium">False</span>
                        </label>
                      </div>
                    )}

                    {question.question_type_id === 4 && (
                      <input
                        type="text"
                        value={userAnswer || ""}
                        readOnly
                        className="w-full p-3 border border-gray-300 bg-gray-50 rounded-lg"
                      />
                    )}

                    {question.question_type_id === 5 && (
                      <textarea
                        value={userAnswer || ""}
                        readOnly
                        className="w-full p-3 border border-gray-300 bg-gray-50 rounded-lg"
                        rows={4}
                      />
                    )}

                    {question.question_type_id === 6 && (
                      <div className="space-y-4">
                        <div className="text-gray-700 prose-sm prose-img:max-w-[250px] prose-img:h-[220px] prose-img:block prose-img:my-2">
                          <div className="">
                            <input
                              type="range"
                              min="1"
                              max={Number(question.fields?.[0]?.field) || 10}
                              step="1"
                              value={userAnswer ? Number(userAnswer) : 1}
                              readOnly
                              className="!w-3/4 md:!w-1/2 h-1.5 bg-gray-300 rounded-lg accent-primary-color1"
                            />
                            <div className="!w-3/4 md:!w-1/2 flex justify-between mt-2 gap-4">
                              {Array.from(
                                {
                                  length:
                                    Number(question.fields?.[0]?.field) || 10,
                                },
                                (_, i) => i + 1
                              ).map((num) => (
                                <span
                                  key={num}
                                  className={`text-xs ${
                                    Number(userAnswer) === num
                                      ? "font-bold text-primary-color1"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {num}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <span className="text-sm font-medium">
                            Selected Value:{" "}
                            {userAnswer ? userAnswer : "Not selected"}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div
                    className={`mt-4 p-4 rounded-lg border ${
                      isCorrect
                        ? "bg-green-50 border-green-200"
                        : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-sm mb-2">
                          {isCorrect ? (
                            <span className="text-green-600">
                              ✓ Correct Answer
                            </span>
                          ) : (
                            <span className="text-red-600">
                              ✗ Incorrect Answer
                            </span>
                          )}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">
                              Trainer Answer:
                            </p>
                            <p
                              className="text-sm font-medium text-gray-700"
                              dangerouslySetInnerHTML={{
                                __html: userAnswer || " No answer provided ",
                              }}
                            />
                          </div>
                          {correctAnswer !== "" ? (
                            <div>
                              <p className="text-xs text-gray-500 mb-1">
                                Correct Answer:
                              </p>
                              <p
                                className="text-sm font-medium text-green-600"
                                dangerouslySetInnerHTML={{
                                  __html: correctAnswer,
                                }}
                              ></p>
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <div className="bg-white dark:border-gray-200 shadow-md border-t py-3 px-4 sm:px-6 ">
        <div className="max-w-4xl mx-auto flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`flex items-center px-5 py-3 rounded-lg font-medium transition-all ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-xs"
            }`}
          >
            <FiChevronLeft className="mr-2 text-lg" />
            Previous
          </button>
          <button
            onClick={handleNext}
            // disabled={currentPage === totalPages}
            className={`flex items-center px-4 py-2 bg-gradient-to-r from-primary-color1 to-primary-color2 rounded-lg font-medium text-white transition-all shadow-md`}
          >
            <div className="flex items-center">
              Next
              <FiChevronRight className="ml-2 text-lg" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPreviewTraniee;
