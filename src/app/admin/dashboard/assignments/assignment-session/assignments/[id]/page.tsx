



// "use client";
// import { useParams } from "next/navigation";
// import React, { useContext, useState } from "react";
// import { ThemeContext } from "@/components/Pars/ThemeContext";
// import "@/components/assignments/assignmentSessionA/assignmentSessionAdd/style.css";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { Modal, Button, Input, InputGroup, Header } from "rsuite";
// import {
//   Calendar,
//   Users,
//   Clock,
//   Languages,
//   Percent,
//   ListOrdered,
//   Code2,
//   Eye,
//   EyeOff,
//   DeleteIcon,
//   EditIcon,
//   TrashIcon,
// } from "lucide-react";
// import { Dropdown, IconButton } from "rsuite";
// import { More, Edit, Trash } from "@rsuite/icons";
// import { PiToggleLeft, PiToggleRightFill } from "react-icons/pi";
// import { CiExport } from "react-icons/ci";
// import { MdTitle, MdSubtitles, MdCategory, MdVisibility, MdVisibilityOff } from "react-icons/md";
// import { FiCheckSquare, FiFileText, FiHelpCircle, FiPlay, FiSettings, FiStopCircle } from "react-icons/fi";
// import StudentResultsTable from "@/components/assignments/assignmentSessionA/StudentResultsTable ";
// import ExamSettingsModal from "@/components/assignments/assignmentSessionA/ExamSettingsModal";

// const RenderIconButton = (props: any, ref: any) => {
//   const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
//   return (
//     <IconButton
//       {...props}
//       ref={ref}
//       icon={<More className="size-7" />}
//       size="lg"
//       circle
//       className={`${mode === "dark"
//         ? "!text-[var(--light-bg-color)]"
//         : "!text-[var(--dark-color)]"
//         } !bg-transparent hover:!bg-gray-100 dark:hover:!bg-gray-700 transition-colors`}
//     />
//   );
// };

// const Page = () => {
//   const { id } = useParams();
//   const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
//   const router = useRouter();

//   // Exam Data
//   const exam = {
//     image: "/register.png",
//     subtitle: "Mid-term Examination",
//     title: "Advanced Mathematics",
//     language: "English",
//     percentage: 40,
//     numberOfQuestions: 50,
//     numberOfStudents: 120,
//     durationMinutes: 90,
//     type: "Multiple Choice",
//     code: "MATH202",
//     status: "Active",
//     startDate: "2024-03-15",
//     endDate: "2024-03-17",
//     showAnswers: true,
//   };

//   // States
//   const [settingsOpen, setSettingsOpen] = useState(false);
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [startInterfaceOpen, setStartInterfaceOpen] = useState(false);
//   const [endInterfaceOpen, setEndInterfaceOpen] = useState(false);
//   const [examSettingsModalOpen, setExamSettingsModalOpen] = useState(false);
//   const [conditionsOpen, setConditionsOpen] = useState(false);
//   const [candidateInfoOpen, setCandidateInfoOpen] = useState(false);
//   const [questionsOpen, setQuestionsOpen] = useState(false);

//   const resultVisibilityOptions = [
//     { label: "After Finish", value: "after" },
//     { label: "Immediately", value: "immediately" },
//     { label: "Per Answer", value: "per-answer" },
//   ];

//   const correctionVisibilityOptions = [
//     { label: "After Finish", value: "after" },
//     { label: "Immediately", value: "immediately" },
//   ];

//   const [studentList] = useState([
//     {
//       id: 1,
//       name: "John Doe",
//       email: "john@example.com",
//       submissionTime: "2024-03-15 10:30",
//       duration: "85 minutes",
//       score: 85,
//       correct: 45,
//       incorrect: 5,
//       status: "Excellent",
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       email: "jane@example.com",
//       submissionTime: "2024-03-15 11:15",
//       duration: "88 minutes",
//       score: 92,
//       correct: 48,
//       incorrect: 2,
//       status: "Excellent",
//     },
//   ]);

//   return (
//     <div className={`p-4 sm:p-8 min-h-screen ${mode === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>

