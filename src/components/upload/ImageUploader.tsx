"use client";

import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

type FileUploaderProps = {
  onUploadSuccess: (fileId: number) => void;
  multiple?: boolean;
  maxFiles?: number;
};

const ImageUploader = ({
  onUploadSuccess,
  multiple = false,
  maxFiles = 1,
}: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);

      // Create preview URLs for the files
      const newPreviews = acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews(newPreviews);

      // Call the success callback with the first file (or implement your actual upload logic)
      if (acceptedFiles.length > 0) {
        onUploadSuccess(1); // Replace with your actual file ID logic
      }
    },
    [onUploadSuccess]
  );

  // Clean up preview URLs when component unmounts
  React.useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    onDrop,
    multiple,
    maxFiles,
  });

  const removeImage = (index: number) => {
    const newFiles = [...files];
    const newPreviews = [...previews];

    URL.revokeObjectURL(newPreviews[index]);
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);

    setFiles(newFiles);
    setPreviews(newPreviews);

    if (newFiles.length === 0) {
      onUploadSuccess(0); // Reset or handle empty state
    }
  };

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-gray-300 max-w-60 md:max-w-44 mx-auto   md:w-full rounded-lg p-4 text-center cursor-pointer hover:border-primary-color transition-colors"
    >
      <input {...getInputProps()} />
      {files.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {previews.map((preview, index) => (
            <div
              key={index}
              className="relative group h-36 w-44 md:w-36 pb-4 mx-auto  "
            >
              <div className="aspect-square h-full w-full mx-auto    overflow-hidden rounded-md bg-gray-100">
                <Image
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  width={300}
                  height={300}
                  className="w-full mx-auto h-full object-cover"
                />
              </div>
              <div className="mt-1 text-sm text-gray-600 truncate pb-3">
                {files[index].name}
              </div>

              <div className="absolute inset-0 w-52 md:w-44 h-44 -top-4  -left-4 dark:text-white bg-black bg-opacity-0 group-hover:bg-opacity-35 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="text-white text-sm font-medium">
                  Click to change
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <div className="p-3 bg-gray-100 rounded-full">
            <Image
              src="/icons/upload-image-icon.svg"
              width={24}
              height={24}
              alt="Upload image"
            />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700 dark:text-white">
              {isDragActive ? (
                "Drop images here..."
              ) : (
                <>
                  <span className="text-primary-color1">Click to upload</span>{" "}
                  or drag and drop
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
