"use client";
import React, { useContext } from "react";
import dynamic from "next/dynamic";
import { ThemeContext } from "@/components/Pars/ThemeContext";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

const QuillEditor: React.FC<QuillEditorProps> = ({
  value,
  onChange,
  label,
  placeholder = "Write something...",
}) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <ReactQuill
        theme="snow"
        value={value || ""}
        onChange={onChange}
        modules={modules}
        placeholder={placeholder}
        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg"
      />
      {mode === "dark" && (
        <style>
          {`
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
      background-color: #2A3446;
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
    `}
        </style>
      )}
    </div>
  );
};

export default QuillEditor;
