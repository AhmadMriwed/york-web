"use client";

import { images } from "@/constants/images";
import { fetchAssignmentByUrl } from "@/lib/action/assignment_action";
import {
  checkIfUserIsFinish,
  createAnswer,
  getGradeAfterCreate,
  getQuestionsByFormId,
  getSolution,
  getTimers,
  getUserById,
} from "@/lib/action/user/userr_action";
import { formatTime } from "@/lib/utils";
import { Assignment } from "@/types/adminTypes/assignments/assignmentsTypes";
import {
  QuestionData,
  UserData,
} from "@/types/adminTypes/assignments/examTypes";
import { Button, Modal } from "antd";
import {
  BookmarkIcon,
  Loader2,
  Mic,
  MicOff,
  Video,
  VideoOff,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight, FiClock } from "react-icons/fi";
import { toast } from "sonner";

type Field = {
  question_field_id?: number;
  field: string;
};
type UserAnswer = string | string[] | boolean | null;

type SolutionData = {
  pages: Array<{
    page_id: number;
    questions: Array<{
      question_form_id: number;
      fields: Array<{
        question_field_id: number;
        user_answer: string;
        correct_answer: string;
        status: "Correct" | "InCorrect";
      }>;
    }>;
  }>;
};

type ExamCondition = {
  id: number;
  name: string;
  type: string;
};

