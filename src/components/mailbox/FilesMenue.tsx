import React, { useContext } from "react";
import { Modal } from "rsuite";
import { ThemeContext } from "../pars/ThemeContext";
import { IoMdAttach } from "react-icons/io";
import { FaDownload } from "react-icons/fa6";
import { FileType } from "@/types/adminTypes/mailbox/mailboxTypes";
import Link from "next/link";
import { baseURL } from "@/utils/api";
import { useDispatch } from "react-redux";
import { downloadFile } from "@/store/adminstore/slices/mailbox/fileSlice";

interface ModalType {
  open: boolean;
  setOpen: any;
  files?: FileType[];
}

export default function FilesMenue({ open, setOpen, files }: ModalType) {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const dispatch: any = useDispatch();

  console.log("files", files);

  return (
    <Modal
      backdrop={true}
      open={open}
      onClose={() => setOpen(false)}
      className={`[&>_.rs-modal-dialog_.rs-modal-content]:!rounded-[15px] h-auto ${
        mode === "dark" ? "[&>div>*]:!bg-dark" : "[&>div>*]:!bg-light"
      }`}
      size="md"
    >
      <Modal.Header>
        <Modal.Title
          className={`text-center ${
            mode === "dark" ? "text-light" : "text-dark"
          } font-bold`}
        >
          Files Downloading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        className={` ${mode === "dark" ? "text-light" : "text-dark"} px-3`}
      >
        {files?.map((file) => {
          return (
            <div
              className="flex items-center gap-3 justify-between border-b border-[#777]"
              key={file.id}
            >
              <div className="flex items-center gap-3 mt-3 overflow-x-auto pb-4 ">
                <div className="min-w-5 min-h-5 rounded-[50%] bg-[#bb9be6] element-center ">
                  <IoMdAttach
                    style={{
                      color: "white",
                      fontSize: "16px",
                    }}
                  />
                </div>{" "}
                <p>{file.name} </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-white font-light text-[13px]">
                  size : {(+file.size / 1024).toFixed(2)} KB
                </p>

                <div
                  className="min-w-8 min-h-8 rounded-[50%] bg-[var(--primary-color1)] element-center cursor-pointer"
                  onClick={() => dispatch(downloadFile(file.path))}
                >
                  <FaDownload
                    style={{
                      color: "white",
                      fontSize: "16px",
                    }}
                  />
                </div>
              </div>{" "}
            </div>
          );
        })}
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}