//       <Modal open={startInterfaceOpen} onClose={() => setStartInterfaceOpen(false)}>
//         <Modal.Header>
//           <Modal.Title>Start Interface</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="space-y-4">
//             <p>Interface Information...</p>
//             <div className="flex gap-2">
//               <Button appearance="primary">Preview as Viewer</Button>
//               <Button appearance="primary">Edit</Button>
//               <Button appearance="primary" color="red">
//                 Delete
//               </Button>
//             </div>
//           </div>
//         </Modal.Body>
//       </Modal>
//       <ExamSettingsModal examSettingsModalOpen={examSettingsModalOpen} setExamSettingsModalOpen={setExamSettingsModalOpen}/>
//       <Modal open={candidateInfoOpen} onClose={() => setCandidateInfoOpen(false)} size="lg">
//         <Modal.Header>
//           <Modal.Title>Candidate Information</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="space-y-4">
//             <div className="flex gap-2 mb-4">
//               <Button appearance="primary">Upload</Button>
//               <Button appearance="primary">Download</Button>
//               <Button appearance="primary">Delete</Button>
//               <Button appearance="primary">Add</Button>
//             </div>
//             <table className="w-full">
//               <thead>
//                 <tr>
//                   <th>First Name</th>
//                   <th>Last Name</th>
//                   <th>Email</th>
//                   <th>ID</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {/* Add dynamic rows here */}
//                 <tr>
//                   <td>
//                     <Input />
//                   </td>
//                   <td>
//                     <Input />
//                   </td>
//                   <td>
//                     <Input type="email" />
//                   </td>
//                   <td>
//                     <Input />
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </Modal.Body>
//       </Modal>

//       <div className="flex justify-between items-start mb-8">
//         <Header className="flex items-center gap-2 text-[var(--primary-color1)] hover:text-[var(--primary-color2)]">
//           <p className="text-lg sm:text-2xl lg:text-4xl font-semibold">Exam Details</p>
//         </Header>
//         <div className="flex justify-end pr-3">
//           <Dropdown
//             renderToggle={RenderIconButton}
//             placement="bottomEnd"
//             className="[&_.dropdown-menu]:min-w-[220px] pr-3"
//           >
//             {/* Exam Settings */}
//             <Dropdown.Item
//               className="!flex !items-center !px-4 !py-4 text-lg transition-colors"
//               onClick={() => setExamSettingsModalOpen(true)}
//             >
//               <FiSettings className="text-primary-color1 size-7 text-[20px] mr-5" />
//               Exam Settings
//             </Dropdown.Item>

//             {/* Required Exam Information */}
//             <Dropdown.Item
//               className="!flex !items-center !px-4 !py-4 text-lg transition-colors"
//               onClick={() => setCandidateInfoOpen(true)}
//             >
//               <FiFileText className="text-primary-color1 size-7 text-[20px] mr-5" />
//               Required Exam Information
//             </Dropdown.Item>

//             {/* Start Interface */}
//             <Dropdown.Item
//               className="!flex !items-center !px-4 !py-4 text-lg transition-colors"
//               onClick={() => setStartInterfaceOpen(true)}
//             >
//               <FiPlay className="text-primary-color1 size-7 text-[20px] mr-5" />
//               Start Interface
//             </Dropdown.Item>

//             {/* End Interface */}
//             <Dropdown.Item
//               className="!flex !items-center !px-4 !py-4 text-lg transition-colors"
//               onClick={() => setEndInterfaceOpen(true)}
//             >
//               <FiStopCircle className="text-primary-color1 size-7 text-[20px] mr-5" />
//               End Interface
//             </Dropdown.Item>

//             {/* Exam Conditions */}
//             <Dropdown.Item
//               className="!flex !items-center !px-4 !py-4 text-lg transition-colors"
//               onClick={() => setConditionsOpen(true)}
//             >
//               <FiCheckSquare className="text-primary-color1 size-7 text-[20px] mr-5" />
//               Exam Conditions
//             </Dropdown.Item>

//             {/* Questions */}
//             <Dropdown.Item
//               className="!flex !items-center !px-4 !py-4 text-lg transition-colors"
//               onClick={() => router.push("/questions")}
//             >
//               <FiHelpCircle className="text-primary-color1 size-7 text-[20px] mr-5" />
//               Questions
//             </Dropdown.Item>
//           </Dropdown>
//         </div>
//       </div>


