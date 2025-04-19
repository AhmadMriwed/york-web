// import { useField } from "formik";
// import { useEffect } from "react";
// import { DatePicker, Input, InputNumber, Loader, SelectPicker } from "rsuite";

// type PropsType = {
//   type: string;
//   name: string;
//   label: string;
//   placeholder?: string;
//   optional?: boolean;
//   required?: boolean;
//   disabled?: boolean;
//   selectData?: any;
//   selectLoading?: boolean;
//   selectSearchable?: boolean;
//   selectOnSearch?: (value: string) => void;
//   textAreaRows?: number;
//   value?: any;
//   theme?: "light" | "dark"; // Add theme prop
// };

// const CustomInput = ({
//   type,
//   name,
//   label,
//   placeholder,
//   optional,
//   required,
//   disabled,
//   selectData,
//   selectLoading,
//   selectSearchable,
//   selectOnSearch,
//   textAreaRows,
//   value,
//   theme = "light", // Default to light theme
// }: PropsType) => {
//   const [field, meta, helpers] = useField(name);

//   useEffect(() => {
//     if (value) {
//       if (type === "date") {
//         helpers.setValue(new Date(value));
//       } else {
//         helpers.setValue(value);
//       }
//     }
//   }, [helpers, type, value]);

//   // Theme-based styles
//   const themeStyles = {
//     light: {
//       label: "text-[#888]",
//       input: "bg-white text-gray-900",
//       error: "text-red-600",
//       border: "border-gray-300",
//     },
//     dark: {
//       label: "text-gray-400",
//       input: "bg-gray-800 text-gray-100 border-gray-600",
//       error: "text-red-400",
//       border: "border-gray-600",
//     },
//   };

//   const currentTheme = themeStyles[theme];

//   return (
//     <div className="mb-[10px]">
//       <label
//         htmlFor={name}
//         className={`text-[14px] ml-[4px] ${currentTheme.label}`}
//       >
//         {label} {optional ? "(optional)" : ""}
//         {required && <span className="text-red-500">*</span>}
//       </label>

//       {type === "text" && (
//         <Input
//           className={`!w-full ${currentTheme.input} ${
//             meta.error && meta.touched
//               ? "!border-[1px] !border-red-600 rounded-lg"
//               : `!border-[1px] rounded-lg ${currentTheme.border}`
//           }`}
//           id={name}
//           placeholder={placeholder}
//           disabled={disabled}
//           {...field}
//           name={name}
//           value={field.value}
//           onChange={(value) => field.onChange({ target: { name, value } })}
//         />
//       )}

//       {type === "textarea" && (
//         <Input
//           as="textarea"
//           rows={textAreaRows || 1}
//           className={`!w-full ${currentTheme.input} ${
//             meta.error && meta.touched
//               ? "!border-[1px] !border-red-600 rounded-lg"
//               : `!border-[1px] rounded-lg ${currentTheme.border}`
//           }`}
//           id={name}
//           placeholder={placeholder}
//           {...field}
//           name={name}
//           value={field.value}
//           onChange={(value) => field.onChange({ target: { name, value } })}
//         />
//       )}

//       {type === "date" && (
//         <DatePicker
//           oneTap
//           format="yyyy-MM-dd HH:mm"
//           placement="auto"
//           className={`!w-full ${currentTheme.input} ${
//             meta.error && meta.touched
//               ? "!border-[1px] !border-red-600 rounded-lg"
//               : `!border-[1px] rounded-lg ${currentTheme.border}`
//           }`}
//           id={name}
//           name={name}
//           placeholder={placeholder}
//           value={field.value ? new Date(field.value) : null}
//           onChange={(value) => field.onChange({ target: { name, value } })}
//         />
//       )}

//       {type === "select" && (
//         <SelectPicker
//           placement="auto"
//           data={selectData}
//           searchable={selectSearchable}
//           onSearch={selectOnSearch}
//           renderMenu={(menu) => {
//             if (selectLoading) {
//               return (
//                 <p
//                   style={{
//                     padding: 10,
//                     color: theme === "dark" ? "#ccc" : "#999",
//                     textAlign: "center",
//                     background: theme === "dark" ? "#374151" : "white",
//                   }}
//                 >
//                   <Loader />
//                 </p>
//               );
//             }
//             return menu;
//           }}
//           menuClassName={theme === "dark" ? " !bg-gray-800 !text-gray-100" : ""}
//           className={`!w-full !bg-gray-700 ${
//             meta.error && meta.touched
//               ? "!border-[1px] !border-red-600 rounded-lg"
//               : `!border-[1px] rounded-lg ${currentTheme.border}`
//           } ${currentTheme.input}`}
//           id={name}
//           name={name}
//           placeholder={placeholder}
//           value={field.value}
//           onChange={(value) => field.onChange({ target: { name, value } })}
//         />
//       )}

