"use client";
import React, { useContext, useState } from "react";
import { Modal, Input, Dropdown, Button, Form } from "rsuite";
import GearIcon from "@rsuite/icons/Gear";
import "rsuite/dist/rsuite.min.css";
import FormGroup from "rsuite/esm/FormGroup";
import FormControlLabel from "rsuite/esm/FormControlLabel";
import { Calendar, CheckSquare, Clock, Eye, Hourglass, Languages, List, Repeat } from "lucide-react";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import "@/components/assignments/assignmentSessionA/assignmentSessionAdd/style.css";


const ExamSettingsModal = ({
    examSettingsModalOpen,
    setExamSettingsModalOpen,
}: {
    examSettingsModalOpen: boolean;
    setExamSettingsModalOpen: (value: boolean) => void;
}) => {
    const [formValue, setFormValue] = useState({
        examTime: "",
        language: "",
        examDate: "",
        questionsPerPage: 5,
        resultVisibility: "after_exam",
        estimatedTime: "",
        attempts: 1,
        correctionVisibility: "after_exam",
    });

    const resultVisibilityOptions = [
        { value: "after_exam", label: "After Submission" },
        { value: "manual", label: "Manual" },
        { value: "after_each_answer", label: "After Each Answer" },
    ];

    const correctionVisibilityOptions = [
        { value: "after_exam", label: "After Submission" },
        { value: "manual", label: "Manual" },
        { value: "after_each_answer", label: "After Each Answer" },
    ];

    const handleSubmit = () => {
        console.log("Form Values:", formValue);
        setExamSettingsModalOpen(false);
    };

    const iconStyle = "w-6 h-6 mr-3 text-primary-color1";
    const formLabelStyle = "text-xl font-semibold text-gray-800 dark:text-gray-300";
    const inputStyle = "text-lg p-4 rounded-xl border-2 border-gray-200  hover:border-blue-400 focus:border-blue-500";
    const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
    return (
        <Modal
            open={examSettingsModalOpen}
            onClose={() => setExamSettingsModalOpen(false)}
            size="lg"
            className="[&_.rs-modal-content]:!rounded-xl"
            backdrop="static"
        >
            <Modal.Header >
                <div className="flex items-center space-x-4">
                    <GearIcon className="w-8 h-8 animate-spin-slow" />
                    <h2 className="text-3xl font-bold tracking-tight">
                        Exam Configuration Center
                    </h2>
                </div>
            </Modal.Header>

            <Modal.Body className="p-8  ">
                <Form fluid formValue={formValue} onChange={() => {setFormValue}}>
                    <div className="grid grid-cols-1  md:grid-cols-2 gap-8">
                        {/* Exam Duration */}
                        <FormGroup>
                            <FormControlLabel className={formLabelStyle}>
                                <div className="flex items-center mb-3">
                                    <Clock className={`${iconStyle}`} />
                                    <span>Exam Duration</span>
                                </div>
                            </FormControlLabel>
                            <Input
                                name="examTime"
                                type="time"
                                size="lg"
                                className={`${inputStyle} [&>input]:text-xl [&>input]:bg-gray-700`}
                            />
                        </FormGroup>

                        {/* Exam Language */}
                        <FormGroup>
                            <FormControlLabel className={formLabelStyle}>
                                <div className="flex items-center mb-3">
                                    <Languages className={`${iconStyle}`} />
                                    <span>Exam Language</span>
                                </div>
                            </FormControlLabel>
                            <Input
                                name="language"
                                placeholder="Select language"
                                size="lg"
                                className={`${inputStyle} [&>input]:text-xl [&>input]:bg-gray-700`}
                            />
                        </FormGroup>

                        {/* Exam Date */}
                        <FormGroup>
                            <FormControlLabel className={formLabelStyle}>
                                <div className="flex items-center mb-3">
                                    <Calendar className={`${iconStyle}`} />
                                    <span>Exam Date</span>
                                </div>
                            </FormControlLabel>
                            <Input
                                name="examDate"
                                type="date"
                                size="lg"
                                className={`${inputStyle} [&>input]:text-xl`}
                            />
                        </FormGroup>

                        {/* Questions Per Page */}
                        <FormGroup>
                            <FormControlLabel className={formLabelStyle}>
                                <div className="flex items-center mb-3">
                                    <List className={`${iconStyle}`} />
                                    <span>Questions Per Page</span>
                                </div>
                            </FormControlLabel>
                            <Input
                                name="questionsPerPage"
                                type="number"
                                min={1}
                                size="lg"
                                className={`${inputStyle} [&>input]:text-xl`}
                            />
                        </FormGroup>

                        {/* Results Visibility */}
                        <FormGroup>
                            <FormControlLabel className={formLabelStyle}>
                                <div className="flex items-center mb-3">
                                    <Eye className={`${iconStyle}`} />
                                    <span>Results Visibility</span>
                                </div>
                            </FormControlLabel>
                            <Dropdown
                                name="resultVisibility"
                                title={resultVisibilityOptions.find(
                                    (opt) => opt.value === formValue.resultVisibility
                                )?.label}
                                block
                                size="lg"
                                className="w-full "
                            >
                                {resultVisibilityOptions.map((opt) => (
                                    <Dropdown.Item
                                        key={opt.value}
                                        onSelect={() =>
                                            setFormValue({ ...formValue, resultVisibility: opt.value })
                                        }
                                        className="text-lg p-4 hover:bg-blue-50 transition-colors"
                                    >
                                        {opt.label}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown>
                        </FormGroup>

                        {/* Time Per Page */}
                        <FormGroup>
                            <FormControlLabel className={formLabelStyle}>
                                <div className="flex items-center mb-3">
                                    <Hourglass className={`${iconStyle}`} />
                                    <span>Time Per Page</span>
                                </div>
                            </FormControlLabel>
                            <Input
                                name="estimatedTime"
                                type="time"
                                size="lg"
                                className={`${inputStyle} [&>input]:text-xl`}
                            />
                        </FormGroup>

                        {/* Attempts Allowed */}
                        <FormGroup>
                            <FormControlLabel className={formLabelStyle}>
                                <div className="flex items-center mb-3">
                                    <Repeat className={`${iconStyle}`} />
                                    <span>Attempts Allowed</span>
                                </div>
                            </FormControlLabel>
                            <Input
                                name="attempts"
                                type="number"
                                min={1}
                                size="lg"
                                className={`${inputStyle} [&>input]:text-xl`}
                            />
                        </FormGroup>

                        {/* Correction Guide */}
                        <FormGroup>
                            <FormControlLabel className={formLabelStyle}>
                                <div className="flex items-center mb-3">
                                    <CheckSquare className={`${iconStyle}`} />
                                    <span>Correction Guide</span>
                                </div>
                            </FormControlLabel>
                            <Dropdown
                                name="correctionVisibility"
                                title={correctionVisibilityOptions.find(
                                    (opt) => opt.value === formValue.correctionVisibility
                                )?.label}
                                block
                                size="lg"
                                className="w-full  "
                            >
                                {correctionVisibilityOptions.map((opt) => (
                                    <Dropdown.Item
                                        key={opt.value}
                                        onSelect={() =>
                                            setFormValue({ ...formValue, correctionVisibility: opt.value })
                                        }
                                        className="text-lg p-4 hover:bg-blue-50 transition-colors"
                                    >
                                        {opt.label}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown>
                        </FormGroup>
                    </div>
                    <div className="flex items-center justify-end gap-5">

                        {/* <button
                        onClick={() => setExamSettingsModalOpen(false)}
                        className="mt-8 px-8 py-3  text-xl text-white rounded-[8px] bg-red-600 hover:bg-red-700 transition-all transform hover:scale-[1.01] shadow-lg"
                        >
                        cancel 
                    </button> */}
                        <button
                            onClick={handleSubmit}
                            className="mt-8 px-8 w-40 text-center  py-3 text-xl rounded-[8px] text-white bg-primary-color1  transition-all transform hover:scale-[1.01] shadow-lg"
                        >
                            Save
                        </button>
                    </div>
                </Form>
            </Modal.Body>
            {mode === "dark" && (
                <style>
                    {`
      /* Add these new rules for input icons */
      .rs-input-group svg {
        color: #fff !important;
        stroke: #fff !important;
      }

      /* Existing dark mode styles */
      .rs-modal-title,
      .rs-modal-header-close,
      .rs-modal-content,
      .rs-form-control-label {
        color: #fff !important;
      }
      
      .rs-modal-content {
        background-color: #1f2937 !important;
      }

      .rs-input {
        background-color: #374151 !important;
        color: #fff !important;
        border-color: #4b5563 !important;
      }

      .rs-btn {
        background-color: #374151 !important;
        color: #fff !important;
      }

      .rs-dropdown-menu {
        background-color: #1f2937 !important;
      }
      
      .rs-dropdown-item {
        color: #fff !important;
      }

      .rs-input::placeholder {
        color: #9ca3af !important;
      }

      /* Specific target for calendar icon */
      input[type="date"]::-webkit-calendar-picker-indicator {
        filter: invert(1);
      }

      /* Specific target for time picker icon */
      input[type="time"]::-webkit-calendar-picker-indicator {
        filter: invert(1);
      }
    `}
                </style>
            )}
            <style>
                {
                    `
           .rs-btn {
        border-width: 1px;
          border: 1px solid var(--primary-color1) !important ;  
        display: flex !important;
        
  justify-content: start !important;
  align-items: center !important;        
      }
        `
                }
            </style>
        </Modal>
    );
};

export default ExamSettingsModal;