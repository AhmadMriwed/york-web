import { useState, useRef, ChangeEvent } from 'react';
import { FiUpload } from 'react-icons/fi';
import { CiEdit } from 'react-icons/ci';
import Image from 'next/image';

interface ImageUploadComponentProps {
  requestType?: string;
  initialValuesEdit?: {
    image?: string;
  };
  storageURL?: string;
  formikProps?: {
    setFieldValue: (field: string, value: File) => void;
    errors?: {
      image?: string;
    };
    touched?: {
      image?: boolean;
    };
    values?: {
      image?: File | string;
    };
  };
}

const ImageUploadComponent = ({
  requestType,
  initialValuesEdit,
  storageURL,
  formikProps
}: ImageUploadComponentProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      formikProps?.setFieldValue('image', file);
      
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImagePreview(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mb-4 w-full">
      <label className="block text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">
        {requestType === "edit" ? "Change Photo" : "Add Photo (Optional)"}
      </label>

      <div className="flex items-center gap-4 w-full">
        <div className="w-full">
          <label className="flex flex-col items-center justify-center w-full min-h-32 border-2 border-dashed border-gray-500 dark:border-gray-300 rounded-md cursor-pointer hover:border-blue-400 transition-colors duration-200 relative p-4">
            {/* Show preview or upload prompt */}
            {imagePreview || (requestType === "edit" && initialValuesEdit?.image) ? (
              <div className="flex items-center w-full gap-4">
                <div className="w-1/2 h-28 rounded-md overflow-hidden  ">
                  <Image
                    src={imagePreview || 
                      (initialValuesEdit?.image && !initialValuesEdit.image.startsWith('http')
                        ? `${storageURL || ''}${initialValuesEdit.image}`
                        : initialValuesEdit?.image || ''
                      )
                    }
                    alt="Preview"
                    width={200}
                    height={200}
                    className="object-contain  h-full"
                  />
                </div>
                <div className="w-1/2 flex justify-center">
                  <CiEdit
                    className="text-blue-500 text-5xl cursor-pointer p-2  rounded-full transition-colors"
                    onClick={(e: any) => {
                      e.preventDefault();
                      inputRef.current?.click();
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-300 py-8">
                <FiUpload className="text-2xl mb-2" />
                <span className="text-sm text-center">Click to upload</span>
              </div>
            )}

            <input
              name="image"
              type="file"
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
              ref={inputRef}
            />
          </label>
        </div>
      </div>

      {formikProps?.errors?.image && formikProps?.touched?.image && (
        <div className="pl-[5px] ml-[10px] mb-[10px] text-red-600">
          {formikProps.errors.image}
        </div>
      )}
    </div>
  );
};

export default ImageUploadComponent;