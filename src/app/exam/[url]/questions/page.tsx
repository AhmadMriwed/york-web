"use client";

import { useFetchWithId } from "@/hooks/useFetch";
import { fetchAssignmentByUrl } from "@/lib/action/assignment_action";
import {
  createAnswer,
  getUserById,
  fetchAssignmentById,
  getGradeAfterCreate,
  getQuestionsByFormId,
} from "@/lib/action/user/userr_action";
import { Assignment } from "@/types/adminTypes/assignments/assignmentsTypes";
import {
  ExamData,
  QuestionData,
  UserData,
} from "@/types/adminTypes/assignments/examTypes";
import { BookmarkIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiClock } from "react-icons/fi";
import { Loader } from "rsuite";
import { toast } from "sonner";

type Field = {
  question_field_id?: number;
  field: string;
};
type UserAnswer = string | string[] | boolean | null;
const QuizQuestionPage = () => {
  const searchparams = useSearchParams();
  const user_id = searchparams.get("user_id");
  const { url } = useParams();
  const router = useRouter();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [timeLeft, setTimeLeft] = useState<number>(120);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [userData, setUserData] = useState<UserData>();
  const [paginationMeta, setPaginationMeta] = useState<any>(null);
  const [examData, setExamData] = useState<Assignment>();
  const [startTime, setStartTime] = useState<string>("");
  const [visitedPages, setVisitedPages] = useState<Set<number>>(new Set([1]));
  const [perPage, setPerPage] = useState<number>(5);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [answerPageIndex, setAnswerPageIndex] = useState(1);
  const [istherePrevios, setIstherePrevios] = useState(false);

  useEffect(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const formattedStartTime = `${hours}:${minutes}:${seconds}`;
    setStartTime(formattedStartTime);
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      const values = {
        form_id: Number(examData?.forms[0]?.id!),
        page: pageIndex,
      };

      try {
        const response = await getQuestionsByFormId(values.form_id);
        if (response.data) {
          if (pageIndex === 1) {
            setQuestions(response.data);
            setUserAnswers(response.data.map(() => ""));
          } else {
            setQuestions((prev) => [...prev, ...response.data]);
            setUserAnswers((prev) => [...prev, ...response.data.map(() => "")]);
          }
          setPaginationMeta(response.meta);
          setTotalPages(response.meta.last_page);
          setPerPage(response.meta.per_page);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        toast.error("Failed to load questions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [examData?.forms[0]?.id, pageIndex]);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const data = await getUserById(Number(user_id));
        const assignmentData = await fetchAssignmentByUrl(String(url));
        if (!data || !assignmentData) {
          throw new Error("no data");
        }
        setUserData(data?.data);
        setExamData(assignmentData);
        console.log(examData);
        console.log(assignmentData?.duration_in_minutes!);
        setTimeLeft(Number(examData?.duration_in_minutes!) * 60);
      } catch (error) {
        console.error("Error fetching exam data:", error);
        toast.error("Failed to load exam data");
      }
    };

    fetchExamData();
  }, []);

  const prepareAnswerPayload = () => {
    const currentPageQuestions = questions.slice(
      (currentPage - 1) * perPage,
      currentPage * perPage
    );

    const questionForms = currentPageQuestions.map((question, index) => {
      const globalIndex = (currentPage - 1) * perPage + index;
      const answer = userAnswers[globalIndex];

      let fieldsData: Field[] = [];

      if (question.question_type_id === 1) {
        const selectedIndex =
          typeof answer === "string" ? parseInt(answer) : -1;
        if (selectedIndex >= 0 && question.fields?.[selectedIndex]) {
          fieldsData = [
            {
              question_field_id: question.fields[selectedIndex].id,
              field: question.fields[selectedIndex].field,
            },
          ];
        } else {
          fieldsData = [
            {
              question_field_id: question.fields?.[0]?.id || 0,
              field: "",
            },
          ];
        }
      } else if (question.question_type_id === 2) {
        if (Array.isArray(answer)) {
          fieldsData = answer
            .map((indexStr) => parseInt(indexStr))
            .filter((index) => !isNaN(index) && question.fields?.[index])
            .map((index) => ({
              question_field_id: question.fields[index].id,
              field: question.fields[index].field,
            }));
        }
        if (fieldsData.length === 0 && question.fields?.length > 0) {
          fieldsData = [
            {
              question_field_id: question.fields[0].id,
              field: "",
            },
          ];
        }
      } else if (question.question_type_id === 3) {
        if (answer === true || answer === false) {
          fieldsData = [
            {
              question_field_id: question.fields?.[0]?.id || 0,
              field: answer === true ? "true" : "false",
            },
          ];
        } else {
          fieldsData = [
            {
              question_field_id: question.fields?.[0]?.id || 0,
              field: "",
            },
          ];
        }
      } else {
        fieldsData =
          question.fields?.map((field) => ({
            question_field_id: field.id,
            field: answer?.toString() || "",
          })) || [];
        if (fieldsData.length === 0 && question.fields?.length > 0) {
          fieldsData = [
            {
              question_field_id: question.fields[0].id,
              field: "",
            },
          ];
        }
      }

      return {
        question_form_id: question.id,
        fields: fieldsData,
      };
    });

    return {
      user_id: Number(user_id),
      answer_page_id: istherePrevios ? answerPageIndex : null,
      page: currentPage,
      question_forms: questionForms,
      start_time: startTime,
    };
  };

  const submitAnswersForCurrentPage = async () => {
    const payload = prepareAnswerPayload();

    console.log("Submitting payload:", payload);
    setIsSubmitLoading(true);
    try {
      const response = await createAnswer(payload);
      console.log(response?.data);
      console.log(response.data["answer-pages"][0].id);
      setAnswerPageIndex(response.data["answer-pages"][0].id);
      // toast.success("Answers saved successfully");
    } catch (error) {
      console.error("Error submitting answers:", error);
      toast.error("Failed to save answers");
      throw error;
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const handlePrevious = async () => {
    if (currentPage > 1) {
      setIstherePrevios(true);
      try {
        setCurrentPage(currentPage - 1);
        setVisitedPages((prev) => new Set(prev).add(currentPage - 1));
      } catch (error) {
        console.error("Error saving answers before navigation:", error);
      }
    }
  };

  const handleNext = async () => {
    if (currentPage < totalPages) {
      setIstherePrevios(false);
      try {
        await submitAnswersForCurrentPage();

        if (currentPage === Math.ceil(questions.length / perPage)) {
          setPageIndex(currentPage + 1);
        }
        setCurrentPage(currentPage + 1);
        setVisitedPages((prev) => new Set(prev).add(currentPage + 1));
      } catch (error) {
        console.error("Error saving answers before navigation:", error);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      await submitAnswersForCurrentPage();
      const response = await getGradeAfterCreate(Number(user_id));

      toast.success("Quiz submitted successfully!");
      router.push(`/exam/${url}/result?user_id=${user_id}`);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("Failed to submit quiz");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const onAnswerChange = (index: number, answer: UserAnswer) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = answer;
    setUserAnswers(newAnswers);
  };

  const currentQuestions = questions.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const currentPageStartIndex = (currentPage - 1) * perPage;

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="shadow-md border-b bg-white fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-sm p-3 border-b border-gray-100 w-full">
            <div className="max-w-7xl mx-auto">
              {/* Mobile Layout */}
              <div className="md:hidden flex flex-col gap-2">
                <div className="flex justify-between items-center -mb-8">
                  <Image
                    src="/logo dark.png"
                    height={40}
                    width={120}
                    alt="Logo"
                    className="h-20 object-contain"
                  />
                  <div className="flex items-center gap-2">
                    <div className="bg-white p-1.5 rounded shadow-xs">
                      <FiClock className="text-primary-color1 text-md" />
                    </div>
                    <p className="text-lg font-bold text-primary-color1 tabular-nums">
                      {formatTime(timeLeft)}
                    </p>
                  </div>
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
                    <p className="font-medium">{userData?.id}</p>
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

              {/* Desktop Layout */}
              <div className="hidden md:flex h-20 items-center justify-between gap-4">
                <div className="flex-shrink-0">
                  <Image
                    src="/logo dark.png"
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
                        {userData?.id}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center bg-blue-50 px-3 py-1 rounded-lg">
                    <div className="bg-white p-1.5 rounded shadow-xs mr-2">
                      <FiClock className="text-primary-color1 text-lg" />
                    </div>
                    <p className="text-xl font-bold text-primary-color1 tabular-nums">
                      {formatTime(timeLeft)}
                    </p>
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

      {/* Questions Area */}
      <div className="flex-1 overflow-y-auto mt-32 md:mt-20 py-6 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {isLoading && currentQuestions.length === 0 ? (
            <div className="flex justify-center items-center h-72">
              <Loader2 className="animate-spin h-12 w-12 text-[#037f85]" />
            </div>
          ) : (
            currentQuestions.map((question, index) => {
              const globalIndex = currentPageStartIndex + index;
              const currentAnswer = userAnswers[globalIndex];
              const questionNumber = globalIndex + 1;

              return (
                <div
                  key={globalIndex}
                  className="bg-white rounded-xl shadow-xs p-6 border border-gray-100 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        <span className="text-primary-color1 font-bold">
                          Question {questionNumber}:
                        </span>{" "}
                        {question?.question} ?
                      </h2>
                    </div>
                    {question.hint && (
                      <div className="relative group ml-2">
                        <button className="text-gray-400 hover:text-primary-color1 focus:outline-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        <div className="absolute z-10 -left-20 md:-left-14 transform -translate-x-1/2 mt-2 px-2 w-64 hidden group-hover:block">
                          <div className="bg-gray-100 rounded-lg shadow-lg p-3 border border-gray-200">
                            <p className="text-sm text-gray-600">
                              {question.hint}
                            </p>
                          </div>
                          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-gray-50"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Answer Options */}
                  <div className="space-y-3">
                    {question.question_type_id === 1 && question.fields && (
                      <div className="space-y-2">
                        {question.fields.map((option, optionIndex) => (
                          <label
                            key={optionIndex}
                            className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                              currentAnswer === optionIndex.toString()
                                ? "border-primary-color1 bg-[#0378f6]/10 shadow-xs"
                                : "border-gray-200"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`answer-${globalIndex}`}
                              checked={currentAnswer === optionIndex.toString()}
                              onChange={() =>
                                onAnswerChange(
                                  globalIndex,
                                  optionIndex.toString()
                                )
                              }
                              className="h-4 w-4 bg-primary-color1 checked:bg-primary-color1 border-gray-300"
                            />
                            <div
                              dangerouslySetInnerHTML={{ __html: option.field }}
                              className="ml-3 text-gray-700"
                            />
                          </label>
                        ))}
                      </div>
                    )}

                    {question.question_type_id === 2 && question.fields && (
                      <div className="space-y-2">
                        {question.fields.map((option, optionIndex) => (
                          <label
                            key={optionIndex}
                            className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                              Array.isArray(currentAnswer) &&
                              currentAnswer.includes(optionIndex.toString())
                                ? "border-primary-color1 bg-[#0372f8]/10 shadow-xs"
                                : "border-gray-200 hover:border-indigo-300"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={
                                Array.isArray(currentAnswer) &&
                                currentAnswer.includes(optionIndex.toString())
                              }
                              onChange={(e) => {
                                const newAnswer = Array.isArray(currentAnswer)
                                  ? [...currentAnswer]
                                  : [];
                                if (e.target.checked) {
                                  newAnswer.push(optionIndex.toString());
                                } else {
                                  const idx = newAnswer.indexOf(
                                    optionIndex.toString()
                                  );
                                  if (idx > -1) newAnswer.splice(idx, 1);
                                }
                                onAnswerChange(globalIndex, newAnswer);
                              }}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded border-gray-300"
                            />
                            <div
                              dangerouslySetInnerHTML={{ __html: option.field }}
                              className="ml-3 text-gray-700"
                            />
                          </label>
                        ))}
                      </div>
                    )}

                    {question.question_type_id === 3 && (
                      <div className="grid grid-cols-2 gap-3">
                        <label
                          className={`p-3 rounded-lg border cursor-pointer text-center transition-all ${
                            currentAnswer === true
                              ? "border-green-500 bg-green-50 shadow-xs"
                              : "border-gray-200 hover:border-green-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`true-false-${globalIndex}`}
                            checked={currentAnswer === true}
                            onChange={() => onAnswerChange(globalIndex, true)}
                            className="hidden"
                          />
                          <span className="font-medium">True</span>
                        </label>
                        <label
                          className={`p-3 rounded-lg border cursor-pointer text-center transition-all ${
                            currentAnswer === false
                              ? "border-red-500 bg-red-50 shadow-xs"
                              : "border-gray-200 hover:border-red-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`true-false-${globalIndex}`}
                            checked={currentAnswer === false}
                            onChange={() => onAnswerChange(globalIndex, false)}
                            className="hidden"
                          />
                          <span className="font-medium">False</span>
                        </label>
                      </div>
                    )}

                    {question.question_type_id === 4 && (
                      <input
                        type="text"
                        value={
                          typeof currentAnswer === "string" ? currentAnswer : ""
                        }
                        onChange={(e) =>
                          onAnswerChange(globalIndex, e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 focus:outline-none rounded-lg focus:ring-1 focus:ring-primary-color1"
                        placeholder="Type your answer here..."
                      />
                    )}

                    {question.question_type_id === 5 && (
                      <textarea
                        value={
                          typeof currentAnswer === "string" ? currentAnswer : ""
                        }
                        onChange={(e) =>
                          onAnswerChange(globalIndex, e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color1 focus:outline-none"
                        rows={4}
                        placeholder="Type your detailed answer here..."
                      />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="bg-white border-t py-3 px-4 sm:px-6 shadow-sm">
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
            onClick={currentPage === totalPages ? handleSubmit : handleNext}
            disabled={isSubmitLoading}
            className={`flex items-center px-4 py-2 rounded-lg font-medium text-white transition-all shadow-md ${
              currentPage === totalPages
                ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                : "bg-gradient-to-r from-primary-color1 to-primary-color2 hover:from-primary-color2 hover:to-primary-color3"
            } ${isSubmitLoading ? "opacity-80 cursor-not-allowed" : ""}`}
          >
            {isSubmitLoading ? (
              <div className="flex items-center">
                <Loader2 className="animate-spin mr-2" />
                {currentPage === totalPages ? "Submitting..." : "Loading..."}
              </div>
            ) : (
              <div className="flex items-center">
                {currentPage === totalPages ? "Submit Quiz" : "Next"}
                <FiChevronRight className="ml-2 text-lg" />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestionPage;
