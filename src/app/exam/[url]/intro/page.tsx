"use client";

import { fetchAssignmentByUrl } from "@/lib/action/assignment_action";
import {
  fetchAssignmentById,
  startAssignment,
} from "@/lib/action/user/userr_action";
import { ExamData } from "@/types/adminTypes/assignments/assignExamTypes";
import { Assignment } from "@/types/adminTypes/assignments/assignmentsTypes";
import { Button } from "antd";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FiCheck, FiClock } from "react-icons/fi";
import { toast } from "sonner";

const Intro = () => {
  const useparams = useSearchParams();
  const user_id = useparams.get("user_id");
  const [isFetching, setIsFetching] = useState(true);
  const [examData, setExamData] = useState<Assignment>();
  const router = useRouter();
  const { url } = useParams();
  const [isStarting, setIsStarting] = useState<boolean>(false);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const data = await fetchAssignmentByUrl(String(url));
        if (!data) {
          throw new Error("no data");
        }
        setExamData(data);
      } catch (error) {
        console.error("Error fetching exam data:", error);
        toast.error("Failed to load exam data");
      } finally {
        setIsFetching(false);
      }
    };

    fetchExamData();
  }, []);

  const startExam = async () => {
    setIsStarting(true);
    try {
      const response = await startAssignment(Number(user_id));
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsStarting(false);
    }

    router.push(`/exam/${url}/questions?user_id=${user_id}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full mx-auto p-8 bg-white rounded-xl shadow-lg border border-indigo-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary-color1 mb-6">
            Welcome to the {examData?.exam_type.type}
          </h1>
          <div className="bg-[#037f85]/10 p-8 rounded-lg mb-8 border border-[#037f85]/40">
            <h2 className="text-xl font-semibold text-primary-color1 mb-4">
              Quiz Details
            </h2>
            <div className="space-y-4 text-left">
              <div className="flex items-center bg-gray-50 p-2">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-white border border-primary-color1 rounded-full mr-3">
                  <FiClock className="text-primary-color1" />
                </span>
                <span className="text-gray-700">
                  <span className="text-[16px]">Time limit:</span>{" "}
                  {examData?.duration_in_minutes} minutes
                </span>
              </div>
              <div className="flex items-center bg-gray-50 p-2">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-white border-1 border-primary-color1 rounded-full mr-3">
                  <span className="text-primary-color1 font-medium">?</span>
                </span>
                <span className="text-gray-700">
                  Total questions:{" "}
                  <span className="text-[16px]"> Total questions:</span>
                  {examData?.number_of_questions}
                </span>
              </div>
              {examData?.exam_config?.condition_exams?.length! > 0 && (
                <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                  {/* Checkmark icon with better styling */}
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-white dark:bg-gray-700 border-2 border-primary-color1 rounded-full shrink-0 mt-0.5">
                    <FiCheck className="text-primary-color1 text-lg" />
                  </span>

                  {/* Conditions text with better spacing and typography */}
                  <div className="flex-1">
                    <h4 className="text-gray-800 dark:text-white font-medium text-[16px] mb-1">
                      Conditions:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {examData?.exam_config?.condition_exams?.map(
                        (condition) => (
                          <span
                            key={condition.id}
                            className="px-2.5 py-1 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full border border-gray-400 dark:border-gray-600 shadow-xs"
                          >
                            {condition.name}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Button
            onClick={startExam}
            loading={isStarting}
            className="bg-primary-color1 p-4 text-white"
          >
            Start Quiz Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Intro;
