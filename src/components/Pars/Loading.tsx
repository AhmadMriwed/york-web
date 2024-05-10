import React from "react";
import { Loader } from "rsuite";

export default function Loading({
  content,
  size,
  backdrop,
}: {
  content?: string;
  size?: any;
  backdrop?: boolean;
}) {
  return (
    <div
      className={`w-full ${
        backdrop
          ? "fixed top-0 left-0 h-[100vh] z-[9999]"
          : "h-[50%] min-h-[250px]"
      } element-center text-[14px] font-[500]`}
    >
      <Loader
        size={size ? size : "lg"}
        content={content ? content : "Loading..."}
        backdrop={backdrop}
        color="#01989f"
        vertical
        className="[&>div>.rs-loader-spin:before]:!border-[#01989f]
        [&>div.rs-loader-backdrop]:!bg-transparent [&>div.rs-loader-backdrop]:!backdrop-blur"
      />
    </div>
  );
}
