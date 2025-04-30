

// 'use client';

// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
// import { cn } from '@/lib/utils';
// import { EditIcon, Trash } from 'lucide-react'; // Added Star icon
// import { useParams, useRouter } from 'next/navigation'
// import React, { useEffect, useState } from 'react'
// import { IoArrowBackSharp, IoSearch, IoClose } from 'react-icons/io5'
// import { TfiMoreAlt } from 'react-icons/tfi';
// import { Button, Header } from 'rsuite';
// import { Star, ChevronDown } from 'lucide-react';
// import { getQuestions } from '@/lib/action/exam_action';
// import { toast } from 'sonner';



// type Field = {
//   id: number;
//   question_form_id: number;
//   field: string;
//   field_type: string;
//   isCorrect: boolean;
// };
// type CorrectAnswers = {
//   id: number,
//   question_form_id: number,
//   correct_value: string,
// };


// type QuestionData = {
//   question: string;
//   fields: Field[];
//   question_type_id: number;
//   type: 'single' | 'multi' | 'true_false' | 'short' | 'long';
//   required: boolean;
//   correct_answers: CorrectAnswers[];
//   show_grade: boolean;
//   hint: string;
//   correct_answer_grade: number;
//   wrong_answer_grade: number;
// };

// const QuestitonManager = () => {
//   const router = useRouter();
//   const { id, assignment_id } = useParams();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [markForAll, setMarkForAll] = useState(0);
//   const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
//   const [isSearchExpanded, setIsSearchExpanded] = useState(false);
//   const [showMarkDialog, setShowMarkDialog] = useState(false);
//   const [questionsData,setQuestionsData ] = useState<QuestionData[]>();

//   useEffect(() => {
//     const fetchQuestion = async () => {
//       try {
//         const data = await getQuestions();
//         const apiData = data.data;
//         const questionType = apiData.question_type_id === 1 ? 'single' :
//           apiData.question_type_id === 2 ? 'multi' :
//           apiData.question_type_id === 3 ? 'true_false' :
//           apiData.question_type_id === 4 ? 'short' : 'long';

//         // Map fields and correct answers to options
//         const options = apiData.fields.map((field: string) => ({
//           id: id,
//           text: field,
//           isCorrect: apiData.correct_answers.includes(field)
//         }));

//         setQuestionsData(apiData);

//       } catch (error) {
//         console.error('Error fetching question:', error);
//         toast.error('Failed to load question data');
//       }
//     };

//     fetchQuestion();
//   }, []);


//   const [questions, setQuestions] = useState([


//     {
//       id: 1,
//       questionText: "What are the dimensions of the KT-123 engine expressed in millimeters including the engine cover?",
//       options: [
//         { id: 1, text: "500 × 200 × 300", isCorrect: false },
//         { id: 2, text: "450 × 220 × 320", isCorrect: true },
//         { id: 3, text: "600 × 100 × 320", isCorrect: false }
//       ],
//       type: "Single choice",
//       category: "CONSTRUCTION",
//       points: 1,
//       hasImage: false,
//       required: true,
//     },
//     {
//       id: 2,
//       questionText: "Which material is primarily used in the KT-123 engine's combustion chamber?",
//       options: [
//         { id: 1, text: "Aluminum alloy", isCorrect: true },
//         { id: 2, text: "Stainless steel", isCorrect: false },
//         { id: 3, text: "Titanium", isCorrect: false }
//       ],
//       type: "Single choice",
//       category: "MATERIALS",
//       points: 1,
//       hasImage: false,
//       required: true,
//     },
//     {
//       id: 3,
//       questionText: "What is the maximum torque output (in Nm) of the KT-123 engine at 4000 RPM?",
//       options: [
//         { id: 1, text: "220 Nm", isCorrect: false },
//         { id: 2, text: "185 Nm", isCorrect: true },
//         { id: 3, text: "210 Nm", isCorrect: false }
//       ],
//       type: "Single choice",
//       category: "PERFORMANCE",
//       points: 2,
//       hasImage: false,
//       required: false,
//     }
//   ]);


//   const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.checked) {
//       setSelectedQuestions(questions.map(q => q.id));
//     } else {
//       setSelectedQuestions([]);
//     }
//   };


//   const handleQuestionSelect = (questionId: number) => {
//     setSelectedQuestions(prev =>
//       prev.includes(questionId)
//         ? prev.filter(id => id !== questionId)
//         : [...prev, questionId]
//     );
//   };

//   const handleMarkForAllChange = () => {

//     setQuestions(prev => prev.map(q => ({ ...q, points: markForAll })));
//   };

