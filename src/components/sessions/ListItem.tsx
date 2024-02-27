import React from "react";

const ListItem = ({ icon, text, gap }: any) => {
  return (
    <div
      className={`text-[12px] sm:text-[14px] flex items-center
      ${gap ? `gap-${gap}` : "gap-1"}`}
    >
      {icon}
      <p>{text}</p>
    </div>
  );
};

export default ListItem;