//       <div className={`rounded-xl shadow-lg ${mode === "dark" ? "bg-gray-800" : "bg-white"}`}>
//         <div className="flex justify-end pr-3">
//           <Dropdown
//             renderToggle={RenderIconButton}
//             placement="bottomEnd"
//             className="[&_.dropdown-menu]:min-w-[220px] pr-3"
//           >
//             <Dropdown.Item
//               className="!flex !items-center !px-4 !py-4 text-lg transition-colors"
//               onClick={() => { }}
//             >
//               <EditIcon className="text-primary-color1 size-7 text-[20px] mr-5" />
//               Edit
//             </Dropdown.Item>
//             <Dropdown.Item
//               className="!flex !items-center !px-4 !py-4 text-lg transition-colors"
//               onClick={() => { }}
//             >
//               <TrashIcon className="text-primary-color1 size-7 text-[20px] mr-5" />
//               Delete
//             </Dropdown.Item>
//             <Dropdown.Item
//               className="!flex !items-center !px-4 !py-4 text-lg transition-colors"
//               onClick={() => { }}
//             >
//               <CiExport className="text-primary-color1 size-7 text-[20px] mr-5" />
//               Export to Excel
//             </Dropdown.Item>
//             <Dropdown.Item
//               className="!flex !items-center !px-4 !py-4 text-lg transition-colors"
//             >
//               <PiToggleRightFill className="text-primary-color1 size-7 text-[20px] mr-5" />
//               {exam.status === "Active" ? "Deactivate" : "Activate"}
//             </Dropdown.Item>
//             <Dropdown.Item
//               className="!flex !items-center !px-4 !py-4 text-lg transition-colors"
//               onClick={() => setPreviewOpen(true)}
//             >
//               <MdVisibility className="text-primary-color1 size-7 text-[20px] mr-5" />
//               Preview Exam
//             </Dropdown.Item>
//           </Dropdown>
//         </div>
//         <div className="px-6 grid grid-cols-1 md:grid-cols-7 gap-6">
//           {/* Image Section */}
//           <div className="relative col-span-3 max-h-80 rounded-lg overflow-hidden">
//             <Image
//               src={exam.image}
//               alt="Exam Image"
//               fill
//               className="object-cover"
//               priority
//             />
//           </div>
//           {/* Exam Details */}
//           <div className="col-span-4 space-y-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <InfoItem
//                 icon={<MdTitle className="w-6 h-6" />}
//                 label="Exam Title"
//                 value={exam.title}
//               />
//               <InfoItem
//                 icon={<MdSubtitles className="w-6 h-6" />}
//                 label="Subtitle"
//                 value={exam.subtitle}
//               />
//               <InfoItem
//                 icon={<Languages className="w-6 h-6" />}
//                 label="Language"
//                 value={exam.language}
//               />
//               <InfoItem
//                 icon={<Percent className="w-6 h-6" />}
//                 label="Passing %"
//                 value={`${exam.percentage}%`}
//               />
//               <InfoItem
//                 icon={<Calendar className="w-6 h-6" />}
//                 label="Exam Period"
//                 value={`${exam.startDate} - ${exam.endDate}`}
//               />
//               <InfoItem
//                 icon={<Clock className="w-6 h-6" />}
//                 label="Duration"
//                 value={`${exam.durationMinutes} mins`}
//               />
//               <InfoItem
//                 icon={<MdCategory className="w-6 h-6" />}
//                 label="Exam Type"
//                 value={exam.type}
//               />
//               <InfoItem
//                 icon={<Code2 className="w-6 h-6" />}
//                 label="Exam Code"
//                 value={exam.code}
//               />
//             </div>
//           </div>
//         </div>
//         <div className="flex pb-5 pl-8 gap-8">
//           <div className="flex gap-6">
//             <InfoItem
//               icon={<Users className="w-6 h-6" />}
//               label="Registered Students"
//               value={exam.numberOfStudents}
//             />
//             <InfoItem
//               icon={<ListOrdered className="w-6 h-6" />}
//               label="Questions"
//               value={exam.numberOfQuestions}
//             />
//           </div>
//           <div className="flex gap-6">
//             <div className="flex items-center gap-3">
//               <PiToggleRightFill className="w-6 h-6 text-green-500" />
//               <span className="text-lg">
//                 Status: {exam.status === "Active" ? "Active" : "Inactive"}
//               </span>
//             </div>
//             <div className="flex items-center gap-3">
//               {exam.showAnswers ? (
//                 <>
//                   <MdVisibility className="w-6 h-6 text-green-500" />
//                   <span className="text-lg">Answers Visible</span>
//                 </>
//               ) : (
//                 <>
//                   <MdVisibilityOff className="w-6 h-6 text-red-500" />
//                   <span className="text-lg">Answers Hidden</span>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>




