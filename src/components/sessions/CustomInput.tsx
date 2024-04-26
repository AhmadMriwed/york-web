import { useContext } from "react";
import { InputPicker, DatePicker, Input, InputNumber } from "rsuite";
import { ThemeContext } from "../Pars/ThemeContext";

const CustomInput = ({
  type,
  name,
  label,
  placeholder,
  optional,
  required,
  disabled,
  value,
  onChange,
  formikErrors,
  formikTouched,
  selectData,
  textAreaRows,
}: {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  optional?: boolean;
  required?: boolean;
  disabled?: boolean;
  value?: any;
  onChange: any;
  formikErrors: any;
  formikTouched: any;
  selectData?: any;
  textAreaRows?: number;
}) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  return (
    <div className="mb-[10px]">
      <label htmlFor={name} className="text-[#888] text-[14px] ml-[4px]">
        {`${label} ${optional ? `(optional)` : ``}`}
        {required && <span style={{ color: "#dc2626" }}>*</span>}
      </label>
      {type === "text" && (
        <Input
          id={name}
          name={name}
          placeholder={placeholder}
          defaultValue={value}
          onChange={onChange}
          disabled={disabled ? true : false}
        />
      )}
      {type === "textarea" && (
        <Input
          as="textarea"
          rows={textAreaRows}
          id={name}
          name={name}
          defaultValue={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
      {type === "date" && (
        <DatePicker
          format="yyyy-MM-dd HH:mm"
          className="!w-full !border-none"
          id={name}
          name={name}
          placeholder={placeholder}
          defaultValue={new Date(value)}
          onChange={onChange}
        />
      )}
      {type === "select" && (
        <InputPicker
          data={selectData}
          className="hover:!cursor-pointer !w-full"
          id={name}
          name={name}
          defaultValue={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
      {type === "number" && (
        <InputNumber
          id={name}
          name={name}
          defaultValue={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
      {formikErrors && formikTouched && (
        <div className="text-red-600 ml-[4px] mt-[4px]">{formikErrors}</div>
      )}
    </div>
  );
};

export default CustomInput;
