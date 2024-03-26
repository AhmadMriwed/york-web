import React from "react";
import { Loader } from "rsuite";

export default function Loading({
   content,
   size,
}: {
   content?: string;
   size?: any;
}) {
   return (
      <div className="h-[50%] element-center min-h-[250px] w-full">
         <Loader
            size={size ? size : "lg"}
            color="#01989f"
            content={content ? content : "Loading..."}
            vertical
            className="[&>div>.rs-loader-spin:before]:!border-[#01989f]"
         />
      </div>
   );
}