//   const filteredQuestions = questions.filter(q =>
//     q.questionText.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleDeleteSelected = () => {
//     setQuestions(prev => prev.filter(q => !selectedQuestions.includes(q.id)));
//     setSelectedQuestions([]);
//   };

//   const totalMarks = questions.reduce((sum, q) => sum + q.points, 0);

//   return (
//     <div className={`bg-gray-100 dark:bg-gray-900  my-3 mx-1 sm:mx-2 rounded-lg  px-1 sm:px-4 py-2  min-h-screen `}>
//       <div className="flex justify-between items-start pb-5 pt-1 max-sm:px-1">
//         <Header className="flex mt-1 justify-start items-center gap-2 max-sm:pt-1  text-[var(--primary-color1)] hover:text-[var(--primary-color2)]">
//           <IoArrowBackSharp
//             className="text-primary-color1 text-lg sm:text-xl cursor-pointer"

//             onClick={() => router.back()}
//           />
//           <h3 className="text-lg sm:text-xl xl:text-2xl font-semibold tracking-wide">Questions Manager</h3>
//         </Header>
//         <Button
//           onClick={() => router.push(`/admin/dashboard/assignments/assignment-session/${id}/assignments/${assignment_id}/addQuestion`)}
//           className='px-6 max-sm:px-3 py-0    !bg-primary-color1 active:!bg-primary-color1
//       !text-white'>
//           <h3 className='sm:tracking-wide max-sm:text-[15px] '>Add Question</h3>
//         </Button>
//       </div>

//       <div className='flex justify-between items-center bg-white mx-1 mb-4 dark:bg-gray-800 py-3 px-3 rounded-sm gap-5'>
//         <div className='flex items-center gap-3'>
//           <label className="relative flex items-center cursor-pointer">
//             <input
//               type='checkbox'
//               checked={selectedQuestions.length === questions.length && questions.length > 0}
//               onChange={handleSelectAll}
//               className="appearance-none h-5 w-5 max-sm:w-[18px] max-sm:h-[18px] border-2 border-gray-300 rounded-sm 
//                        checked:bg-primary-color1 checked:border-0 dark:checked:bg-primary-color1
//                        transition-colors duration-200 peer"
//             />
//             <div className="absolute left-0 top-0 pointer-events-none flex items-center justify-center 
//                    text-white h-5 w-5 max-sm:w-[18px] max-sm:h-[18px] opacity-0 peer-checked:opacity-100">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//             </div>
//           </label>
//           {selectedQuestions.length > 0 ? (
//             <div className='flex items-center gap-4'>
//               <p className='text-sm sm:text-lg text-gray-800 dark:text-gray-200'>
//                 {selectedQuestions.length} selected
//               </p>
//               <Button
//                 appearance="ghost"
//                 color="red"
//                 size='sm'
//                 className='!text-red-500 hover:!bg-red-50 dark:hover:!bg-red-900/20 hover:!border-transparent !border-[1px]  hover:!outline-transparent          
//                 focus:!outline-transparent
//                 focus:!border-transparent
//             active:!border-transparent
//             active:!outline-transparent '
//                 onClick={handleDeleteSelected}
//               >
//                 <style>
//                   {
//                     `
//                       .rs-btn-red {
//                           --rs-btn-ghost-hover-border: var(--rs-red-500);
//                       }
//                     `
//                   }
//                 </style>
//                 <Trash className="w-4 h-4 mr-2" />
//                 Delete
//               </Button>
//             </div>
//           ) : (
//             <div className='flex justify-center items-center gap-2'>
//               <p className="text-lg text-gray-800 dark:text-gray-200">
//                 {questions.length}
//               </p>
//               <span className='text-sm text-gray-600 dark:text-gray-300'>Questions</span>
//             </div>
//           )}
//         </div>


//         <div className={` ${selectedQuestions.length > 0 ? "max-xxs:hidden xxs:flex" : "flex"} items-center gap-4 max-sm:gap-2`}>
//           <div className={`${isSearchExpanded ? 'hidden sm:flex' : 'flex'}  justify-center items-center gap-1`}>
//             <p className='text-gray-600 dark:text-gray-300 text-sm'>
//               Total  Marks :
//             </p>   <span className='text-[16px]'>{totalMarks}
//             </span>
//             <span className='h-5 w-[1px] bg-gray-300 dark:bg-gray-500 ml-2' />

//           </div>



