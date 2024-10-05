import SearchIcon from "@rsuite/icons/Search";
import { ReactNode, useContext, useRef, useState } from "react";
import { ThemeContext } from "../pars/ThemeContext";

import ExportImportContainer from "./ExportImportContainer";

export default function CrudHeader({
  crudName,
  setOpen,
  isThereAdd,
  children,
  setTerm,
  totalItems,
  withImportExport,
}: {
  crudName: string;
  setOpen: any;
  setTerm?: any;
  isThereAdd?: boolean;
  totalItems?: number;
  children?: ReactNode;
  withImportExport?: boolean;
}) {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  const term: any = useRef("");

  return (
    <div
      className={`flex flex-col justify-between pb-2 crudCustom1:flex-row crudCustom1:items-center px-3 ${
        mode === "dark" ? "dark" : "light"
      } `}
    >
      <header>
        <span>{crudName}</span>
        {isThereAdd && (
          <>
            <button
              className="mx-[15px] bg-btnColor rounded-[6px] text-white py-[5px] px-[10px] text-center text-[14px]"
              onClick={() => setOpen(true)}
            >
              + Add
            </button>
          </>
        )}
        {totalItems && (
          <p className="text-[12px] my-1">Total Items : {totalItems}</p>
        )}
      </header>

      <div className="p-2">
        <div className="flex gap-[6px] flex-col crudCustom2:flex-row relative">
          {withImportExport && <ExportImportContainer />}
          {children}
          <div className="flex h-[38px]  w-fit rounded-[6px]">
            <input
              type="text"
              placeholder="Search"
              className={`px-[10px] outline-none w-[210px]  sm:w-[300px] text-[14px] border border-blue-400 ${
                mode === "dark"
                  ? " bg-[#1d2127] text-white"
                  : "bg-white text-[#656565]"
              } `}
              ref={term}
            />
            <div
              className={`${
                mode === "dark"
                  ? " bg-[#1d2127] text-white"
                  : "bg-white text-[#656565]"
              }  w-[35px] element-center cursor-pointer rounded-[0_6px_6px_0] border border-blue-400 border-l-0`}
              onClick={() => setTerm(term.current.value)}
            >
              <SearchIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
