"use client";
import { icons } from "@/constants/icons";
import { useFetchWithId } from "@/hooks/useFetch";
import {
  fetchAssignmentById,
  fetchAssignmentByUrl,
  fetchResultById,
} from "@/lib/action/assignment_action";
import { Assignment } from "@/types/adminTypes/assignments/assignmentsTypes";
import { UserResponse } from "@/types/adminTypes/assignments/examTypes";
import { Progress } from "antd";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const QuizResultsPage = () => {
  const searchparams = useSearchParams();
  const user_id = searchparams.get("user_id");
  const [examData, setExamData] = useState<Assignment>();
  const [isLoading, setIsLoading] = useState(true);
  const { url } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchExamData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAssignmentByUrl(String(url));
        setExamData(data);
      } catch (error) {
        console.error("Error fetching exam data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExamData();
  }, [url]); // Added url to dependency array

  const { data: result } = useFetchWithId<UserResponse>(
    fetchResultById,
    Number(user_id)
  );

  const { data: exam } = useFetchWithId<Assignment>(
    fetchAssignmentById,
    Number(examData?.id)
  );

  function timeStringToSeconds(timeString: string) {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }

  const timeSpentSeconds = result?.answers[0]?.time_to_stay_until_the_answer
    ? timeStringToSeconds(result.answers[0].time_to_stay_until_the_answer)
    : 0;

  const examDurationSeconds = (exam?.duration_in_minutes || 0) * 60;

  const progressPercent =
    examDurationSeconds > 0
      ? Math.round((timeSpentSeconds / examDurationSeconds) * 100)
      : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-color1 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your results...</p>
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
          <div className="bg-gray-50 p-4 rounded-lg ">
            <div className="flex items-center">
              <div className="bg-white p-2 rounded-full shadow-sm">
                <Image src={icons.bell} width={24} height={24} alt="Bell" />
              </div>
              <div className="ml-4">
                <h2 className="font-semibold text-gray-800">SUMMARY</h2>
                <p className="text-gray-500">
                  You&apos;re making great progress! Keep up the good work.
                </p>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Result card */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="font-bold text-gray-800 mb-4">RESULT</h2>
              <div className="flex items-center">
                <div className="mr-6">
                  <Progress
                    type="circle"
                    percent={Number(result?.grade)}
                    width={120}
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
                  <div className="flex space-x-4">
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

            {/* Timer card */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="font-bold text-gray-800 mb-4">TIMER</h2>
              <div className="flex items-center mb-4">
                <div className=" bg-[#0372f8]/10 p-2 rounded-full mr-4">
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
                      / {exam?.duration_in_minutes || 0}:00
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

          {/* Toggle answers button */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                router.push(
                  `/exam/${url}/result_view?assignment_id=${examData?.id}`
                );
              }}
              className="px-6 py-3 bg-primary-color1 hover:bg-primary-color2 text-white rounded-lg font-medium transition-colors shadow-md flex items-center"
            >
              Show My Answers
              <FiChevronRight className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResultsPage;