//           <div className={`${isSearchExpanded ? 'hidden xxs:flex' : 'flex'}`}>
//             {/* Mobile - Compact Icon Button */}
//             <div className="lg:hidden flex items-center">
//               <button
//                 onClick={() => setShowMarkDialog(true)}
//                 className="flex items-center gap-1 sm:p-2 text-primary-color1 hover:bg-primary-color1/10 rounded-md"
//                 aria-label="Mark all questions"
//               >
//                 <Star className="w-4 h-4" />
//                 <ChevronDown className="w-3 h-3" />
//               </button>
//             </div>

//             {/* Desktop - Original Controls */}
//             <div className="hidden lg:flex items-center gap-2">
//               <label className='text-sm text-gray-600 dark:text-gray-300'>
//                 Mark all:
//               </label>
//               <input
//                 type="number"
//                 min="0"
//                 value={markForAll}
//                 onChange={(e) => setMarkForAll(Number(e.target.value))}
//                 className="w-16 px-2 py-1 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-color1"
//               />
//               <Button
//                 appearance="ghost"
//                 className="!text-primary-color1 !border-[1px] hover:!border-primary-color1
//             hover:!bg-primary-color1 
//             hover:!text-white
//              !border-primary-color1
//             focus:!shadow-none
//             focus:!outline-none
//             active:!outline-none
//             active:!border-primary-color1"
//                 onClick={handleMarkForAllChange}
//               >
//                 <style>
//                   {
//                     `
//                       .rs-btn-ghost {
//                           --rs-btn-ghost-hover-border: var(--primary-color1);
//                       }
//                     `
//                   }
//                 </style>
//                 Save
//               </Button>
//             </div>

//             {/* Mobile Dialog */}
//             {showMarkDialog && (
//               <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 lg:hidden">
//                 <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[90%] max-w-md">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-semibold">Set Marks for All</h3>
//                     <button
//                       onClick={() => setShowMarkDialog(false)}
//                       className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//                     >
//                       <IoClose className="w-5 h-5" />
//                     </button>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
//                         Points per question
//                       </label>
//                       <input
//                         type="number"
//                         min="0"
//                         value={markForAll}
//                         onChange={(e) => setMarkForAll(Number(e.target.value))}
//                         className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
//                       />
//                     </div>

//                     <div className="flex gap-3">
//                       <Button
//                         appearance="ghost"
//                         className="flex-1 border border-primary-color1 hover:dark:border-gray-600 hover:border-gray-300 hover:bg-primary-color1 hover:text-white text-primary-color1  hover:!border-none !outline-none !ring-transparent"
//                         onClick={() => setShowMarkDialog(false)}
//                       >
//                         Cancel
//                       </Button>
//                       <Button
//                         appearance="primary"
//                         className="flex-1 !bg-primary-color1"
//                         onClick={() => {
//                           handleMarkForAllChange();
//                           setShowMarkDialog(false);
//                         }}
//                       >
//                         Apply to All
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>



//           <div className={`${isSearchExpanded ? 'block' : 'hidden'} flex justify-center items-center gap-2  flex-grow`}>
//             <IoSearch className="h-5 w-5 sm:w-6 sm:h-6  text-primary-color1  " />
//             <input
//               type="text"
//               placeholder="Search questions..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full border-none bg-transparent outline-none "
//             />
//           </div>



//           {!isSearchExpanded && (
//             <button
//               onClick={() => setIsSearchExpanded(true)}
//               className=" text-gray-600 dark:text-gray-300"
//             >
//               <IoSearch className="h-5 w-5 text-primary-color1 sm:w-6 sm:h-6 " />
//             </button>
//           )}


//           {isSearchExpanded && (
//             <button
//               onClick={() => setIsSearchExpanded(false)}
//               className=" text-gray-600 dark:text-gray-300"
//             >
//               <IoClose className="h-5 w-5 text-red-500" />
//             </button>
//           )}
//         </div>
//       </div>

//       <div className='grid grid-cols-1 xl:grid-cols-2 gap-x-3 py-3 px-1 rounded-sm'>
//         {filteredQuestions.map((q) => (
//           <div key={q.id} className="bg-white dark:bg-gray-800 rounded-sm p-2 px-3 mb-5">
//             <div className="flex justify-between items-center">
//               <div className='flex items-center gap-3'>
//                 <label className="relative flex items-center cursor-pointer">
//                   <input
//                     type='checkbox'
//                     checked={selectedQuestions.includes(q.id)}
//                     onChange={() => handleQuestionSelect(q.id)}
//                     className="appearance-none h-5 w-5 max-sm:w-[18px] max-sm:h-[18px] border-2 border-gray-300 rounded-sm checked:bg-primary-color1 checked:border-0 dark:checked:bg-primary-color1 
//                     transition-colors duration-200 peer"
//                   />