//       {type === "number" && (
//         <InputNumber
//           className={`!w-full ${currentTheme.input} ${
//             meta.error && meta.touched
//               ? "!border-[1px] !border-red-600 rounded-lg"
//               : `!border-[1px] rounded-lg ${currentTheme.border}`
//           }`}
//           id={name}
//           name={name}
//           placeholder={placeholder}
//           value={field.value}
//           onChange={(value) => field.onChange({ target: { name, value } })}
//         />
//       )}

//       {meta.error && meta.touched && (
//         <div className={`ml-[4px] mt-[4px] ${currentTheme.error}`}>
//           {meta.error}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomInput;


import { useField } from "formik";
import { useEffect } from "react";
import {
  DatePicker as AntDatePicker,
  Input as AntInput,
  InputNumber as AntInputNumber,
  Select as AntSelect,
  Select,
  Spin,
} from "antd";
import "./assignmentSessionAdd/style.css";
import dayjs from "dayjs";
import { DatePicker, Loader, SelectPicker } from "rsuite";

type PropsType = {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  optional?: boolean;
  required?: boolean;
  disabled?: boolean;
  selectData?: any;
  selectLoading?: boolean;
  selectSearchable?: boolean;
  selectOnSearch?: (value: string) => void;
  textAreaRows?: number;
  value?: any;
  theme?: "light" | "dark"; // Add theme prop
};

