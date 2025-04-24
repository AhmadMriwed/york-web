


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
import { DatePicker, Input, Loader, SelectPicker } from "rsuite";

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

      {type === "text" && (
        <Input
          className={`!w-full ${currentTheme.input} ${
            meta.error && meta.touched
              ? "!border-[1px] !border-red-600 rounded-lg"
              : `!border-[1px] rounded-lg ${currentTheme.border}`
          }`}
          id={name}
          placeholder={placeholder}
          disabled={disabled}
          {...field}
          name={name}
          value={field.value}
          onChange={(value) => field.onChange({ target: { name, value } })}
        />
      )}

      {/* Textarea Input */}
      {type === "textarea" && (
        <AntInput.TextArea
          rows={5} // Increased rows
          className={`!w-full dark:!bg-gray-800 py-[10px] dark:!text-gray-300text-lg ${currentTheme.input} ${meta.error && meta.touched
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

      

{type === "date" && (
  <DatePicker
    oneTap
    format="yyyy-MM-dd HH:mm"
    placement="auto"
    size="md"
    className={`!w-full dark:!bg-gray-800 !bg-white  !text-xl  ${
      meta.error && meta.touched
        ? "!border-[1px] !border-red-600 rounded-lg"
        : `!border-[1px] rounded-lg ${currentTheme.border}`
    }`}


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


        .rs-input {
          background-color: #1f2937 !important;
          color: #ffff;
          border-color: #4b5563 !important;
        }
       
.rs-picker.rs-picker-select .rs-picker-toggle {
  outline: none !important;
  border: none !important

}

      .dark-date-picker .rs-picker-date-menu,
      .dark-date-picker .rs-calendar {
        background-color: #374151 !important;
        border-color: #4b5563 !important;
        font-size : 14px !important;
      }

      .dark-date-picker .rs-calendar-table-cell:hover .rs-calendar-table-cell-content {
        background-color: #4b5563 !important;
        font-size : 14px !important;
      }
        .dark-date-picker .rs-calendar-table-cell .rs-calendar-table-cell-content {
          font-size : 14px !important;
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
                    background: theme === "dark" ? "#1f2937" : "white",
                  }}
                >
                  <Loader />
                </p>
              );
            }
            return menu;
          }}
         size="md"
          className={`!w-full  dark:!bg-gray-800  ${meta.error && meta.touched
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
          className={`!w-full dark:!bg-gray-800 py-[10px] dark:!text-gray-300 text-lg ${currentTheme.input} ${meta.error && meta.touched
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