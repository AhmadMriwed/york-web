
// 'use client';

// import { Trash, Upload } from 'lucide-react';
// import { useParams, useRouter } from 'next/navigation';
// import React, { useEffect, useState, useRef } from 'react';
// import { IoArrowBackSharp } from 'react-icons/io5';
// import { Button, Header, Message, toaster } from 'rsuite';
// import dynamic from 'next/dynamic';

// const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
// import 'react-quill/dist/quill.snow.css';
// import { updateQuestion } from '@/lib/action/exam_action';
// import { toast } from 'sonner';

// const modules = {
//   toolbar: {
//     container: [
//       [{ header: [1, 2, 3, 4, 5, 6, false] }],
//       ['bold', 'italic', 'underline', 'strike'],
//       [{ color: [] }, { background: [] }],
//       [{ list: 'ordered' }, { list: 'bullet' }],
//       ['link', 'image', 'video', 'file'],
//       ['clean'],
//     ]
//   },
// };

// const EditQuestionPage = () => {
//   const [errors, setErrors] = useState({
//     questionText: false,
//     options: [] as boolean[],
//     correctAnswerGrade: false,
//     wrongAnswerGrade: false,
//   });
//   const validateForm = () => {
//     const newErrors = {
//       questionText: false,
//       options: [] as boolean[],
//       correctAnswerGrade: false,
//       wrongAnswerGrade: false,
//     };

//     // Validate question text
//     newErrors.questionText = !questionData.questionText.trim() ||
//       questionData.questionText.trim() === '<p><br></p>';

//     // Validate options
//     newErrors.options = questionData.options.map(option => {
//       const text = option.text.replace(/<[^>]*>/g, '').trim(); // Strip HTML tags
//       return !text;
//     });

//     // Validate grades
//     newErrors.correctAnswerGrade = questionData.correct_answer_grade <= 0;
//     if (questionData.type === 'true_false') {
//       newErrors.wrongAnswerGrade = questionData.wrong_answer_grade < 0;
//     }

//     // Check at least one correct answer for relevant types
//     if (['single', 'multi', 'true_false'].includes(questionData.type)) {
//       const hasCorrectAnswer = questionData.options.some(opt => opt.isCorrect);
//       if (!hasCorrectAnswer) {
//         toaster.push(
//           <Message type="error" closable>
//             Please select at least one correct answer
//           </Message>
//         );
//         return false;
//       }
//     }

//     setErrors(newErrors);

//     return !Object.values(newErrors).flat().some(error => error);
//   };
//   const router = useRouter();
//   const { id, assignment_id, question_id } = useParams();
//   const [questionData, setQuestionData] = useState({
//     questionText: '',
//     options: [{ text: '', isCorrect: false }],
//     type: 'single',
//     required: true,
//     show_grade: false,
//     hint: '',
//     correct_answer_grade: 0,
//     wrong_answer_grade: 0,
//     attachments: [] as { name: string; url: string; type: 'image' | 'file' }[],
//   });
//   const [isUploading, setIsUploading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     const fetchQuestion = async () => {
//       const mockQuestion = {
//         questionText: "What are the dimensions of the KT-123 engine expressed in millimeters including the engine cover?",
//         options: [
//           { text: "500 × 200 × 300", isCorrect: false },
//           { text: "450 × 220 × 320", isCorrect: true },
//           { text: "600 × 100 × 320", isCorrect: false }
//         ],
//         type: "single",
//         required: true,
//         show_grade: false,
//         hint: '',
//         correct_answer_grade: 0,
//         wrong_answer_grade: 0,
//         attachments: [
//           {
//             name: "engine-diagram.png",
//             url: "https://example.com/path/to/image.png",
//             type: "image"
//           }
//         ]
//       };
//       setQuestionData(mockQuestion);
//     };

//     fetchQuestion();
//   }, [question_id]);

//   const handleTypeChange = (newType: string) => {
//     let newOptions = [...questionData.options];

//     if (newType === 'true_false') {
//       newOptions = [
//         { text: 'True', isCorrect: false },
//         { text: 'False', isCorrect: false }
//       ];
//       // Reset grades when switching to true/false
//       setQuestionData({
//         ...questionData,
//         type: newType,
//         options: newOptions,
//         correct_answer_grade: 0,
//         wrong_answer_grade: 0
//       });
//     } else if (['short', 'long'].includes(newType)) {
//       newOptions = [{ text: '', isCorrect: true }];
//       setQuestionData({
//         ...questionData,
//         type: newType,
//         options: newOptions,
//         correct_answer_grade: 0,
//         wrong_answer_grade: 0
//       });
//     } else {
//       setQuestionData({
//         ...questionData,
//         type: newType,
//         options: newOptions
//       });
//     }
//   };

