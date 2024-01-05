"use client";
import React, { useCallback, useContext, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { Loader, Pagination } from "rsuite";
import CrudHeader from "./CrudHeader";
import ModalOperation from "../accounts/roles/ModalOperation";
import { ThemeContext } from "../Pars/ThemeContext";

interface CrudLayoutType {
   columns: any;
   dataTabel?: any;
}

export default function CrudLayout({ columns, dataTabel }: CrudLayoutType) {
   // pagination config
   const count = 10;
   const perPage = 3;
   const [activePage, setActivePage] = useState(1);
   const [open, setOpen] = useState(false);
   const [selectedRows, setSelectedRows] = useState([]);
   const [toggleCleared, setToggleCleared] = useState(false);
   const [data, setData] = useState(dataTabel);

   const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

   const handleRowSelected = useCallback((state: any) => {
      setSelectedRows(state.selectedRows);
   }, []);

   const contextActions = useMemo(() => {
      const handleDelete = () => {
         console.log("deleted");
      };

      return (
         <button
            key="delete"
            onClick={handleDelete}
            className="text-white bg-red-500 text-center w-[100px] p-2 rounded-[4px] mr-6 hover:bg-red-600 transition-all delay-200"
         >
            Delete
         </button>
      );
   }, [data, selectedRows, toggleCleared]);

   const customStyles = {
      rows: {
         style: {
            color: mode === "dark" ? "#dadee7" : "#13181e",
            backgroundColor: mode === "dark" ? "#13181e" : "transparent",
            borderColor: "#777",
         },
      },
      columns: {
         style: {},
      },
      cells: {
         style: {
            justifyContent: "center",
            padding: "0px 5px",
            fontWeight: "lighter",
            color: mode === "dark" ? "#dadee7" : "#13181e",
            minWidth: "100px",
            fontSize: "16px",
            // backgroundColor: mode === "dark" ? "#0a0a0a" : "transparent",
         },
      },
      headCells: {
         style: {
            fontSize: "16px",
            color: "#4f80c1",
            fontWeight: "bold",
            justifyContent: "center",
            backgroundColor: mode === "dark" ? "#13181e" : "transparent",
         },
      },
   };

   return (
      <main className="relative h-full [&>div:first-child]:!p-0">
         <DataTable
            title={<CrudHeader crudName="Roles" setOpen={setOpen} />}
            columns={columns}
            data={dataTabel}
            customStyles={customStyles}
            selectableRows
            progressComponent={<Loader size="lg" />}
            className="capitalize pb-10"
            contextActions={contextActions}
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleCleared}
            striped
            responsive
            theme={mode === "dark" ? "dark" : "defualt"}
         />
         <Pagination
            prev
            next
            size="sm"
            total={count}
            limit={perPage}
            maxButtons={5}
            activePage={activePage}
            onChangePage={setActivePage}
            className="absolute bottom-10 left-[50%] translate-x-[-50%] w-max 
               [&>div_.rs-pagination-btn]:!bg-white
               [&>div_.rs-pagination-btn]:!text-blue-400
               [&>div_.rs-pagination-btn]:!mx-[5px]
               [&>div_.rs-pagination-btn]:!rounded-[50%]
               [&>div_.rs-pagination-btn]:!border-none
               [&>div_.rs-pagination-btn.rs-pagination-btn-active]:!bg-blue-400
               [&>div_.rs-pagination-btn.rs-pagination-btn-active]:!text-white
               "
         />
         <ModalOperation
            open={open}
            setOpen={setOpen}
            requestType="Add Role"
            operation="Save"
         />
      </main>
   );
}
