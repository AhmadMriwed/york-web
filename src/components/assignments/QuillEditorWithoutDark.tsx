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

const QuillEditorWithoutDark: React.FC<QuillEditorProps> = ({
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
    </div>
  );
};

export default QuillEditorWithoutDark;
