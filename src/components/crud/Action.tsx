"use client";
import TrashIcon from "@rsuite/icons/Trash";
import EditIcon from "@rsuite/icons/Edit";
import VisibleIcon from "@rsuite/icons/Visible";

function Action({
   id,
   handleEdit,
   handleVisible,
   handleDelete,
}: {
   id: number | string;
   handleEdit: any;
   handleVisible: any;
   handleDelete: any;
}) {
   const handleAction = (type: "visible" | "edit" | "delete") => {
      console.log("clicked", id);
      if (type === "visible") {
         console.log("visible");
         handleVisible();
      } else if (type === "edit") {
         console.log("edit");
         handleEdit();
      } else if (type === "delete") {
         console.log("delete");
         handleDelete();
      }
   };

   return (
      <div className="flex gap-[10px] items-center">
         <div
            className="bg-[#5675c0] w-[30px] h-[30px] rounded-[3px] element-center cursor-pointer"
            onClick={() => handleAction("visible")}
         >
            <VisibleIcon className="text-white text-[18px]" />
         </div>
         <div
            className="bg-[#00c247] w-[30px] h-[30px] rounded-[3px] element-center cursor-pointer"
            onClick={() => handleAction("edit")}
         >
            <EditIcon className="text-white text-[18px]" />
         </div>

         <div
            className="bg-[#f2a200] w-[30px] h-[30px] rounded-[3px] element-center cursor-pointer"
            onClick={() => handleAction("delete")}
         >
            <TrashIcon className="text-white text-[18px]" />
         </div>
      </div>
   );
}

export default Action;
