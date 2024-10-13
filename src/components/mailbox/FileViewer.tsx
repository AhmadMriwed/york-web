import React, { useContext, useState } from "react";
import { ThemeContext } from "../Pars/ThemeContext";
import { storageURL } from "@/utils/api";
import { DocumentViewer } from "react-documents";
import { downloadFile } from "@/store/adminstore/slices/mailbox/fileSlice";



import { Modal } from "rsuite";


import Image from "next/image";
import { FaDownload } from "react-icons/fa";
import { useDispatch } from "react-redux";



interface FileViewerProps {
  open: boolean;
  onClose: () => void;
  file: any;
}

export default function FileViewer({ open, onClose, file }: FileViewerProps) {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const dispatch: any = useDispatch();

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      className={`[&>_.rs-modal-dialog_.rs-modal-content]:!rounded-[15px] h-auto ${
        mode === "dark" ? "[&>div>*]:!bg-dark" : "[&>div>*]:!bg-light"
      }`}
    >
      <Modal.Header>
      <div
                    className="bg-[var(--primary-color1)]  rounded-full cursor-pointer  
                     h-8 w-8 p-2"
                    onClick={() => dispatch(downloadFile(file.path))}
                  >
                    <FaDownload style={{ color: "white", fontSize: "16px" }} />
                  </div>
        <Modal.Title
          className={`text-center ${
            mode === "dark" ? "text-light" : "text-dark"
          } font-bold`}
        >
          {file?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="" style={{ height: "75vh" }}>
        {file?.sub_type === "jpg" ||
        file?.sub_type === "jpeg" ||
        file?.sub_type === "png" ? ( 
          <Image
            width={100}
            height={100}
            src={storageURL + file?.path}
       
            alt="photo"
            style={{ width: '100%', height: 'auto' }} 
          />
        ) : (
          <DocumentViewer
            queryParams="hl=Nl"
            url={storageURL + file?.path}
          ></DocumentViewer>
        )}
      </Modal.Body>
      <Modal.Footer>
    
      </Modal.Footer>
    </Modal>
  );
}
