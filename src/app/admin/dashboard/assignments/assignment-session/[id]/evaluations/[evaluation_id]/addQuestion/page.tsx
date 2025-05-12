"use client";
import MyEditor from "@/components/editor/QuillEditor";
import Image from "next/image";
import React, { useContext, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { IoArrowBackSharp } from "react-icons/io5";
import { createQuestion } from "@/lib/action/exam_action";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { ThemeContext } from "@/components/Pars/ThemeContext";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video", "file"],
      ["clean"],
    ],
  },
};

type QuestionType =
  | "single-select"
  | "multi-select"
  | "true-false"
  | "short-answer"
  | "long-answer";

const typeNumberToTypeMap: Record<number, QuestionType> = {
  1: "single-select",
  2: "multi-select",
  3: "true-false",
  4: "short-answer",
  5: "long-answer",
};

const typeToNumberMap: Record<QuestionType, number> = {
  "single-select": 1,
  "multi-select": 2,
  "true-false": 3,
  "short-answer": 4,
  "long-answer": 5,
};

const typeDisplayMap = [
  "oindex",
  "Single choice",
  "Multi choice",
  "True/False",
  "Short answer",
  "Long answer",
];

type QuestionData = {
  questionText: string;
  type: QuestionType;
  options?: string[];
  correctAnswer?: string | string[] | boolean;
  correctAnswerGrade: number;
  wrongAnswerGrade: number;
  hint: string;
  required: boolean;
  showGrade: boolean;
};

type BackendQuestionRequest = {
  form_id: number;
  question_type_id: number;
  question: string;
  show_grade: 0 | 1;
  hint: string;
  correct_answer_grade: number;
  wrong_answer_grade: number | null;
  required: 0 | 1;
  fields: any[];
  field_types: any[];
  correct_value: any[];
};

