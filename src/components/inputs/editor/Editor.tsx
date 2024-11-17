import React, { useState, useEffect } from "react";
import { useField } from "formik";
import { EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertHTMLtoDraftState } from "@/utils/draftFuncs";

const TextEditor = ({
  name,
  label,
  required,
  optional,
  value,
}: {
  name: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  value?: any;
}) => {
  const [field, meta, helpers] = useField(name);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleContentStateChange = (contentState: any) => {
    let htmlContent = draftToHtml(contentState);
    helpers.setValue(htmlContent);
  };

  const handleEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
  };

  useEffect(() => {
    if (field.value) {
      setEditorState(convertHTMLtoDraftState(field.value));
    }
  }, []);

  useEffect(() => {
    if (value) {
      helpers.setValue(value);
      setEditorState(convertHTMLtoDraftState(value));
    }
  }, [helpers, value]);

  return (
    <div className="mb-[10px]">
      <label htmlFor={name} className="text-[#888] text-[14px] ml-[4px]">
        {label} {optional ? "(optional)" : ""}
        {required && <span style={{ color: "#dc2626" }}>*</span>}
      </label>

      <Editor
        editorState={editorState}
        toolbarClassName="text-black"
        editorClassName={`px-1 bg-slate-100 text-black ${
          meta.error && meta.touched ? "border-[1px] border-red-600" : ""
        }`}
        // wrapperClassName="editor-wrapper"
        onEditorStateChange={handleEditorStateChange}
        onContentStateChange={handleContentStateChange}
        spellCheck
      />

      {meta.error && meta.touched && (
        <div className="text-red-600 ml-[4px] mt-[4px]">{meta.error}</div>
      )}
    </div>
  );
};

export default TextEditor;
