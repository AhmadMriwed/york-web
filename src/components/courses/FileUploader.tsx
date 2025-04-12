"use client";

import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { uploadTrainingPlain } from "@/store/adminstore/slices/courses/training-plan/trainingPlanSlice";

type FileUploaderProps = {
  onUploadSuccess: (fileId: number) => void;
};
// hello world
const FileUploader = ({ onUploadSuccess }: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const dispatch = useDispatch<any>();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles?.length) {
        setFiles(acceptedFiles);
        const formData = new FormData();
        formData.append("file", acceptedFiles[0]);

        dispatch(uploadTrainingPlain(formData))
          .unwrap()
          .then((res: any) => {
            if (res.data && res.data.id) {
              onUploadSuccess(res.data.id);
            }
          })
          .catch((error: any) => {
            console.error("Upload failed:", error);
          });
      }
    },
    [dispatch, onUploadSuccess]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxFiles: 1,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-400 rounded-lg p-4 text-center cursor-pointer bg-gray-300"
    >
      <input {...getInputProps()} />
      {files && files.length > 0 ? (
        <div className="flex flex-col items-center justify-center gap-2">
          <Image
            src="/icons/file.svg"
            height={124}
            width={124}
            alt="uploaded file"
          />
          <p className="text-sm text-primary-color1 ">{files[0].name}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2">
          <Image src="/icons/upload.svg" height={40} width={40} alt="upload" />
          <div className="text-sm">
            {isDragActive ? (
              <p>Drop the file here...</p>
            ) : (
              <p className="text-gray-600">
                <span className="text-primary-color1">Click to upload</span> or
                drag and drop
                <br />
                (PDF, DOC, DOCX)
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
