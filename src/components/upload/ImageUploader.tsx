import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
type FileUploaderProps = {
  file: File | string | null;
  onChange: (file: File | string | null) => void;
};

const ImageUploader = ({ file, onChange }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles[0] || null);
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".svg"],
    },
    maxFiles: 1,
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
  };

  return (
    <div
      {...getRootProps()}
      className="file-upload w-fit h-fit mx-auto border-dashed border-1 cursor-pointer p-2 border-gray-400"
    >
      <input {...getInputProps()} />
      {file ? (
        <div className="relative h-44 w-44 p-4">
          <div className="absolute opacity-0 hover:opacity-40 bg-black z-50 flex items-center justify-center top-0 left-0 w-full h-full">
            <p className="text-white font-semibold">Click to change</p>
          </div>
          <Image
            src={
              typeof file === "string"
                ? file.startsWith("http")
                  ? file
                  : `${process.env.NEXT_PUBLIC_ASSIGNMENT_STORAGE_URL}/${file}`
                : URL.createObjectURL(file)
            }
            alt="Uploaded image"
            layout="fill"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 p-4">
          <Image
            src={"/icons/upload.svg"}
            height={40}
            width={40}
            alt="upload"
          />
          <div className="text-center">
            <p className="text-14-regular">
              <span className="text-primary-color1">Click to upload</span> or
              drag and drop
            </p>
            <p className="text-xs text-gray-500">SVG, PNG, JPG, or GIF</p>
          </div>
        </div>
      )}
    </div>
  );
};
export default ImageUploader;
