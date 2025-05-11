"use client";
import { icons } from "@/constants/icons";
import { useFetch, useFetchWithId } from "@/hooks/useFetch";
import {
  fetchAssignmentById,
  fetchAssignmentByUrl,
  fetchResultById,
  fetchResultByIdNumber,
} from "@/lib/action/assignment_action";
import { Assignment } from "@/types/adminTypes/assignments/assignmentsTypes";
import { UserResponse } from "@/types/adminTypes/assignments/examTypes";
import { Progress } from "antd";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { Modal, Button, message } from "antd";
import { Rate } from "antd";
import TextArea from "antd/es/input/TextArea";
import { LinkIcon } from "lucide-react";
import { submitRating } from "@/lib/action/user/userr_action";
import { Snippet } from "@heroui/react";

const QuizResultsPage = () => {
  const searchparams = useSearchParams();
  const user_id = searchparams.get("user_id");
  const id_number = searchparams.get("id_number");
  const [examData, setExamData] = useState<Assignment>();
  const [isLoading, setIsLoading] = useState(true);
  const [hasShownRating, setHasShownRating] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("hasShownRating") === "true";
    }
    return false;
  });
  const { url } = useParams();
  const router = useRouter();

  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [finalGrade, setFinalGrade] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);

  const { data: result } = useFetchWithId<UserResponse>(
    id_number ? fetchResultByIdNumber : fetchResultById,
    Number(id_number || user_id)
  );

  console.log(result);

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
  }, [url]);

  useEffect(() => {
    if (result && !isLoading && !hasShownRating) {
      setIsRatingModalOpen(true);
    }
  }, [result, isLoading, hasShownRating]);

  function timeStringToSeconds(timeString: string) {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }

  const handleRatingSubmit = async () => {
    if (rating === 0) {
      message.warning("Please provide a rating");
      return;
    }

    setIsSubmittingRating(true);
    try {
      if (!result) {
        throw new Error("Result data not available");
      }

      const response = await submitRating({
        assignment_user_id: Number(user_id || id_number),
        rating: rating,
        comment: comment,
      });

      console.log("Rating submission response:", response);

      if (response.status === 200) {
        message.success("Thank you for your feedback!");
      }
      setIsRatingModalOpen(false);
      // Persist to localStorage
      localStorage.setItem("hasShownRating", "true");
      setHasShownRating(true);
    } catch (error) {
      console.error("Error submitting rating:", error);
      message.error("Failed to submit rating. Please try again.");
    } finally {
      setIsSubmittingRating(false);
    }
  };

  const handleSkipRating = () => {
    setIsRatingModalOpen(false);
    localStorage.setItem("hasShownRating", "true");
    setHasShownRating(true);
  };

  const timeSpentSeconds = result?.answers[0]?.time_to_stay_until_the_answer
    ? timeStringToSeconds(result.answers[0]?.time_to_stay_until_the_answer)
    : 0;

  const examDurationSeconds = (examData?.duration_in_minutes || 0) * 60;

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
    <>
      <Modal
        title="Rate This Exam"
        open={isRatingModalOpen}
        onCancel={handleSkipRating}
        footer={[
          <Button key="skip" onClick={handleSkipRating}>
            Skip
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isSubmittingRating}
            onClick={handleRatingSubmit}
            className="bg-primary-color1 hover:bg-primary-color2"
          >
            Submit Rating
          </Button>,
        ]}
        centered
        closable={false}
      >
        <div className="space-y-6">
          <div>
            <p className="text-gray-700 mb-2">How would you rate this exam?</p>
            <Rate
              value={rating}
              onChange={setRating}
              allowHalf
              style={{ fontSize: 28 }}
              className="text-primary-color1"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>Poor</span>
              <span>Excellent</span>
            </div>
          </div>

          <div>
            <p className="text-gray-700 mb-2">Your feedback (optional):</p>
            <TextArea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you like or dislike about this exam? How could we improve?"
              maxLength={500}
              className="focus:border-primary-color1 border-2 placeholder:text-gray-600"
            />
          </div>
        </div>
      </Modal>

      {/* Results Page */}
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white mt-8 rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="w-full text-center mt-4">
            <h1 className="text-3xl text-primary-color1">{examData?.title}</h1>
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
                    {examData?.end_forms[0]?.description ||
                      "You've completed the exam successfully!"}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div
              className={`grid grid-cols-1 ${
                examData?.exam_config.view_results !== "manually"
                  ? "md:grid-cols-2"
                  : ""
              }   gap-6`}
            >
              {/* Result card - unchanged */}
              {examData?.exam_config.view_results !== "manually" && (
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
                      <div className="flex space-x-4 justify-center  text-center">
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
                {examData?.end_forms[0]?.url && (
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
                          {examData?.end_forms[0]?.url}
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
                          / {examData?.duration_in_minutes || 0}:00
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
            {examData?.exam_config.view_results !== "manually" && (
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    router.push(
                      `/exam/${url}/result_view?exam_id=${
                        examData?.id
                      }&user_id=${user_id || id_number}`
                    );
                  }}
                  className="px-6 py-3 bg-primary-color1 hover:bg-primary-color2 text-white rounded-lg font-medium transition-colors shadow-md flex items-center"
                >
                  Show My Answers
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
