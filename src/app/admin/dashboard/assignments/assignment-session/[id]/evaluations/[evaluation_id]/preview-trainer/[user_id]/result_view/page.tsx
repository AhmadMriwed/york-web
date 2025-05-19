"use client";


import { fetchEvaluationById, getResultView } from "@/lib/action/evaluation_action";
import { Evaluation } from "@/types/adminTypes/assignments/assignExamTypes";

import { ResultQuestionData } from "@/types/adminTypes/assignments/examTypes";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const QuizResultsViewPage = () => {
  const searchparams = useSearchParams();
  const { id, evaluation_id, user_id } = useParams();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [resultData, setResultData] = useState<ResultQuestionData[]>([]);
  const [evaluation, setEvaluation] = useState<Evaluation | any>();

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await getResultView(Number(user_id));
        setResultData(response.data);
        const data = await fetchEvaluationById(Number(evaluation_id));
        setEvaluation(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchResult();
  }, [evaluation_id]);

  console.log(resultData);

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
          <h1 className="text-3xl text-primary-color1">{evaluation?.title}</h1>
        </div>

     
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
                    <div
                      dangerouslySetInnerHTML={{ __html: question.question }}
                      className="inline-block"
                    />{" "}
                    ?
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
                  {question.correct_answers.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">
                        Correct answer
                        {question.correct_answers.length > 1 ? "s" : ""}:
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
                  )}
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
