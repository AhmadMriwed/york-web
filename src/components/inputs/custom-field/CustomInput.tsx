import { useField } from "formik";
import { useEffect } from "react";
import { DatePicker, Input, InputNumber, Loader, SelectPicker } from "rsuite";

type PropsType = {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  optional?: boolean;
  required?: boolean;
  disabled?: boolean;
  selectData?: any;
  selectLoading?: boolean;
  selectSearchable?: boolean;
  selectOnSearch?: (value: string) => void;
  textAreaRows?: number;
  value?: any;
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
}: PropsType) => {
  const [field, meta, helpers] = useField(name);

  useEffect(() => {
    if (value) {
      if (type === "date") {
        helpers.setValue(new Date(value));
      } else {
        helpers.setValue(value);
      }
    }
  }, [helpers, type, value]);

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
          value={field.value}
          onChange={(value) => field.onChange({ target: { name, value } })}
        />
      )}
      {type === "textarea" && (
        <Input
          as="textarea"
          rows={textAreaRows ? textAreaRows : 1}
          className={`!w-full ${
            meta.error && meta.touched
              ? "!border-[1px] !border-red-600 rounded-lg"
              : ""
          }`}
          id={name}
          placeholder={placeholder}
          {...field}
          name={name}
          value={field.value}
          onChange={(value) => field.onChange({ target: { name, value } })}
        />
      )}
      {type === "date" && (
        <DatePicker
          oneTap
          format="yyyy-MM-dd HH:mm"
          placement="auto"
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
                    color: "#999",
                    textAlign: "center",
                  }}
                >
                  <Loader />
                </p>
              );
            }
            return menu;
          }}
          className={`!w-full !text-black ${
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
