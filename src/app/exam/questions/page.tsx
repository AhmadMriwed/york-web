"use client";
import { Button } from "@/components/ui/button";
import { icons } from "@/constants/icons";
import { Progress } from "antd";
import { BookmarkIcon } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  FiClock,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
} from "react-icons/fi";

// Types and constants moved to a separate file (types.ts)
type QuestionType =
  | "single-select"
  | "multi-select"
  | "true-false"
  | "short-answer"
  | "long-answer";

type QuestionData = {
  questionText: string;
  type: QuestionType;
  options?: string[];
  correctAnswer?: string | string[] | boolean;
};

type UserAnswer = string | string[] | boolean | null;

const sampleQuestions: QuestionData[] = [
  {
    questionText: "What is the capital of France?",
    type: "single-select",
    options: ["London", "Paris", "Berlin", "Madrid"],
    correctAnswer: "1",
  },
  {
    questionText: "Which of these are programming languages?",
    type: "multi-select",
    options: ["JavaScript", "HTML", "CSS", "Python", "XML"],
    correctAnswer: ["0", "3"],
  },
  {
    questionText: "The Earth is flat.",
    type: "true-false",
    correctAnswer: false,
  },
  {
    questionText: "What does HTML stand for?",
    type: "short-answer",
    correctAnswer: "HyperText Markup Language",
  },
  {
    questionText: "Explain the main differences between REST and GraphQL APIs.",
    type: "long-answer",
    correctAnswer:
      "REST is resource-based with multiple endpoints, while GraphQL is query-based with a single endpoint and allows clients to request exactly what they need.",
  },
  {
    questionText:
      "Which data structure uses LIFO (Last In First Out) principle?",
    type: "single-select",
    options: ["Queue", "Stack", "Array", "Tree"],
    correctAnswer: "1",
  },
  {
    questionText: "Select all valid JavaScript data types:",
    type: "multi-select",
    options: ["String", "Integer", "Boolean", "Float", "Object"],
    correctAnswer: ["0", "2", "4"],
  },
  {
    questionText: "React is a JavaScript framework.",
    type: "true-false",
    correctAnswer: false,
  },
  {
    questionText: "What does CSS stand for?",
    type: "short-answer",
    correctAnswer: "Cascading Style Sheets",
  },
  {
    questionText: "Explain the virtual DOM in React and its benefits.",
    type: "long-answer",
    correctAnswer:
      "The virtual DOM is a lightweight copy of the real DOM that allows React to perform efficient updates by comparing the virtual DOM with a previous version and only updating the changed parts in the real DOM, resulting in better performance.",
  },
];

const QUESTIONS_PER_PAGE = 5;

// Start Page Component
const QuizStartPage = ({ onStart }: { onStart: () => void }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full mx-auto p-8 bg-white rounded-xl shadow-lg border border-indigo-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary-color1 mb-6">
            Welcome to the Tech Quiz Challenge!
          </h1>
          <div className="bg-[#037f85]/10 p-8 rounded-lg mb-8 border border-[#037f85]/40">
            <h2 className="text-xl font-semibold text-primary-color1 mb-4">
              Quiz Details
            </h2>
            <div className="space-y-4 text-left">
              <div className="flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-white border border-primary-color1 rounded-full mr-3">
                  <FiClock className="text-primary-color1" />
                </span>
                <span className="text-gray-700">Time limit: 14 minutes</span>
              </div>
              <div className="flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-white border-1 border-primary-color1 rounded-full mr-3">
                  <span className="text-primary-color1 font-medium">?</span>
                </span>
                <span className="text-gray-700">
                  Total questions: {sampleQuestions.length}
                </span>
              </div>
              <div className="flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-white border border-primary-color1 rounded-full mr-3">
                  <FiCheck className="text-primary-color1" />
                </span>
                <span className="text-gray-700">
                  Multiple question types covering web development concepts
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={onStart}
            className="px-8 py-3 bg-gradient-to-r from-primary-color2 to-primary-color2 text-white rounded-lg font-medium hover:from-primary-color1 hover:to-primary-color2 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Start Quiz Now
          </button>
        </div>
      </div>
    </div>
  );
};

