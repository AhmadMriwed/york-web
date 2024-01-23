import React from "react";
import { Loader } from "rsuite";

export default function Loading() {
   return (
      <div className="h-[50%] element-center min-h-[250px] w-full">
         <Loader
            size="lg"
            color="#01989f"
            content="Loading..."
            vertical
            className="[&>div>.rs-loader-spin:before]:!border-[#01989f]"
         />
      </div>
   );
}
