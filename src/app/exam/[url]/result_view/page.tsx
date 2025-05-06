"use client";
import { useFetchWithId } from "@/hooks/useFetch";
import {
  fetchAssignmentById,
  fetchResultViewById,
} from "@/lib/action/assignment_action";
import { Assignment } from "@/types/adminTypes/assignments/assignmentsTypes";
import { ResultQuestionData } from "@/types/adminTypes/assignments/examTypes";
import { Progress } from "antd";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const QuizResultsViewPage = () => {
  const params = useSearchParams();
  const assignment_id = params.get("assignment_id");

  const { data: resultData, isLoading } = useFetchWithId<ResultQuestionData[]>(
    fetchResultViewById,
    Number(assignment_id)
  );
  const { data: exam } = useFetchWithId<Assignment>(
    fetchAssignmentById,
    Number(assignment_id)
  );
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-color1 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your answers...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white mt-8 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="w-full text-center mt-4">
          <h1 className="text-3xl text-primary-color1">{exam?.title}</h1>
        </div>

        {/* Main content */}
        <div className="p-6 md:p-8 space-y-8">
          <div className="mt-8 space-y-6">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-2">
              Detailed Answers
            </h2>
            {resultData?.map((question, index) => (
              <div
                key={index}
                className={`p-5 rounded-lg border ${
                  question.status === "Correct"
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg">
                    <span className="text-gray-600">Question {index + 1}:</span>{" "}
                    {question.question}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      question.status === "Correct"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {question.status === "Correct"
                      ? "✓ Correct"
                      : "✗ Incorrect"}
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      Your answer:
                    </p>
                    <div
                      className="bg-white p-3 rounded border border-gray-200 min-h-12"
                      dangerouslySetInnerHTML={{ __html: question.user_answer }}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      Correct answer:
                    </p>
                    <div
                      className="bg-white p-3 rounded border border-gray-200 min-h-12"
                      dangerouslySetInnerHTML={{
                        __html: question.correct_answer,
                      }}
                    />
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  <span className="font-medium">Points: </span>
                  {question.status === "Correct"
                    ? question.correct_answer_grade
                    : question.wrong_answer_grade}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResultsViewPage;
