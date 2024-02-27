import { InputPicker, DatePicker, Input } from "rsuite";

const CustomInput = ({
  type,
  name,
  label,
  placeholder,
  optional,
  required,
  value,
  onChange,
  formikErrors,
  formikTouched,
  selectData,
}: any) => {
  const renderField = () => {
    switch (type) {
      case "text":
        return (
          <>
            <Input
              id={name}
              name={name}
              placeholder={placeholder}
              defaultValue={value}
              onChange={onChange}
            />
            {formikErrors && formikTouched && (
              <div className="text-red-600 ml-[3px] mt-[3px]">
                {formikErrors}
              </div>
            )}
          </>
        );
      case "textarea":
        return (
          <>
            <Input
              as="textarea"
              rows={3}
              id={name}
              name={name}
              defaultValue={value}
              placeholder={placeholder}
              onChange={onChange}
            />
            {formikErrors && formikTouched && (
              <div className="text-red-600 ml-[3px] mt-[3px]">
                {formikErrors}
              </div>
            )}
          </>
        );
      case "date":
        return (
          <>
            <DatePicker
              format="yyyy-MM-dd HH:mm"
              style={{ width: "100%", border: "none", color: "#000" }}
              id={name}
              name={name}
              placeholder={placeholder}
              defaultValue={new Date(value)}
              onChange={onChange}
            />
            {formikErrors && formikTouched && (
              <div className="text-red-600 ml-[3px] mt-[3px]">
                {formikErrors}
              </div>
            )}
          </>
        );
      case "select":
        return (
          <>
            <InputPicker
              data={selectData}
              style={{ width: "100%" }}
              id={name}
              name={name}
              defaultValue={value}
              placeholder={placeholder}
              onChange={onChange}
            />
            {formikErrors && formikTouched && (
              <div className="text-red-600 ml-[3px] mt-[3px]">
                {formikErrors}
              </div>
            )}
          </>
        );
    }
    return;
  };

  return (
    <div className="mb-[9px]">
      <label htmlFor={name} className="text-[#888] text-[14px] ml-[3px]">
        {`${label} ${optional ? `(Optional)` : ``}`}
        {required && <span style={{ color: "#dc2626" }}>*</span>}
      </label>
      {renderField()}
    </div>
  );
};

export default CustomInput;