//   const handleOptionChange = (index: number, value: string) => {
//     const newOptions = [...questionData.options];
//     newOptions[index].text = value;
//     setQuestionData({ ...questionData, options: newOptions });

//     // Update error state
//     setErrors(prev => ({
//       ...prev,
//       options: prev.options.map((error, i) =>
//         i === index ? !value.replace(/<[^>]*>/g, '').trim() : error
//       )
//     }));
//   };

//   const handleCorrectAnswerChange = (index: number) => {
//     const newOptions = questionData.options.map((option, i) => ({
//       ...option,
//       isCorrect: questionData.type === 'single' || questionData.type === 'true_false'
//         ? i === index
//         : !option.isCorrect
//     }));
//     setQuestionData({ ...questionData, options: newOptions });
//   };

//   const addNewOption = () => {
//     setQuestionData({
//       ...questionData,
//       options: [...questionData.options, { text: '', isCorrect: false }]
//     });
//   };

//   const deleteOption = (index: number) => {
//     const newOptions = questionData.options.filter((_, i) => i !== index);
//     setQuestionData({ ...questionData, options: newOptions });
//   };

//   const handleSubmit = async(e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toaster.push(
//         <Message type="error" closable>
//           Please fix all validation errors before submitting
//         </Message>
//       );
//       return;
//     }
//     const formData = {
//       form_id: Number(assignment_id),
//       question_type_id: questionData.type === 'single' ? 1 :
//         questionData.type === 'multi' ? 2 :
//           questionData.type === 'true_false' ? 3 :
//             questionData.type === 'short' ? 4 : 5,
//       question: questionData.questionText,
//       show_grade: questionData.show_grade ? 1 : 0,
//       hint: questionData.hint,
//       correct_answer_grade: questionData.correct_answer_grade ,
//       wrong_answer_grade: questionData.type === 'true_false' ? questionData.wrong_answer_grade : null,
//       fields: questionData.options.map(opt => opt.text),
//       field_types: questionData.options.map(opt => opt.isCorrect ? 'correct' : 'wrong'),
//       correct_value: questionData.options.filter(opt => opt.isCorrect).map(opt => opt.text),
//       required: questionData.required ? 1 : 0
//     };

//     console.log('Form data to submit:', formData);

//       setIsSubmitting(true);
//         try {

//           const response = await updateQuestion(formData);
//           console.log("API Response:", response);

//           toast.success("Exam section added successfully", {
//             description: "The exam section has been created successfully.",
//             duration: 4000,

//           });
//           toast.success("Question saved successfully!");
//           // setQuestionData({
//           //   questionText: "",
//           //   type: "true-false",
//           //   correctAnswerGrade: 1,
//           //   wrongAnswerGrade: 0,
//           //   hint: "",
//           //   required: true,
//           //   showGrade: true
//           // });
//         } catch (error: any) {
//           console.error("Submission Error:", error);
//           toast.error("Oops! Something went wrong", {
//             description: error.message,
//             duration: 5000,
//           });
//         } finally {
//           setIsSubmitting(false);

//         }

//   };

//   return (
//     <div className="bg-gray-100 dark:bg-gray-900 my-3 mx-1 sm:mx-2 rounded-lg px-1 sm:px-4 py-2 min-h-screen">
//       <div className="flex justify-between items-start pb-5 pt-1 max-sm:px-1">
//         <Header className="flex mt-1 justify-start items-center gap-2 max-sm:pt-1 text-[var(--primary-color1)] hover:text-[var(--primary-color2)]">
//           <IoArrowBackSharp
//             className="text-primary-color1 text-lg sm:text-xl cursor-pointer"
//             onClick={() => router.back()}
//           />
//           <h3 className="text-lg sm:text-xl xl:text-2xl font-semibold tracking-wide">Edit Question</h3>
//         </Header>
//       </div>