//                   <div className="absolute left-0 top-0 pointer-events-none flex items-center justify-center text-white h-5 w-5 max-sm:w-[18px] max-sm:h-[18px] opacity-0 peer-checked:opacity-100">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-4 w-4"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                 </label>

//                 <p className='text-lg text-gray-800 dark:text-gray-200'>
//                   Q.{q.id}
//                 </p>
//                 <span className='text-red-500 mt-1'>{q.required ? "require" : ""}</span>
//               </div>
//               <div className='flex justify-center max-sm:justify-between items-center gap-5'>
//                 <div className='max-sm:hidden flex justify-center items-center gap-3 '>

//                   <h3 className='text-gray-500 dark:text-gray-300 text-[15px]'>Type</h3>
//                   <p className='text-[15px] text-gray-800 dark:text-white'>
//                     {q.type}
//                   </p>
//                   <span className='h-6 w-[1px] bg-gray-300 dark:bg-gray-500 ml-2' />
//                 </div>
//                 <div className='flex max-sm:hidden justify-center items-center gap-3'>


//                   <h3 className='text-gray-500 dark:text-gray-300 text-[15px]'>Marks</h3>
//                   <p className='text-[15px] text-gray-800 dark:text-white'>
//                     {q.points}
//                   </p>

//                 </div>
//                 <DropdownMenu>
//                   <DropdownMenuTrigger asChild>
//                     <button className="focus:outline-none">
//                       <TfiMoreAlt className='size-5 text-gray-500 dark:text-gray-300' />
//                     </button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent align="end" className={cn(`w-40 h-40 py-1 dark:!bg-gray-800 border border-gray-200 dark:!border-gray-700`)} >
//                     {[
//                       { icon: <EditIcon className="text-primary-color1 size-5 max-sm:size-4" />, text: "Edit", action: () => router.push(`/admin/dashboard/assignments/assignment-session/${id}/assignments/${assignment_id}/questions/${q.id}/update`) },
//                       { icon: <Trash className="text-red-500 size-5 max-sm:size-4" />, text: "Delete", action: () => router.push(`/admin/dashboard/assignments/assignment-session/${id}/assignments/${assignment_id}/updateAssignment`) },


//                     ].map((item, index) => (
//                       <DropdownMenuItem
//                         key={index}
//                         onClick={item.action}
//                         className='!py-[1px] flex items-center  justify-start gap-3'
//                       >
//                         {item.icon}
//                         <h3 className="max-sm:text-[15px] text-[16px] text-gray-800">{item.text}</h3>
//                       </DropdownMenuItem>
//                     ))}
//                   </DropdownMenuContent>
//                 </DropdownMenu>


//               </div>

//             </div>
//             <div className='flex items-center gap-5 sm:hidden py-2'>
//               <div className=' flex justify-center items-center gap-3 '>

//                 <h3 className='text-gray-500 dark:text-gray-300 text-[15px]'>Type</h3>
//                 <p className='text-[15px] text-gray-800 dark:text-white'>
//                   {q.type}
//                 </p>
//                 <span className='h-6 w-[1px] bg-gray-300 dark:bg-gray-500 ml-2' />
//               </div>
//               <div className='flex  justify-center items-center gap-3'>


//                 <h3 className='text-gray-500 dark:text-gray-300 text-[15px]'>Marks</h3>
//                 <p className='text-[15px] text-gray-800 dark:text-white'>
//                   {q.points}
//                 </p>

//               </div>
//             </div>
//             <div className='pb-3  px-2 sm:pt-3 pr-4 flex flex-col gap-y-3'>
//               <p>
//                 {q.questionText}
//               </p>
//               <div className='flex flex-col gap-y-2 items-start justify-start'>
//                 {q.options.map((option) => (
//                   <div key={option.id} className={`w-full flex justify-start rounded-[5px] p-2 items-center gap-3 ${option.isCorrect ? "w-full   bg-[#f0fdf8] dark:bg-[#102b27]/70" : ""}`}>
//                     <label className="relative flex items-center cursor-pointer">
//                       <input
//                         type='checkbox'
//                         readOnly
//                         checked={option.isCorrect}
//                         className="appearance-none peer h-4 w-4 border-2 border-gray-300 rounded-sm 
//                                  checked:bg-primary-color1 checked:border-0 dark:checked:bg-primary-color1
//                                  transition-colors duration-200"

//                       />
//                       <div className="absolute pointer-events-none flex items-center justify-center 
//                                      text-white h-4 w-4 left-0 top-0 opacity-0 peer-checked:opacity-100">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-4 w-4"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       </div>
//                     </label>
//                     <p className='text-gray-700 dark:text-gray-300'>{option.text}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>


