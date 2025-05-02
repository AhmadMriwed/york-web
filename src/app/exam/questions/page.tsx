"use client";
import { Button } from "@/components/ui/button";
import { icons } from "@/constants/icons";
import { Progress } from "antd";
import { icon } from "leaflet";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  FiClock,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
} from "react-icons/fi";

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
    questionText: "Question 6: Another single-select question",
    type: "single-select",
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: "2",
  },
  {
    questionText: "Question 7: Another multi-select question",
    type: "multi-select",
    options: ["Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    correctAnswer: ["1", "2"],
  },
  {
    questionText: "Question 8: Another true-false question",
    type: "true-false",
    correctAnswer: true,
  },
  {
    questionText: "Question 9: Another short answer question",
    type: "short-answer",
    correctAnswer: "Sample answer",
  },
  {
    questionText: "Question 10: Another long answer question",
    type: "long-answer",
    correctAnswer: "Detailed explanation here",
  },
];

const QUESTIONS_PER_PAGE = 5;

const QuizPage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>(
    Array(sampleQuestions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(840); // 14 minutes in seconds
  const [quizStarted, setQuizStarted] = useState(false);
  const [showDetailedAnswers, setShowDetailedAnswers] = useState(false);

  const totalPages = Math.ceil(sampleQuestions.length / QUESTIONS_PER_PAGE);
  const currentQuestions = sampleQuestions.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

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

  const startQuiz = () => {
    setQuizStarted(true);
  };

  if (!quizStarted) {
    return (
      <div className="w-fu">
        <div className="max-w-2xl mx-auto p-8 bg-[#037f85]/10 rounded-xl shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-indigo-700 mb-4">
              Welcome to the Quiz!
            </h1>
            <div className="bg-indigo-50 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold text-indigo-800 mb-2">
                Quiz Details
              </h2>
              <div className="space-y-3 text-left">
                <p className="flex items-center">
                  <span className="inline-block w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                    <FiClock className="text-indigo-600" />
                  </span>
                  <span>Time limit: 14 minutes</span>
                </p>
                <p className="flex items-center">
                  <span className="inline-block w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                    <span className="text-indigo-600 font-medium">?</span>
                  </span>
                  <span>Total questions: {sampleQuestions.length}</span>
                </p>
                <p className="flex items-center">
                  <span className="inline-block w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mr-2">
                    <FiCheck className="text-indigo-600" />
                  </span>
                  <span>Multiple question types</span>
                </p>
              </div>
            </div>
            <button
              onClick={startQuiz}
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="max-w-5xl mx-auto  p-6 bg-gray-100 rounded-xl shadow-lg">
        <div className="text-center mb-6 mt-14">
          <h1 className="text-2xl font-bold text-primary-color1 mb-2">
            Example Quiz Title
          </h1>
        </div>

        <div className="mb-4 p-2 pb-4 bg-white rounded-lg px-8">
          <h2 className="font-bold text-gray-800 mb-1">RESPONDENT</h2>
          <p className="text-gray-700">
            <Image
              src={icons.userCard}
              width={14}
              height={14}
              className="size-8 inline-block mr-2"
              alt="user card"
            />
            <p className="text-gray-600 tracking-wide font-bold inline-block">
              Omran Alrbedan
            </p>
          </p>
        </div>
        <div className="mb-4 p-2  pb-4 bg-white rounded-lg px-8">
          <h2 className="font-bold text-gray-800 mb-1">SUMMARY</h2>
          <p className="text-gray-700">
            <Image
              src={icons.bell}
              width={14}
              height={14}
              className="size-5 inline-block mr-2"
              alt="user card"
            />
            <p className="text-gray-600 tracking-wide inline-block">
              Thank you for taking the test!
            </p>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mb-6 p-4 px-8 bg-white rounded-lg">
            <h2 className="font-bold text-gray-800 mb-1">RESULT</h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <Image
                  src={icons.checkmarkOutline}
                  width={16}
                  height={14}
                  className="size-7 inline-block mr-1"
                  alt="user card"
                />
                <strong>Test ended</strong>
              </p>
              <div className="flex gap-3 ">
                <div className="flex-1">
                  <p className="text-gray-500">
                    voluptas neque qui iure consequatur unde! Sunt consequatur
                    in non error maxime atque a aperiam architecto cupiditate!
                  </p>
                  <p className="text-gray-500">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Reiciendis cumque dolorum numquam magni,
                  </p>
                </div>
                <Progress
                  type="circle"
                  percent={30}
                  width={120}
                  style={{
                    marginTop: -40,
                  }}
                  status="active"
                  strokeWidth={8}
                  strokeColor={"#037f86"}
                  trailColor={"#e5e7eb"}
                  format={() => (
                    <span className={`text-lg font-bold `}>{30}%</span>
                  )}
                  className="[&_.ant-progress-circle-path]:stroke-[8]"
                />
              </div>
            </div>
          </div>
          <div>
            <div className="mb-6 p-4 bg-white rounded-lg px-8">
              <h2 className="font-bold text-gray-800">TIMER</h2>
              <p className="text-gray-700">
                <Image
                  src={icons.oclock}
                  width={16}
                  height={14}
                  className="size-4 inline-block mr-2"
                  alt="user card"
                />
                <strong>Total time</strong>
              </p>
              <div className="ml-6 mt-2">
                <p className="text-gray-500 font-bold mb-2 ">
                  <strong className="text-primary-color1">
                    {formatTime(840 - timeLeft)}
                  </strong>{" "}
                  / 00:14:00
                </p>
                <Progress
                  percent={30}
                  width={120}
                  status="active"
                  strokeWidth={8}
                  strokeColor={"#037f86"}
                  trailColor={"#e5e7eb"}
                  format={() => (
                    <span className={`text-lg font-bold `}>{30}%</span>
                  )}
                  className="[&_.ant-progress-circle-path]:stroke-[8]"
                />
              </div>
              <div className="grid grid-cols-2 mt-7">
                <p>
                  Start Time : <strong>11:34</strong>
                </p>
                <p className="">
                  End Time : <strong>11:40</strong>
                </p>
                <p>
                  Date : <strong>2024-2-11</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
        <Button
          onClick={() => setShowDetailedAnswers(!showDetailedAnswers)}
          className="px-4 py-2 bg-primary-color1 text-white rounded hover:bg-primary-color2 transition-colors"
        >
          {showDetailedAnswers ? "Hide Answers" : "Show My Answers"}
        </Button>

        {showDetailedAnswers && (
          <div className="mt-6 space-y-6">
            <h2 className="text-xl font-bold text-gray-800">
              Detailed Answers
            </h2>
            {sampleQuestions.map((question, index) => (
              <div
                key={index}
                className={`p-5 rounded-lg border ${
                  checkAnswer(question, userAnswers[index])
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg">
                    Question {index + 1}: {question.questionText}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      checkAnswer(question, userAnswers[index])
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {checkAnswer(question, userAnswers[index])
                      ? "Correct"
                      : "Incorrect"}
                  </span>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Your answer:
                    </p>
                    <p className="bg-white p-2 rounded border border-gray-200">
                      {userAnswers[index] !== null
                        ? JSON.stringify(userAnswers[index])
                        : "No answer provided"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Correct answer:
                    </p>
                    <p className="bg-white p-2 rounded border border-gray-200">
                      {JSON.stringify(question.correctAnswer)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="h-screen bg-gray-200 flex justify-center items-center">
      <div className="w-4xl mt-96 mx-auto p-6 relative   w-[800px] h-[400px] bg-red-400 rounded-xl shadow-lg">
        {/* Header with timer and progress */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <FiClock className="text-indigo-600" />
            <span className="font-medium">{formatTime(timeLeft)}</span>
          </div>
          <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
            Page {currentPage + 1} of {totalPages}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-indigo-600 h-2 rounded-full"
            style={{
              width: `${((currentPage + 1) / totalPages) * 100}%`,
            }}
          ></div>
        </div>

        {/* Questions */}
        <div className="mb-8 space-y-8 max-h-[400px] overflow-y-scroll">
          {currentQuestions.map((question, index) => {
            const absoluteIndex = currentPage * QUESTIONS_PER_PAGE + index;
            const currentAnswer = userAnswers[absoluteIndex];

            return (
              <div key={absoluteIndex} className="question-container">
                <h2 className="text-lg font-semibold mb-4 text-gray-800">
                  Question {absoluteIndex + 1}: {question.questionText}
                </h2>

                {/* Answers */}
                <div className="space-y-4">
                  {question.type === "single-select" && (
                    <div className="space-y-3">
                      {question.options?.map((option, optionIndex) => (
                        <label
                          key={optionIndex}
                          className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                            currentAnswer === optionIndex.toString()
                              ? "border-indigo-500 bg-indigo-50"
                              : "border-gray-200 hover:border-indigo-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`answer-${absoluteIndex}`}
                            checked={currentAnswer === optionIndex.toString()}
                            onChange={() =>
                              handleAnswerChange(index, optionIndex.toString())
                            }
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                          />
                          <span className="ml-3">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {question.type === "multi-select" && (
                    <div className="space-y-3">
                      {question.options?.map((option, optionIndex) => (
                        <label
                          key={optionIndex}
                          className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                            Array.isArray(currentAnswer) &&
                            currentAnswer.includes(optionIndex.toString())
                              ? "border-indigo-500 bg-indigo-50"
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
                              handleAnswerChange(index, newAnswer);
                            }}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
                          />
                          <span className="ml-3">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {question.type === "true-false" && (
                    <div className="grid grid-cols-2 gap-4">
                      <label
                        className={`p-3 rounded-lg border cursor-pointer text-center transition-colors ${
                          currentAnswer === true
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-green-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`true-false-${absoluteIndex}`}
                          checked={currentAnswer === true}
                          onChange={() => handleAnswerChange(index, true)}
                          className="hidden"
                        />
                        <span className="font-medium">True</span>
                      </label>
                      <label
                        className={`p-3 rounded-lg border cursor-pointer text-center transition-colors ${
                          currentAnswer === false
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 hover:border-red-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`true-false-${absoluteIndex}`}
                          checked={currentAnswer === false}
                          onChange={() => handleAnswerChange(index, false)}
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
                      onChange={(e) =>
                        handleAnswerChange(index, e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Type your answer here..."
                    />
                  )}

                  {question.type === "long-answer" && (
                    <textarea
                      value={
                        typeof currentAnswer === "string" ? currentAnswer : ""
                      }
                      onChange={(e) =>
                        handleAnswerChange(index, e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      rows={4}
                      placeholder="Type your detailed answer here..."
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 0}
            className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${
              currentPage === 0
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
            }`}
          >
            <FiChevronLeft className="mr-2" />
            Previous
          </button>
          <button
            onClick={handleSubmit}
            className={`flex items-center px-6 py-2 rounded-lg font-medium text-white transition-colors ${
              currentPage === totalPages - 1
                ? "bg-green-600 hover:bg-green-700"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {currentPage === totalPages - 1 ? "Submit Quiz" : "Next"}
            <FiChevronRight className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