//       <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-sm p-6 mx-1 mb-4">
//         <div className="space-y-6">
//           {/* Question Text */}
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//               Question Text
//             </label>
//             {errors.questionText && (
//               <p className="text-red-500 text-sm mb-2">Question text is required</p>
//             )}
//             <div className="dark:bg-gray-700 rounded">
//               <ReactQuill
//                 theme="snow"
//                 value={questionData.questionText}
//                 onChange={(value) => setQuestionData({ ...questionData, questionText: value })}
//                 className="dark:text-white"
//                 modules={modules}
//               />
//             </div>
//           </div>

//           {/* Hint */}
//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//               Hint (Optional)
//             </label>
//             <input
//               type="text"
//               value={questionData.hint}
//               onChange={(e) => setQuestionData({ ...questionData, hint: e.target.value })}
//               className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
//               placeholder="Enter a hint for the question"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//               Question Type
//             </label>
//             <select
//               value={questionData.type}
//               onChange={(e) => handleTypeChange(e.target.value)}
//               className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-color1"
//             >
//               <option value="single">Single select</option>
//               <option value="multi">Multi select</option>
//               <option value="true_false">True/False</option>
//               <option value="short">Short answer</option>
//               <option value="long">Long answer</option>
//             </select>
//           </div>



//           {/* Options */}
//           {!['short', 'long'].includes(questionData.type) && (
//             <div>
//               <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//                 {questionData.type === 'true_false' ? 'Answers' : 'Options'}
//               </label>
//               <div className="space-y-3">
//                 {questionData.options.map((option, index) => (
//                   <div key={index} className="flex items-center gap-3">
//                     {questionData.type !== 'true_false' && (
//                       <input
//                         type={questionData.type === 'single' ? 'radio' : 'checkbox'}
//                         checked={option.isCorrect}
//                         onChange={() => handleCorrectAnswerChange(index)}
//                         className="h-4 w-4 text-primary-color1 focus:ring-primary-color1"
//                       />
//                     )}
//                     {questionData.type === 'true_false' ? (
//                       <div className="flex items-center gap-3 w-full">
//                         <input
//                           type="radio"
//                           checked={option.isCorrect}
//                           onChange={() => handleCorrectAnswerChange(index)}
//                           className="h-4 w-4 text-primary-color1 focus:ring-primary-color1"
//                         />
//                         <ReactQuill
//                           theme="snow"
//                           value={option.text}
//                           readOnly
//                           className="flex-1 dark:bg-gray-700"
//                         />
//                       </div>
//                     ) : (
//                       <div className="flex-1 dark:bg-gray-700 rounded">
//                         <ReactQuill
//                           theme="snow"
//                           value={option.text}
//                           onChange={(value) => handleOptionChange(index, value)}
//                           className="dark:text-white"
//                           modules={modules}
//                         />
//                       </div>
//                     )}
//                     {questionData.type !== 'true_false' && (
//                       <button
//                         type="button"
//                         onClick={() => deleteOption(index)}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <Trash className="w-5 h-5" />
//                       </button>
//                     )}
//                   </div>
//                 ))}
//                 {!['true_false', 'short', 'long'].includes(questionData.type) && (
//                   <Button
//                     type="button"
//                     onClick={addNewOption}
//                     className="!bg-primary-color1/10 !text-primary-color1 hover:!bg-primary-color1/20 mt-2"
//                   >
//                     Add Option
//                   </Button>
//                 )}
//               </div>
//             </div>
//           )}

//           {['short', 'long'].includes(questionData.type) && (
//             <div>
//               <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//                 Correct Answer
//               </label>
//               <div className="dark:bg-gray-700 rounded">
//                 <ReactQuill
//                   theme="snow"
//                   value={questionData.options[0].text}
//                   onChange={(value) => handleOptionChange(0, value)}
//                   className="dark:text-white"
//                   modules={questionData.type === 'short' ? { toolbar: true } : modules}
//                 />
//               </div>
//             </div>
//           )}





//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//                 Correct Answer Grade {errors.correctAnswerGrade && <span className="text-red-500">*</span>}
//               </label>
//               {errors.correctAnswerGrade && (
//                 <p className="text-red-500 text-sm mb-2">Correct answer grade must be greater than 0</p>
//               )}
//               <input
//                 type="number"
//                 min="0"
//                 value={questionData.correct_answer_grade}
//                 onChange={(e) => setQuestionData({
//                   ...questionData,
//                   correct_answer_grade: Number(e.target.value)
//                 })}
//                 className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${errors.correctAnswerGrade ? 'border-red-500' : ''
//                   }`}
//                 required
//               />
//             </div>

