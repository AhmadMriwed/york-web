"use client";

import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { Button, Header, Message, toaster } from "rsuite";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});
import "react-quill/dist/quill.snow.css";
import {
  deletedQuestionCorrectAnswers,
  deletedQuestionOptions,
  getQuestionById,
  updateQuestion,
} from "@/lib/action/exam_action";
import { toast } from "sonner";
import { ThemeContext } from "@/components/Pars/ThemeContext";

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
type Field = {
  id: number;
  field: string;
};

type CorAns = {
  id: number;
  correct_value: string;
};

type ApiData = {
  fields: Field[];
  correct_answers: CorAns[];
  question: string;
  question_type_id: number;
  show_grade: number;
  hint: string;
  correct_answer_grade: number;
  wrong_answer_grade: number;
};

type Option = {
  id?: number;
  text: string;
  isCorrect: boolean;
};

type QuestionData = {
  question: string;
  options: Option[];
  type: "single" | "multi" | "true_false" | "short" | "long";
  required: boolean;
  show_grade: boolean;
  hint: string;
  correct_answer_grade: number;
  wrong_answer_grade: number;
};

const EditQuestionPage = () => {
  const router = useRouter();
  const { id, evaluation_id, question_id } = useParams();
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  const [isLoading, setIsLoading] = useState(true);
  const [apiData, setApiData] = useState<ApiData | null>(null);
  const [originalFieldIds, setOriginalFieldIds] = useState<number[]>([]);
  const [originalCorrectAnswerIds, setOriginalCorrectAnswerIds] = useState<
    number[]
  >([]);

  const [questionData, setQuestionData] = useState<QuestionData>({
    question: "",
    options: [],
    type: "single",
    required: true,
    show_grade: false,
    hint: "",
    correct_answer_grade: 0,
    wrong_answer_grade: 0,
  });

  const [errors, setErrors] = useState({
    question: false,
    options: [] as boolean[],
    correctAnswerGrade: false,
    wrongAnswerGrade: false,
  });

  useEffect(() => {
    const fetchQuestion = async () => {
      setIsLoading(true);
      try {
        const response = await getQuestionById(Number(question_id));
        const data = response.data;
        setApiData(data);

        // Store original IDs for deletion on submit
        setOriginalFieldIds(data.fields?.map((field: any) => field.id) || []);
        setOriginalCorrectAnswerIds(
          data.correct_answers?.map((ca: any) => ca.id) || []
        );

        const questionType =
          data.question_type_id === 1
            ? "single"
            : data.question_type_id === 2
            ? "multi"
            : data.question_type_id === 3
            ? "true_false"
            : data.question_type_id === 4
            ? "short"
            : "long";

        let options: Option[] = [];

        if (questionType === "short" || questionType === "long") {
          // For short/long answers, use correct_answers or default to empty string
          if (data.correct_answers && data.correct_answers.length > 0) {
            options = data.correct_answers.map((ca: CorAns) => ({
              text: ca.correct_value || "",
              isCorrect: true,
            }));
          } else {
            options = [{ text: "", isCorrect: true }];
          }
        } else {
          // For other question types
          options = (data.fields || []).map((field: Field) => ({
            id: field.id,
            text: field.field || "",
            isCorrect: (data.correct_answers || []).some(
              (ca: CorAns) => ca.correct_value === field.field
            ),
          }));
        }

        setQuestionData({
          question: data.question || "",
          options: options,
          type: questionType,
          required: true,
          show_grade: Boolean(data.show_grade),
          hint: data.hint || "",
          correct_answer_grade: data.correct_answer_grade || 0,
          wrong_answer_grade: data.wrong_answer_grade || 0,
        });

        setErrors({
          question: false,
          options: options.map(() => false),
          correctAnswerGrade: false,
          wrongAnswerGrade: false,
        });
      } catch (error) {
        console.error("Error fetching question:", error);
        toast.error("Failed to load question data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestion();
  }, [question_id]);

  const validateForm = () => {
    const newErrors = {
      question:
        !questionData.question.trim() ||
        questionData.question.trim() === "<p><br></p>",
      options: questionData.options.map((option) => {
        const text = option.text.replace(/<[^>]*>/g, "").trim();
        return !text;
      }),
      correctAnswerGrade: questionData.correct_answer_grade <= 0,
      wrongAnswerGrade: false,
    };

    if (["single", "multi", "true_false"].includes(questionData.type)) {
      const hasCorrectAnswer = questionData.options.some(
        (opt) => opt.isCorrect
      );
      if (!hasCorrectAnswer) {
        toaster.push(
          <Message type="error" closable>
            Please select at least one correct answer
          </Message>
        );
        return false;
      }
    }

    setErrors(newErrors);
    return !Object.values(newErrors)
      .flat()
      .some((error) => error);
  };

  const handleTypeChange = (
    newType: "single" | "multi" | "true_false" | "short" | "long"
  ) => {
    let newOptions: Option[] = [];

    if (newType === "true_false") {
      newOptions = [
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: false },
      ];
    } else if (["short", "long"].includes(newType)) {
      // Initialize with empty delta structure for Quill
      newOptions = [
        {
          text:
            questionData.type === newType && questionData.options[0]?.text
              ? questionData.options[0].text
              : "<p><br></p>",
          isCorrect: true,
        },
      ];
    } else if (["single", "multi"].includes(questionData.type)) {
      // Preserve existing options when switching between single/multi
      newOptions = [...questionData.options];
    } else {
      newOptions = [{ text: "", isCorrect: false }];
    }

    setQuestionData({
      ...questionData,
      type: newType,
      options: newOptions,
      correct_answer_grade:
        newType === "true_false" ? questionData.correct_answer_grade : 0,
      wrong_answer_grade:
        newType === "true_false" ? questionData.wrong_answer_grade : 0,
    });

    setErrors({
      question: false,
      options: newOptions.map(() => false),
      correctAnswerGrade: false,
      wrongAnswerGrade: false,
    });
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions =
      questionData.options.length > 0
        ? [...questionData.options]
        : [{ text: "", isCorrect: true }];

    if (index >= newOptions.length) {
      newOptions.push({ text: value, isCorrect: true });
    } else {
      newOptions[index].text = value;
    }

    setQuestionData({ ...questionData, options: newOptions });

    setErrors((prev) => ({
      ...prev,
      options: newOptions.map(
        (opt) => !opt.text.replace(/<[^>]*>/g, "").trim()
      ),
    }));
  };

  const handleCorrectAnswerChange = (index: number) => {
    const newOptions = [...questionData.options];

    if (questionData.type === "single" || questionData.type === "true_false") {
      newOptions.forEach((opt, i) => {
        opt.isCorrect = i === index;
      });
    } else if (questionData.type === "multi") {
      newOptions[index].isCorrect = !newOptions[index].isCorrect;
    }

    setQuestionData({ ...questionData, options: newOptions });
  };

  const addNewOption = () => {
    setQuestionData({
      ...questionData,
      options: [...questionData.options, { text: "", isCorrect: false }],
    });
    setErrors((prev) => ({
      ...prev,
      options: [...prev.options, false],
    }));
  };

  const deleteOption = (index: number) => {
    const newOptions = [...questionData.options];
    newOptions.splice(index, 1);

    setQuestionData({ ...questionData, options: newOptions });
    setErrors((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = {
      form_id: Number(evaluation_id),
      question_type_id:
        questionData.type === "single"
          ? 1
          : questionData.type === "multi"
          ? 2
          : questionData.type === "true_false"
          ? 3
          : questionData.type === "short"
          ? 4
          : 5,
      question: questionData.question,
      show_grade: questionData.show_grade ? 1 : 0,
      hint: questionData.hint,
      correct_answer_grade: questionData.correct_answer_grade,
      wrong_answer_grade:
        questionData.type === "true_false" || "multi" || "single"
          ? questionData.wrong_answer_grade
          : null,
      fields: questionData.options.map((opt) => opt.text),
      field_types: questionData.options.map(() => "text"),
      correct_value: questionData.options
        .filter((opt) => opt.isCorrect)
        .map((opt) => opt.text),
      required: questionData.required ? 1 : 0,
      // Include original IDs for deletion
      original_field_ids: originalFieldIds,
      original_correct_answer_ids: originalCorrectAnswerIds,
    };

    const toastId = toast.loading("Updating question...");
    try {
      // First delete all original fields and correct answers
      if (originalCorrectAnswerIds.length > 0) {
        await deletedQuestionCorrectAnswers(originalCorrectAnswerIds);
      }
      if (originalFieldIds.length > 0) {
        await deletedQuestionOptions(originalFieldIds);
      }

      // Then update with new data
      await updateQuestion(formData, Number(question_id));
      toast.success("Question updated successfully!", { id: toastId });
      router.back();
    } catch (error: any) {
      console.error("Submission error:", error);
      toast.error("Error updating question: " + error.message, { id: toastId });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-xl font-semibold text-gray-700 dark:text-white">
          Loading question data...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 my-3 mx-1 sm:mx-2 rounded-lg px-1 sm:px-4 py-2 min-h-screen">
      <div className="flex justify-between items-start pb-5 pt-1 max-sm:px-1">
        <Header className="flex mt-1 justify-start items-center gap-2 max-sm:pt-1 text-[var(--primary-color1)] hover:text-[var(--primary-color2)]">
          <IoArrowBackSharp
            className="text-primary-color1 text-lg sm:text-xl cursor-pointer"
            onClick={() => router.back()}
          />
          <h3 className="text-lg sm:text-xl xl:text-2xl font-semibold tracking-wide">
            Edit Question
          </h3>
        </Header>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 rounded-sm p-6 mx-1 mb-4"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Question Text
            </label>
            {errors.question && (
              <p className="text-red-500 text-sm mb-2">
                Question text is required
              </p>
            )}
            <div className="dark:bg-gray-700 rounded">
              <ReactQuill
                theme="snow"
                value={questionData.question}
                onChange={(value) =>
                  setQuestionData({ ...questionData, question: value })
                }
                className={`dark:text-white ${
                  mode === "dark" ? "ql-dark" : ""
                }`}
                modules={modules}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Hint (Optional)
            </label>
            <input
              type="text"
              value={questionData.hint}
              onChange={(e) =>
                setQuestionData({ ...questionData, hint: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="Enter a hint for the question"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Question Type
            </label>
            <select
              value={questionData.type}
              onChange={(e: any) => handleTypeChange(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-color1"
            >
              <option value="single">Single select</option>
              <option value="multi">Multi select</option>
              <option value="true_false">True/False</option>
              <option value="short">Short answer</option>
              <option value="long">Long answer</option>
            </select>
          </div>

          {!["short", "long"].includes(questionData.type) && (
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {questionData.type === "true_false" ? "Answers" : "Options"}
              </label>
              <div className="space-y-3">
                {questionData.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {questionData.type !== "true_false" && (
                      <input
                        type={
                          questionData.type === "single" ? "radio" : "checkbox"
                        }
                        checked={option.isCorrect}
                        onChange={() => handleCorrectAnswerChange(index)}
                        className="h-4 w-4 text-primary-color1 focus:ring-primary-color1"
                      />
                    )}
                    {questionData.type === "true_false" ? (
                      <div className="flex items-center gap-3 w-full">
                        <input
                          type="radio"
                          checked={option.isCorrect}
                          onChange={() => handleCorrectAnswerChange(index)}
                          className="h-4 w-4 text-primary-color1 focus:ring-primary-color1"
                        />
                        <ReactQuill
                          theme="snow"
                          value={option.text}
                          readOnly
                          className="flex-1 dark:bg-gray-700"
                        />
                      </div>
                    ) : (
                      <div className="flex-1 dark:bg-gray-700 rounded">
                        <ReactQuill
                          theme="snow"
                          value={option.text}
                          onChange={(value) => handleOptionChange(index, value)}
                          className="dark:text-white"
                          modules={modules}
                        />
                      </div>
                    )}
                    {questionData.type !== "true_false" && (
                      <button
                        type="button"
                        onClick={() => deleteOption(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                {!["true_false", "short", "long"].includes(
                  questionData.type
                ) && (
                  <Button
                    appearance="ghost"
                    type="button"
                    onClick={addNewOption}
                    className="mt-4 !text-primary-color1 !border-primary-color1"
                  >
                    Add Option
                  </Button>
                )}
              </div>
            </div>
          )}
          {["short", "long"].includes(questionData.type) && (
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Correct Answer
              </label>
              <div className="dark:bg-gray-700 rounded">
                {typeof window !== "undefined" && (
                  <ReactQuill
                    theme="snow"
                    value={questionData.options[0]?.text || "<p><br></p>"}
                    onChange={(value) => handleOptionChange(0, value)}
                    className="dark:text-white"
                    modules={
                      questionData.type === "short"
                        ? { toolbar: true }
                        : modules
                    }
                    key={`quill-${questionData.type}`}
                  />
                )}
              </div>
            </div>
          )}
          <div className="max-md:space-y-4 md:flex md:gap-x-5 items-center">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Correct Answer Grade{" "}
                {errors.correctAnswerGrade && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              {errors.correctAnswerGrade && (
                <p className="text-red-500 text-sm mb-2">
                  Correct answer grade must be greater than 0
                </p>
              )}
              <input
                type="number"
                min="0"
                step="1"
                value={questionData.correct_answer_grade}
                onChange={(e) =>
                  setQuestionData({
                    ...questionData,
                    correct_answer_grade: Number(e.target.value),
                  })
                }
                className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
                  errors.correctAnswerGrade ? "border-red-500" : ""
                }`}
                required
              />
            </div>

            {(questionData.type == "true_false" ||
              questionData.type == "single" ||
              questionData.type == "multi") && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Wrong Answer Grade{" "}
                  {errors.wrongAnswerGrade && (
                    <span className="text-red-500">*</span>
                  )}
                </label>
                {errors.wrongAnswerGrade && (
                  <p className="text-red-500 text-sm mb-2">
                    Wrong answer grade cannot be negative
                  </p>
                )}
                <input
                  type="number"
                  min="0"
                  step="1"
                  value={questionData.wrong_answer_grade}
                  onChange={(e) =>
                    setQuestionData({
                      ...questionData,
                      wrong_answer_grade: Number(e.target.value),
                    })
                  }
                  className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${
                    errors.wrongAnswerGrade ? "border-red-500" : ""
                  }`}
                  required
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-start gap-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={questionData.required}
                onChange={(e) =>
                  setQuestionData({
                    ...questionData,
                    required: e.target.checked,
                  })
                }
                className="h-4 w-4 text-primary-color1 rounded focus:ring-primary-color1"
              />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Required Question
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={questionData.show_grade}
                onChange={(e) =>
                  setQuestionData({
                    ...questionData,
                    show_grade: e.target.checked,
                  })
                }
                className="h-4 w-4 text-primary-color1 rounded focus:ring-primary-color1"
              />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Show Grade
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              onClick={() => router.back()}
              className="!bg-gray-100 !text-gray-700 dark:!text-white hover:!bg-gray-200 dark:!bg-gray-700 dark:hover:!bg-gray-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="!bg-primary-color1 !text-white hover:!bg-primary-color1/90"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </form>

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
                            background-color: #2A3446;
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

export default EditQuestionPage;
