"use client";
import React, {
   ReactNode,
   useCallback,
   useContext,
   useMemo,
   useState,
} from "react";
import DataTable from "react-data-table-component";
import { Dropdown, Loader } from "rsuite";
import CrudHeader from "./CrudHeader";
import { ThemeContext } from "../Pars/ThemeContext";
import { useDispatch } from "react-redux";

interface CrudLayoutType {
   columns: any;
   interfaceName: string;
   openAdd: boolean;
   setOpenAdd: any;
   isLoading: boolean;
   dataTabel?: any;
   isThereAdd?: boolean;
   children?: ReactNode;
   action?: any;
   factor?: "user_id" | "id";
}

export default function CrudLayout({
   columns,
   interfaceName,
   openAdd,
   setOpenAdd,
   dataTabel,
   isLoading,
   isThereAdd,
   children,
   action,
   factor,
}: CrudLayoutType) {
   const [selectedRowsIds, setSelectedRowsIds] = useState([]);
   const [toggleCleared, setToggleCleared] = useState(false);

   const dispatch: any = useDispatch();
   const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

   console.log("main ", selectedRowsIds);

   const handleRowSelected = useCallback(
      ({ selectedRows }: { selectedRows: any }) => {
         if (factor === "id") {
            setSelectedRowsIds(selectedRows.map((row: any) => row.id));
         } else if (factor === "user_id") {
            setSelectedRowsIds(selectedRows);
         }
         console.log("sdjas", selectedRows);
      },
      [factor]
   );

   const contextActions = useMemo(() => {
      const handleDelete = () => {
         console.log("deleted");
      };
      return (
         <div className="flex items-center gap-3 flex-wrap px-3">
            <Dropdown
               className="bg-[var(--primary-color1)] [&>button]:!capitalize [&>button]:!text-white rounded-[6px] border-[#c1c1c1] [&>button.rs-btn:focus]:!bg-[var(--primary-color1)] [&>button.rs-btn:focus]:!text-white [&>.rs-btn:hover]:!bg-[var(--primary-color2)] [&>.rs-btn:hover]:!text-white [&>*]:!text-left "
               title="Change Status"
            >
               <Dropdown.Item
                  className="text-white capitalize"
                  onClick={() =>
                     dispatch(
                        action({ status: "Accepted", ids: selectedRowsIds })
                     )
                  }
               >
                  Accepted
               </Dropdown.Item>
               <Dropdown.Item
                  className="text-white capitalize"
                  onClick={() =>
                     dispatch(
                        action({ status: "Rejected", ids: selectedRowsIds })
                     )
                  }
               >
                  Rejected
               </Dropdown.Item>
            </Dropdown>
            <button
               key="delete"
               onClick={handleDelete}
               className="border-none text-white bg-[var(--primary-color1)] text-center w-[100px] p-1 rounded-[6px] hover:bg-[var(--primary-color2)] transition-all delay-300"
            >
               Delete
            </button>
         </div>
      );
   }, [selectedRowsIds, action, dispatch]);

   const customStyles = {
      rows: {
         style: {
            color: mode === "dark" ? "#dadee7" : "#13181e",
            backgroundColor: mode === "dark" ? "#13181e" : "transparent",
            borderColor: "#777",
         },
      },
      columns: {
         style: {
            // minWidth: "100px",
         },
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
      <main className="h-full [&>div:first-child]:!p-0 [&>div:first-child]:!overflow-visible [&>div:first-child_div:last-child]:!z-20  mb-[100px]">
         <DataTable
            title={
               <CrudHeader
                  crudName={interfaceName}
                  setOpen={setOpenAdd}
                  isThereAdd={isThereAdd}
               >
                  {children}
               </CrudHeader>
            }
            columns={columns}
            data={dataTabel}
            customStyles={customStyles}
            selectableRows
            progressPending={isLoading}
            progressComponent={<Loader size="lg" />}
            className="pb-10"
            contextActions={contextActions}
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleCleared}
            striped
            responsive
            theme={mode === "dark" ? "dark" : "defualt"}
            keyField={"user_id"}
         />
      </main>
   );
}
