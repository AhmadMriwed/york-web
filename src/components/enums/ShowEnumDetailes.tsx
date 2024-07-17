import { useContext, useEffect } from "react";
import { Modal } from "rsuite";
import { ThemeContext } from "../Pars/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { GlobalState } from "@/types/storeTypes";
import Loading from "../Pars/Loading";
import Image from "next/image";
import { getSingleEnum } from "@/store/adminstore/slices/enums/singleEnumSlice";
import { storageURL } from "@/utils/api";

export default function ShowEnumDetailes({
   open,
   setOpen,
   id,
   url,
   title,
}: {
   open: boolean;
   setOpen: any;
   id: number;
   title: string;
   url: string;
}) {
   const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
   const { isLoading, error, singleEnum } = useSelector(
      (state: GlobalState) => state.singleEnum
   );
   const dispatch: any = useDispatch();

   useEffect(() => {
      if (open) {
         dispatch(getSingleEnum(url + id));
      }
   }, [dispatch, url, id, open]);

   return (
      <Modal
         backdrop={true}
         open={open}
         onClose={() => setOpen(false)}
         size="md"
         className={`rounded-[17px]  border-[2px] border-[#c1c1c1] [&>_.rs-modal-dialog_.rs-modal-content]:!rounded-[15px] h-auto ${
            mode === "dark" ? "[&>div>*]:!bg-dark" : "[&>div>*]:!bg-light"
         }`}
      >
         <Modal.Header>
            <Modal.Title
               className={`${
                  mode === "dark" ? "text-light" : "text-dark"
               } font-bold`}
            >
               {title}
            </Modal.Title>
         </Modal.Header>

         {isLoading && <Loading />}

         {!isLoading && singleEnum.id && (
            <Modal.Body
               className={`${mode === "dark" ? "text-light" : "text-dark"} `}
            >
               <div className="element-center mb-7">
                  {singleEnum.image && (
                     <Image
                        src={
                           singleEnum.image.startsWith("http")
                              ? singleEnum.image
                              : storageURL + singleEnum.image
                        }
                        alt="user photo"
                        width={100}
                        height={100}
                     />
                  )}
               </div>
               <div className="flex flex-col gap-2 px-5 my-7">
                  {Object.entries(singleEnum).map(([key, value]) => {
                     return (
                        key !== "image" && (
                           <div
                              key={key}
                              className="flex items-center gap-3 mb-5"
                           >
                              <p className="m-0 text-[#777] w-[75px] capitalize">
                                 {key}:
                              </p>
                              <p className="m-0">{value}</p>
                           </div>
                        )
                     );
                  })}
               </div>
            </Modal.Body>
         )}
      </Modal>
   );
}
