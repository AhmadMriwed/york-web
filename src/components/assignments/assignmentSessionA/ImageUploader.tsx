import { Close } from "@rsuite/icons";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { LuImagePlus } from "react-icons/lu";

const ImageUploader = ({ formikProps }: any) => {
  const imageInput = useRef<HTMLInputElement>(null);

  const [uploadedImage, setUploadedImage] = useState<any>(null);
  const [imageName, setImageName] = useState("");

  const handleImageRemove = (props: any) => {
    setUploadedImage(null);
    props.values.image = null;
    if (imageInput.current) {
      imageInput.current.value = "";
    }
  };

  return (
    <div
      className="w-full dark:bg-gray-700 mt-3 px-3 min-h-32  rounded-[8px] dark:text-gray-300 border-[1px] border-dashed border-black dark:border-zinc-300 bg-transparent
      cursor-pointer flex justify-center items-center"
      onClick={() => imageInput.current && imageInput.current.click()}
    >
      <input
        type="file"
        name="image"
        onChange={(event: any) => {
          if (
            imageInput.current &&
            imageInput.current.files &&
            imageInput.current.files.length > 0
          ) {
            const file = imageInput.current.files[0];
            formikProps.setFieldValue("image", file);

            if (
              event.target.files &&
              event.target.files[0] &&
              event.target.files[0].type.startsWith("image/")
            ) {
              setUploadedImage(URL.createObjectURL(event.target.files[0]));
              setImageName(file.name);
            }
          }
        }}
        ref={imageInput}
        style={{ display: "none" }}
      />
      <div className="w-full">
        {!uploadedImage && (
          <div className="flex justify-center items-center">
            <p className="text-[15px] text-black dark:text-gray-300 font-[500]  flex items-center gap-2">
              <LuImagePlus /> Select image to upload (optional)
            </p>
          </div>
        )}
        {uploadedImage && (
          <div className="flex justify-between items-center gap-2 w-full bg-slate-100 dark:bg-gray-700 p-2 rounded-md">
            <div className="flex flex-col gap-1 items-center justify-center">
              <Image
                src={uploadedImage}
                alt="uploaded image"
                width={170}
                height={170}
                className="rounded-md"
              />
              <p className="text-[15px] ">{imageName}</p>
            </div>
            <button
              type="button"
              className="p-3 rounded-full text-xl hover:bg-slate-100 dark:hover:bg-gray-900 dark:text-white transition:bg duration-200 flex justify-center items-center text-black"
              onClick={() => handleImageRemove(formikProps)}
            >
              <Close />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
