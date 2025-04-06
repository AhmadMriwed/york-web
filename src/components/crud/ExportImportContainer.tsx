"use client";
import React, { useState } from "react";
import ExportFile from "./ExportFile";
import ImportFile from "./ImportFile";
import { TfiExport, TfiImport } from "react-icons/tfi";

interface ExportImportContainerProps {
  ids?: number[];
  withImport?: boolean;
}

export default function ExportImportContainer({
  ids,
  withImport = true,
}: ExportImportContainerProps) {
  const [openImport, setOpenImport] = useState(false);
  const [openExport, setOpenExport] = useState(false);

  return (
    <div className="flex items-center gap-2">
      {withImport && (
        <button
          className="text-[15px] flex items-center gap-1 h-fit w-fit py-1 px-2 rounded-[6px] bg-[var(--primary-color1)] text-white transition-all duration-200 hover:bg-[var(--primary-color2)]"
          onClick={() => setOpenImport(true)}
        >
          <TfiImport /> Import
        </button>
      )}
      <button
        className="text-[15px] flex items-center gap-1 h-fit w-fit py-1 px-2 rounded-[6px] bg-[var(--primary-color1)] text-white transition-all duration-200 hover:bg-[var(--primary-color2)]"
        onClick={() => setOpenExport(true)}
      >
        <TfiExport /> Export
      </button>

      <ExportFile
        open={openExport}
        setOpen={setOpenExport}
        selected_ids={ids}
      />
      {withImport && <ImportFile open={openImport} setOpen={setOpenImport} />}
    </div>
  );
}