const QuizQuestionPage = ({
  currentPage,
  totalPages,
  questions,
  userAnswers,
  timeLeft,
  onAnswerChange,
  onPrevious,
  onSubmit,
}: {
  currentPage: number;
  totalPages: number;
  questions: QuestionData[];
  userAnswers: UserAnswer[];
  timeLeft: number;
  onAnswerChange: (index: number, value: UserAnswer) => void;
  onPrevious: () => void;
  onSubmit: () => void;
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm p-2 border-b border-gray-100 absolute top-0 z-50 w-full">
        <div className="max-w-5xl mx-auto">
          <Image
            src={"/logo dark.png"}
            height={70}
            width={150}
            alt="logo"
            className="absolute -top-4"
          />
          <div className="flex justify-end gap-4 items-center mb-3">
            {/* Timer Card */}
            <div className="flex items-center bg-primary-color1/10 px-4 py-2.5 rounded-xl ">
              <div className="p-1.5 bg-white rounded-lg shadow-xs mr-3">
                <FiClock className="text-primary-color1 text-xl" />
              </div>
              <div>
                <p className="text-2xl font-bold text-primary-color1 tabular-nums">
                  {formatTime(timeLeft)}
                </p>
              </div>
            </div>

            {/* Page Indicator */}
            <div className="inline-flex items-center bg-[#037f85]/10 rounded-full px-3 py-1 text-sm font-medium text-primary-color1">
              <BookmarkIcon className="h-4 w-4 mr-1.5" />
              <span>{currentPage + 1}</span>
              <span className="mx-1 text-primary-color1">of</span>
              <span>{totalPages}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Questions Area */}
      <div className="flex-1 overflow-y-auto mt-16 py-6 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {questions.map((question, index) => {
            const currentAnswer = userAnswers[index];
            const questionNumber = currentPage * QUESTIONS_PER_PAGE + index + 1;

            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-xs p-6 border border-gray-100 hover:shadow-sm transition-shadow"
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  <span className="text-primary-color1 font-bold">
                    Question {questionNumber}:
                  </span>{" "}
                  {question.questionText}
                </h2>

                {/* Answer Options */}
                <div className="space-y-3">
                  {question.type === "single-select" && question.options && (
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
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
                            className="h-4 w-4 bg-primary-color1 checked:bg-primary-color1  border-gray-300"
                          />
                          <span className="ml-3 text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {question.type === "multi-select" && question.options && (
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => (
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
                          <span className="ml-3 text-gray-700">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {question.type === "true-false" && (
                    <div className="grid grid-cols-2 gap-3">
                      <label
                        className={`p-3 rounded-lg border cursor-pointer text-center transition-all ${
                          currentAnswer === true
                            ? "border-green-500 bg-green-50 shadow-xs"
                            : "border-gray-200 hover:border-green-300"
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
                            ? "border-red-500 bg-red-50 shadow-xs"
                            : "border-gray-200 hover:border-red-300"
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

                  {question.type === "short-answer" && (
                    <input
                      type="text"
                      value={
                        typeof currentAnswer === "string" ? currentAnswer : ""
                      }
                      onChange={(e) => onAnswerChange(index, e.target.value)}
                      className="w-full p-3 border border-gray-300  focus:outline-none rounded-lg focus:ring-1 focus:ring-primary-color1"
                      placeholder="Type your answer here..."
                    />
                  )}

                  {question.type === "long-answer" && (
                    <textarea
                      value={
                        typeof currentAnswer === "string" ? currentAnswer : ""
                      }
                      onChange={(e) => onAnswerChange(index, e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-color1 focus:outline-none "
                      rows={4}
                      placeholder="Type your detailed answer here..."
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="bg-white border-t py-3 px-4 sm:px-6 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between">
          <button
            onClick={onPrevious}
            disabled={currentPage === 0}
            className={`flex items-center px-5 py-3 rounded-lg font-medium transition-all ${
              currentPage === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-xs"
            }`}
          >
            <FiChevronLeft className="mr-2 text-lg" />
            Previous
          </button>
          <button
            onClick={onSubmit}
            className={`flex items-center px-6  rounded-lg font-medium text-white transition-all shadow-md ${
              currentPage === totalPages - 1
                ? "bg-gradient-to-r from-blue-500 to-blue-600"
                : "bg-gradient-to-r from-primary-color1 to-primary-color2 "
            }`}
          >
            {currentPage === totalPages - 1 ? "Submit Quiz" : "Next"}
            <FiChevronRight className="ml-2 text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Results Page Component
const QuizResultsPage = ({
  userAnswers,
  timeSpent,
  onShowDetailedAnswers,
  showDetailedAnswers,
}: {
  userAnswers: UserAnswer[];
  timeSpent: number;
  onShowDetailedAnswers: () => void;
  showDetailedAnswers: boolean;
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const checkAnswer = (question: QuestionData, answer: UserAnswer) => {
    if (!answer) return false;
    if (question.type === "multi-select") {
      return JSON.stringify(answer) === JSON.stringify(question.correctAnswer);
    }
    return answer === question.correctAnswer;
  };

  const calculateScore = () => {
    return sampleQuestions.reduce((score, question, index) => {
      return checkAnswer(question, userAnswers[index]) ? score + 1 : score;
    }, 0);
  };

  const calculatePercentage = () => {
    return Math.round((calculateScore() / sampleQuestions.length) * 100);
  };

  const score = calculateScore();
  const percentage = calculatePercentage();
  const startTime = new Date();
  const endTime = new Date(startTime.getTime() + timeSpent * 1000);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white mt-8 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="w-full text-center mt-4">
          <h1 className="text-3xl text-primary-color1">Exam Title</h1>
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
              <p className="text-primary-color1 font-medium">Omran Alrbedan</p>
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
                  You scored {score} out of {sampleQuestions.length} questions
                  correctly!
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
                    percent={percentage}
                    width={120}
                    strokeWidth={8}
                    strokeColor={"#0372f8"}
                    trailColor={"#eee"}
                    format={() => (
                      <span className="text-xl font-bold text-primary-color1">
                        {percentage}%
                      </span>
                    )}
                  />
                </div>
                <div>
                  <p className="text-gray-600 mb-3">
                    {percentage >= 70
                      ? "Excellent work! You have a strong understanding of these concepts."
                      : percentage >= 50
                      ? "Good effort! Review the answers to improve your knowledge."
                      : "Keep practicing! Review the material and try again."}
                  </p>
                  <div className="flex space-x-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Correct</p>
                      <p className="text-lg font-bold text-green-600">
                        {score}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Incorrect</p>
                      <p className="text-lg font-bold text-red-600">
                        {sampleQuestions.length - score}
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
                    {formatTime(timeSpent)}
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      / 14:00
                    </span>
                  </p>
                </div>
              </div>
              <Progress
                percent={Math.round((timeSpent / 840) * 100)}
                strokeColor={"#037f85"}
                trailColor={"#eee"}
                showInfo={false}
              />
              <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                <div>
                  <p className="text-gray-500">Start Time</p>
                  <p className="font-medium">
                    {startTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">End Time</p>
                  <p className="font-medium">
                    {endTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Date</p>
                  <p className="font-medium">
                    {startTime.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Toggle answers button */}
          <div className="flex justify-center">
            <button
              onClick={onShowDetailedAnswers}
              className="px-6 py-3 bg-primary-color1 hover:bg-primary-color2 text-white rounded-lg font-medium transition-colors shadow-md flex items-center"
            >
              {showDetailedAnswers ? (
                <>
                  <FiChevronLeft className="mr-2" />
                  Hide Answers
                </>
              ) : (
                <>
                  Show My Answers
                  <FiChevronRight className="ml-2" />
                </>
              )}
            </button>
          </div>

          {/* Detailed answers */}
          {showDetailedAnswers && (
            <div className="mt-8 space-y-6">
              <h2 className="text-xl font-bold text-gray-800 border-b pb-2">
                Detailed Answers
              </h2>
              {sampleQuestions.map((question, index) => {
                const isCorrect = checkAnswer(question, userAnswers[index]);
                return (
                  <div
                    key={index}
                    className={`p-5 rounded-lg border ${
                      isCorrect
                        ? "border-green-200 bg-green-50"
                        : "border-red-200 bg-red-50"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-lg">
                        <span className="text-gray-600">
                          Question {index + 1}:
                        </span>{" "}
                        {question.questionText}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          isCorrect
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">
                          Your answer:
                        </p>
                        <div className="bg-white p-3 rounded border border-gray-200 min-h-12">
                          {userAnswers[index] !== null ? (
                            typeof userAnswers[index] === "string" ? (
                              userAnswers[index]
                            ) : Array.isArray(userAnswers[index]) ? (
                              (userAnswers[index] as string[]).map((optIdx) => (
                                <div
                                  key={optIdx}
                                  className="bg-blue-50 px-2 py-1 rounded mb-1 text-sm"
                                >
                                  {question.options?.[parseInt(optIdx)]}
                                </div>
                              ))
                            ) : (
                              userAnswers[index]?.toString()
                            )
                          ) : (
                            <span className="text-gray-400">
                              No answer provided
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">
                          Correct answer:
                        </p>
                        <div className="bg-white p-3 rounded border border-gray-200 min-h-12">
                          {typeof question.correctAnswer === "string"
                            ? question.type === "single-select"
                              ? question.options?.[
                                  parseInt(question.correctAnswer)
                                ]
                              : question.correctAnswer
                            : Array.isArray(question.correctAnswer)
                            ? question.correctAnswer.map((optIdx) => (
                                <div
                                  key={optIdx}
                                  className="bg-green-50 px-2 py-1 rounded mb-1 text-sm"
                                >
                                  {question.options?.[parseInt(optIdx)]}
                                </div>
                              ))
                            : question.correctAnswer?.toString()}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Quiz Component
const QuizPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>(
    Array(sampleQuestions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(840);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showDetailedAnswers, setShowDetailedAnswers] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  const totalPages = Math.ceil(sampleQuestions.length / QUESTIONS_PER_PAGE);
  const currentQuestions = sampleQuestions.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );

  // Timer effect
  useEffect(() => {
    if (!quizStarted || showResults) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, showResults]);

  const handleAnswerChange = (index: number, value: UserAnswer) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentPage * QUESTIONS_PER_PAGE + index] = value;
    setUserAnswers(newAnswers);
  };

  const handleAutoSubmit = () => {
    setShowResults(true);
  };

  const handleSubmit = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  if (!quizStarted) {
    return <QuizStartPage onStart={startQuiz} />;
  }

  if (showResults) {
    return (
      <QuizResultsPage
        userAnswers={userAnswers}
        timeSpent={timeSpent}
        onShowDetailedAnswers={() =>
          setShowDetailedAnswers(!showDetailedAnswers)
        }
        showDetailedAnswers={showDetailedAnswers}
      />
    );
  }

  return (
    <QuizQuestionPage
      currentPage={currentPage}
      totalPages={totalPages}
      questions={currentQuestions}
      userAnswers={userAnswers.slice(
        currentPage * QUESTIONS_PER_PAGE,
        (currentPage + 1) * QUESTIONS_PER_PAGE
      )}
      timeLeft={timeLeft}
      onAnswerChange={(index, value) => handleAnswerChange(index, value)}
      onPrevious={handlePrevious}
      onSubmit={handleSubmit}
    />
  );
};

export default QuizPage;
