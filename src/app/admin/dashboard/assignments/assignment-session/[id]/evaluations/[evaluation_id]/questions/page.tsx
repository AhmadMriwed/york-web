"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
  BookmarkIcon,
  CheckCircleIcon,
  EditIcon,
  Trash,
  XCircleIcon,
} from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { IoArrowBackSharp, IoSearch, IoClose } from "react-icons/io5";
import { TfiMoreAlt } from "react-icons/tfi";
import { Button, Header } from "rsuite";
import { Star, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import Loading from "@/components/Pars/Loading";
import { MdQuestionMark } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import {
  deletedQuestions,
  deleteQuestion,
  updateExamSettings,
} from "@/lib/action/exam_action";
import { getQuestionsByFormId } from "@/lib/action/user/userr_action";
import Image from "next/image";
import { images } from "@/constants/images";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { markAllEvaluationQuestions } from "@/lib/action/evaluation_action";

type Field = {
  id: number;
  question_form_id: number;
  field: string;
  field_type: string;
  isCorrect: boolean;
};

type CorrectAnswers = {
  id: number;
  question_form_id: number;
  correct_value: string;
};

type QuestionData = {
  id: number;
  question_number: number;
  question: string;
  fields: Field[];
  question_type_id: number;
  required: number;
  correct_answers: CorrectAnswers[];
  correct_answer_grade: number;
  wrong_answer_grade: number;
  hint: string;
  form_id: number;
};

const typeDisplayMap = [
  "All",
  "Single choice",
  "Multi choice",
  "True/False",
  "Short answer",
  "Long answer",
  "Rating Scale",
];
const QuestionManager = () => {
  const searchParams = useSearchParams();
  const form_id = searchParams.get("form_id");
  const examConfigId = searchParams.get("configId");
  const questionsTypeFromUrl = searchParams.get("questionsType");
  const router = useRouter();
  const { id, evaluation_id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const [correctAnswerGrade, setCorrectAnswerGrade] = useState(0);
  const [wrongAnswerGrade, setWrongAnswerGrade] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showMarkDialog, setShowMarkDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [isDeleteById, setIsDeleteById] = useState(false);
  const [isBulkDelete, setIsBulkDelete] = useState(false);
  const [questionsData, setQuestionsData] = useState<QuestionData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isChangeGrades, setIsChangGrades] = useState(false);
  const [questionnsTypeAll, setQuesitonnsTypeAll] = useState<any>();

  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        const response = await getQuestionsByFormId(
          Number(form_id),
          currentPage
        );
        if (response.data) {
          setQuestionsData(response.data);
          setTotalPages(response.meta.last_page);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
        toast.error("Failed to load questions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, [refreshCount, currentPage, isChangeGrades, form_id]);

  const refreshData = () => {
    setRefreshCount((prev) => prev + 1);
  };

  const transformedQuestions = questionsData.map((q) => ({
    id: q.id,
    questionText: q.question,
    question_number: q.question_number,
    correct_answers: q.correct_answers,
    options: q.fields.map((field, index) => ({
      id: field.id,
      text: field.field,
      isCorrect: q.correct_answers.some(
        (ca) => ca.correct_value === field.field
      ),
    })),
    type: typeDisplayMap[q.question_type_id],
    points: q.correct_answer_grade,
    required: q.required,
    wrongPoints: q.wrong_answer_grade,
    isTrueFalse: q.question_type_id === 3,
    hint: q.hint,
    form_id: q.form_id,
  }));

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedQuestions(transformedQuestions.map((q) => q.id));
    } else {
      setSelectedQuestions([]);
    }
  };

  const handleQuestionSelect = (questionId: number) => {
    setSelectedQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleMarkForAllChange = () => {
    toast.info("This feature requires backend implementation");
  };

  const markAllFunc = async () => {
    const toastId = toast.loading("updating marks for all questions ..");

    try {
      const response = await markAllEvaluationQuestions(
        {
          correct_answer_grade: correctAnswerGrade,
          wrong_answer_grade: wrongAnswerGrade,
        },
        Number(evaluation_id)
      );
      setIsChangGrades(!isChangeGrades);
      console.log(response);
      toast.success("marks updating successfully", {
        id: toastId,
      });
    } catch (error) {
      toast.error("error happened", {
        id: toastId,
      });
    }
  };

  const filteredQuestions = transformedQuestions.filter((q) =>
    q.questionText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalMarks = transformedQuestions.reduce((sum, q) => sum + q.points, 0);

  const handleDeleteSelected = async () => {
    console.log("Selected IDs to delete:", selectedQuestions);
    setIsBulkDelete(true);
    const toastId = toast.loading("deleting questions...");
    try {
      const response = await deletedQuestions(selectedQuestions);
      console.log("API Response:", response);

      toast.success("Questions deleted successfully", {
        id: toastId,
        description: "The questions has been deleted successfully.",
        duration: 4000,
      });
      if (refreshData) {
        refreshData();
      }
    } catch (error: any) {
      console.error("Submission Error:", error);
      toast.error("Oops! Something went wrong", {
        id: toastId,
        description: error.message,
        duration: 5000,
      });
    } finally {
      setIsBulkDelete(false);
    }
  };

  const handleDelete = async (id: number) => {
    setIsDeleteById(true);
    const toastId = toast.loading("deleting question...");
    try {
      const response = await deleteQuestion(Number(id));
      console.log("API Response:", response);

      toast.success("Question deleted successfully", {
        id: toastId,
        description: "The question has been deleted successfully.",
        duration: 4000,
      });
      if (refreshData) {
        refreshData();
      }
    } catch (error: any) {
      console.error("Submission Error:", error);
      toast.error("Oops! Something went wrong", {
        id: toastId,
        description: error.message,
        duration: 5000,
      });
    } finally {
      setIsDeleteById(false);
    }
  };

  const editeQuestionsTypeForAll = async (type: number) => {
    const toastId = toast.loading(
      "changing questions type for all questions ..."
    );
    const quesstionstype = type == 0 ? null : type;

    // if(type == 0 && questionsTypeAll == 'null' ) return ;
    // if (type == Number(questionsTypeAll)) return; // Skip if same type
    try {
      const payload = {
        evaluation_id: Number(evaluation_id),
        condition_exams_id: null,
        old_condition_exams_id: null,
        question_type_for_all: quesstionstype,
      };
      console.log(payload);
      console.log(examConfigId);
      const response = await updateExamSettings(payload, Number(examConfigId));
      console.log("API Response:", response);
      const params = new URLSearchParams(window.location.search);
      params.set("questionsType", quesstionstype?.toString() || "null");

      router.replace(`?${params.toString()}`, { scroll: false });

      toast.success(" Changed successfully", {
        description:
          "The questions type for all questions has been updated successfully.",
        duration: 4000,
        id: toastId,
      });
      setQuesitonnsTypeAll(quesstionstype);
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
      className={`bg-gray-100 overflow-x-hidden dark:bg-gray-900  my-3 mx-1 sm:mx-2 rounded-lg  px-1 sm:px-4 py-2  min-h-screen `}
    >
      <div className="flex justify-between items-start pb-5 pt-1 max-sm:px-1">
        <Header className="flex mt-1 justify-start items-center gap-2 max-sm:pt-1  text-[var(--primary-color1)] hover:text-[var(--primary-color2)]">
          <IoArrowBackSharp
            className="text-primary-color1 text-lg sm:text-xl cursor-pointer"
            onClick={() => router.back()}
          />
          <h3 className="text-lg sm:text-xl xl:text-2xl font-semibold tracking-wide">
            Questions Manager
          </h3>
        </Header>
        <button
          onClick={() =>
            router.push(
              `/admin/dashboard/assignments/assignment-session/${id}/evaluations/${evaluation_id}/addQuestion?form_id=${form_id}&questionsType=${questionsTypeFromUrl}`
            )
          }
          className="px-6 max-sm:px-3 py-2 sm:py-[9px]  rounded-[8px]   !bg-primary-color1 active:!bg-primary-color1
      !text-white"
        >
          <p className="sm:tracking-wide max-sm:text-[15px] ">Add Question</p>
        </button>
      </div>

      <div className="flex justify-between items-center bg-white mx-1 mb-4 dark:bg-gray-800 py-3 px-3 rounded-sm gap-5">
        <div className="flex items-center gap-1 sm:gap-2">
          <label className="relative flex items-center cursor-pointer">
            <input
              type="checkbox"
              // checked={selectedQuestions.length === questionsData.length && questionsData.length > 0}
              checked={
                selectedQuestions.length === transformedQuestions.length &&
                transformedQuestions.length > 0
              }
              onChange={handleSelectAll}
              className="appearance-none h-5 w-5 max-sm:w-[18px] max-sm:h-[18px] border-2 border-gray-300 rounded-sm 
                       checked:bg-primary-color1 checked:border-0 dark:checked:bg-primary-color1
                       transition-colors duration-200 peer"
            />
            <div
              className="absolute left-0 top-0 pointer-events-none flex items-center justify-center 
                   text-white h-5 w-5 max-sm:w-[17px] max-sm:h-[17px] opacity-0 peer-checked:opacity-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </label>

          {selectedQuestions.length > 0 ? (
            <div className="flex items-center gap-4">
              <p className="text-sm sm:text-lg text-gray-800 dark:text-gray-200">
                {selectedQuestions.length} selected
              </p>
              <Button
                appearance="ghost"
                color="red"
                size="sm"
                className="!text-red-500 hover:!bg-red-50 dark:hover:!bg-red-900/20 hover:!border-transparent !border-[1px]  hover:!outline-transparent          
                focus:!outline-transparent
                focus:!border-transparent
            active:!border-transparent
            active:!outline-transparent "
                onClick={handleDeleteSelected}
              >
                <style>
                  {`
                      .rs-btn-red {
                          --rs-btn-ghost-hover-border: var(--rs-red-500);
                      }
                    `}
                </style>
                <Trash className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-1 sm:gap-2">
              <p className="text-lg text-gray-800 dark:text-gray-200">
                {questionsData.length}
              </p>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Questions
              </span>
            </div>
          )}
        </div>

        <div
          className={` ${
            selectedQuestions.length > 0 ? "max-xxs:hidden xxs:flex" : "flex"
          } items-center gap-4 max-sm:gap-2`}
        >
          <div className="max-sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2 !bg-gray-100 dark:!bg-gray-700 hover:!bg-gray-200 dark:hover:!bg-gray-600">
                  <span>
                    Type: {typeDisplayMap[Number(questionsTypeFromUrl) || 0]}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="dark:bg-gray-800 dark:border-gray-700">
                {typeDisplayMap.map((type, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => editeQuestionsTypeForAll(index)}
                    className="hover:!bg-gray-100 dark:hover:!bg-gray-700"
                  >
                    {type}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div
            className={`${
              isSearchExpanded ? "hidden sm:flex" : "flex"
            }  justify-center items-center gap-1`}
          >
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Total Marks :
            </p>{" "}
            <span className="text-[16px]">{totalMarks}</span>
            <span className="h-5 w-[1px] bg-gray-300 dark:bg-gray-500 ml-2" />
          </div>

          <div className={`${isSearchExpanded ? "hidden xxs:flex" : "flex"}`}>
            {/* Mobile - Compact Icon Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setShowMarkDialog(true)}
                className="flex items-center gap-1 sm:p-2 text-primary-color1 hover:bg-primary-color1/10 rounded-md"
                aria-label="Mark all questions"
              >
                <Star className="w-4 h-4" />
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            {/* Desktop - Original Controls */}
            <div className="hidden lg:flex items-center gap-2">
              <label className="text-sm mr-2 text-gray-600 dark:text-gray-300">
                Mark all:
              </label>
              <span className="font-bold text-green-500">✓</span> Correct :
              <input
                type="number"
                min="0"
                value={correctAnswerGrade}
                onChange={(e) => setCorrectAnswerGrade(Number(e.target.value))}
                className="w-16 px-2 py-1 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-color1"
              />
              <span className="font-bold text-red-500">✗</span>
              Incorrect :
              <input
                type="number"
                max="0"
                value={wrongAnswerGrade}
                onChange={(e) => setWrongAnswerGrade(Number(e.target.value))}
                className="w-16 px-2 py-1 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <Button
                onClick={markAllFunc}
                className="bg-primary-color1 text-white mx-4"
              >
                save
              </Button>
            </div>

            {showMarkDialog && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 lg:hidden">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[90%] max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Set Marks for All</h3>
                    <button
                      onClick={() => setShowMarkDialog(false)}
                      className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      <IoClose className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Points per question
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={correctAnswerGrade}
                        onChange={(e) =>
                          setCorrectAnswerGrade(Number(e.target.value))
                        }
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                      />
                      <input
                        type="number"
                        min="0"
                        value={wrongAnswerGrade}
                        onChange={(e) =>
                          setWrongAnswerGrade(Number(e.target.value))
                        }
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        appearance="ghost"
                        className="flex-1 border border-primary-color1 hover:dark:border-gray-600 hover:border-gray-300 hover:bg-primary-color1 hover:text-white text-primary-color1  hover:!border-none !outline-none !ring-transparent"
                        onClick={() => setShowMarkDialog(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        appearance="primary"
                        className="flex-1 !bg-primary-color1"
                        onClick={() => {
                          handleMarkForAllChange();
                          setShowMarkDialog(false);
                        }}
                      >
                        Apply to All
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div
            className={`${
              isSearchExpanded ? "block" : "hidden"
            } flex justify-center items-center gap-2  flex-grow`}
          >
            <IoSearch className="h-5 w-5 sm:w-6 sm:h-6  text-primary-color1  " />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-none bg-transparent outline-none "
            />
          </div>

          {!isSearchExpanded && (
            <button
              onClick={() => setIsSearchExpanded(true)}
              className=" text-gray-600 dark:text-gray-300"
            >
              <IoSearch className="h-5 w-5 text-primary-color1 sm:w-6 sm:h-6 " />
            </button>
          )}

          {isSearchExpanded && (
            <button
              onClick={() => setIsSearchExpanded(false)}
              className=" text-gray-600 dark:text-gray-300"
            >
              <IoClose className="h-5 w-5 text-red-500" />
            </button>
          )}
        </div>
      </div>
      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="flex items-center gap-2 !bg-gray-100 dark:!bg-gray-700 hover:!bg-gray-200 dark:hover:!bg-gray-600">
              <span>
                Type: {typeDisplayMap[Number(questionsTypeFromUrl) || 1]}
              </span>
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dark:bg-gray-800 dark:border-gray-700">
            {typeDisplayMap.map((type, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => editeQuestionsTypeForAll(index)}
                className="hover:!bg-gray-100 dark:hover:!bg-gray-700"
              >
                {type}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isLoading ? (
        <div className="flex justify-center my-16">
          <Loading />
        </div>
      ) : (
        <>
          {filteredQuestions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10">
              <Image
                src={images.emptyQuestions}
                width={340}
                height={340}
                className=" mb-6"
                alt="emtpy"
              />

              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No questions found
              </p>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1  gap-x-3 py-3 px-1 rounded-sm">
                {filteredQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="bg-white dark:bg-gray-800 rounded-sm p-2 px-3 mb-5"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <label className="relative flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedQuestions.includes(q.id)}
                            onChange={() => handleQuestionSelect(q.id)}
                            className="appearance-none h-5 w-5 max-sm:w-[18px] max-sm:h-[18px] border-2 border-gray-300 rounded-sm checked:bg-primary-color1 checked:border-0 dark:checked:bg-primary-color1 
                    transition-colors duration-200 peer"
                          />

                          <div className="absolute left-0 top-0 pointer-events-none flex items-center justify-center text-white h-5 w-5 max-sm:w-[18px] max-sm:h-[18px] opacity-0 peer-checked:opacity-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </label>

                        <p className="text-lg text-gray-800 dark:text-gray-200">
                          Q.{q.question_number}
                        </p>
                        <span className="text-red-500 mt-1">
                          {q.required === 0 ? "" : "require"}
                        </span>

                        <span
                          data-tooltip-id="hint-tooltip"
                          data-tooltip-content={q.hint}
                          className="question-icon mt-1"
                        >
                          <MdQuestionMark />
                        </span>

                        <ReactTooltip
                          id="hint-tooltip"
                          place="right"
                          variant="dark" // predefined theme
                          delayShow={300} // optional delay
                          className="max-w-[300px] text-sm" // optional styling
                        >
                          {q.hint}
                        </ReactTooltip>
                      </div>
                      <div className="flex justify-center max-sm:justify-between items-center gap-5">
                        <div className="max-sm:hidden flex justify-center items-center gap-3 ">
                          <h3 className="text-gray-500 dark:text-gray-300 text-[15px]">
                            Type
                          </h3>
                          <p className="text-[15px] text-gray-800 dark:text-white">
                            {q.type}
                          </p>
                          <span className="h-6 w-[1px] bg-gray-300 dark:bg-gray-500 ml-2" />
                        </div>
                        <div className="flex max-sm:hidden justify-center items-center gap-3">
                          <div className="flex items-center gap-2">
                            Grade :
                            <div className="flex items-center gap-1.5">
                              <CheckCircleIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                                +{q.points}
                              </span>
                            </div>
                            {q.wrongPoints && (
                              <div className="flex items-center gap-1.5">
                                <XCircleIcon className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                                <span className="text-sm font-medium text-rose-700 dark:text-rose-300">
                                  -{q.wrongPoints}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="focus:outline-none">
                              <TfiMoreAlt className="size-5 text-gray-500 dark:text-gray-300" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className={cn(
                              `w-40 h-40 py-1 dark:!bg-gray-800 border border-gray-200 dark:!border-gray-700`
                            )}
                          >
                            {[
                              {
                                icon: (
                                  <EditIcon className="text-primary-color1 size-5 max-sm:size-4" />
                                ),
                                text: "Edit",
                                action: () =>
                                  router.push(
                                    `/admin/dashboard/assignments/assignment-session/${id}/evaluations/${evaluation_id}/questions/${q.id}/update?form_id=${q.form_id}&questionsType=${questionsTypeFromUrl}`
                                  ),
                              },
                              {
                                icon: (
                                  <Trash className="text-red-500 size-5 max-sm:size-4" />
                                ),
                                text: "Delete",
                                action: () => handleDelete(q.id),
                              },
                            ].map((item, index) => (
                              <DropdownMenuItem
                                key={index}
                                onClick={item.action}
                                className="!py-[1px] flex items-center  justify-start gap-3"
                              >
                                {item.icon}
                                <h3 className="max-sm:text-[15px] text-[16px] text-gray-800">
                                  {item.text}
                                </h3>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="flex items-center gap-5 sm:hidden py-2">
                      <div className=" flex justify-center items-center gap-3 ">
                        <h3 className="text-gray-500 dark:text-gray-300 text-[15px]">
                          Type
                        </h3>
                        <p className="text-[15px] text-gray-800 dark:text-white">
                          {q.type}
                        </p>
                        <span className="h-4 w-[1px] bg-gray-300 dark:bg-gray-500 ml-2" />
                      </div>

                      <div className="flex items-center gap-2">
                        Grade :
                        <div className="flex items-center gap-1.5">
                          <CheckCircleIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                            +{q.points}
                          </span>
                        </div>
                        {q.wrongPoints && (
                          <div className="flex items-center gap-1.5">
                            <XCircleIcon className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                            <span className="text-sm font-medium text-rose-700 dark:text-rose-300">
                              -{q.wrongPoints}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="pb-3  px-2 sm:pt-3 pr-4 flex flex-col gap-y-3">
                      <div className="prose-sm prose-img:max-w-[250px] prose-img:h-[220px] prose-img:block prose-img:my-2 dark:prose-invert">
                        <p
                          dangerouslySetInnerHTML={{ __html: q.questionText }}
                        />
                      </div>
                      {q.type !== "Rating Scale" ? (
                        <div className="flex flex-col gap-y-2 items-start justify-start">
                          {q.options.map((option) => (
                            <div
                              key={option.id}
                              className={`w-full flex justify-start rounded-[5px] p-2 items-start gap-3 ${
                                option.isCorrect
                                  ? "w-full   bg-[#f0fdf8] dark:bg-[#102b27]/70"
                                  : ""
                              }`}
                            >
                              <label className="relative flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  readOnly
                                  checked={option.isCorrect}
                                  className="appearance-none peer h-4 w-4 border-2 border-gray-300 rounded-sm 
                                 checked:bg-primary-color1 checked:border-0 dark:checked:bg-primary-color1
                                 transition-colors duration-200"
                                />
                                <div
                                  className="absolute pointer-events-none flex items-center justify-center 
                                     text-white h-4 w-4 left-0 top-0 opacity-0 peer-checked:opacity-100"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                </div>
                              </label>
                              <div className="text-gray-700 dark:text-gray-300 prose-sm prose-img:max-w-[250px] prose-img:h-[220px] prose-img:block prose-img:my-2 dark:prose-invert">
                                <p
                                  dangerouslySetInnerHTML={{
                                    __html: option.text,
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col gap-y-2 items-start justify-start">
                          <div className="text-gray-700 dark:text-gray-300 prose-sm prose-img:max-w-[250px] prose-img:h-[220px] prose-img:block prose-img:my-2 dark:prose-invert">
                            <div className="">
                              <input
                                type="range"
                                min="1"
                                max={Number(q?.options[0]?.text) || 10} // Use q.options[0].text as max, fallback to 10
                                step="1"
                                value={
                                  Number(
                                    q?.correct_answers[0]?.correct_value
                                  ) || 1
                                }
                                className="!w-full h-1.5 bg-gray-300 rounded-lg cursor-pointer dark:bg-gray-600 accent-primary-color1 dark:accent-primary-color1-light"
                              />
                              <div className="flex justify-between mt-2 gap-4">
                                {Array.from(
                                  { length: Number(q?.options[0]?.text) || 10 },
                                  (_, i) => i + 1
                                ).map((num) => (
                                  <span
                                    key={num}
                                    className={`text-xs ${
                                      Number(
                                        q?.correct_answers[0]?.correct_value
                                      ) === num
                                        ? "font-bold text-primary-color1 dark:text-primary-color1-light"
                                        : "text-gray-500 dark:text-gray-400"
                                    }`}
                                  >
                                    {num}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => {
                        if (currentPage > 1) {
                          setCurrentPage(currentPage - 1);
                        }
                      }}
                      className={
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>

                  {/* Show page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          isActive={page === currentPage}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      onClick={() => {
                        if (currentPage < totalPages) {
                          setCurrentPage(currentPage + 1);
                        }
                      }}
                      className={
                        currentPage === totalPages
                          ? "pointer-events-none opacity-50"
                          : ""
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      )}
      <style>
        {`
          .rs-btn {
  transition: all 0.2s ease;
}

.rs-btn:hover {
  transform: translateY(-1px);
}

.dropdown-menu-content {
  z-index: 1000;
  min-width: 220px;
}
          `}
      </style>

      {mode === "dark" && (
        <style>
          {`
          
          
          .rs-btn {
  color: white !important;
}

          `}
        </style>
      )}
    </div>
  );
};

export default QuestionManager;
