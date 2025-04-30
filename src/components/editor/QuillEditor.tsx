"use client";
import dynamic from "next/dynamic";
import React from "react";
import "react-quill/dist/quill.snow.css"; // Add this import

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

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
        style={{ height: "100%" }}
        className="border-none bg-white h-44"
        value={value}
        onChange={handleChange}
        modules={{ toolbar: toolbarOptions }}
        theme="snow"
      />
    </div>
  );
}

export default MyEditor;
