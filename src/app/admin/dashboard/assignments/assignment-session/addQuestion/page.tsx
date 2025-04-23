"use client";
import MyEditor from "@/components/editor/QuillEditor";
import Image from "next/image";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Router, Trash, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type QuestionType =
  | "single-select"
  | "multi-select"
  | "true-false"
  | "short-answer"
  | "long-answer";

type ScoreSettings = {
  correct: number;
  wrong: number;
};

type QuestionData = {
  questionText: string;
  type: QuestionType;
  options?: string[];
  correctAnswer?: string | string[] | boolean;
  scoreSettings: ScoreSettings;
};

const QuestionCreator: React.FC = () => {
  const [questionData, setQuestionData] = useState<QuestionData>({
    questionText: "",
    type: "true-false",
    scoreSettings: { correct: 1, wrong: 0 },
  });
  const router = useRouter();

  const handleInputChange = (field: keyof QuestionData, value: any) => {
    setQuestionData((prev) => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...(questionData.options || [])];
    updatedOptions[index] = value;
    handleInputChange("options", updatedOptions);
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

    // Update correct answers if needed
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

  const saveQuestion = () => {
    // Validate before saving
    if (!questionData.questionText.trim()) {
      alert("Question text is required");
      return;
    }

    if (["single-select", "multi-select"].includes(questionData.type)) {
      if (!questionData.options || questionData.options.length < 2) {
        alert("At least two options are required");
        return;
      }
      if (questionData.options.some((opt) => !opt.trim())) {
        alert("Options cannot be empty");
        return;
      }
      if (
        questionData.type === "single-select" &&
        !questionData.correctAnswer
      ) {
        alert("Please select a correct answer");
        return;
      }
      if (
        questionData.type === "multi-select" &&
        (!questionData.correctAnswer ||
          (questionData.correctAnswer as string[]).length === 0)
      ) {
        alert("Please select at least one correct answer");
        return;
      }
    }

    if (
      ["short-answer", "long-answer"].includes(questionData.type) &&
      !questionData.correctAnswer
    ) {
      alert("Please provide a correct answer");
      return;
    }

    console.log("Saving question:", questionData);
    // Here you would typically send the data to an API
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 ">
      <div className="mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="px-6 py-8">
            <h1 className="text-2xl md:text-3xl text-primary-color1 dark:text-primary-color1-light font-bold">
              Create New Question
            </h1>
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
                      className="block w-full px-3 py-2 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-500 focus:ring-1 focus:ring-primary-color1 dark:focus:ring-primary-color1-light focus:outline-0 transition duration-200"
                      required
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
                      setQuestionData({
                        questionText: questionData.questionText,
                        type: newType as QuestionType,
                        scoreSettings: questionData.scoreSettings,
                        options: ["single-select", "multi-select"].includes(
                          newType
                        )
                          ? questionData.options || ["", ""]
                          : undefined,
                        correctAnswer: undefined,
                      });
                    }}
                  >
                    <SelectTrigger className="bg-gray-50 dark:bg-gray-500 text-gray-900 dark:text-gray-100">
                      <SelectValue placeholder="Select question type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-700">
                      <SelectItem
                        value="single-select"
                        className="hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Single Select
                      </SelectItem>
                      <SelectItem
                        value="multi-select"
                        className="hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Multi Select
                      </SelectItem>
                      <SelectItem
                        value="true-false"
                        className="hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        True/False
                      </SelectItem>
                      <SelectItem
                        value="short-answer"
                        className="hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Short Answer
                      </SelectItem>
                      <SelectItem
                        value="long-answer"
                        className="hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Long Answer
                      </SelectItem>
                    </SelectContent>
                  </Select>
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
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {(questionData.options || []).length}/10 options
                        </span>
                      </div>

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
                              <MyEditor
                                key={`editor-${index}`}
                                value={option}
                                onChange={(value) =>
                                  handleOptionChange(index, value)
                                }
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeOption(index)}
                              disabled={
                                (questionData.options?.length || 0) <= 2
                              }
                              className="h-10 w-10 flex items-center justify-center text-red-500 dark:text-red-400 sm:self-center"
                              title="Remove option"
                            >
                              <Trash2 className="text-xs" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <Button
                          type="button"
                          onClick={addOption}
                          disabled={(questionData.options?.length || 0) >= 10}
                          className="items-center bg-white  px-3 py-2 border-2 font-medium text-sm sm:text-xs mt-4 border-primary-color1 dark:border-primary-color1-light hover:bg-primary-color1 dark:hover:bg-primary-color1-light hover:text-white duration-200 transition-all text-primary-color1 dark:text-primary-color1-light relative w-full sm:w-auto"
                        >
                          <Plus className="inline-flex mr-2 group-hover:text-white" />
                          Add Answer
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Correct Answer for True/False */}
                  {questionData.type === "true-false" && (
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Correct Answer
                        <span className="text-red-500 ml-1">*</span>
                      </label>
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
                      <input
                        type="text"
                        value={(questionData.correctAnswer as string) || ""}
                        onChange={(e) =>
                          handleInputChange("correctAnswer", e.target.value)
                        }
                        className="block w-full px-3 py-2 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-500 focus:ring-1 focus:ring-primary-color1 dark:focus:ring-primary-color1-light focus:outline-0 transition duration-200"
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
                      <textarea
                        value={(questionData.correctAnswer as string) || ""}
                        onChange={(e) =>
                          handleInputChange("correctAnswer", e.target.value)
                        }
                        className="block w-full px-4 py-3 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-500 focus:ring-1 focus:ring-primary-color1 dark:focus:ring-primary-color1-light focus:outline-0 transition duration-200"
                        placeholder="Enter a correct answer"
                      />
                    </div>
                  )}
                </div>

                {/* hint  */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Hint :
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={questionData.questionText}
                      onChange={(e) =>
                        handleInputChange("questionText", e.target.value)
                      }
                      placeholder="Enter a hint for the question .."
                      className="block w-full px-3 py-2 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-500 focus:ring-1 focus:ring-primary-color1 dark:focus:ring-primary-color1-light focus:outline-0 transition duration-200"
                      required
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

                {/* Score Settings */}
                <div className="space-y-4 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-300 dark:border-gray-600">
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
                      <label className="text-sm gap-2 font-medium text-gray-700 dark:text-gray-300 flex items-center">
                        <Image
                          src={"/icons/correct.svg"}
                          height={16}
                          width={16}
                          alt="incorrect"
                        />
                        Points for Correct Answer
                      </label>
                      <div className="relative rounded-md shadow-sm">
                        <input
                          type="number"
                          min="0"
                          step="0.5"
                          value={questionData.scoreSettings.correct}
                          onChange={(e) =>
                            handleInputChange("scoreSettings", {
                              ...questionData.scoreSettings,
                              correct: Number(e.target.value),
                            })
                          }
                          className="block w-full px-3 py-2 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-500 focus:ring-1 focus:ring-primary-color1 dark:focus:ring-primary-color1-light focus:outline-0 transition duration-200"
                        />
                      </div>
                    </div>
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
                          max="0"
                          step="0.5"
                          value={questionData.scoreSettings.wrong}
                          onChange={(e) =>
                            handleInputChange("scoreSettings", {
                              ...questionData.scoreSettings,
                              wrong: Number(e.target.value),
                            })
                          }
                          className="block w-full px-3 py-2 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-500 focus:ring-1 focus:ring-primary-color1 dark:focus:ring-primary-color1-light focus:outline-0 transition duration-200"
                        />
                        <span className="mt-4 text-gray-500 dark:text-gray-400 text-xs">
                          Warning! Number of points must be negative or zero.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-end space-x-3">
                <Button
                  type="button"
                  onClick={() => router.back()}
                  className="items-center px-4 py-1 border-2 font-semibold text-xs mt-4 bg-red-500 text-white hover:bg-white hover:text-red-500 transition-all duration-200 hover:border-red-500 "
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="items-center px-4 py-1 border-2 font-semibold text-xs mt-4 bg-primary-color1 text-white hover:bg-white hover:text-primary-color1 transition-all duration-200 hover:border-primary-color1 "
                >
                  Save and add next
                </Button>
                <Button
                  type="button"
                  onClick={saveQuestion}
                  className="items-center px-4 py-1 border-2 font-semibold text-xs mt-4 bg-primary-color1 text-white hover:bg-white hover:text-primary-color1 transition-all duration-200 hover:border-primary-color1 "
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCreator;
