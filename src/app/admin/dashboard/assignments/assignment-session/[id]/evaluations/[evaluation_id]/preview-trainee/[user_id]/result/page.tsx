"use client";
import { icons } from "@/constants/icons";
import { useFetchWithId } from "@/hooks/useFetch";
import {
  fetchResultById,
} from "@/lib/action/assignment_action";
import { UserResponse } from "@/types/adminTypes/assignments/examTypes";
import { Progress } from "antd";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { LinkIcon } from "lucide-react";
import { Snippet } from "@heroui/react";
import { Evaluation } from "@/types/adminTypes/assignments/assignExamTypes";
import { fetchEvaluationById } from "@/lib/action/evaluation_action";

const QuizResultsPage = () => {
  const searchparams = useSearchParams();
  const { id, evaluation_id, user_id } = useParams();


  const [evaluationData, setEvaluationData] = useState<Evaluation | any>();
  const [isLoading, setIsLoading] = useState(true);


  const router = useRouter();

  useEffect(() => {
    const fetchEvaluationData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchEvaluationById(Number(evaluation_id));
        setEvaluationData(data.data);
      } catch (error) {
        console.error("Error fetching evaluation data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvaluationData();
  }, [evaluation_id]);

  const { data: result } = useFetchWithId<UserResponse>(
    fetchResultById, Number(user_id)
  );

  function timeStringToSeconds(timeString: string) {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }

  const timeSpentSeconds = result?.answers[0]?.time_to_stay_until_the_answer
    ? timeStringToSeconds(result?.answers[0]?.time_to_stay_until_the_answer)
    : 0;

  const examDurationSeconds = (evaluationData?.duration_in_minutes || 0) * 60;

  const progressPercent =
    examDurationSeconds > 0
      ? Math.round((timeSpentSeconds / examDurationSeconds) * 100)
      : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-color1 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading trainee results...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Results Page */}
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white mt-8 rounded-xl shadow-lg overflow-hidden">
          {/* Back button */}
        

          {/* Header */}
          <div className="w-full text-center mt-2 pb-6">
            <h1 className="text-3xl text-primary-color1">
              {evaluationData?.title}
            </h1>
          </div>

          {/* Main content */}
          <div className="p-6 md:p-8 space-y-8">
            {/* User info */}
            <div className="bg-gray-50 p-4 rounded-lg flex items-center">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <Image src={icons.userCard} width={24} height={24} alt="User" />
              </div>
              <div className="ml-4">
                <h2 className="font-semibold text-gray-800">RESPONDENT</h2>
                <p className="text-primary-color1 text-lg capitalize">
                  {result?.first_name} {"  "} {result?.last_name}
                </p>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 p-4 md:p-6 rounded-lg shadow-sm">
              <div className="flex items-start gap-4">
                <div className="bg-white p-2 rounded-full shadow-sm flex-shrink-0">
                  <Image
                    src={icons.bell}
                    width={24}
                    height={24}
                    alt="Summary"
                    className="w-6 h-6"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-gray-800">SUMMARY</h2>
                  <p className="text-gray-600 text-sm md:text-base">
                    {evaluationData?.end_forms[0]?.description ||
                      "You've completed the evaluation successfully!"}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div
              className={`grid grid-cols-1 ${evaluationData?.evaluation_config?.view_results !== "manually"
                  ? "md:grid-cols-2"
                  : ""
                } gap-6`}
            >
              {/* Result card */}
              {evaluationData?.evaluation_config?.view_results !==
                "manually" && (
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="font-bold text-gray-800 mb-4">RESULT</h2>
                    <div className="flex items-center flex-col gap-7">
                      <div className="mr-6">
                        <Progress
                          type="circle"
                          percent={Number(result?.grade)}
                          width={150}
                          strokeWidth={8}
                          strokeColor={"#037f85"}
                          trailColor={"#eee"}
                          format={() => (
                            <span className="text-xl font-bold text-primary-color1">
                              {Number(result?.grade)}%
                            </span>
                          )}
                        />
                      </div>
                      <div>
                        <p className="text-gray-600 mb-3">
                          {Number(result?.grade) >= 70
                            ? "Excellent work! You have done so well "
                            : Number(result?.grade) >= 50
                              ? "Good effort! Review the answers to improve your knowledge."
                              : "Keep practicing! Review the material and try again."}
                        </p>
                        <div className="flex space-x-4 justify-center text-center">
                          <div className="text-center">
                            <p className="text-sm text-gray-500">Correct</p>
                            <p className="text-lg font-bold text-green-600">
                              {result?.correct_answers_count}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500">Incorrect</p>
                            <p className="text-lg font-bold text-red-600">
                              {result?.wrong_answers_count}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              <div className="space-y-6">
                {evaluationData?.end_forms[0]?.url && (
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <h2 className="font-bold text-gray-800 mb-4">
                      RESOURCE LINK
                    </h2>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Snippet
                        symbol={
                          <LinkIcon className="inline-block size-5 text-primary-color1 mr-2" />
                        }
                        variant="bordered"
                        className="pb-2 w-full flex items-center hide-scrollbar"
                      >
                        <p className="inline-block">
                          {evaluationData?.end_forms[0]?.url}
                        </p>
                      </Snippet>
                    </div>
                  </div>
                )}

                {/* Time Box */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <h2 className="font-bold text-gray-800 mb-4">
                    TIME STATISTICS
                  </h2>
                  <div className="flex items-center mb-4">
                    <div className="bg-[#0372f8]/10 p-2 rounded-full mr-4">
                      <Image
                        src={icons.oclock}
                        width={20}
                        height={20}
                        alt="Clock"
                      />
                    </div>
                    <div>
                      <p className="text-gray-600">Time spent</p>
                      <p className="text-2xl font-bold text-primary-color1">
                        {result?.answers[0]?.time_to_stay_until_the_answer ||
                          "00:00:00"}
                        <span className="text-sm font-normal text-gray-500 ml-2">
                          / {evaluationData?.duration_in_minutes || 0}:00
                        </span>
                      </p>
                    </div>
                  </div>
                  <Progress
                    percent={progressPercent}
                    strokeColor={"#037f85"}
                    trailColor={"#eee"}
                    showInfo={false}
                  />
                  <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                    <div>
                      <p className="text-gray-500">Start :</p>
                      <p className="font-medium">{result?.start}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">End :</p>
                      <p className="font-medium">{result?.end}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {evaluationData?.evaluation_config?.view_results !== "manually" && (
              <div className="flex justify-center">
                <button
                  onClick={() => {

                    router.push(`/admin/dashboard/assignments/assignment-session/${id}/evaluations/${evaluation_id}/preview-trainee/${user_id}/result_view`)
                  }}
                  className="px-6 py-3 bg-primary-color1 hover:bg-primary-color2 text-white rounded-lg font-medium transition-colors shadow-md flex items-center"
                >
                  Show trainee Answers
                  <FiChevronRight className="ml-2" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizResultsPage;
