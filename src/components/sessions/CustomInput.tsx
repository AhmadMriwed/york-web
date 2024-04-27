import { useField } from "formik";
import { InputPicker, DatePicker, Input, InputNumber } from "rsuite";

const CustomInput = ({
  type,
  name,
  label,
  placeholder,
  optional,
  required,
  disabled,
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
  selectData?: any;
  textAreaRows?: number;
}) => {
  const [field, meta] = useField(name);

  return (
    <div className="mb-[10px]">
      <label htmlFor={name} className="text-[#888] text-[14px] ml-[4px]">
        {label} {optional ? "(optional)" : ""}
        {required && <span style={{ color: "#dc2626" }}>*</span>}
      </label>
      {type === "text" && (
        <Input
          className={`!w-full ${
            meta.error && meta.touched
              ? "!border-[1px] !border-red-600 rounded-lg"
              : ""
          }`}
          id={name}
          placeholder={placeholder}
          disabled={disabled ? true : false}
          {...field}
          name={name}
          onChange={(value) => field.onChange({ target: { name, value } })}
        />
      )}
      {type === "textarea" && (
        <Input
          as="textarea"
          rows={textAreaRows}
          className={`!w-full ${
            meta.error && meta.touched
              ? "!border-[1px] !border-red-600 rounded-lg"
              : ""
          }`}
          id={name}
          placeholder={placeholder}
          {...field}
          name={name}
          onChange={(value) => field.onChange({ target: { name, value } })}
        />
      )}
      {type === "date" && (
        <DatePicker
          format="yyyy-MM-dd HH:mm"
          className={`!w-full ${
            meta.error && meta.touched
              ? "!border-[1px] !border-red-600 rounded-lg"
              : ""
          }`}
          id={name}
          name={name}
          placeholder={placeholder}
          value={field.value ? new Date(field.value) : null}
          onChange={(value) => field.onChange({ target: { name, value } })}
        />
      )}
      {type === "select" && (
        <InputPicker
          data={selectData}
          className={`!w-full !text-black ${
            meta.error && meta.touched
              ? "!border-[1px] !border-red-600 rounded-lg"
              : ""
          }`}
          id={name}
          name={name}
          value={field.value}
          placeholder={placeholder}
          onChange={(value) => field.onChange({ target: { name, value } })}
        />
      )}
      {type === "number" && (
        <InputNumber
          className={`!w-full ${
            meta.error && meta.touched
              ? "!border-[1px] !border-red-600 rounded-lg"
              : ""
          }`}
          id={name}
          name={name}
          placeholder={placeholder}
          value={field.value}
          onChange={(value) => field.onChange({ target: { name, value } })}
        />
      )}
      {meta.error && meta.touched && (
        <div className="text-red-600 ml-[4px] mt-[4px]">{meta.error}</div>
      )}
    </div>
  );
};

export default CustomInput;