//       <div className="mt-8">
//         <h2 className="text-2xl font-bold mb-4">Student Results</h2>
//         <StudentResultsTable />
//       </div>


//       <Modal open={previewOpen} onClose={() => setPreviewOpen(false)} className="">
//         <Modal.Header className="">
//           <Modal.Title className="text-2xl font-bold">Exam Preview</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="space-y-4">
//             <div className="border rounded-lg p-4">
//               <h3 className="text-xl font-semibold mb-2">Sample Question</h3>
//               <p className="mb-4">What is the square root of 144?</p>
//               <div className="space-y-2">
//                 <InputGroup>
//                   <InputGroup.Addon>A</InputGroup.Addon>
//                   <Input value="12" disabled />
//                 </InputGroup>
//                 <InputGroup>
//                   <InputGroup.Addon>B</InputGroup.Addon>
//                   <Input value="14" disabled />
//                 </InputGroup>
//               </div>
//             </div>
//             <Button
//               appearance="primary"
//               block
//               className="bg-[var(--primary-color1)] hover:bg-[var(--primary-color2)]"
//             >
//               Submit Answer
//             </Button>
//           </div>
//         </Modal.Body>
//       </Modal>

//       {mode === "dark" && (
//         <style>
//           {`
// .rs-modal-title{
//   color: white !important
// }
// .rs-modal-header-close {
//   color: white !important
// }
// .rs-modal-content {
//   color: white !important;
// }
// .rs-modal-content {
//   background-color: #374151 !important;
// }
//           `}
//         </style>
//       )}
//     </div>
//   );
// };

// const InfoItem = ({
//   label,
//   value,
//   icon,
// }: {
//   label: string;
//   value: string | number;
//   icon?: React.ReactNode;
// }) => (
//   <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
//     {icon && <span className="text-[var(--primary-color1)]">{icon}</span>}
//     <div>
//       <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</div>
//       <div className="text-lg font-semibold">{value}</div>
//     </div>
//   </div>
// );

// export default Page;







"use client";
import { useParams } from "next/navigation";
import React, { useContext, useState } from "react";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import "@/components/assignments/assignmentSessionA/assignmentSessionAdd/style.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Modal, Button, Input, InputGroup, Header } from "rsuite";
import {
  Calendar,
  Users,
  Clock,
  Languages,
  Percent,
  ListOrdered,
  Code2,
  Eye,
  EyeOff,
  DeleteIcon,
  EditIcon,
  TrashIcon,
} from "lucide-react";
import { Dropdown, IconButton } from "rsuite";
import { More, Edit, Trash } from "@rsuite/icons";
import { PiToggleLeft, PiToggleRightFill } from "react-icons/pi";
import { CiExport } from "react-icons/ci";
import { MdTitle, MdSubtitles, MdCategory, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FiCheckSquare, FiFileText, FiHelpCircle, FiPlay, FiSettings, FiStopCircle } from "react-icons/fi";
import StudentResultsTable from "@/components/assignments/assignmentSessionA/StudentResultsTable ";
import ExamSettingsModal from "@/components/assignments/assignmentSessionA/ExamSettingsModal";

const RenderIconButton = (props: any, ref: any) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  return (
    <IconButton
      {...props}
      ref={ref}
      icon={<More className="size-7" />}
      size="lg"
      circle
      className={`${mode === "dark"
        ? "!text-[var(--light-bg-color)]"
        : "!text-[var(--dark-color)]"
        } !bg-transparent hover:!bg-gray-100 dark:hover:!bg-gray-700 transition-colors`}
    />
  );
};