//             {questionData.type === 'true_false' && (
//               <div>
//                 <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
//                   Wrong Answer Grade {errors.wrongAnswerGrade && <span className="text-red-500">*</span>}
//                 </label>
//                 {errors.wrongAnswerGrade && (
//                   <p className="text-red-500 text-sm mb-2">Wrong answer grade cannot be negative</p>
//                 )}
//                 <input
//                   type="number"
//                   min="0"
//                   value={questionData.wrong_answer_grade}
//                   onChange={(e) => setQuestionData({
//                     ...questionData,
//                     wrong_answer_grade: Number(e.target.value)
//                   })}
//                   className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${errors.wrongAnswerGrade ? 'border-red-500' : ''
//                     }`}
//                   required
//                 />
//               </div>)}
//           </div>


//           <div className='flex items-center justify-start gap-4'>

//             <div className="flex items-center gap-3">
//               <input
//                 type="checkbox"
//                 checked={questionData.required}
//                 onChange={(e) => setQuestionData({ ...questionData, required: e.target.checked })}
//                 className="h-4 w-4 text-primary-color1 rounded focus:ring-primary-color1"
//               />
//               <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Required Question
//               </label>
//             </div>

//             {/* Show Grade */}
//             <div className="flex items-center gap-3">
//               <input
//                 type="checkbox"
//                 checked={questionData.show_grade}
//                 onChange={(e) => setQuestionData({ ...questionData, show_grade: e.target.checked })}
//                 className="h-4 w-4 text-primary-color1 rounded focus:ring-primary-color1"
//               />
//               <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Show Grade
//               </label>
//             </div>
//           </div>

//           {/* Form Actions */}
//           <div className="flex justify-end gap-4 pt-6">
//             <Button
//               type="button"
//               onClick={() => router.back()}
//               className="!bg-gray-100 !text-gray-700 hover:!bg-gray-200 dark:!bg-gray-700 dark:hover:!bg-gray-600"
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               className="!bg-primary-color1 !text-white hover:!bg-primary-color1/90"
//             >
//               Save Changes
//             </Button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditQuestionPage;




'use client';

import { Trash, Upload } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState, useRef, useContext } from 'react';
import { IoArrowBackSharp } from 'react-icons/io5';
import { Button, Header, Message, toaster } from 'rsuite';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { updateQuestion } from '@/lib/action/exam_action';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';
import { ThemeContext } from '@/components/Pars/ThemeContext';
// import '@/styles/quill.snow.css';

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video', 'file'],
      ['clean'],
    ]
  },
};

type Option = {
  text: string;
  isCorrect: boolean;
};

type Attachment = {
  name: string;
  url: string;
  type: 'image' | 'file';
};

type QuestionData = {
  questionText: string;
  options: Option[];
  type: 'single' | 'multi' | 'true_false' | 'short' | 'long';
  required: boolean;
  show_grade: boolean;
  hint: string;
  correct_answer_grade: number;
  wrong_answer_grade: number;
  attachments: Attachment[];
};

