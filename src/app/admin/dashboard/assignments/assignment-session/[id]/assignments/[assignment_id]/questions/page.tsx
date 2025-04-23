


'use client';
import { useState } from 'react';

interface SubQuestion {
  title: string;
}

interface Question {
  id: number;
  title: string;
  type: string;
  required: boolean;
  marks: number;
  answersCount: number;
  content?: string[];
  subQuestion?: SubQuestion[];
  correctAnswer: number[] | boolean[]; // Added correct answer field
}

export default function AssignmentPage() {
  const [isInViewWatcher, setIsInViewWatcher] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      title: "Question text",
      type: "Multiple Choice",
      required: true,
      marks: 2,
      answersCount: 4,
      content: ["Choose One", "Choose Two", "Choose Three", "Choose Four"],
      correctAnswer: [0] // Index of correct answer
    },
    {
      id: 2,
      title: "Question text",
      type: "Multiple Select",
      required: true,
      marks: 2,
      answersCount: 4,
      content: ["Choose One", "Choose Two", "Choose Three", "Choose Four"],
      correctAnswer: [0, 1] // Indexes of correct answers
    },
    {
      id: 3,
      title: "Question text",
      type: "True/False",
      required: false,
      marks: 12,
      answersCount: 6,
      subQuestion: [
        { title: "Question 1" },
        { title: "Question 2" },
        { title: "Question 3" },
        { title: "Question 4" },
        { title: "Question 5" },
      ],
      correctAnswer: [true, false, true, false, true] // Array of booleans for subquestions
    },
  ]);

  const [userAnswers, setUserAnswers] = useState<Record<number, any>>(() => {
    const initialState: Record<number, any> = {};
    questions.forEach(question => {
      initialState[question.id] = question.correctAnswer;
    });
    return initialState;
  });

  // Handlers for different question types
  const handleSingleSelect = (questionId: number, answerIndex: number) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: [answerIndex] }));
  };

  const handleMultipleSelect = (questionId: number, answerIndex: number) => {
    setUserAnswers(prev => {
      const current = prev[questionId] as number[];
      const newAnswers = current.includes(answerIndex)
        ? current.filter(i => i !== answerIndex)
        : [...current, answerIndex];
      return { ...prev, [questionId]: newAnswers };
    });
  };

  const handleTrueFalse = (questionId: number, subIndex: number, value: boolean) => {
    setUserAnswers(prev => {
      const current = [...prev[questionId] as boolean[]];
      current[subIndex] = value;
      return { ...prev, [questionId]: current };
    });
  };

  return (
    <div className="relative min-h-screen">
      <div className="h-full w-full absolute bg-white dark:bg-gray-800 opacity-50 dark:opacity-70" />
      <div className="relative mx-auto px-12 max-sm:px-5 py-2">
        {/* Header Section */}
        <div className="flex justify-between items-start max-sm:gap-3">
          <div>
            <h1 className="text-xl max-sm:text-lg font-bold text-gray-800 dark:text-gray-200">Assignment Title</h1>
            <h5 className="text-[16px] text-gray-600 max-sm:text-sm dark:text-gray-200">Sub Title</h5>
          </div>
          <div className="bg-white dark:bg-dark opacity-100 px-8 max-sm:px-5 rounded-lg shadow-sm">
            <div className="text-2xl max-sm:text-lg font-mono text-gray-800 dark:text-white">02 : 00 : 00</div>
            <div className="flex gap-5 text-[12px] max-sm:text-[10px] text-gray-500 dark:text-gray-300">
              <h6>Home</h6>
              <h6>Minutes</h6>
              <h6>Seconds</h6>
            </div>
          </div>
        </div>

        <div className='max-h-[160px] pt-5 sm:pt-8  flex justify-center items-center'>
          <img
            src='/quastionImage.png'
            alt='quastionImage'
            width={2000}
            height={100}
            className='max-h-full'
          />
        </div>
       {
        isInViewWatcher ? (<div></div>) : (
          <>
          <div className="pt-5 sm:pt-8">
          {questions.map((question, index) => (
            <div key={question.id} className=" py-2 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div className="flex gap-4 items-center">
                  <span className="text-[17px] sm:text-lg font-semibold text-gray-700 dark:text-gray-200">{index + 1}.</span>
                  <h3 className="text-[17px] sm:text-xl tracking-wider font-semibold text-gray-800 dark:text-gray-200">
                    {question.title}
                    {question.required && <span className="text-red-500 ml-1">*</span>}
                  </h3>
                  <h6 className="text-primary-color1 mt-2 -ml-2">{`(${question.marks} marks)`}</h6>
                </div>
              </div>

              {question.type === "True/False" ? (
                question.subQuestion?.map((subquestion, subIndex) => (
                  <div key={subIndex} className="pl-2 sm:pl-10 flex py-1 items-center justify-between sm:max-w-[400px]">
                    <div className='max-sm:text-[14px] text-gray-600 dark:text-gray-300'>{subquestion.title}</div>
                    <div className='flex justify-center items-center gap-5'>
                      <div className='flex items-center justify-center gap-3'>
                        <input
                          type="radio"
                          name={`question-${question.id}-${subIndex}`}
                          checked={(userAnswers[question.id] as boolean[])[subIndex] === true}
                          onChange={() => handleTrueFalse(question.id, subIndex, true)}
                          className="w-5 h-5 rounded-full appearance-none border-2 flex justify-center items-center border-gray-500
          checked:border-gray-500 checked:bg-white  checked:dark:bg-gray-700
          dark:border-gray-500 dark:checked:border-gray-400 dark:checked:bg-gray-400
          relative after:absolute after:inset-0 after:rounded-full after:m-[2px] after:bg-primary-color1
          after:opacity-0 checked:after:opacity-100"
                        />
                        <label className="max-sm:text-[13px] cursor-pointer">True</label>
                      </div>
                      <div className='flex items-center justify-center gap-3'>
                        <input
                          type="radio"
                          name={`question-${question.id}-${subIndex}`}
                          checked={(userAnswers[question.id] as boolean[])[subIndex] === false}
                          onChange={() => handleTrueFalse(question.id, subIndex, false)}
                          className="w-5 h-5 rounded-full appearance-none border-2 flex justify-center items-center border-gray-500
          checked:border-gray-500 checked:bg-white  checked:dark:bg-gray-700
          dark:border-gray-500 dark:checked:border-gray-400 dark:checked:bg-gray-400
          relative after:absolute after:inset-0 after:rounded-full after:m-[2px] after:bg-primary-color1
          after:opacity-0 checked:after:opacity-100"
                        />
                        <label className="cursor-pointer max-sm:text-[13px]">False</label>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="pl-2 sm:pl-10 py-1 space-y-2">
                  {question.content?.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <input
                        type={question.type === "Multiple Select" ? "checkbox" : "radio"}
                        name={`question-${question.id}`}
                        checked={
                          question.type === "Multiple Select"
                            ? (userAnswers[question.id] as number[]).includes(i)
                            : (userAnswers[question.id] as number[]).includes(i)
                        }
                        onChange={() => {
                          if (question.type === "Multiple Select") {
                            handleMultipleSelect(question.id, i);
                          } else {
                            handleSingleSelect(question.id, i);
                          }
                        }}
                        className={`${question.type === "Multiple Select" ? "w-5 h-5 rounded-full accent-primary-color1 bg-gray-600" : "w-5 h-5 rounded-full appearance-none border-2 flex justify-center items-center border-gray-500 checked:border-gray-500 checked:bg-white  checked:dark:bg-gray-700 dark:border-gray-500 dark:checked:border-gray-400 dark:checked:bg-gray-400 relative after:absolute after:inset-0 after:rounded-full after:m-[2px] after:bg-primary-color1 after:opacity-0 checked:after:opacity-100"}`}
                      />
                      <label className="cursor-pointer max-sm:text-[14px]">{item}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className='flex items-center justify-end pt-3 sm:p-10 max-sm:w-full '>
          <button className='bg-primary-color1 rounded-[8px] py-2 sm:py-3 sm:px-14 max-sm:w-full '>
            <h3 className='text-white tracking-wider text-lg sm:text-xl'>View As Watcher</h3>
          </button>
        </div></>
        )
       }
        

      </div>

    </div>
  );
}
