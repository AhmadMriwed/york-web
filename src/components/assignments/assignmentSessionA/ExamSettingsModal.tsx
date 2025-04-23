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

    const iconStyle = "w-4 h-4 mr-3  text-primary-color1";
    const formLabelStyle = "text- sm:text-lg font-medium text-gray-800 dark:text-gray-300";
    const inputStyle = "text-sm sm:text-[16px] p-3 rounded-xl border-2 border-gray-200  hover:border-blue-400 focus:border-blue-500";
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
                    <GearIcon className="w-5 h-5 animate-spin-slow" />
                    <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                        Exam Configuration Center
                    </h2>
                </div>
            </Modal.Header>

            <Modal.Body className="sm:p-4 !overflow-y-auto">
                <Form fluid formValue={formValue} onChange={() => { setFormValue }}>
                    <div className="grid grid-cols-2  md:grid-cols-2 gap-3">
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
                                size="md"
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
                                size="md"
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
                                size="md"
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
                                size="md"
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
                                size="md"
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
                                size="md"
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
                                size="md"
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
                                size="md"
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
                    <div className="flex items-center justify-end gap-4 sm:gap-5 pt-5 sm:pt-4">

                        <button
                            onClick={() => setExamSettingsModalOpen(false)}
                            className="px-5 sm:px-7 text-[16px] sm:text-lg  py-2 text-primary-color1 dark:text-gray-300    border border-primary-color1 rounded-[8px]  transition-all transform hover:scale-[1.01] shadow-lg"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className=" px-8 sm:px-10 text-[16px] sm:text-lg  py-2  rounded-[8px] text-white bg-primary-color1  transition-all transform hover:scale-[1.01] shadow-lg"
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
        font-size: 13px;
      }

      .rs-dropdown-menu {
        background-color: #1f2937 !important;
      }
      
      .rs-dropdown-item {
        color: #fff !important;
        font-size : 14px;
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

                    .rs-input{
                         font-size: 13px;
                    }
           .rs-btn {
        border-width: 1px;
          border: 1px solid var(--primary-color1) !important ;  
        display: flex !important;
      
        font-size: 13px;
      
        
  justify-content: start !important;
  align-items: center !important;        
      }
    .rs-dropdown-item {
        font-size : 14px;
      }
     
        `
                }
            </style>
            {mode === 'light' && <style>
                
                {`
                .rs-btn {
                  background-color: #fff !important;}
                `}
                    </style>}
        </Modal>
    );
};

export default ExamSettingsModal;