const QuestionCreator: React.FC = () => {
  const searchParams = useSearchParams();
  const form_id = searchParams.get("form_id");
  const questionsTypeForAll = searchParams.get("questionsType");
  const [questionData, setQuestionData] = useState<QuestionData>({
    questionText: "",
    type: questionsTypeForAll
      ? typeNumberToTypeMap[Number(questionsTypeForAll)]
      : "true-false",
    correctAnswerGrade: 1,
    wrongAnswerGrade: 0,
    hint: "",
    required: true,
    showGrade: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleInputChange = (field: keyof QuestionData, value: any) => {
    setQuestionData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleTypeChange = (newType: QuestionType) => {
    setQuestionData({
      ...questionData,
      type: newType,
      options: ["single-select", "multi-select"].includes(newType)
        ? questionData.options || ["", ""]
        : undefined,
      correctAnswer:
        newType === "true-false"
          ? true
          : ["short-answer", "long-answer"].includes(newType)
          ? ""
          : undefined,
    });
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...(questionData.options || [])];
    updatedOptions[index] = value;
    handleInputChange("options", updatedOptions);

    if (errors.options) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.options;
        return newErrors;
      });
    }
  };

  const addOption = () => {
    const newOptions = [...(questionData.options || []), ""];
    handleInputChange("options", newOptions);
  };

  const removeOption = (index: number) => {
    const filteredOptions = (questionData.options || []).filter(
      (_, i) => i !== index
    );
    handleInputChange("options", filteredOptions);

    if (questionData.type === "single-select") {
      if (questionData.correctAnswer === index.toString()) {
        handleInputChange("correctAnswer", "0");
      }
    } else if (questionData.type === "multi-select") {
      const currentAnswers = new Set(
        (questionData.correctAnswer as string[]) || []
      );
      currentAnswers.delete(index.toString());
      handleInputChange("correctAnswer", Array.from(currentAnswers));
    }
  };

  const handleCorrectAnswerChange = (index: number, isChecked: boolean) => {
    if (questionData.type === "single-select") {
      handleInputChange("correctAnswer", index.toString());
    } else if (questionData.type === "multi-select") {
      const currentAnswers = new Set(
        (questionData.correctAnswer as string[]) || []
      );
      if (isChecked) {
        currentAnswers.add(index.toString());
      } else {
        currentAnswers.delete(index.toString());
      }
      handleInputChange("correctAnswer", Array.from(currentAnswers));
    }
  };

  const mapToBackendFormat = (): BackendQuestionRequest => {
    const typeMapping: Record<QuestionType, number> = {
      "single-select": 1,
      "multi-select": 2,
      "true-false": 3,
      "short-answer": 4,
      "long-answer": 5,
    };

    let fields: any[] = [];
    let fieldTypes: any[] = [];
    let correctValues: any[] = [];

    if (["single-select", "multi-select"].includes(questionData.type)) {
      fields = questionData.options || [];
      fieldTypes = Array(fields.length).fill("text");

      if (questionData.type === "single-select") {
        const correctIndex = parseInt(
          (questionData.correctAnswer as string) || "0"
        );
        correctValues = [fields[correctIndex]];
      } else {
        const indices = ((questionData.correctAnswer as string[]) || []).map(
          Number
        );
        correctValues = indices.map((idx) => fields[idx]);
      }
    } else if (questionData.type === "true-false") {
      fields = ["True", "False"];
      fieldTypes = ["boolean", "boolean"];

      correctValues = [questionData.correctAnswer ? "True" : "False"];
    } else {
      fields = [questionData.correctAnswer || ""];
      fieldTypes = ["text"];
      correctValues = [questionData.correctAnswer || ""];
    }

    return {
      form_id: Number(form_id),
      question_type_id: typeMapping[questionData.type],
      question: questionData.questionText,
      show_grade: questionData.showGrade ? 1 : 0,
      hint: questionData.hint,
      correct_answer_grade: questionData.correctAnswerGrade,
      wrong_answer_grade:
        questionData.type == "short-answer" ||
        questionData.type == "long-answer"
          ? null
          : questionData.wrongAnswerGrade,
      required: questionData.required ? 1 : 0,
      fields: fields,
      field_types: fieldTypes,
      correct_value: correctValues,
    };
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!questionData.questionText.trim()) {
      newErrors.questionText = "Question text is required";
    }

    if (["single-select", "multi-select"].includes(questionData.type)) {
      if (!questionData.options || questionData.options.length < 2) {
        newErrors.options = "At least two options are required";
      } else if (questionData.options.some((opt) => !opt.trim())) {
        newErrors.options = "All options must have text";
      }
    }

    switch (questionData.type) {
      case "true-false":
        if (typeof questionData.correctAnswer !== "boolean") {
          newErrors.correctAnswer = "Please select a correct answer";
        }
        break;
      case "short-answer":
      case "long-answer":
        if (
          !questionData.correctAnswer ||
          (questionData.correctAnswer as string).trim() === ""
        ) {
          newErrors.correctAnswer = "Please provide a correct answer";
        }
        break;
      case "single-select":
        if (!questionData.correctAnswer) {
          newErrors.correctAnswer = "Please select a correct answer";
        }
        break;
      case "multi-select":
        if (
          !questionData.correctAnswer ||
          (questionData.correctAnswer as string[]).length === 0
        ) {
          newErrors.correctAnswer = "Please select at least one correct answer";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveQuestion = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const backendData = mapToBackendFormat();
      const response = await createQuestion(backendData);
      console.log("API Response:", response);

      toast.success("Question saved successfully!");
      setQuestionData({
        questionText: "",
        type: questionsTypeForAll
          ? typeNumberToTypeMap[Number(questionsTypeForAll)]
          : "true-false",
        correctAnswerGrade: 1,
        wrongAnswerGrade: 0,
        hint: "",
        required: true,
        showGrade: true,
      });
    } catch (error: any) {
      console.error("Submission Error:", error);
      toast.error("Oops! Something went wrong", {
        description: error.message,
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-8">
            <div className="flex">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="rounded-full hover:bg-gray-100 inline-block dark:hover:bg-gray-800 h-10 w-10"
              >
                <IoArrowBackSharp className="h-8 w-8 text-primary-color1" />
              </Button>
              <h1 className="text-2xl md:text-3xl text-primary-color1 dark:text-primary-color1-light font-bold">
                Create New Question
              </h1>
            </div>
            <p className="mt-2 text-gray-500 dark:text-gray-400 opacity-90">
              Design your perfect question with our intuitive builder
            </p>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Illustration Sidebar */}
              <div className="lg:col-span-1 flex flex-col items-center">
                <div className="relative w-full aspect-square max-w-xs mb-6">
                  <Image
                    src="/information/Online test.png"
                    alt="Question illustration"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Question Text */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Question Text <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={questionData.questionText}
                      onChange={(e) =>
                        handleInputChange("questionText", e.target.value)
                      }
                      placeholder="What would you like to ask?"
                      className={`block w-full px-3 py-2 text-gray-900 dark:text-gray-100 border ${
                        errors.questionText
                          ? "border-red-500"
                          : "border-gray-300 dark:border-gray-600"
                      } rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-1 focus:ring-primary-color1 dark:focus:ring-primary-color1-light focus:outline-0 transition duration-200`}
                      required
                    />
                    {errors.questionText && (
                      <span className="text-red-500 text-xs mt-1">
                        {errors.questionText}
                      </span>
                    )}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary-color1 dark:text-primary-color1-light"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Question Type */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Question Type
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <Select
                    value={questionData.type}
                    onValueChange={(newType) => {
                      if (questionsTypeForAll !== "null") return;

                      setQuestionData({
                        ...questionData,
                        type: newType as QuestionType,
                        options: ["single-select", "multi-select"].includes(
                          newType
                        )
                          ? questionData.options || ["", ""]
                          : undefined,
                        correctAnswer: undefined,
                      });
                      setErrors((prev) => {
                        const newErrors = { ...prev };
                        delete newErrors.options;
                        delete newErrors.correctAnswer;
                        return newErrors;
                      });
                    }}
                    disabled={questionsTypeForAll !== "null"}
                  >
                    <SelectTrigger className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                      <SelectValue placeholder="Select question type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-700">
                      {questionsTypeForAll == "null" ? (
                        <>
                          <SelectItem value="single-select">
                            Single Select
                          </SelectItem>
                          <SelectItem value="multi-select">
                            Multi Select
                          </SelectItem>
                          <SelectItem value="true-false">True/False</SelectItem>
                          <SelectItem value="short-answer">
                            Short Answer
                          </SelectItem>
                          <SelectItem value="long-answer">
                            Long Answer
                          </SelectItem>
                        </>
                      ) : (
                        <SelectItem
                          value={
                            typeNumberToTypeMap[Number(questionsTypeForAll)]
                          }
                        >
                          {typeDisplayMap[Number(questionsTypeForAll)]}
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>

                  {questionsTypeForAll && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Question type is set to{" "}
                      {typeDisplayMap[Number(questionsTypeForAll)]} for all
                      questions in this form.
                    </p>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Options for Select Questions */}
                  {["single-select", "multi-select"].includes(
                    questionData.type
                  ) && (
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Options
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <span className="text-xs text-gray-700 dark:text-gray-400">
                          {(questionData.options || []).length}/10 options
                        </span>
                      </div>
                      {errors.options && (
                        <span className="text-red-500 text-xs">
                          {errors.options}
                        </span>
                      )}
                      <div className="space-y-3">
                        {(questionData.options || []).map((option, index) => (
                          <div
                            key={index}
                            className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-3 sm:p-0 rounded-lg bg-gray-50 dark:bg-gray-700 sm:bg-transparent dark:sm:bg-transparent"
                          >
                            <div className="flex items-center h-10 pl-1 sm:pl-0">
                              {questionData.type === "single-select" ? (
                                <input
                                  type="radio"
                                  name="correct-answer"
                                  checked={
                                    questionData.correctAnswer ===
                                    index.toString()
                                  }
                                  onChange={() =>
                                    handleCorrectAnswerChange(index, true)
                                  }
                                  className="h-4 w-4 text-blue-600 dark:text-blue-400 focus:ring-blue-500 border-gray-300 dark:border-gray-500"
                                />
                              ) : (
                                <input
                                  type="checkbox"
                                  checked={(
                                    (questionData.correctAnswer as string[]) ||
                                    []
                                  ).includes(index.toString())}
                                  onChange={(e) =>
                                    handleCorrectAnswerChange(
                                      index,
                                      e.target.checked
                                    )
                                  }
                                  className="h-4 w-4 text-blue-600 dark:text-blue-400 focus:ring-blue-500 rounded border-gray-300 dark:border-gray-500"
                                />
                              )}
                            </div>
                            <div className="flex-1 min-w-0 w-full my-8 md:my-4 relative">
                              <ReactQuill
                                value={option}
                                theme="snow"
                                onChange={(value: any) =>
                                  handleOptionChange(index, value)
                                }
                                className="dark:text-white"
                                modules={modules}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeOption(index);
                              }}
                              disabled={
                                (questionData.options?.length || 0) <= 2
                              }
                              className="h-10 w-10 flex items-center justify-center text-red-500 dark:text-red-400 sm:self-center hover:bg-red-50 dark:hover:bg-gray-700 rounded"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <Button
                          type="button"
                          onClick={addOption}
                          disabled={(questionData.options?.length || 0) >= 10}
                          className="items-center bg-white px-3 py-2 border-2 font-medium text-sm sm:text-xs mt-4 border-primary-color1 dark:border-primary-color1-light hover:bg-primary-color1 dark:hover:bg-primary-color1-light hover:text-white duration-200 transition-all text-primary-color1 dark:text-primary-color1-light relative w-full sm:w-auto"
                        >
                          <Plus className="inline-flex mr-2 group-hover:text-white" />
                          Add Answer
                        </Button>
                      </div>
                    </div>
                  )}

                  {questionData.type === "true-false" && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Correct Answer
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      {errors.correctAnswer && (
                        <span className="text-red-500 text-xs">
                          {errors.correctAnswer}
                        </span>
                      )}
                      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                        <label className="inline-flex items-center">
                          <div className="relative flex items-center">
                            <input
                              type="radio"
                              name="true-false"
                              checked={questionData.correctAnswer === true}
                              onChange={() =>
                                handleInputChange("correctAnswer", true)
                              }
                              className="h-4 w-4 text-blue-600 dark:text-blue-400 focus:ring-blue-500 border-gray-300 dark:border-gray-500"
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-300 font-medium">
                              True
                            </span>
                          </div>
                        </label>
                        <label className="inline-flex items-center">
                          <div className="relative flex items-center">
                            <input
                              type="radio"
                              name="true-false"
                              checked={questionData.correctAnswer === false}
                              onChange={() =>
                                handleInputChange("correctAnswer", false)
                              }
                              className="h-4 w-4 text-blue-600 dark:text-blue-400 focus:ring-blue-500 border-gray-300 dark:border-gray-500"
                            />
                            <span className="ml-2 text-gray-700 dark:text-gray-300 font-medium">
                              False
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Correct Answer for Short Answer */}
                  {questionData.type === "short-answer" && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Correct Answer
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      {errors.correctAnswer && (
                        <span className="text-red-500 text-xs">
                          {errors.correctAnswer}
                        </span>
                      )}
                      <input
                        type="text"
                        value={(questionData.correctAnswer as string) || ""}
                        onChange={(e) =>
                          handleInputChange("correctAnswer", e.target.value)
                        }
                        className={`block w-full px-3 py-2 text-gray-900 dark:text-gray-100 border ${
                          errors.correctAnswer
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        } rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-1 focus:ring-primary-color1 dark:focus:ring-primary-color1-light focus:outline-0 transition duration-200`}
                        placeholder="Enter the correct answer"
                      />
                    </div>
                  )}

                  {/* Correct Answer for Long Answer */}
                  {questionData.type === "long-answer" && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Correct Answer
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      {errors.correctAnswer && (
                        <span className="text-red-500 text-xs">
                          {errors.correctAnswer}
                        </span>
                      )}
                      <textarea
                        value={(questionData.correctAnswer as string) || ""}
                        onChange={(e) =>
                          handleInputChange("correctAnswer", e.target.value)
                        }
                        className={`block w-full px-4 py-3 text-gray-900 dark:text-gray-100 border ${
                          errors.correctAnswer
                            ? "border-red-500"
                            : "border-gray-300 dark:border-gray-600"
                        } rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-1 focus:ring-primary-color1 dark:focus:ring-primary-color1-light focus:outline-0 transition duration-200`}
                        placeholder="Enter a correct answer"
                      />
                    </div>
                  )}
                </div>

                {/* Hint */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Hint :
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={questionData.hint}
                      onChange={(e) =>
                        handleInputChange("hint", e.target.value)
                      }
                      placeholder="Enter a hint for the question .."
                      className="block w-full px-3 py-2 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-1 focus:ring-primary-color1 dark:focus:ring-primary-color1-light focus:outline-0 transition duration-200"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary-color1 dark:text-primary-color1-light"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Required Toggle */}
                <div className="flex items-center justify-start gap-4">
                  <div className="flex items-center space-x-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Required:
                    </label>
                    <input
                      type="checkbox"
                      checked={questionData.required}
                      onChange={(e) =>
                        handleInputChange("required", e.target.checked)
                      }
                      className="h-4 w-4 text-blue-600 dark:text-blue-400 focus:ring-blue-500 rounded border-gray-300 dark:border-gray-500"
                    />
                  </div>

                  {/* Show Grade Toggle */}

                  <div className="flex items-center space-x-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Show Grade:
                    </label>
                    <input
                      type="checkbox"
                      checked={questionData.showGrade}
                      onChange={(e) =>
                        handleInputChange("showGrade", e.target.checked)
                      }
                      className="h-4 w-4 text-blue-600 dark:text-blue-400 focus:ring-blue-500 rounded border-gray-300 dark:border-gray-500"
                    />
                  </div>
                </div>
                <div className="space-y-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-600">
                  <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary-color1 dark:text-primary-color1-light mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Scoring Settings :
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm gap-2 font-medium text-gray-800 dark:text-gray-300 flex items-center">
                        <Image
                          src={"/icons/correct.svg"}
                          height={16}
                          width={16}
                          alt="correct"
                        />
                        Points for Correct Answer
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <input
                          type="number"
                          min="0"
                          value={questionData.correctAnswerGrade}
                          onChange={(e) =>
                            handleInputChange(
                              "correctAnswerGrade",
                              Number(e.target.value)
                            )
                          }
                          className="block w-full px-3 py-2 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-1 focus:ring-primary-color1 dark:focus:ring-primary-color1-light focus:outline-0 transition duration-200"
                        />
                      </div>
                    </div>
                    {questionData.type !== "long-answer" &&
                      questionData.type !== "short-answer" && (
                        <div className="space-y-2">
                          <label className="gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                            <Image
                              src={"/icons/incorrect.svg"}
                              height={16}
                              width={16}
                              alt="incorrect"
                            />
                            Points for Wrong Answer :
                          </label>
                          <div className="relative rounded-md">
                            <input
                              type="number"
                              value={questionData.wrongAnswerGrade}
                              onChange={(e) =>
                                handleInputChange(
                                  "wrongAnswerGrade",
                                  Number(e.target.value)
                                )
                              }
                              className="block w-full px-3 py-2 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-1 focus:ring-primary-color1 dark:focus:ring-primary-color1-light focus:outline-0 transition duration-200"
                            />
                            <span className="mt-4 text-gray-500 dark:text-gray-400 text-xs">
                              Warning! Number of points must be negative or
                              zero.
                            </span>
                          </div>
                        </div>
                      )}
                  </div>
                </div>

                {/* Save Button */}
                <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-end space-x-3">
                    <Button
                      type="button"
                      onClick={() => router.back()}
                      className="items-center px-4 py-1 border-2 font-semibold text-xs mt-4 bg-red-500 text-white hover:bg-white hover:bg-transparent hover:text-red-500 transition-all duration-200 hover:border-red-500 "
                    >
                      Cancel
                    </Button>

                    <Button
                      type="button"
                      onClick={saveQuestion}
                      disabled={isSubmitting}
                      className="items-center px-4 py-1 border-2 font-semibold text-xs mt-4 bg-primary-color1 text-white hover:bg-transparent hover:text-primary-color1 transition-all duration-200 hover:border-primary-color1"
                    >
                      {isSubmitting ? "Saving..." : "Save"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {mode === "dark" && (
        <style>
          {`
          
          :root {
    --ql-toolbar-color: #4848;
    --ql-toolbar-bg: #f3f3f3;
    --ql-editor-color: #000;
    --ql-editor-bg: #fff;
    --ql-border-color: #ccc;
  }
  

  
  .ql-snow .ql-picker {
    color: var(--ql-toolbar-color);
  }
  
  .ql-snow .ql-stroke {
    stroke: var(--ql-toolbar-color);
  }
  
  .ql-snow .ql-fill {
    fill: var(--ql-toolbar-color);
  }
  
  .ql-toolbar.ql-snow {
    border: 1px solid var(--ql-border-color);
    background-color: var(--ql-toolbar-bg);
  }
  
  .ql-container.ql-snow {
    border: 1px solid var(--ql-border-color);
    background-color: var(--ql-editor-bg);
  }
  
  .ql-editor {
    color: var(--ql-editor-color);
  }

.ql-snow .ql-picker {
    color: #fff;
  }
  
  .ql-snow .ql-stroke {
    stroke: #fff;
  }
  
  .ql-snow .ql-fill {
    fill: #fff;
  }
  
  .ql-toolbar.ql-snow {
    border: 1px solid #374151;
    background-color: #1f2937;
  }
  
  .ql-container.ql-snow {
    border: 1px solid #374151;
    background-color: #2A3446 ;
  }
  
  .ql-editor {
    color: #fff;
  }
  
  .ql-snow .ql-picker-options {
    background-color: #374151;
    border: 1px solid #374151;
  }
  
  .ql-snow .ql-picker-label {
    color: #fff;
  }
          `}
        </style>
      )}
    </div>
  );
};

export default QuestionCreator;
