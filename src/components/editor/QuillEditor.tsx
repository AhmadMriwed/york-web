"use client";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import React from "react";

const toolbarOptions = [
  [{ header: "1" }, { header: "2" }, { font: [] }],
  [{ size: [] }],
  ["bold", "italic", "underline", "strike", "blockquote"],
  [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
  ["link", "image", "video"],
  ["clean"],
];

interface MyEditorProps {
  value: string;
  onChange: (value: string) => void;
}

function MyEditor({ value, onChange }: MyEditorProps) {
  const handleChange = (content: string) => {
    onChange(content);
  };

  return (
    <div className="quill-editor">
      <ReactQuill
        className="border-none bg-white"
        value={value}
        onChange={handleChange}
        modules={{ toolbar: toolbarOptions }}
      />
    </div>
  );
}

export default MyEditor;
