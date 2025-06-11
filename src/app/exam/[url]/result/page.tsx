"use client";
import { icons } from "@/constants/icons";
import { useFetch, useFetchWithId } from "@/hooks/useFetch";
import {
  fetchAssignmentByUrl,
  fetchResultById,
  fetchResultByIdNumber,
} from "@/lib/action/assignment_action";
import { Assignment } from "@/types/adminTypes/assignments/assignmentsTypes";
import { UserResponse } from "@/types/adminTypes/assignments/examTypes";
import {
  Progress,
  Modal,
  Button,
  message,
  Form,
  Input,
  Tabs,
  Rate,
} from "antd";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiChevronRight, FiCopy, FiPrinter } from "react-icons/fi";
import TextArea from "antd/es/input/TextArea";
import { BookmarkIcon, Info, LinkIcon } from "lucide-react";
import { Snippet } from "@heroui/react";
import { submitRating } from "@/lib/action/user/userr_action";
import QuizResultsViewPage from "../result_view/page";

const { TabPane } = Tabs;

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
  const [comment, setComment] = useState("");
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);

  // New states for certification
  const [isCertificationModalOpen, setIsCertificationModalOpen] =
    useState(false);
  const [isSubmittingCertification, setIsSubmittingCertification] =
    useState(false);
  const [openSaveDialog, setOpenSaveDialog] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [emailForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState("1");
  const [currentUrl, setCurrentUrl] = useState("");

  const { data: result } = useFetchWithId<UserResponse>(
    id_number ? fetchResultByIdNumber : fetchResultById,
    //@ts-ignore
    id_number || Number(user_id)
  );

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
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

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

  // Certification functions
  const handleGetCertification = () => {
    setIsCertificationModalOpen(true);
  };

  const handleCertificationSubmit = async () => {
    try {
      await form.validateFields();
      setIsSubmittingCertification(true);

      const values = form.getFieldsValue();
      console.log("Submitted ID:", values.studentId);

      const certificateUrl = examData?.exam_messages?.certificate_url;

      if (!certificateUrl) {
        throw new Error("Certificate URL not available");
      }

      const fullCertificateUrl = `${certificateUrl}${result?.id_number}`;

      await new Promise((resolve) => setTimeout(resolve, 1000));

      window.open(fullCertificateUrl, "_blank");

      message.success("Certificate generated successfully!");
      setIsCertificationModalOpen(false);
    } catch (error) {
      console.error("Error submitting certification request:", error);
      if (error instanceof Error) {
        message.error(error.message || "Failed to generate certificate");
      }
    } finally {
      setIsSubmittingCertification(false);
    }
  };

  const handleEmailSubmit = async () => {
    try {
      const values = await emailForm.validateFields();
      console.log("Email values:", values);
      // Here you would typically send the email with the results
      message.success("Results sent successfully!");
      setOpenSaveDialog(false);
    } catch (error) {
      console.error("Error sending email:", error);
      message.error("Failed to send results. Please try again.");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(currentUrl);
    message.success("URL copied to clipboard!");
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
      {/* Rating Modal */}
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

      {/* Certification Modal */}
      <Modal
        title="Get Your Certification"
        open={isCertificationModalOpen}
        onCancel={() => setIsCertificationModalOpen(false)}
        footer={[
          <Button key="back" onClick={() => setIsCertificationModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isSubmittingCertification}
            onClick={handleCertificationSubmit}
            className="bg-primary-color1 hover:!bg-primary-color2"
          >
            Generate Certification
          </Button>,
        ]}
        centered
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="studentId"
            label="Enter Your Student ID"
            rules={[
              { required: true, message: "Please enter your student ID" },
              { min: 3, message: "ID must be at least 3 characters" },
              {
                validator: (_, value) => {
                  if (value && value !== result?.id_number) {
                    return Promise.reject(
                      new Error("Student ID does not match")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
            validateTrigger="onSubmit"
          >
            <Input placeholder="Your student ID" />
          </Form.Item>
          <p className="text-gray-500 text-sm">
            Your certification will be generated based on your exam results.
          </p>
          {result?.id_number && (
            <p className="text-gray-500 text-sm mt-2">
              Your registered student ID:{" "}
              <span className="font-medium">{result.id_number}</span>
            </p>
          )}
        </Form>
      </Modal>

      {/* Save Results Dialog */}
      <Modal
        title="Save Results"
        open={openSaveDialog}
        onCancel={() => setOpenSaveDialog(false)}
        footer={null}
        centered
        width={600}
      >
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          className="save-results-tabs"
        >
          {/* Email Tab */}
          <TabPane tab="Email" key="1">
            <h1 className="text-xl font-semibold mt-3 text-primary-color1 ">
              Get an email confirmation
            </h1>
            <p className="mt-2 text-gray-500">
              Enter your email address to receive a confirmation of your
              participation in the test and a link to your result page.
            </p>
            <Form
              form={emailForm}
              layout="vertical"
              className="mt-4"
              onFinish={handleEmailSubmit}
            >
              <Form.Item
                name="email"
                label="Email Address"
                rules={[
                  { required: true, message: "Please enter an email address" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
              >
                <Input
                  className=" focus:ring-primary-color1 focus:ring-1 focus:border-none"
                  placeholder="Enter email address"
                />
              </Form.Item>

              <div className="flex justify-end">
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-primary-color1 hover:!bg-primary-color2"
                >
                  Send Results
                </Button>
              </div>
            </Form>
          </TabPane>

          {/* Print Tab */}
          <TabPane tab="Print" key="2">
            <div className="mt-6 text-center">
              <div className="bg-gray-50 p-8 rounded-lg">
                <FiPrinter className="mx-auto text-4xl text-primary-color1 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Print Results</h3>
                <p className="text-gray-600 mb-6">
                  Print your exam results for your records.
                </p>
                <Button
                  type="primary"
                  icon={<FiPrinter />}
                  onClick={handlePrint}
                  className="bg-primary-color1 hover:!bg-primary-color2"
                >
                  Print Now
                </Button>
              </div>
            </div>
          </TabPane>

          {/* URL Tab */}
          <TabPane tab="Link" key="3">
            <div className="mt-3">
              <h1 className="text-xl font-semibold mt-3 text-primary-color1 ">
                Link to restore your test result page
              </h1>
              <p className="mt-2 text-gray-500">
                If you can&apos;t use email, save the link below in order to be
                able to restore your test result page.
              </p>
              <div className="flex items-center gap-2 mt-4">
                <Input value={currentUrl} readOnly className="flex-1" />
                <Button
                  icon={<FiCopy />}
                  onClick={handleCopyUrl}
                  className="flex items-center bg-primary-color1 hover:!bg-primary-color2 text-white"
                >
                  Copy
                </Button>
              </div>
              <div className="flex items-start gap-2 bg-gray-100 mt-8 p-4 rounded-md">
                <Info className="text-primary-color1 h-4 w-8" />
                <p className="text-gray-500  ">
                  Remember to keep your link safe and don&apos;t share it with
                  anyone. Your test result will be available to view as long as
                  it is not deleted by the test owner.
                </p>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </Modal>

      {/* Results Page */}
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white mt-8 rounded-xl shadow-lg overflow-hidden">
          <div className=" bg-gray-50 p-6 flex items-center mx-8 justify-between text-center mt-4">
            <h1 className="text-3xl text-primary-color1">{examData?.title}</h1>
            <Button
              type="primary"
              className="bg-primary-color1 hover:!bg-primary-color2"
              onClick={() => setOpenSaveDialog(true)}
            >
              <BookmarkIcon className="h-4" />
              Save the result
            </Button>
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
                      "You have completed the exam successfully!"}
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
                        {result?.grade! >=
                        examData?.exam_messages?.success_degree!
                          ? examData?.exam_messages?.success_message
                          : examData?.exam_messages?.failure_message}
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
            {examData?.exam_type?.id === 2 &&
              examData.exam_config.view_results !== "manually" &&
              Number(result?.grade) >=
                Number(examData?.exam_messages?.success_degree) && (
                <div className="bg-gradient-to-r from-[#037f86]/10 to-blue-50 p-6 rounded-lg border border-green-200 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm flex-shrink-0">
                      <Image
                        src={icons.cretification}
                        width={24}
                        height={24}
                        alt="Certificate"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-bold text-gray-800 mb-2">
                        CONGRATULATIONS!
                      </h2>
                      <p className="text-gray-600 mb-4">
                        You have passed the exam with a score of {result?.grade}
                        %. You are now eligible to receive your certification.
                      </p>
                      <Button
                        type="primary"
                        className="bg-primary-color1 hover:!bg-primary-color2"
                        onClick={handleGetCertification}
                      >
                        Get Certification
                        <FiChevronRight className="ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

            {examData?.exam_config.view_answer !== "manually" && (
              <QuizResultsViewPage />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizResultsPage;