const EditQuestionPage = () => {
  const [errors, setErrors] = useState({
    questionText: false,
    options: [] as boolean[],
    correctAnswerGrade: false,
    wrongAnswerGrade: false,
  });
  const validateForm = () => {
    const newErrors = {
      questionText: false,
      options: [] as boolean[],
      correctAnswerGrade: false,
      wrongAnswerGrade: false,
    };

    // Validate question text
    newErrors.questionText = !questionData.questionText.trim() ||
      questionData.questionText.trim() === '<p><br></p>';

    // Validate options
    newErrors.options = questionData.options.map(option => {
      const text = option.text.replace(/<[^>]*>/g, '').trim(); // Strip HTML tags
      return !text;
    });

    // Validate grades
    newErrors.correctAnswerGrade = questionData.correct_answer_grade <= 0;


    // Check at least one correct answer for relevant types
    if (['single', 'multi', 'true_false'].includes(questionData.type)) {
      const hasCorrectAnswer = questionData.options.some(opt => opt.isCorrect);
      if (!hasCorrectAnswer) {
        toaster.push(
          <Message type="error" closable>
            Please select at least one correct answer
          </Message>
        );
        return false;
      }
    }

    setErrors(newErrors);

    return !Object.values(newErrors).flat().some(error => error);
  };
  const router = useRouter();
  const { id, assignment_id, question_id } = useParams();
  const [questionData, setQuestionData] = useState<QuestionData>({
    questionText: '',
    options: [{ text: '', isCorrect: false }],
    type: 'single',
    required: true,
    show_grade: false,
    hint: '',
    correct_answer_grade: 0,
    wrong_answer_grade: 0,
    attachments: [],
  });


  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mockQuestion: QuestionData = {
    questionText: "What are the dimensions of the KT-123 engine expressed in millimeters including the engine cover?",
    options: [
      { text: "500 × 200 × 300", isCorrect: false },
      { text: "450 × 220 × 320", isCorrect: true },
      { text: "600 × 100 × 320", isCorrect: false }
    ],
    type: "single",
    required: true,
    show_grade: false,
    hint: '',
    correct_answer_grade: 0,
    wrong_answer_grade: 0,
    attachments: [
      {
        name: "engine-diagram.png",
        url: "https://example.com/path/to/image.png",
        type: "image"
      }
    ]
  };


 

  useEffect(() => {
    const fetchQuestion = async () => {
      setQuestionData(mockQuestion);
    };
    fetchQuestion();
  }, [question_id]);
  const handleTypeChange = (newType: 'single' | 'multi' | 'true_false' | 'short' | 'long') => {
    let newOptions = [...questionData.options];

    if (newType === 'true_false') {
      // For true/false questions, always reset to two options: "True" and "False"
      newOptions = [
        { text: 'True', isCorrect: false },
        { text: 'False', isCorrect: false }
      ];
    } else if (['short', 'long'].includes(newType)) {
      // For short/long answer types, set a single empty correct option
      newOptions = [{ text: '', isCorrect: true }];
    } else {
      // For other types (single/multi), keep existing options or reset to one empty option
      newOptions = [{ text: '', isCorrect: false }];
    }

    // Reset grades when switching to true/false or short/long
    setQuestionData({
      ...questionData,
      type: newType, // Now TypeScript knows this is a valid value
      options: newOptions,
      correct_answer_grade: 0,
      wrong_answer_grade: 0
    });
  };
  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...questionData.options];
    newOptions[index].text = value;
    setQuestionData({ ...questionData, options: newOptions });

    // Update error state
    setErrors(prev => ({
      ...prev,
      options: prev.options.map((error, i) =>
        i === index ? !value.replace(/<[^>]*>/g, '').trim() : error
      )
    }));
  };

  const handleCorrectAnswerChange = (index: number) => {
    const newOptions = [...questionData.options];

    if (questionData.type === 'single' || questionData.type === 'true_false') {
      // For single-select: only the clicked option should be true
      newOptions.forEach((option, i) => {
        option.isCorrect = i === index;
      });
    } else if (questionData.type === 'multi') {
      // For multi-select: toggle just the clicked option
      newOptions[index].isCorrect = !newOptions[index].isCorrect;
    }

    setQuestionData({ ...questionData, options: newOptions });
  };

  const addNewOption = () => {
    setQuestionData({
      ...questionData,
      options: [...questionData.options, { text: '', isCorrect: false }]
    });
  };

  const deleteOption = (index: number) => {
    const newOptions = questionData.options.filter((_, i) => i !== index);
    setQuestionData({ ...questionData, options: newOptions });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toaster.push(
        <Message type="error" closable>
          Please fix all validation errors before submitting
        </Message>
      );
      return;
    }
    const formData = {
      form_id: Number(assignment_id),
      question_type_id: questionData.type === 'single' ? 1 :
        questionData.type === 'multi' ? 2 :
          questionData.type === 'true_false' ? 3 :
            questionData.type === 'short' ? 4 : 5,
      question: questionData.questionText,
      show_grade: questionData.show_grade ? 1 : 0,
      hint: questionData.hint,
      correct_answer_grade: questionData.correct_answer_grade,
      wrong_answer_grade: questionData.type === 'true_false' ? questionData.wrong_answer_grade : null,
      fields: questionData.options.map(opt => opt.text),
      field_types: questionData.options.map(opt => 'text'),
      correct_value: questionData.options.filter(opt => opt.isCorrect).map(opt => opt.text),
      required: questionData.required ? 1 : 0
    };

    console.log('Form data to submit:', formData);

    setIsSubmitting(true);
    try {

      const response = await updateQuestion(formData);
      console.log("API Response:", response);

      toast.success("Exam section added successfully", {
        description: "The exam section has been created successfully.",
        duration: 4000,

      });
      toast.success("Question saved successfully!");
      // setQuestionData({
      //   questionText: "",
      //   type: "true-false",
      //   correctAnswerGrade: 1,
      //   wrongAnswerGrade: 0,
      //   hint: "",
      //   required: true,
      //   showGrade: true
      // });
    } catch (error: any) {
      console.error("Submission Error:", error);
      toast.error("Oops! Something went wrong", {
        description: error.message,
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);

    }

  };

