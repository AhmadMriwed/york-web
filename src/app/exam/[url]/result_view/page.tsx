"use client";
import { fetchAssignmentByUrl } from "@/lib/action/assignment_action";
import { getResultView } from "@/lib/action/evaluation_action";
import { ResultQuestionData } from "@/types/adminTypes/assignments/examTypes";
import { Collapse } from "antd";
import { Button } from "@/components/ui/button";
import type { CollapseProps } from "antd";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiChevronLeft, FiRefreshCw } from "react-icons/fi";
import { Assignment } from "@/types/adminTypes/assignments/assignmentsTypes";

const QuizResultsViewPage = () => {
  const params = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasFetched, setHasFetched] = useState<boolean>(false);
  const user_id = params.get("user_id");
  const { url } = useParams();

  const [resultData, setResultData] = useState<ResultQuestionData[] | null>([]);
  const [exam, setExam] = useState<Assignment | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      setIsLoading(true);
      try {
        const response = await getResultView(Number(user_id));
        setResultData(response.data || null);
        const data = await fetchAssignmentByUrl(String(url));
        setExam(data || null);
      } catch (error) {
        console.log(error);
        setResultData(null);
        setExam(null);
      } finally {
        setIsLoading(false);
        setHasFetched(true);
      }
    };
    fetchResult();
  }, [url]);

  const getCollapseItems = (): CollapseProps["items"] => {
    if (!resultData) return [];

    return resultData.map((question, index) => ({
      key: String(index + 1),
      label: (
        <div className="flex justify-between flex-col items-start gap-3 md:flex-row md:items-center">
          <div className="font-medium">
            Question {index + 1}:{" "}
            <span dangerouslySetInnerHTML={{ __html: question.question }} />
          </div>
          <div className="flex gap-2">
            <div className="text-sm text-gray-600 ">
              <span className="font-medium">Points: </span>
              {question.status === "Correct"
                ? question.correct_answer_grade
                : question.wrong_answer_grade}
            </div>
            <div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  question.status === "Correct"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {question.status === "Correct" ? "✓ Correct" : "✗ Incorrect"}
              </span>
            </div>
          </div>
        </div>
      ),
      children: (
        <div className="space-y-4 p-4">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">
              Your answer{question.user_answers.length > 1 ? "s" : ""}:
            </p>
            <div className="bg-white p-3 rounded border border-gray-200 space-y-2">
              {question.user_answers.map((answer, i) => (
                <div
                  key={i}
                  dangerouslySetInnerHTML={{ __html: answer }}
                  className="border-b last:border-b-0 pb-2 last:pb-0"
                />
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">
              Correct answer{question.correct_answers.length > 1 ? "s" : ""}:
            </p>
            <div className="bg-white p-3 rounded border border-gray-200 space-y-2">
              {question.correct_answers.map((answer, i) => (
                <div
                  key={i}
                  dangerouslySetInnerHTML={{ __html: answer }}
                  className="border-b last:border-b-0 pb-2 last:pb-0"
                />
              ))}
            </div>
          </div>
        </div>
      ),
      style: {
        background: question.status === "Correct" ? "#f6ffed" : "#fff2f0",
        borderColor: question.status === "Correct" ? "#b7eb8f" : "#ffccc7",
        marginBottom: 16,
        borderRadius: 8,
        border: "none",
        overflow: "hidden",
      },
    }));
  };

  if (hasFetched && (!resultData || resultData.length === 0)) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full mx-auto text-center">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <svg
                className="w-24 h-24 text-primary-color1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="absolute -inset-4 bg-amber-100 rounded-full opacity-30 -z-10"></div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            {exam ? "No Results Available" : "Evaluation Not Found"}
          </h3>

          <p className="text-gray-600 mb-8">
            {exam
              ? "It looks like you haven't completed this evaluation yet or your responses weren't recorded."
              : "We couldn't find the evaluation details. Please check the URL or try again later."}
          </p>

          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="border-gray-300 hover:bg-gray-50 px-6 py-3"
            >
              <FiChevronLeft className="mr-2" />
              Go Back
            </Button>

            {exam && (
              <Button
                onClick={() => window.location.reload()}
                className="bg-[#037f85] hover:bg-[#036a70] px-6 py-3"
              >
                <FiRefreshCw className="mr-2" />
                Try Again
              </Button>
            )}
          </div>

          {exam && (
            <p className="mt-8 text-sm text-gray-500">
              Evaluation period:{" "}
              {new Date(exam?.exam_config?.start_date).toLocaleDateString()} -{" "}
              {new Date(exam?.exam_config?.end_date).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-3">
      <div className="max-w-6xl mx-auto bg-white mt-8 rounded-xl shadow-md overflow-hidden">
        {/* Main content */}
        <div className="p-6 md:p-8 space-y-8">
          <div className="mt-8 space-y-6">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2">
              Detailed Answers
            </h2>
            <Collapse
              items={getCollapseItems()}
              accordion
              bordered={false}
              className="bg-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResultsViewPage;