const QuizQuestionPage = () => {
  const searchparams = useSearchParams();
  const user_id = searchparams.get("user_id");
  const id_number = searchparams.get("id_number");
  const form_id = searchparams.get("form_id");
  const { url } = useParams();
  const router = useRouter();

  const [showUnansweredConfirm, setShowUnansweredConfirm] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showTimeEndDialog, setShowTimeEndDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [timeLeft, setTimeLeft] = useState<number>(120);
  const [userAnswers, setUserAnswers] = useState<Map<number, UserAnswer[]>>(
    new Map()
  );
  const [userData, setUserData] = useState<UserData>();
  const [examData, setExamData] = useState<Assignment>();
  const [startTime, setStartTime] = useState<string>("");
  const [answerPagesMap, setAnswerPagesMap] = useState<Map<number, number>>(
    new Map()
  );
  const [solutionData, setSolutionData] = useState<SolutionData | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isInitialized, setIsInitialized] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [micAccessGranted, setMicAccessGranted] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [showMicRequest, setShowMicRequest] = useState(false);

  const [cameraAccessGranted, setCameraAccessGranted] = useState(false);
  const [showCameraRequest, setShowCameraRequest] = useState(false);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const requestCameraAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoStream(stream);
      setCameraAccessGranted(true);
      startCameraActivityDetection(stream);
      toast.success("Camera access granted");
      return true;
    } catch (error) {
      console.error("Camera access error:", error);
      toast.error("Camera access was denied");
      return false;
    }
  };

  const startCameraActivityDetection = (stream: MediaStream) => {
    setIsCameraActive(true);

    return () => {
      // Cleanup function
      setIsCameraActive(false);
    };
  };

  const handleEnableCamera = async () => {
    const granted = await requestCameraAccess();
    if (granted) {
      setShowCameraRequest(false);
    }
  };

  // Microphone access functions
  const requestMicrophoneAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(stream);
      setMicAccessGranted(true);
      startMicActivityDetection(stream);
      toast.success("Microphone access granted");
      return true;
    } catch (error) {
      console.error("Microphone access error:", error);
      toast.error("Microphone access was denied");
      return false;
    }
  };

  const startMicActivityDetection = (stream: MediaStream) => {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    microphone.connect(analyser);
    analyser.fftSize = 256;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const detectActivity = () => {
      analyser.getByteFrequencyData(dataArray);
      const sum = dataArray.reduce((a, b) => a + b, 0);
      setMicActive(sum > 10); // Adjust threshold as needed
      if (micAccessGranted) {
        requestAnimationFrame(detectActivity);
      }
    };

    detectActivity();

    return () => {
      microphone.disconnect();
      audioContext.close();
    };
  };

  const handleEnableMicrophone = async () => {
    const granted = await requestMicrophoneAccess();
    if (granted) {
      setShowMicRequest(false);
    }
  };

  const handleDeviceConditions = async (conditions: ExamCondition[]) => {
    const cleaners: (() => void)[] = [];

    if (conditions.some((c) => c.name === "No Copying")) {
      const handleCopy = (e: ClipboardEvent) => {
        e.preventDefault();
        toast.warning("Copying is not allowed during the exam");
      };
      document.addEventListener("copy", handleCopy);
      cleaners.push(() => document.removeEventListener("copy", handleCopy));
    }

    if (conditions.some((c) => c.name === "No Pasting")) {
      const handlePaste = (e: ClipboardEvent) => {
        e.preventDefault();
        toast.warning("Pasting is not allowed during the exam");
      };
      document.addEventListener("paste", handlePaste);
      cleaners.push(() => document.removeEventListener("paste", handlePaste));
    }

    if (conditions.some((c) => c.name === "No Translation")) {
      document.documentElement.translate = false;
      const handleTranslate = () => {
        toast.warning("Translation is not allowed during the exam");
      };
      document.addEventListener("translate", handleTranslate);
      cleaners.push(() =>
        document.removeEventListener("translate", handleTranslate)
      );
    }

    // Handle device access conditions
    try {
      if (conditions.some((c) => c.name === "Open Camera")) {
        setShowCameraRequest(true);
      }

      if (conditions.some((c) => c.name === "Enable Microphone")) {
        setShowMicRequest(true);
      }

      if (conditions.some((c) => c.name === "Capture Surroundings")) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
          cleaners.push(() => {
            stream.getTracks().forEach((track) => track.stop());
          });
          setVideoStream(stream);
          setCameraAccessGranted(true);
          startCameraActivityDetection(stream);
          setMediaStream(stream);
          setMicAccessGranted(true);
          startMicActivityDetection(stream);
        } catch (error) {
          console.error("Media access error:", error);
        }
      }
    } catch (error) {
      console.error("Error setting up device conditions:", error);
    }

    return cleaners;
  };

  useEffect(() => {
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [videoStream]);

  useEffect(() => {
    if (!examData?.exam_config?.condition_exams) return;

    const conditions = examData.exam_config.condition_exams;
    const cleaners: (() => void)[] = [];

    // Add security measures
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey &&
          e.shiftKey &&
          ["i", "j", "c"].includes(e.key.toLowerCase()))
      ) {
        e.preventDefault();
        toast.warning("This action is disabled during the exam");
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      toast.warning("Right-click is disabled during the exam");
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("contextmenu", handleContextMenu);

    cleaners.push(() => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
    });

    // Handle device conditions
    const setupDeviceConditions = async () => {
      const deviceCleaners = await handleDeviceConditions(conditions);
      cleaners.push(...deviceCleaners);
    };

    setupDeviceConditions();

    return () => {
      cleaners.forEach((cleaner) => cleaner());
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [examData?.exam_config?.condition_exams]);
  // if user finish the exam :
  useEffect(() => {
    const checkuserfinish = async () => {
      try {
        const data = await checkIfUserIsFinish(
          Number(user_id),
          Number(form_id),
          id_number
        );
        console.log(data);
        if (data.status !== false) {
          router.push(
            `/exam/${url}/result?user_id=${user_id}&id_number=${id_number}&form_id=${form_id}`
          );
        }
      } catch (error) {
        router.push(
          `/exam/${url}/result?user_id=${user_id}&id_number=${id_number}&form_id=${form_id}`
        );
      }
    };
    checkuserfinish();
  }, []);

  useEffect(() => {
    const gettimsers = async () => {
      const data = await getTimers(Number(user_id), Number(form_id), id_number);
      console.log(data);

      if (data?.remaining_time) {
        const [minutes, seconds] = data.remaining_time.split(":").map(Number);
        const totalSeconds = minutes * 60 + seconds;
        setTimeLeft(totalSeconds);
      } else if (data?.remaining_minutes) {
        setTimeLeft(Number(data.remaining_minutes) * 60);
      }
    };
    gettimsers();
  }, []);

  useEffect(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const formattedStartTime = `${hours}:${minutes}:${seconds}`;
    setStartTime(formattedStartTime);
  }, []);

  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const data = await getUserById(
          Number(user_id),
          id_number,
          Number(form_id)
        );
        const assignmentData = await fetchAssignmentByUrl(String(url));
        if (!data || !assignmentData) {
          throw new Error("no data");
        }
        setUserData(data?.data!);
        setExamData(assignmentData!);
      } catch (error) {
        console.error("Error fetching exam data:", error);
        toast.error("Failed to load exam data");
      }
    };

    fetchExamData();
  }, []);

  useEffect(() => {
    if (examData?.forms[0]?.id) {
      fetchQuestions(currentPage);
    }
  }, [examData?.forms[0]?.id, currentPage]);

  useEffect(() => {
    const savedPage = localStorage.getItem(`quizCurrentPage_${url}_${user_id}`);
    if (savedPage) {
      const page = parseInt(savedPage);
      if (page !== currentPage) {
        setCurrentPage(page);
      }
    }
    setIsInitialized(true);
  }, [url, user_id]);

  useEffect(() => {
    localStorage.setItem(
      `quizCurrentPage_${url}_${user_id}`,
      currentPage.toString()
    );
  }, [currentPage, url, user_id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowTimeEndDialog(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchSolutions = useCallback(async () => {
    try {
      const response = await getSolution(Number(user_id));
      if (response?.data) {
        setSolutionData(response.data);
      }
    } catch (error) {
      console.error("Error fetching solutions:", error);
    }
  }, [user_id]);

  const fetchQuestions = useCallback(async (page: number) => {
    if (!examData?.forms[0]?.id) return;

    setIsLoading(true);
    const values = {
      form_id: Number(examData.forms[0].id),
      page: page,
    };

    try {
      const response = await getQuestionsByFormId(values.form_id, values.page);
      if (response.data) {
        setQuestions(response.data);
        setTotalPages(response.meta.last_page);

        if (!userAnswers.has(page)) {
          const initialAnswers = response.data.map((question: any) => {
            const solution = getQuestionSolution(question.id);
            return solution?.userAnswer || "";
          });

          setUserAnswers((prev) => new Map(prev).set(page, initialAnswers));
        }

        await fetchSolutions();
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      toast.error("Failed to load questions");
    } finally {
      setIsLoading(false);
    }
  }, [examData?.forms, userAnswers, fetchSolutions]);

  useEffect(() => {
    if (examData?.forms[0]?.id && isInitialized) {
      fetchQuestions(currentPage);
    }
  }, [examData?.forms, currentPage, isInitialized, fetchQuestions]);

  const getQuestionSolution = (questionId: number) => {
    if (!solutionData) return null;

    for (const page of solutionData.pages) {
      const question = page.questions.find(
        (q) => q.question_form_id === questionId
      );
      if (question) {
        return {
          userAnswer: question.fields[0]?.user_answer,
          correctAnswer: question.fields[0]?.correct_answer,
          status: question.fields[0]?.status,
        };
      }
    }
    return null;
  };

  const prepareAnswerPayload = () => {
    const currentAnswers = getCurrentPageAnswers();
    const questionForms = questions.map((question, index) => {
      const answer = currentAnswers[index];

      let fieldsData: Field[] = [];

      if (question.question_type_id === 1) {
        const selectedIndex =
          typeof answer === "string" ? parseInt(answer) : -1;
        if (selectedIndex >= 0 && question.fields?.[selectedIndex]) {
          fieldsData = [
            {
              question_field_id: question.fields[selectedIndex].id,
              field: question.fields[selectedIndex].field,
            },
          ];
        } else {
          fieldsData = [
            {
              question_field_id: question.fields?.[0]?.id || 0,
              field: "",
            },
          ];
        }
      } else if (question.question_type_id === 2) {
        if (Array.isArray(answer)) {
          fieldsData = answer
            .map((indexStr) => parseInt(indexStr))
            .filter((index) => !isNaN(index) && question.fields?.[index])
            .map((index) => ({
              question_field_id: question.fields[index].id,
              field: question.fields[index].field,
            }));
        }
        if (fieldsData.length === 0 && question.fields?.length > 0) {
          fieldsData = [
            {
              question_field_id: question.fields[0].id,
              field: "",
            },
          ];
        }
      } else if (question.question_type_id === 3) {
        if (answer === true || answer === false) {
          fieldsData = [
            {
              question_field_id: question.fields?.[0]?.id || 0,
              field: answer === true ? "True" : "False",
            },
          ];
        } else {
          fieldsData = [
            {
              question_field_id: question.fields?.[0]?.id || 0,
              field: "",
            },
          ];
        }
      } else {
        fieldsData =
          question.fields?.map((field) => ({
            question_field_id: field.id,
            field: answer?.toString() || "",
          })) || [];
        if (fieldsData.length === 0 && question.fields?.length > 0) {
          fieldsData = [
            {
              question_field_id: question.fields[0].id,
              field: "",
            },
          ];
        }
      }

      return {
        question_form_id: question.id,
        fields: fieldsData,
      };
    });

    return {
      user_id: Number(user_id),
      answer_page_id: answerPagesMap.get(currentPage) || null,
      page: currentPage,
      question_forms: questionForms,
      start_time: startTime,
    };
  };

  const submitAnswersForCurrentPage = async () => {
    const payload = prepareAnswerPayload();

    try {
      const response = await createAnswer(payload);
      const newAnswerPageId = response.data["answer-pages"][0].id;
      setAnswerPagesMap((prev) =>
        new Map(prev).set(currentPage, newAnswerPageId)
      );
      return newAnswerPageId;
    } catch (error) {
      console.error("Error submitting answers:", error);
      toast.error("Failed to save answers");
      throw error;
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const handlePrevious = async () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = async () => {
    const currentAnswers = getCurrentPageAnswers();
    const hasUnanswered = currentAnswers.some(
      (answer) =>
        answer === "" ||
        answer === null ||
        (Array.isArray(answer) && answer.length === 0)
    );

    if (hasUnanswered) {
      setPendingAction(() => async () => {
        setIsSubmitLoading(true);
        try {
          await submitAnswersForCurrentPage();
          const newPage = currentPage + 1;
          setCurrentPage(newPage);
          localStorage.setItem(
            `quizCurrentPage_${url}_${user_id}`,
            newPage.toString()
          );
        } catch (error) {
          console.error("Error saving answers before navigation:", error);
        } finally {
          setIsSubmitLoading(false);
        }
      });
      setShowUnansweredConfirm(true);
    } else {
      setIsSubmitLoading(true);
      try {
        await submitAnswersForCurrentPage();
        setCurrentPage((prev) => prev + 1);
      } catch (error) {
        console.error("Error saving answers before navigation:", error);
      } finally {
        setIsSubmitLoading(false);
      }
    }
  };

  const onAnswerChange = (index: number, answer: UserAnswer) => {
    setUserAnswers((prev) => {
      const newAnswers = new Map(prev);
      const pageAnswers = [...(newAnswers.get(currentPage) || [])];
      pageAnswers[index] = answer;
      newAnswers.set(currentPage, pageAnswers);
      return newAnswers;
    });
  };

  const getCurrentPageAnswers = () => {
    return userAnswers.get(currentPage) || questions.map(() => "");
  };

  const handleSubmit = async () => {
    setPendingAction(() => async () => {
      try {
        setIsSubmitLoading(true);
        await submitAnswersForCurrentPage();
        await getGradeAfterCreate(Number(user_id));
        toast.success("Quiz submitted successfully!");
        router.push(
          `/exam/${url}/result?user_id=${user_id}&id_number=${id_number}&form_id=${form_id}`
        );
      } catch (error) {
        console.error("Error submitting quiz:", error);
        toast.error("Failed to submit quiz");
      } finally {
        setIsSubmitLoading(false);
      }
    });
    setShowSubmitConfirm(true);
  };

  const handleTimeEndSubmit = async () => {
    try {
      setIsSubmitLoading(true);
      await submitAnswersForCurrentPage();
      await getGradeAfterCreate(Number(user_id));
      toast.success("Quiz submitted successfully!");
    } catch (error) {
      console.error("Error submitting quiz:", error);
      toast.error("Failed to submit quiz");
    } finally {
      setIsSubmitLoading(false);
    }
  };

  if (!isInitialized) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-12 w-12 text-[#037f85]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Camera Access Modal */}
      <Modal
        title={
          <div className="flex items-center">
            <Video className="h-5 w-5 mr-2" />
            <span>Camera Access Required</span>
          </div>
        }
        open={showCameraRequest && !cameraAccessGranted}
        onCancel={() => setShowCameraRequest(false)}
        footer={null}
        centered
        closable={false}
        maskClosable={false}
        width={450}
      >
        <div className="flex flex-col items-center text-center">
          <div className="bg-blue-50 p-4 rounded-full mb-4">
            <VideoOff className="h-8 w-8 text-blue-600" />
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Camera Permission Needed
          </h3>

          <p className="text-gray-600 mb-6">
            This exam requires camera access for proctoring. Please click
            &quot;Allow&quot; when prompted by your browser.
          </p>

          <div className="flex gap-3 w-full">
            <Button onClick={() => router.push("/")} className="flex-1">
              Exit Exam
            </Button>
            <Button
              type="primary"
              onClick={handleEnableCamera}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              icon={<Video className="h-4 w-4" />}
              loading={isSubmitLoading}
            >
              Enable Camera
            </Button>
          </div>
        </div>
      </Modal>

      {/* Camera Status Indicator */}
      {cameraAccessGranted && (
        <div className="fixed top-20 right-4 z-50">
          <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 p-2">
            {isCameraActive ? (
              <>
                <div className="relative mr-2">
                  <div className="absolute inset-0 bg-green-400 rounded-full opacity-75 animate-ping"></div>
                  <div className="relative w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <Video className="h-5 w-5 text-green-600" />
              </>
            ) : (
              <Video className="h-5 w-5 text-gray-500" />
            )}
            <span className="ml-2 text-sm font-medium hidden md:inline">
              {isCameraActive ? "Active" : "Standby"}
            </span>
          </div>
        </div>
      )}

      {/* Microphone Access Modal */}
      <Modal
        title={
          <div className="flex items-center">
            <Mic className="h-5 w-5 mr-2" />
            <span>Microphone Access Required</span>
          </div>
        }
        open={showMicRequest && !micAccessGranted}
        onCancel={() => setShowMicRequest(false)}
        footer={null}
        centered
        closable={false}
        maskClosable={false}
        width={450}
      >
        <div className="flex flex-col items-center text-center">
          <div className="bg-blue-50 p-4 rounded-full mb-4">
            <MicOff className="h-8 w-8 text-blue-600" />
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Microphone Permission Needed
          </h3>

          <p className="text-gray-600 mb-6">
            This exam requires microphone access for proctoring. Please click
            &quot;Allow&quot; when prompted by your browser.
          </p>

          <div className="flex gap-3 w-full">
            <Button onClick={() => router.push("/")} className="flex-1">
              Exit Exam
            </Button>
            <Button
              type="primary"
              onClick={handleEnableMicrophone}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
              icon={<Mic className="h-4 w-4" />}
              loading={isSubmitLoading}
            >
              Enable Microphone
            </Button>
          </div>
        </div>
      </Modal>

      {/* Microphone Status Indicator */}
      {micAccessGranted && (
        <div className="fixed top-4 right-4 z-50">
          <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200 p-2">
            {micActive ? (
              <>
                <div className="relative mr-2">
                  <div className="absolute inset-0 bg-green-400 rounded-full opacity-75 animate-ping"></div>
                  <div className="relative w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <Mic className="h-5 w-5 text-green-600" />
              </>
            ) : (
              <Mic className="h-5 w-5 text-gray-500" />
            )}
            <span className="ml-2 text-sm font-medium hidden md:inline">
              {micActive ? "Active" : "Standby"}
            </span>
          </div>
        </div>
      )}

      <div className="shadow-md border-b bg-white fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white shadow-sm p-3 border-b border-gray-100 w-full">
            <div className="max-w-7xl mx-auto">
              {/* Mobile Layout */}
              <div className="md:hidden flex flex-col gap-2">
                <div className="flex justify-between items-center -mb-8">
                  <Image
                    src={images.logo}
                    height={40}
                    width={120}
                    alt="Logo"
                    className="h-20 object-contain"
                  />
                  <div className="flex items-center gap-2">
                    <div className="bg-white p-1.5 rounded shadow-xs">
                      <FiClock className="text-primary-color1 text-md" />
                    </div>
                    <p className="text-lg font-bold text-primary-color1 tabular-nums">
                      {formatTime(timeLeft)}
                    </p>
                  </div>
                </div>

                <h2 className="text-lg font-bold text-primary-color1 text-center">
                  {examData?.title}
                </h2>

                <div className="flex justify-between items-center text-sm">
                  <div>
                    <p className="text-xs text-gray-600">Name:</p>
                    <p className="font-medium">
                      {userData?.first_name} {userData?.last_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">ID:</p>
                    <p className="font-medium">{userData?.id_number}</p>
                  </div>
                  <div className="flex items-center bg-teal-50 rounded-full px-3 py-1">
                    <BookmarkIcon className="h-3 w-3 mr-1 text-teal-600" />
                    <span className="font-medium text-teal-800">
                      {currentPage}
                    </span>
                    <span className="mx-1 text-teal-600">of</span>
                    <span className="font-medium text-teal-800">
                      {totalPages}
                    </span>
                  </div>
                </div>
              </div>

              <div className="hidden md:flex h-20 items-center justify-between gap-4">
                <div className="flex-shrink-0">
                  <Image
                    src={images.logo}
                    height={100}
                    width={150}
                    alt="Logo"
                    className="h object-contain"
                  />
                </div>

                <h2 className="text-xl font-bold text-primary-color1 flex-1 text-center">
                  {examData?.title}
                </h2>

                <div className="flex gap-3 items-center">
                  <div className="flex divide-x divide-gray-300 px-2 rounded-lg">
                    <div className="px-3 py-1">
                      <p className="text-xs text-gray-600">Student Name</p>
                      <p className="font-medium text-gray-900">
                        {userData?.first_name} {userData?.last_name}
                      </p>
                    </div>
                    <div className="px-3 py-1">
                      <p className="text-xs text-gray-600">Student ID</p>
                      <p className="font-medium text-gray-900">
                        {userData?.id_number}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center bg-blue-50 px-3 py-1 rounded-lg">
                    <div className="bg-white p-1.5 rounded shadow-xs mr-2">
                      <FiClock className="text-primary-color1 text-lg" />
                    </div>
                    <p className="text-xl font-bold text-primary-color1 tabular-nums">
                      {formatTime(timeLeft)}
                    </p>
                  </div>

                  <div className="flex items-center bg-teal-50 rounded-full px-3 py-1 border border-teal-100">
                    <BookmarkIcon className="h-4 w-4 mr-2 text-teal-600" />
                    <span className="font-medium text-teal-800">
                      {currentPage}
                    </span>
                    <span className="mx-1 text-teal-600">of</span>
                    <span className="font-medium text-teal-800">
                      {totalPages}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto mt-52 md:mt-40 py-6 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-[50vh]">
              <Loader2 className="animate-spin h-12 w-12 text-[#037f85]" />
            </div>
          ) : (
            questions.map((question, index) => {
              const currentAnswer = getCurrentPageAnswers()[index];
              const questionNumber = index + 1;
              const solution = getQuestionSolution(question.id);

              return (
                <div
                  key={index}
                  className={`bg-white rounded-xl shadow-xs p-6 border ${
                    getCurrentPageAnswers()[index] === "" ||
                    getCurrentPageAnswers()[index] === null ||
                    (Array.isArray(getCurrentPageAnswers()[index]) &&
                    (getCurrentPageAnswers()[index] as string[]).length === 0
                      ? "border-red-200 bg-red-50"
                      : "border-gray-100")
                  } hover:shadow-sm transition-shadow`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        <span className="text-primary-color1 font-bold">
                          Question {question.question_number}:
                        </span>{" "}
                        <div
                          dangerouslySetInnerHTML={{
                            __html: question?.question,
                          }}
                          className="ml-3 prose prose-img:max-w-[200px] prose-img:h-[200px] inline-block text-gray-700"
                        />
                      </h2>
                    </div>
                    {question.hint && (
                      <div className="relative group ml-2">
                        <button className="text-gray-400 hover:text-primary-color1 focus:outline-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                        <div className="absolute z-10 -left-20 md:-left-14 transform -translate-x-1/2 mt-2 px-2 w-64 hidden group-hover:block">
                          <div className="bg-gray-100 rounded-lg shadow-lg p-3 border border-gray-200">
                            <p className="text-sm text-gray-600">
                              {question.hint}
                            </p>
                          </div>
                          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-gray-50"></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {question.question_type_id === 1 && question.fields && (
                      <div className="space-y-2">
                        {question.fields.map((option, optionIndex) => (
                          <label
                            key={optionIndex}
                            className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                              currentAnswer === optionIndex.toString()
                                ? "border-primary-color1 bg-[#0378f6]/10 shadow-xs"
                                : "border-gray-200"
                            }`}
                          >
                            <input
                              type="radio"
                              name={`answer-${index}`}
                              checked={currentAnswer === optionIndex.toString()}
                              onChange={() =>
                                onAnswerChange(index, optionIndex.toString())
                              }
                              className="h-4 w-4 bg-primary-color1 checked:bg-primary-color1 border-gray-300"
                            />
                            <div
                              dangerouslySetInnerHTML={{ __html: option.field }}
                              className="ml-3 prose prose-img:max-w-[200px] prose-img:h-[200px] text-gray-700"
                            />
                          </label>
                        ))}
                      </div>
                    )}

                    {question.question_type_id === 2 && question.fields && (
                      <div className="space-y-2">
                        {question.fields.map((option, optionIndex) => (
                          <label
                            key={optionIndex}
                            className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                              Array.isArray(currentAnswer) &&
                              currentAnswer.includes(optionIndex.toString())
                                ? "border-primary-color1 bg-[#0372f8]/10 shadow-xs"
                                : "border-gray-200 hover:border-indigo-300"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={
                                Array.isArray(currentAnswer) &&
                                currentAnswer.includes(optionIndex.toString())
                              }
                              onChange={(e) => {
                                const newAnswer = Array.isArray(currentAnswer)
                                  ? [...currentAnswer]
                                  : [];
                                if (e.target.checked) {
                                  newAnswer.push(optionIndex.toString());
                                } else {
                                  const idx = newAnswer.indexOf(
                                    optionIndex.toString()
                                  );
                                  if (idx > -1) newAnswer.splice(idx, 1);
                                }
                                onAnswerChange(index, newAnswer);
                              }}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded border-gray-300"
                            />
                            <div
                              dangerouslySetInnerHTML={{ __html: option.field }}
                              className="ml-3 prose prose-img:max-w-[200px] prose-img:h-[200px] text-gray-700"
                            />
                          </label>
                        ))}
                      </div>
                    )}

                    {question.question_type_id === 3 && (
                      <div className="grid grid-cols-2 gap-3">
                        <label
                          className={`p-3 rounded-lg border cursor-pointer text-center transition-all ${
                            currentAnswer === true
                              ? "border-blue-500 bg-blue-50 shadow-xs"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`true-false-${index}`}
                            checked={currentAnswer === true}
                            onChange={() => onAnswerChange(index, true)}
                            className="hidden"
                          />
                          <span className="font-medium">True</span>
                        </label>
                        <label
                          className={`p-3 rounded-lg border cursor-pointer text-center transition-all ${
                            currentAnswer === false
                              ? "border-blue-500 bg-blue-50 shadow-xs"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`true-false-${index}`}
                            checked={currentAnswer === false}
                            onChange={() => onAnswerChange(index, false)}
                            className="hidden"
                          />
                          <span className="font-medium">False</span>
                        </label>
                      </div>
                    )}

                    {question.question_type_id === 4 && (
                      <input
                        type="text"
                        value={
                          typeof currentAnswer === "string" ? currentAnswer : ""
                        }
                        onChange={(e) => onAnswerChange(index, e.target.value)}
                        className="w-full p-3 border border-gray-300 focus:outline-none rounded-lg focus:ring-1 focus:ring-primary-color1"
                        placeholder="Type your answer here..."
                      />
                    )}

                    {question.question_type_id === 5 && (
                      <textarea
                        value={
                          typeof currentAnswer === "string" ? currentAnswer : ""
                        }
                        onChange={(e) => onAnswerChange(index, e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color1 focus:outline-none"
                        rows={4}
                        placeholder="Type your detailed answer here..."
                      />
                    )}
                    {question.question_type_id === 6 && (
                      <div className="space-y-4">
                        <div className="text-gray-700 dark:text-gray-300 prose-sm prose-img:max-w-[250px] prose-img:h-[220px] prose-img:block prose-img:my-2 dark:prose-invert">
                          <div className="">
                            <input
                              type="range"
                              min="1"
                              max={Number(question.fields?.[0]?.field) || 10}
                              step="1"
                              value={
                                typeof currentAnswer === "string"
                                  ? Number(currentAnswer)
                                  : 1
                              }
                              onChange={(e) =>
                                onAnswerChange(index, e.target.value)
                              }
                              className="!w-3/4 md:!w-1/2 h-1.5 bg-gray-300 rounded-lg cursor-pointer dark:bg-gray-600 accent-primary-color1 dark:accent-primary-color1-light"
                            />
                            <div className="!w-3/4 md:!w-1/2 flex justify-between mt-2 gap-4">
                              {Array.from(
                                {
                                  length:
                                    Number(question.fields?.[0]?.field) || 10,
                                },
                                (_, i) => i + 1
                              ).map((num) => (
                                <span
                                  key={num}
                                  className={`text-xs ${
                                    (typeof currentAnswer === "string"
                                      ? Number(currentAnswer)
                                      : 0) === num
                                      ? "font-bold text-primary-color1 dark:text-primary-color1-light"
                                      : "text-gray-500 dark:text-gray-400"
                                  }`}
                                >
                                  {num}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <span className="text-sm font-medium">
                            Selected Value:{" "}
                            {typeof currentAnswer === "string"
                              ? currentAnswer
                              : "Not selected"}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="bg-white border-t py-3 px-4 sm:px-6 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={true}
            className={`flex items-center px-5 py-3 rounded-lg font-medium transition-all ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-xs"
            }`}
          >
            <FiChevronLeft className="mr-2 text-lg" />
            Previous
          </button>
          <button
            onClick={currentPage === totalPages ? handleSubmit : handleNext}
            disabled={isSubmitLoading}
            className={`flex items-center px-4 py-2 rounded-lg font-medium text-white transition-all shadow-md ${
              currentPage === totalPages
                ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                : "bg-gradient-to-r from-primary-color1 to-primary-color2"
            } ${isSubmitLoading ? "opacity-80 cursor-not-allowed" : ""}`}
          >
            {isSubmitLoading ? (
              <div className="flex items-center">
                <Loader2 className="animate-spin mr-2" />
                {currentPage === totalPages ? "Submitting..." : "Loading..."}
              </div>
            ) : (
              <div className="flex items-center">
                {currentPage === totalPages ? "Submit Quiz" : "Next"}
                <FiChevronRight className="ml-2 text-lg" />
              </div>
            )}
          </button>
        </div>
      </div>
      {/* Unanswered Questions Confirmation */}
      <ConfirmationDialog
        className="bg-red-600 hover:bg-red-700"
        isOpen={showUnansweredConfirm}
        onConfirm={() => {
          setShowUnansweredConfirm(false);
          pendingAction?.();
        }}
        onCancel={() => setShowUnansweredConfirm(false)}
        title="Unanswered Question"
        message="You haven't answered all questions on this page. If you proceed, unanswered questions will be marked as incorrect. Are you sure you want to continue?"
      />
      {/* Submit Quiz Confirmation */}
      <ConfirmationDialog
        className="bg-primary-color1 hover:bg-primary-color2"
        isOpen={showSubmitConfirm}
        onConfirm={() => {
          setShowSubmitConfirm(false);
          pendingAction?.();
        }}
        onCancel={() => setShowSubmitConfirm(false)}
        title="Confirm Submission"
        message="Are you sure you want to submit the exam? You won't be able to make changes after submission."
      />
      {/* time end dailog */}
      <TimeEndDialog
        isOpen={showTimeEndDialog}
        onSubmit={handleTimeEndSubmit}
        isLoading={isSubmitLoading}
      />
    </div>
  );
};

const ConfirmationDialog = ({
  isOpen,
  onConfirm,
  onCancel,
  title,
  message,
  className,
}: {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
  className?: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 ${className}  text-white rounded-md `}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

const TimeEndDialog = ({
  isOpen,
  onSubmit,
  isLoading,
}: {
  isOpen: boolean;
  onSubmit: () => void;
  isLoading: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-3 rounded-full">
            <FiClock className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">Time is Up!</h3>
        <p className="text-gray-600 mb-6">
          The allocated time for this exam has ended. Please submit your answers
          to view your results.
        </p>
        <Button
          onClick={onSubmit}
          className="w-full p-2 bg-gradient-to-r hover:!border-primary-color1 hover:!text-primary-color1 from-primary-color1 to-primary-color2 text-white py-3 px-6 rounded-lg font-medium hover:opacity-90 transition-opacity shadow-md"
          loading={isLoading}
        >
          Submit and View Results
        </Button>
      </div>
    </div>
  );
};

export default QuizQuestionPage;