const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);





  return (
    <div className="bg-gray-100 dark:bg-gray-900 my-3 mx-1 sm:mx-2 rounded-lg px-1 sm:px-4 py-2 min-h-screen">
      <div className="flex justify-between items-start pb-5 pt-1 max-sm:px-1">
        <Header className="flex mt-1 justify-start items-center gap-2 max-sm:pt-1 text-[var(--primary-color1)] hover:text-[var(--primary-color2)]">
          <IoArrowBackSharp
            className="text-primary-color1 text-lg sm:text-xl cursor-pointer"
            onClick={() => router.back()}
          />
          <h3 className="text-lg sm:text-xl xl:text-2xl font-semibold tracking-wide">Edit Question</h3>
        </Header>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-sm p-6 mx-1 mb-4">
        <div className="space-y-6">
          {/* Question Text */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Question Text
            </label>
            {errors.questionText && (
              <p className="text-red-500 text-sm mb-2">Question text is required</p>
            )}
            <div className="dark:bg-gray-700 rounded">
              <ReactQuill
                theme="snow"
                value={questionData.questionText}
                onChange={(value) => setQuestionData({ ...questionData, questionText: value })}
                className={`dark:text-white ${mode ? 'ql-dark' : ''}`}
                modules={modules}
              />
            </div>
          </div>

          {/* Hint */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Hint (Optional)
            </label>
            <input
              type="text"
              value={questionData.hint}
              onChange={(e) => setQuestionData({ ...questionData, hint: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              placeholder="Enter a hint for the question"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Question Type
            </label>
            <select
              value={questionData.type}
              onChange={(e: any) => handleTypeChange(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-primary-color1"
            >
              <option value="single">Single select</option>
              <option value="multi">Multi select</option>
              <option value="true_false">True/False</option>
              <option value="short">Short answer</option>
              <option value="long">Long answer</option>
            </select>
          </div>



          {/* Options */}
          {!['short', 'long'].includes(questionData.type) && (
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                {questionData.type === 'true_false' ? 'Answers' : 'Options'}
              </label>
              <div className="space-y-3">
                {questionData.options.map((option, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {questionData.type !== 'true_false' && (
                      <input
                        type={questionData.type === 'single' ? 'radio' : 'checkbox'}
                        checked={option.isCorrect}
                        onChange={() => handleCorrectAnswerChange(index)}
                        className="h-4 w-4 text-primary-color1 focus:ring-primary-color1"
                      />

                    )}
                    {questionData.type === 'true_false' ? (
                      <div className="flex items-center gap-3 w-full">
                        <input
                          type="radio"
                          checked={option.isCorrect}
                          onChange={() => handleCorrectAnswerChange(index)}
                          className="h-4 w-4 text-primary-color1 focus:ring-primary-color1"
                        />
                        <ReactQuill
                          theme="snow"
                          value={option.text}
                          readOnly
                          className="flex-1 dark:bg-gray-700"
                        />
                      </div>
                    ) : (
                      <div className="flex-1 dark:bg-gray-700 rounded">
                        <ReactQuill
                          theme="snow"
                          value={option.text}
                          onChange={(value) => handleOptionChange(index, value)}
                          className="dark:text-white"
                          modules={modules}
                        />
                      </div>
                    )}
                    {questionData.type !== 'true_false' && (
                      <button
                        type="button"
                        onClick={() => deleteOption(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                {!['true_false', 'short', 'long'].includes(questionData.type) && (
                  <Button
                  appearance='ghost'
                    type="button"
                    onClick={addNewOption}
                    className="mt-4 !text-primary-color1 !border-primary-color1"
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
                    Add Option
                  </Button>
                )}
              </div>
            </div>
          )}

          {['short', 'long'].includes(questionData.type) && (
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Correct Answer
              </label>
              <div className="dark:bg-gray-700 rounded">
                <ReactQuill
                  theme="snow"
                  value={questionData.options[0].text}
                  onChange={(value) => handleOptionChange(0, value)}
                  className="dark:text-white"
                  modules={questionData.type === 'short' ? { toolbar: true } : modules}
                />
              </div>
            </div>
          )}





          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Correct Answer Grade {errors.correctAnswerGrade && <span className="text-red-500">*</span>}
              </label>
              {errors.correctAnswerGrade && (
                <p className="text-red-500 text-sm mb-2">Correct answer grade must be greater than 0</p>
              )}
              <input
                type="number"
                min="0"
                value={questionData.correct_answer_grade}
                onChange={(e) => setQuestionData({
                  ...questionData,
                  correct_answer_grade: Number(e.target.value)
                })}
                className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${errors.correctAnswerGrade ? 'border-red-500' : ''
                  }`}
                required
              />
            </div>

            {questionData.type === 'true_false' && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Wrong Answer Grade {errors.wrongAnswerGrade && <span className="text-red-500">*</span>}
                </label>
                {errors.wrongAnswerGrade && (
                  <p className="text-red-500 text-sm mb-2">Wrong answer grade cannot be negative</p>
                )}
                <input
                  type="number"

                  value={questionData.wrong_answer_grade}
                  onChange={(e) => setQuestionData({
                    ...questionData,
                    wrong_answer_grade: Number(e.target.value)
                  })}
                  className={`w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white ${errors.wrongAnswerGrade ? 'border-red-500' : ''
                    }`}
                  required
                />
              </div>)}
          </div>


          <div className='flex items-center justify-start gap-4'>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={questionData.required}
                onChange={(e) => setQuestionData({ ...questionData, required: e.target.checked })}
                className="h-4 w-4 text-primary-color1 rounded focus:ring-primary-color1"
              />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Required Question
              </label>
            </div>

            {/* Show Grade */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={questionData.show_grade}
                onChange={(e) => setQuestionData({ ...questionData, show_grade: e.target.checked })}
                className="h-4 w-4 text-primary-color1 rounded focus:ring-primary-color1"
              />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Show Grade
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              onClick={() => router.back()}
              className="!bg-gray-100 !text-gray-700 dark:!text-white hover:!bg-gray-200 dark:!bg-gray-700 dark:hover:!bg-gray-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="!bg-primary-color1  !text-white hover:!bg-primary-color1/90"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </form>
     { mode === 'dark' && <style>
        {
          `
          
          :root {
    --ql-toolbar-color: #4848;
    --ql-toolbar-bg: #f3f3f3;
    --ql-editor-color: #000;
    --ql-editor-bg: #fff;
    --ql-border-color: #ccc;
  }
  

  
  .ql-snow .ql-picker {
    color: var(--ql-toolbar-color);
  }
  
  .ql-snow .ql-stroke {
    stroke: var(--ql-toolbar-color);
  }
  
  .ql-snow .ql-fill {
    fill: var(--ql-toolbar-color);
  }
  
  .ql-toolbar.ql-snow {
    border: 1px solid var(--ql-border-color);
    background-color: var(--ql-toolbar-bg);
  }
  
  .ql-container.ql-snow {
    border: 1px solid var(--ql-border-color);
    background-color: var(--ql-editor-bg);
  }
  
  .ql-editor {
    color: var(--ql-editor-color);
  }

.ql-snow .ql-picker {
    color: #fff;
  }
  
  .ql-snow .ql-stroke {
    stroke: #fff;
  }
  
  .ql-snow .ql-fill {
    fill: #fff;
  }
  
  .ql-toolbar.ql-snow {
    border: 1px solid #374151;
    background-color: #1f2937;
  }
  
  .ql-container.ql-snow {
    border: 1px solid #374151;
    background-color: #2A3446 ;
  }
  
  .ql-editor {
    color: #fff;
  }
  
  .ql-snow .ql-picker-options {
    background-color: #374151;
    border: 1px solid #374151;
  }
  
  .ql-snow .ql-picker-label {
    color: #fff;
  }
          `
        }
      </style>}
    </div>
  );
};

export default EditQuestionPage;