const CustomInput = ({
  type,
  name,
  label,
  placeholder,
  optional,
  required,
  disabled,
  selectData,
  selectLoading,
  selectSearchable,
  selectOnSearch,
  textAreaRows,
  value,
  theme = "light", // Default to light theme
}: PropsType) => {
  const [field, meta, helpers] = useField(name);

  useEffect(() => {
    if (value) {
      if (type === "date") {
        helpers.setValue(dayjs(value)); // Convert to dayjs object
      } else {
        helpers.setValue(value);
      }
    }
  }, [helpers, type, value]);

  // Theme-based styles
  const themeStyles = {
    light: {
      label: "text-[#888]",
      input: "bg-white text-gray-900",
      error: "text-red-600",
      border: "border-gray-300",
    },
    dark: {
      label: "text-gray-400",
      input: "bg-gray-800 text-gray-100 border-gray-600",
      error: "text-red-400",
      border: "border-gray-600",
    },
  };

  const currentTheme = themeStyles[theme];

  return (
    <div className="mb-[10px]">
      {/* Label */}
      <label
        htmlFor={name}
        className={`text-[15px] ml-[4px]   dark:!text-gray-100 ${currentTheme.label}`}
      >
        {label} {optional ? "(optional)" : ""}
        {required && <span className="text-red-500">*</span>}
      </label>

      {/* Text Input */}
      {type === "text" && (
        <AntInput
          className={`!w-full dark:!bg-gray-700 py-[10px] dark:!text-gray-300 text-lg ${currentTheme.input} ${meta.error && meta.touched
            ? "!border-[1px] !border-red-600 rounded-lg"
            : `!border-[1px] rounded-lg ${currentTheme.border}`
            }`}
          id={name}
          placeholder={placeholder}
          disabled={disabled}
          {...field}
          name={name}
          value={field.value || ""}
          onChange={(e) => field.onChange({ target: { name, value: e.target.value } })}
        />
      )}

      {/* Textarea Input */}
      {type === "textarea" && (
        <AntInput.TextArea
          rows={5} // Increased rows
          className={`!w-full dark:!bg-gray-700 py-[10px] dark:!text-gray-300text-lg ${currentTheme.input} ${meta.error && meta.touched
            ? "!border-[1px] !border-red-600 rounded-lg"
            : `!border-[1px] rounded-lg ${currentTheme.border}`
            }`}
          id={name}
          placeholder={placeholder}
          {...field}
          name={name}
          value={field.value || ""}
          onChange={(e) => field.onChange({ target: { name, value: e.target.value } })}
        />
      )}

      {/* Date Picker */}
      {/* {type === "date" && (
        <AntDatePicker
          showTime
          format="YYYY-MM-DD HH:mm"
          placement="bottomLeft"
          className={`!w-full dark:!bg-gray-700 py-[12px] dark:!text-gray-300  !text-lg ${currentTheme.input} ${meta.error && meta.touched
            ? "!border-[1px] !border-red-600 rounded-lg"
            : `!border-[1px] rounded-lg ${currentTheme.border}`
            }`}
          id={name}
          placeholder={placeholder}
          value={field.value ? dayjs(field.value) : null} // Convert to dayjs
          onChange={(date) => {
            field.onChange({
              target: { name, value: date?.toDate() || null }, // Convert back to Date
            });
          }}
        />
      )} */}




{type === "date" && (
  <DatePicker
    oneTap
    format="yyyy-MM-dd HH:mm"
    placement="auto"
    size="lg"
    className={`!w-full dark:!bg-gray-700 !bg-white  !text-xl  ${
      meta.error && meta.touched
        ? "!border-[1px] !border-red-600 rounded-lg"
        : `!border-[1px] rounded-lg ${currentTheme.border}`
    }`}
    style={{ fontSize: '20px' }}

    id={name}
    name={name}
    placeholder={placeholder}
    value={field.value ? new Date(field.value) : null}
    onChange={(value) => field.onChange({ target: { name, value } })}
    menuClassName={theme === 'dark' ? 'dark-date-picker' : ''}
  />
)}

{theme === "dark" && (
  <style>
    {`
      .dark-date-picker .rs-picker-date .rs-picker-toggle-text,
      .dark-date-picker .rs-calendar-table-cell-content,
      .dark-date-picker .rs-calendar-header-title {
        color: #ffffff !important;
        font-size: 1.125rem !important;
      }

      .dark-date-picker .rs-calendar-time-dropdown li {
        color: #ffffff !important;
        font-size: 1rem !important;
      }

      .dark-date-picker .rs-picker-date-menu,
      .dark-date-picker .rs-calendar {
        background-color: #374151 !important;
        border-color: #4b5563 !important;
      }

      .dark-date-picker .rs-calendar-table-cell:hover .rs-calendar-table-cell-content {
        background-color: #4b5563 !important;
      }


    `}
  </style>
)}

      {/* Select Input */}
      {type === "select" && (
        <SelectPicker
          placement="auto"
          data={selectData}
          searchable={selectSearchable}
          onSearch={selectOnSearch}
          renderMenu={(menu) => {
            if (selectLoading) {
              return (
                <p
                  style={{
                    padding: 10,
                    color: theme === "dark" ? "#ccc" : "#999",
                    textAlign: "center",
                    background: theme === "dark" ? "#374151" : "white",
                  }}
                >
                  <Loader />
                </p>
              );
            }
            return menu;
          }}
         size="lg"
          className={`!w-full  dark:!bg-gray-700  ${meta.error && meta.touched
              ? "!border-[1px] !border-red-600 rounded-lg"
              : `!border-[1px] rounded-lg ${currentTheme.border}`
            } ${currentTheme.input}`}
          id={name}
          name={name}
          placeholder={placeholder}
          value={field.value}
          onChange={(value) => field.onChange({ target: { name, value } })}
        />
      )}
      {/* Number Input */}
      {type === "number" && (
        <AntInputNumber
          className={`!w-full dark:!bg-gray-700 py-[10px] dark:!text-gray-300 text-lg ${currentTheme.input} ${meta.error && meta.touched
            ? "!border-[1px] !border-red-600 rounded-lg"
            : `!border-[1px] rounded-lg ${currentTheme.border}`
            }`}
          id={name}
          placeholder={placeholder}
          value={field.value || null}
          onChange={(value) => field.onChange({ target: { name, value } })}
        />
      )}

      {/* Error Message */}
      {meta.error && meta.touched && (
        <div className={`ml-[4px] mt-[4px] ${currentTheme.error}`}>
          {meta.error}
        </div>
      )}
    </div>
  );
};

export default CustomInput;