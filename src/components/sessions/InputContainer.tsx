import React from "react";

const InputContainer = ({ children, name, label, optional, required }: any) => {
  return (
    <div className="mb-2">
      <div className="mb-1">
        <label htmlFor={name} className="text-[#888] text-[14px] ml-[3px]">
          {`${label} ${optional ? `(Optional)` : ``}`}
          {required && <span style={{ color: "#dc2626" }}>*</span>}
        </label>
      </div>
      {children}
    </div>
  );
};

export default InputContainer;