const Page = () => {
  const { id } = useParams();
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const router = useRouter();

  // Exam Data
  const exam = {
    image: "/register.png",
    subtitle: "Mid-term Examination",
    title: "Advanced Mathematics",
    language: "English",
    percentage: 40,
    numberOfQuestions: 50,
    numberOfStudents: 120,
    durationMinutes: 90,
    type: "Multiple Choice",
    code: "MATH202",
    status: "Active",
    startDate: "2024-03-15",
    endDate: "2024-03-17",
    showAnswers: true,
  };

  // States
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [startInterfaceOpen, setStartInterfaceOpen] = useState(false);
  const [endInterfaceOpen, setEndInterfaceOpen] = useState(false);
  const [examSettingsModalOpen, setExamSettingsModalOpen] = useState(false);
  const [conditionsOpen, setConditionsOpen] = useState(false);
  const [candidateInfoOpen, setCandidateInfoOpen] = useState(false);
  const [questionsOpen, setQuestionsOpen] = useState(false);

  const resultVisibilityOptions = [
    { label: "After Finish", value: "after" },
    { label: "Immediately", value: "immediately" },
    { label: "Per Answer", value: "per-answer" },
  ];

  const correctionVisibilityOptions = [
    { label: "After Finish", value: "after" },
    { label: "Immediately", value: "immediately" },
  ];

  const [studentList] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      submissionTime: "2024-03-15 10:30",
      duration: "85 minutes",
      score: 85,
      correct: 45,
      incorrect: 5,
      status: "Excellent",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      submissionTime: "2024-03-15 11:15",
      duration: "88 minutes",
      score: 92,
      correct: 48,
      incorrect: 2,
      status: "Excellent",
    },
  ]);

  return (
    <div className={` sm:p-8 min-h-screen ${mode === "dark" ? "bg-dark text-white" : "bg-light text-dark"}`}>

      <Modal open={startInterfaceOpen} onClose={() => setStartInterfaceOpen(false)}>
        <Modal.Header>
          <Modal.Title>Start Interface</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <p>Interface Information...</p>
            <div className="flex gap-2">
              <Button appearance="primary">Preview as Viewer</Button>
              <Button appearance="primary">Edit</Button>
              <Button appearance="primary" color="red">
                Delete
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <ExamSettingsModal examSettingsModalOpen={examSettingsModalOpen} setExamSettingsModalOpen={setExamSettingsModalOpen} />
      <Modal open={candidateInfoOpen} onClose={() => setCandidateInfoOpen(false)} size="lg">
        <Modal.Header>
          <Modal.Title>Candidate Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Button appearance="primary">Upload</Button>
              <Button appearance="primary">Download</Button>
              <Button appearance="primary">Delete</Button>
              <Button appearance="primary">Add</Button>
            </div>
            <table className="w-full">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>ID</th>
                </tr>
              </thead>
              <tbody>
                {/* Add dynamic rows here */}
                <tr>
                  <td>
                    <Input />
                  </td>
                  <td>
                    <Input />
                  </td>
                  <td>
                    <Input type="email" />
                  </td>
                  <td>
                    <Input />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>
      </Modal>

      <div className="flex justify-between items-start mb-8">
        <Header className="flex items-center px-5 py-4 gap-2 text-[var(--primary-color1)] hover:text-[var(--primary-color2)]">
          <p className="text-lg sm:text-2xl lg:text-4xl font-semibold">Exam Details</p>
        </Header>
        <div className="flex justify-end pr-3 max-sm:pt-1">
          <Dropdown
            renderToggle={RenderIconButton}
            placement="bottomEnd"
            className="[&_.dropdown-menu]:min-w-[220px] pr-3"
          >
            {/* Exam Settings */}
            <Dropdown.Item
              className="!flex !items-center !px-4 !py-4 text-lg transition-colors"
              onClick={() => setExamSettingsModalOpen(true)}
            >
              <FiSettings className="text-primary-color1 size-7 text-[20px] mr-5" />
              Exam Settings
            </Dropdown.Item>

            {/* Required Exam Information */}
            <Dropdown.Item
              className="!flex !items-center !px-4 !py-4 text-lg transition-colors"
              onClick={() => setCandidateInfoOpen(true)}
            >
              <FiFileText className="text-primary-color1 size-7 text-[20px] mr-5" />
              Required Exam Information
            </Dropdown.Item>

            {/* Start Interface */}
            <Dropdown.Item
              className="!flex !items-center !px-4 !py-4 text-lg transition-colors"
              onClick={() => setStartInterfaceOpen(true)}
            >
              <FiPlay className="text-primary-color1 size-7 text-[20px] mr-5" />
              Start Interface
            </Dropdown.Item>

            {/* End Interface */}
            <Dropdown.Item
              className="!flex !items-center !px-4 !py-4 text-lg transition-colors"
              onClick={() => setEndInterfaceOpen(true)}
            >
              <FiStopCircle className="text-primary-color1 size-7 text-[20px] mr-5" />
              End Interface
            </Dropdown.Item>

            {/* Exam Conditions */}
            <Dropdown.Item
              className="!flex !items-center !px-4 !py-4 text-lg transition-colors"
              onClick={() => setConditionsOpen(true)}
            >
              <FiCheckSquare className="text-primary-color1 size-7 text-[20px] mr-5" />
              Exam Conditions
            </Dropdown.Item>

            {/* Questions */}
            <Dropdown.Item
              className="!flex !items-center !px-4 !py-4 text-lg transition-colors"
              onClick={() => router.push("/questions")}
            >
              <FiHelpCircle className="text-primary-color1 size-7 text-[20px] mr-5" />
              Questions
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>


      <div className={`rounded-xl shadow-lg ${mode === "dark" ? "bg-gray-800" : "bg-white"} max-sm:rounded-lg pb-5`}>
        <div className="flex justify-end pr-3 max-sm:pr-2">
          <Dropdown
            renderToggle={RenderIconButton}
            placement="bottomEnd"
            className="[&_.dropdown-menu]:min-w-[220px] pr-3 max-sm:[&_.dropdown-menu]:min-w-[180px] max-sm:pr-1"
          >
            {[
              { icon: <EditIcon />, text: "Edit" },
              { icon: <TrashIcon />, text: "Delete" },
              { icon: <CiExport />, text: "Export to Excel" },
              { icon: <PiToggleRightFill />, text: exam.status === "Active" ? "Deactivate" : "Activate" },
              { icon: <MdVisibility />, text: "Preview Exam" }
            ].map((item, index) => (
              <Dropdown.Item
                key={index}
                className="!flex !items-center !px-4 !py-4 text-lg transition-colors max-sm:!px-2 max-sm:!py-3 max-sm:text-base"
                onClick={() => { }}
              >
                {item.icon}
                <span className="max-sm:text-sm">{item.text}</span>
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>

        <div className=" px-6 grid grid-cols-1 sm:grid-cols-7 gap-6 max-sm:px-4 max-sm:gap-4">
          {/* Image Section */}
          <div className="sm:col-span-3 ">
            <img
              src={exam.image}
              alt="Exam Image"
              width={600}
              height={600}
              className="object-cover rounded-lg"
            />
                     <div className="max-sm:hidden pt-5 flex items-center flex-wrap gap-4">
                      <div className="flex items-center flex-wrap gap-4">

                      <InfoItem
              icon={<Users className="w-6 h-6 max-sm:w-4 max-sm:h-4" />}
              label="Registered Students"
              value={exam.numberOfStudents}
              />
            <InfoItem
              icon={<ListOrdered className="w-6 h-6 max-sm:w-4 max-sm:h-4" />}
              label="Questions"
              value={exam.numberOfQuestions}
              />
              </div>
              <div className="flex items-center gap-4 ">

                <div className="flex items-center gap-3 max-sm:gap-2">
              <PiToggleRightFill className="w-6 h-6 text-green-500 max-sm:w-4 max-sm:h-4" />
              <span className="text-lg max-sm:text-sm">
                Status: {exam.status === "Active" ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="flex items-center gap-3 max-sm:gap-2">
              {exam.showAnswers ? (
                <>
                  <MdVisibility className="w-6 h-6 text-green-500 max-sm:w-4 max-sm:h-4" />
                  <span className="text-lg max-sm:text-sm">Answers Visible</span>
                </>
              ) : (
                <>
                  <MdVisibilityOff className="w-6 h-6 text-red-500 max-sm:w-4 max-sm:h-4" />
                  <span className="text-lg max-sm:text-sm">Answers Hidden</span>
                </>
              )}
            </div>
              </div>
              </div>
          </div>

          {/* Exam Details */}
          <div className=" sm:col-span-4 space-y-6  max-sm:space-y-4 max-sm:pt-5">
            <div className="flex flex-wrap items-center gap-4 sm:grid sm:grid-cols-2">
              <InfoItem
                icon={<MdTitle className="w-6 h-6 max-sm:w-4 max-sm:h-4" />}
                label="Exam Title"
                value={exam.title}
          
              />
              <InfoItem
                icon={<MdSubtitles className="w-6 h-6 max-sm:w-4 max-sm:h-4" />}
                label="Subtitle"
                value={exam.subtitle}
       
              />
                <InfoItem
                icon={<Languages className="w-6 h-6 max-sm:w-4 max-sm:h-4" />}
                label="Language"
                value={exam.language}
              />
              <InfoItem
                icon={<Percent className="w-6 h-6 max-sm:w-4 max-sm:h-4" />}
                label="Passing %"
                value={`${exam.percentage}%`}
              />
              <InfoItem
                icon={<Calendar className="w-6 h-6 max-sm:w-4 max-sm:h-4" />}
                label="Exam Period"
                value={`${exam.startDate} - ${exam.endDate}`}
              />
              <InfoItem
                icon={<Clock className="w-6 h-6 max-sm:w-4 max-sm:h-4" />}
                label="Duration"
                value={`${exam.durationMinutes} mins`}
              />
              <InfoItem
                icon={<MdCategory className="w-6 h-6 max-sm:w-4 max-sm:h-4" />}
                label="Exam Type"
                value={exam.type}
              />
              <InfoItem
                icon={<Code2 className="w-6 h-6 max-sm:w-4 max-sm:h-4" />}
                label="Exam Code"
                value={exam.code}
              />
               <div className="sm:hidden flex items-center flex-wrap gap-4">
                      <div className="flex items-center flex-wrap gap-4">

                      <InfoItem
              icon={<Users className="w-6 h-6 max-sm:w-4 max-sm:h-4" />}
              label="Registered Students"
              value={exam.numberOfStudents}
              />
            <InfoItem
              icon={<ListOrdered className="w-6 h-6 max-sm:w-4 max-sm:h-4" />}
              label="Questions"
              value={exam.numberOfQuestions}
              />
              </div>
              <div className="flex items-center gap-4 ">

                <div className="flex items-center gap-3 max-sm:gap-2">
              <PiToggleRightFill className="w-6 h-6 text-green-500 max-sm:w-4 max-sm:h-4" />
              <span className="text-lg max-sm:text-sm">
                Status: {exam.status === "Active" ? "Active" : "Inactive"}
              </span>
            </div>

            <div className="flex items-center gap-3 max-sm:gap-2">
              {exam.showAnswers ? (
                <>
                  <MdVisibility className="w-6 h-6 text-green-500 max-sm:w-4 max-sm:h-4" />
                  <span className="text-lg max-sm:text-sm">Answers Visible</span>
                </>
              ) : (
                <>
                  <MdVisibilityOff className="w-6 h-6 text-red-500 max-sm:w-4 max-sm:h-4" />
                  <span className="text-lg max-sm:text-sm">Answers Hidden</span>
                </>
              )}
            </div>
              </div>
              </div>
          
            </div>
          </div>
        </div>

      </div>




      <div className="mt-8 px-3 sm:px-6">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Student Results</h2>
        <StudentResultsTable />
      </div>


      <Modal open={previewOpen} onClose={() => setPreviewOpen(false)} className="">
        <Modal.Header className="">
          <Modal.Title className="text-2xl font-bold">Exam Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-2">Sample Question</h3>
              <p className="mb-4">What is the square root of 144?</p>
              <div className="space-y-2">
                <InputGroup>
                  <InputGroup.Addon>A</InputGroup.Addon>
                  <Input value="12" disabled />
                </InputGroup>
                <InputGroup>
                  <InputGroup.Addon>B</InputGroup.Addon>
                  <Input value="14" disabled />
                </InputGroup>
              </div>
            </div>
            <Button
              appearance="primary"
              block
              className="bg-[var(--primary-color1)] hover:bg-[var(--primary-color2)]"
            >
              Submit Answer
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {mode === "dark" && (
        <style>
          {`
.rs-modal-title{
  color: white !important
}
.rs-modal-header-close {
  color: white !important
}
.rs-modal-content {
  color: white !important;
}
.rs-modal-content {
  background-color: #374151 !important;
}
          `}
        </style>
      )}
    </div>
  );
};

export default Page;

const InfoItem = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
}) => (
  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors max-sm:gap-2 max-sm:p-2">
    {icon && (
      <span className="text-[var(--primary-color1)] max-sm:[&>svg]:w-4 max-sm:[&>svg]:h-4">
        {icon}
      </span>
    )}
    <div>
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 max-sm:text-xs">
        {label}
      </div>
      <div className="text-lg font-semibold  max-sm:text-[12px]">
        {value}
      </div>
    </div>
  </div>
);