//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default QuestitonManager










'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { BookmarkIcon, CheckCircleIcon, EditIcon, Trash, XCircleIcon } from 'lucide-react';
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoArrowBackSharp, IoSearch, IoClose } from 'react-icons/io5'
import { TfiMoreAlt } from 'react-icons/tfi';
import { Button, Header } from 'rsuite';
import { Star, ChevronDown } from 'lucide-react';
import { deletedQuestions, deleteQuestion, getQuestions } from '@/lib/action/exam_action';
import { toast } from 'sonner';
import Loading from '@/components/Pars/Loading';
import { MdQuestionMark } from 'react-icons/md';
import { Tooltip as ReactTooltip } from 'react-tooltip'; // Note the named import

type Field = {
  id: number;
  question_form_id: number;
  field: string;
  field_type: string;
  isCorrect: boolean;
};

type CorrectAnswers = {
  id: number,
  question_form_id: number,
  correct_value: string,
};

type QuestionData = {
  id: number; // Added ID field
  question: string;
  fields: Field[];
  question_type_id: number;
  required: number;
  correct_answers: CorrectAnswers[];
  correct_answer_grade: number;
  wrong_answer_grade: number; // Add this
  hint: string;
  form_id: number;
};

const typeDisplayMap = [
  "oindex",
  "Single choice",
  "Multi choice",
  "True/False",
  "Short answer",
  "Long answer"
];
const QuestionManager = () => {
     const searchParams = useSearchParams();
      const form_id = searchParams.get('form_id');
  const router = useRouter();
  const { id, assignment_id } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [markForAll, setMarkForAll] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [showMarkDialog, setShowMarkDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);
  const [isDeleteById, setIsDeleteById] = useState(false);
  const [isBulkDelete, setIsBulkDelete] = useState(false);
  const [questionsData, setQuestionsData] = useState<QuestionData[]>([]);


  useEffect(() => {
    const fetchQuestions = async () => {
      setIsLoading(true);
      try {
        const response = await getQuestions();
        if (response.data) {
          setQuestionsData(response.data);
        }
      } catch (error) {
        console.error('Error fetching questions:', error);
        toast.error('Failed to load questions');
      }
      finally {
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, [refreshCount]);


  const refreshData = () => {
    setRefreshCount(prev => prev + 1);
  };

  const transformedQuestions = questionsData.map(q => ({
    id: q.id,
    questionText: q.question,
    options: q.fields.map((field, index) => ({
      id: field.id,
      text: field.field,
      // isCorrect: q.correct_answers.some(ca => ca.id === field.id)
      isCorrect: q.correct_answers.some(ca => 
        parseInt(ca.correct_value) === index
      )
    })),
    type: typeDisplayMap[q.question_type_id],
    points: q.correct_answer_grade,
    required: q.required,
    wrongPoints: q.wrong_answer_grade,
    isTrueFalse: q.question_type_id === 3,
    hint: q.hint,
    form_id: q.form_id,
  }));

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedQuestions(transformedQuestions.map(q => q.id));
    } else {
      setSelectedQuestions([]);
    }
  };

  const handleQuestionSelect = (questionId: number) => {
    setSelectedQuestions(prev =>
      prev.includes(questionId)
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleMarkForAllChange = () => {
    // Implement API call to update all marks if needed
    toast.info('This feature requires backend implementation');
  };

  const filteredQuestions = transformedQuestions.filter(q =>
    q.questionText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalMarks = transformedQuestions.reduce((sum, q) => sum + q.points, 0);



  const handleDeleteSelected = async () => {
    console.log('Selected IDs to delete:', selectedQuestions);
    setIsBulkDelete(true);
    const toastId = toast.loading('deleting questions...')
    try {
      const response = await deletedQuestions(selectedQuestions);
      console.log("API Response:", response);

      toast.success("Questions deleted successfully", {
        id: toastId,
        description: "The questions has been deleted successfully.",
        duration: 4000,

      });
      if (refreshData) {
        refreshData();
      }

    } catch (error: any) {
      console.error("Submission Error:", error);
      toast.error("Oops! Something went wrong", {
        id: toastId,
        description: error.message,
        duration: 5000,
      });
    } finally {
      setIsBulkDelete(false);
    }

  };

  const handleDelete = async (id: number) => {
    setIsDeleteById(true);
    const toastId = toast.loading('deleting question...')
    try {
      const response = await deleteQuestion(Number(id));
      console.log("API Response:", response);

      toast.success("Question deleted successfully", {
        id: toastId,
        description: "The question has been deleted successfully.",
        duration: 4000,

      });
      if (refreshData) {
        refreshData();
      }

    } catch (error: any) {
      console.error("Submission Error:", error);
      toast.error("Oops! Something went wrong", {
        id: toastId,
        description: error.message,
        duration: 5000,
      });
    } finally {
      setIsDeleteById(false);
    }

  };


  return (
    <div className={`bg-gray-100 dark:bg-gray-900  my-3 mx-1 sm:mx-2 rounded-lg  px-1 sm:px-4 py-2  min-h-screen `}>
      <div className="flex justify-between items-start pb-5 pt-1 max-sm:px-1">
        <Header className="flex mt-1 justify-start items-center gap-2 max-sm:pt-1  text-[var(--primary-color1)] hover:text-[var(--primary-color2)]">
          <IoArrowBackSharp
            className="text-primary-color1 text-lg sm:text-xl cursor-pointer"

            onClick={() => router.back()}
          />
          <h3 className="text-lg sm:text-xl xl:text-2xl font-semibold tracking-wide">Questions Manager</h3>
        </Header>
        <Button
          onClick={() => router.push(`/admin/dashboard/assignments/assignment-session/${id}/assignments/${assignment_id}/addQuestion?form_id=${form_id}`)}
          className='px-6 max-sm:px-3 py-0    !bg-primary-color1 active:!bg-primary-color1
      !text-white'>
          <h3 className='sm:tracking-wide max-sm:text-[15px] '>Add Question</h3>
        </Button>
      </div>

      <div className='flex justify-between items-center bg-white mx-1 mb-4 dark:bg-gray-800 py-3 px-3 rounded-sm gap-5'>
        <div className='flex items-center gap-3'>
          <label className="relative flex items-center cursor-pointer">
            <input
              type='checkbox'
              // checked={selectedQuestions.length === questionsData.length && questionsData.length > 0}
              checked={selectedQuestions.length === transformedQuestions.length && transformedQuestions.length > 0}
              onChange={handleSelectAll}
              className="appearance-none h-5 w-5 max-sm:w-[18px] max-sm:h-[18px] border-2 border-gray-300 rounded-sm 
                       checked:bg-primary-color1 checked:border-0 dark:checked:bg-primary-color1
                       transition-colors duration-200 peer"
            />
            <div className="absolute left-0 top-0 pointer-events-none flex items-center justify-center 
                   text-white h-5 w-5 max-sm:w-[18px] max-sm:h-[18px] opacity-0 peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </label>

          {selectedQuestions.length > 0 ? (
            <div className='flex items-center gap-4'>
              <p className='text-sm sm:text-lg text-gray-800 dark:text-gray-200'>
                {selectedQuestions.length} selected
              </p>
              <Button
                appearance="ghost"
                color="red"
                size='sm'
                className='!text-red-500 hover:!bg-red-50 dark:hover:!bg-red-900/20 hover:!border-transparent !border-[1px]  hover:!outline-transparent          
                focus:!outline-transparent
                focus:!border-transparent
            active:!border-transparent
            active:!outline-transparent '
                onClick={handleDeleteSelected}
              >
                <style>
                  {
                    `
                      .rs-btn-red {
                          --rs-btn-ghost-hover-border: var(--rs-red-500);
                      }
                    `
                  }
                </style>
                <Trash className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          ) : (
            <div className='flex justify-center items-center gap-2'>
              <p className="text-lg text-gray-800 dark:text-gray-200">
                {questionsData.length}
              </p>
              <span className='text-sm text-gray-600 dark:text-gray-300'>Questions</span>
            </div>
          )}
        </div>


        <div className={` ${selectedQuestions.length > 0 ? "max-xxs:hidden xxs:flex" : "flex"} items-center gap-4 max-sm:gap-2`}>
          <div className={`${isSearchExpanded ? 'hidden sm:flex' : 'flex'}  justify-center items-center gap-1`}>
            <p className='text-gray-600 dark:text-gray-300 text-sm'>
              Total  Marks :
            </p>   <span className='text-[16px]'>{totalMarks}
            </span>
            <span className='h-5 w-[1px] bg-gray-300 dark:bg-gray-500 ml-2' />

          </div>



          <div className={`${isSearchExpanded ? 'hidden xxs:flex' : 'flex'}`}>
            {/* Mobile - Compact Icon Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setShowMarkDialog(true)}
                className="flex items-center gap-1 sm:p-2 text-primary-color1 hover:bg-primary-color1/10 rounded-md"
                aria-label="Mark all questions"
              >
                <Star className="w-4 h-4" />
                <ChevronDown className="w-3 h-3" />
              </button>
            </div>

            {/* Desktop - Original Controls */}
            <div className="hidden lg:flex items-center gap-2">
              <label className='text-sm text-gray-600 dark:text-gray-300'>
                Mark all:
              </label>
              <input
                type="number"
                min="0"
                value={markForAll}
                onChange={(e) => setMarkForAll(Number(e.target.value))}
                className="w-16 px-2 py-1 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-color1"
              />
              <Button
                appearance="ghost"
                className="!text-primary-color1 !border-[1px] hover:!border-primary-color1
            hover:!bg-primary-color1 
            hover:!text-white
             !border-primary-color1
            focus:!shadow-none
            focus:!outline-none
            active:!outline-none
            active:!border-primary-color1"
                onClick={handleMarkForAllChange}
              >
                <style>
                  {
                    `
                      .rs-btn-ghost {
                          --rs-btn-ghost-hover-border: var(--primary-color1);
                      }
                    `
                  }
                </style>
                Save
              </Button>
            </div>

            {/* Mobile Dialog */}
            {showMarkDialog && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 lg:hidden">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-[90%] max-w-md">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Set Marks for All</h3>
                    <button
                      onClick={() => setShowMarkDialog(false)}
                      className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      <IoClose className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                        Points per question
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={markForAll}
                        onChange={(e) => setMarkForAll(Number(e.target.value))}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div className="flex gap-3">
                      <Button
                        appearance="ghost"
                        className="flex-1 border border-primary-color1 hover:dark:border-gray-600 hover:border-gray-300 hover:bg-primary-color1 hover:text-white text-primary-color1  hover:!border-none !outline-none !ring-transparent"
                        onClick={() => setShowMarkDialog(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        appearance="primary"
                        className="flex-1 !bg-primary-color1"
                        onClick={() => {
                          handleMarkForAllChange();
                          setShowMarkDialog(false);
                        }}
                      >
                        Apply to All
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>



          <div className={`${isSearchExpanded ? 'block' : 'hidden'} flex justify-center items-center gap-2  flex-grow`}>
            <IoSearch className="h-5 w-5 sm:w-6 sm:h-6  text-primary-color1  " />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-none bg-transparent outline-none "
            />
          </div>



          {!isSearchExpanded && (
            <button
              onClick={() => setIsSearchExpanded(true)}
              className=" text-gray-600 dark:text-gray-300"
            >
              <IoSearch className="h-5 w-5 text-primary-color1 sm:w-6 sm:h-6 " />
            </button>
          )}


          {isSearchExpanded && (
            <button
              onClick={() => setIsSearchExpanded(false)}
              className=" text-gray-600 dark:text-gray-300"
            >
              <IoClose className="h-5 w-5 text-red-500" />
            </button>
          )}
        </div>
      </div>
      {isLoading ? (<div className='flex justify-center my-16'><Loading /></div>) : (
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-x-3 py-3 px-1 rounded-sm'>
          {filteredQuestions.map((q) => (
            <div key={q.id} className="bg-white dark:bg-gray-800 rounded-sm p-2 px-3 mb-5">
              <div className="flex justify-between items-center">
                <div className='flex items-center gap-3'>
                  <label className="relative flex items-center cursor-pointer">
                    <input
                      type='checkbox'
                      checked={selectedQuestions.includes(q.id)}
                      onChange={() => handleQuestionSelect(q.id)}
                      className="appearance-none h-5 w-5 max-sm:w-[18px] max-sm:h-[18px] border-2 border-gray-300 rounded-sm checked:bg-primary-color1 checked:border-0 dark:checked:bg-primary-color1 
                    transition-colors duration-200 peer"
                    />

                    <div className="absolute left-0 top-0 pointer-events-none flex items-center justify-center text-white h-5 w-5 max-sm:w-[18px] max-sm:h-[18px] opacity-0 peer-checked:opacity-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </label>

                  <p className='text-lg text-gray-800 dark:text-gray-200'>
                    Q.{q.id}

                  </p>
                  <span className='text-red-500 mt-1'>{q.required === 0 ? "" : "require"}</span>
        
                  <span
                  
                    data-tooltip-id="hint-tooltip"
                    data-tooltip-content={q.hint}
                    className="question-icon mt-1"
                  >
                    <MdQuestionMark />
                  </span>

                  <ReactTooltip
                    id="hint-tooltip"
                    place="right"
                    variant="dark" // predefined theme
                    delayShow={300} // optional delay
                    className="max-w-[300px] text-sm" // optional styling
                  >{q.hint}</ReactTooltip>
                </div>
                <div className='flex justify-center max-sm:justify-between items-center gap-5'>
                  <div className='max-sm:hidden flex justify-center items-center gap-3 '>

                    <h3 className='text-gray-500 dark:text-gray-300 text-[15px]'>Type</h3>
                    <p className='text-[15px] text-gray-800 dark:text-white'>
                      {q.type}
                    </p>
                    <span className='h-6 w-[1px] bg-gray-300 dark:bg-gray-500 ml-2' />
                  </div>
                  <div className='flex max-sm:hidden justify-center items-center gap-3'>




                    <div className='flex items-center gap-2'>
                      Grade :
                      <div className='flex items-center gap-1.5'>
                        <CheckCircleIcon className='w-5 h-5 text-emerald-600 dark:text-emerald-400' />
                        <span className='text-sm font-medium text-emerald-700 dark:text-emerald-300'>
                          +{q.points}
                        </span>
                      </div>
                      {q.wrongPoints && <div className='flex items-center gap-1.5'>
                        <XCircleIcon className='w-5 h-5 text-rose-600 dark:text-rose-400' />
                        <span className='text-sm font-medium text-rose-700 dark:text-rose-300'>
                          -{q.wrongPoints}
                        </span>
                      </div>}
                    </div>



                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="focus:outline-none">
                        <TfiMoreAlt className='size-5 text-gray-500 dark:text-gray-300' />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className={cn(`w-40 h-40 py-1 dark:!bg-gray-800 border border-gray-200 dark:!border-gray-700`)} >
                      {[
                        {
                          icon: <EditIcon className="text-primary-color1 size-5 max-sm:size-4" />,
                          text: "Edit",
                          action: () => router.push(`/admin/dashboard/assignments/assignment-session/${id}/assignments/${assignment_id}/questions/${q.id}/update?form_id=${q.form_id}`)
                        },
                        { icon: <Trash className="text-red-500 size-5 max-sm:size-4" />, text: "Delete", action: () => handleDelete(q.id) },


                      ].map((item, index) => (
                        <DropdownMenuItem
                          key={index}
                          onClick={item.action}
                          className='!py-[1px] flex items-center  justify-start gap-3'
                        >
                          {item.icon}
                          <h3 className="max-sm:text-[15px] text-[16px] text-gray-800">{item.text}</h3>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>


                </div>

              </div>
              <div className='flex items-center gap-5 sm:hidden py-2'>
                <div className=' flex justify-center items-center gap-3 '>

                  <h3 className='text-gray-500 dark:text-gray-300 text-[15px]'>Type</h3>
                  <p className='text-[15px] text-gray-800 dark:text-white'>
                    {q.type}
                  </p>
                  <span className='h-6 w-[1px] bg-gray-300 dark:bg-gray-500 ml-2' />
                </div>
                <div className='flex  justify-center items-center gap-3'>


                  <h3 className='text-gray-500 dark:text-gray-300 text-[15px]'>Marks</h3>
                  <p className='text-[15px] text-gray-800 dark:text-white'>
                    {q.points}
                  </p>

                </div>
              </div>
              <div className='pb-3  px-2 sm:pt-3 pr-4 flex flex-col gap-y-3'>
                <p>
                <p dangerouslySetInnerHTML={{ __html: q.questionText }} /> 
                </p>
                <div className='flex flex-col gap-y-2 items-start justify-start'>
                  {q.options.map((option) => (
                    <div key={option.id} className={`w-full flex justify-start rounded-[5px] p-2 items-center gap-3 ${option.isCorrect ? "w-full   bg-[#f0fdf8] dark:bg-[#102b27]/70" : ""}`}>
                      <label className="relative flex items-center cursor-pointer">
                        <input
                          type='checkbox'
                          readOnly
                          checked={option.isCorrect}
                          className="appearance-none peer h-4 w-4 border-2 border-gray-300 rounded-sm 
                                 checked:bg-primary-color1 checked:border-0 dark:checked:bg-primary-color1
                                 transition-colors duration-200"

                        />
                        <div className="absolute pointer-events-none flex items-center justify-center 
                                     text-white h-4 w-4 left-0 top-0 opacity-0 peer-checked:opacity-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </label>
                      <p className='text-gray-700 dark:text-gray-300'> <p dangerouslySetInnerHTML={{ __html: option.text }} /></p>
                    </div>
                  ))}
                </div>
              </div>


            </div>
          ))}
        </div>)}
    </div>
  )
}



export default QuestionManager;