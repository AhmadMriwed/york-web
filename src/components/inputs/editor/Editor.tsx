import React, { useState, useEffect, useContext } from "react";
import { useField } from "formik";
import { EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertHTMLtoDraftState } from "@/utils/draftFuncs";
import { ThemeContext } from "@/components/Pars/ThemeContext";

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

  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  return (
    <div className="mb-[10px]">
      <label htmlFor={name} className="text-[#888] text-[14px] ml-[4px] mb-2 dark:text-gray-300">
        {label} {optional ? "(optional)" : ""}
        {required && <span style={{ color: "#dc2626" }}>*</span>}
      </label>

      <Editor
        editorState={editorState}
        toolbarClassName="text-black dark:bg-gray-700 dark:text-gray-200"
        editorClassName={`px-1 bg-slate-100 dark:bg-gray-700 dark:text-gray-200 text-black ${meta.error && meta.touched ? "border-[1px] border-red-600" : ""
          }`}
        // wrapperClassName="editor-wrapper"
        onEditorStateChange={handleEditorStateChange}
        onContentStateChange={handleContentStateChange}
        spellCheck
        wrapperClassName="dark:bg-gray-700"
      />

      {/* Add dark mode styles for toolbar elements */}
      {mode === "dark" && <style jsx global>{`
     
      
        .rdw-dropdown-wrapper,
        .rdw-dropdown-optionwrapper,
        .rdw-colorpicker-modal,
        .rdw-link-modal,
        .rdw-embedded-modal,
        .rdw-emoji-modal,
        .rdw-image-modal {
          background-color: #374151 !important;
          color: #fff !important;
          border-color: #4b5563 !important;
        }
                   .rdw-option-wrapper:hover,
        .rdw-dropdown-option:hover {
          background-color: var(--pimary-color1) !important;
        }
            .rdw-dropdown-selectedtext,
        .rdw-colorpicker-option {
          color: white !important;
          background-color: var(--primary-color1) !important;
        }
 .rdw-dropdown-option:hover {
    background-color: var(--primary-color1) !important;
    color: white !important;
    transition: all 0.2s ease;
  }

  /* For the toolbar buttons hover */
  .rdw-option-wrapper:hover {
    background-color: var(--primary-color1) !important;
    color: white !important;
    transition: all 0.2s ease;
  }

  /* For active/selected items */
  .rdw-option-active {
    background-color: var(--primary-color1) !important;
  }
       

        
      `}</style>}
      {meta.error && meta.touched && (
        <div className="text-red-600 ml-[4px] mt-[4px]">{meta.error}</div>
      )}
    </div>
  );
};

export default TextEditor;
