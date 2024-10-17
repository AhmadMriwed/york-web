import React, { useContext, useState } from "react";
import { Modal } from "rsuite";
import { ThemeContext } from "../Pars/ThemeContext";
import { storageURL } from "@/utils/api";
import { IoMdAttach } from "react-icons/io";
import { FaDownload } from "react-icons/fa6";
import { FileType } from "@/types/adminTypes/mailbox/mailboxTypes";
import { useDispatch } from "react-redux";
import { downloadFile } from "@/store/adminstore/slices/mailbox/fileSlice";


import dynamic from "next/dynamic";
const FileViewer = dynamic(
  () => import("@/components/mailbox/FileViewer"),
  {
    ssr: false,
  }
);

import { MdRemoveRedEye } from "react-icons/md";
import { TiThListOutline } from "react-icons/ti";
import { BsGrid3X3Gap } from "react-icons/bs";
import { MdOutlineSelectAll } from "react-icons/md";
import { RiFolderDownloadLine } from "react-icons/ri";
import { BsFiletypePdf } from "react-icons/bs";
import { FaRegFileWord } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
import { AiOutlineChrome, AiOutlineFileUnknown } from "react-icons/ai";
import Image from "next/image";




interface ModalType {
  open: boolean;
  setOpen: any;
  files?: FileType[];
}

interface File {
  id: number;
  name: string;
  size: string;
  path: string;
}

interface FileViewerProps {
  files: File[];
  selectedFiles: boolean[];
}

export default function FilesMenue({ open, setOpen, files }: ModalType) {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const dispatch: any = useDispatch();
  const [view, setView] = useState(false);
  const [selectView, setSelectView] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState<File>();
  const handleFileClick = (file: File) => {
    setCurrentFile(file);
    setIsViewerOpen(true);
  };
  const [selectedFiles, setSelectedFiles] = useState<boolean[]>(
    new Array(files?.length).fill(false)
  );
  const [selectAll, setSelectAll] = useState<boolean>(false);


  const handleSelectAll = () => {
    const newSelectedFiles = selectedFiles.map(() => !selectAll);
    setSelectedFiles(newSelectedFiles);
    setSelectAll(!selectAll);
    setSelectView(!selectView);
  };

  const handleFileSelect = (index: number) => {
    const newSelectedFiles = [...selectedFiles];
    newSelectedFiles[index] = !newSelectedFiles[index];
    setSelectedFiles(newSelectedFiles);
  };

  const handleDownloadSelected = async () => {
    if (!files || !selectedFiles || selectedFiles.length === 0) {
      console.log("No files or selected files to download.");
      return;
    }
    const selectedFilePaths = files.filter((_, index) => selectedFiles[index]);
    for (const file of selectedFilePaths) {
      await dispatch(downloadFile(file.path));
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  };

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
          Attatched Fiels
        </Modal.Title>
      </Modal.Header>

      <div className="flex justify-between  mt-5">
        <div className="h-6 pt-4 pr-4 w-full flex gap-2 cursor-pointer">
          <MdOutlineSelectAll
            title="Select All Files"
            onClick={handleSelectAll}
            style={{
              color: "var(--primary-color1)",
              fontSize: "25px",
            }}
          />
          <RiFolderDownloadLine
            title="Download Selected Files"
            onClick={handleDownloadSelected}
            style={{
              color: "var(--primary-color1)",
              fontSize: "25px",
            }}
          />
        </div>
        <div className="h-6 pt-4 pr-4 w-full flex gap-2 cursor-pointer justify-end">
          <BsGrid3X3Gap
            onClick={() => setView(true)}
            style={{
              color: "var(--primary-color1)",
              fontSize: "25px",
            }}
          />
          <TiThListOutline
            onClick={() => setView(false)}
            style={{
              color: "var(--primary-color1)",
              fontSize: "25px",
            }}
          />
        </div>
      </div>

      <Modal.Body
        className={` ${mode === "dark" ? "text-light" : "text-dark"} px-3`}
      >
        <div
          className={`grid gap-4 ${
            view ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-12"
          }`}
        >
          {files?.map((file, index) => {
            return (
              <div
                key={file.id}
                className={`flex p-4   gap-3 justify-between border-b border-[#777] ${
                  view ? "flex-col" : "col-span-12 gap-2 mt-2  justify-between"
                }`}
              >
                {" "}
                {view === true && (
                  <div
                    onClick={() => handleFileClick(file)}
                    className="h-36 w-full flex items-center  justify-center bg-[#212A34] rounded-tl-[25%]  "
                  >
                    {file.sub_type === "jpg" ||
                    file.sub_type === "jpeg" ||
                    file.sub_type === "png" ? (
                      <Image
                        width={100}
                        height={100}
                        src={storageURL + file.path}
                        alt="photo"
                        style={{  width: '100%', height: '100%', borderTopLeftRadius: '25%' }} 
                      />
                    ) : null}
                    {file.sub_type === "pdf" ? (
                      <BsFiletypePdf
                        style={{ color: "white", fontSize: "75px" }}
                      />
                    ) : null}
                    {file.sub_type === "docx" || file.sub_type === "doc" ? (
                      <FaRegFileWord
                        style={{ color: "white", fontSize: "75px" }}
                      />
                    ) : null}
                    {file.sub_type === "xlsx" || file.sub_type === "xls" ? (
                      <SiMicrosoftexcel
                        style={{ color: "white", fontSize: "75px" }}
                      />
                    ) : null}
                    {file.sub_type === "webp" ? (
                      <AiOutlineChrome
                        style={{ color: "white", fontSize: "75px" }}
                      />
                    ) : null}
                    {![
                      "jpg",
                      "jpeg",
                      "png",
                      "pdf",
                      "docx",
                      "doc",
                      "xlsx",
                      "xls",
                      "webp",
                    ].includes(file.sub_type) && (
                      <AiOutlineFileUnknown
                        style={{ color: "white", fontSize: "75px" }}
                      />
                    )}
                  </div>
                )}
                <div className="flex gap-2 items-center justify-between  ">
                  <div className="pt-2 ">
                    {selectView ? (
                      <input
                        type="checkbox"
                        checked={selectedFiles[index]}
                        onChange={() => handleFileSelect(index)}
                        className="w-4 h-4  accent-teal-500 mb-2"
                      />
                    ) : null}
                  </div>

                  {view === true ? null : (
                    <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#bb9be6] ">
                      <IoMdAttach
                        style={{ color: "white", fontSize: "20px" }}
                      />
                    </div>
                  )}

                  <p className="flex-1 text-center">{file.name}</p>
                </div>
                <div
                  className={` flex items-center ${
                    view === true ? "hidden" : "gap-2"
                  }`}
                >
                  <p
                    className={`  font-light  ${
                      view === true ? "text-xs" : "text-sm"
                    }  ${mode === "dark" ? "text-light" : "text-dark"}`}
                  >
                    size: {(+file.size / 1024).toFixed(2)} KB
                  </p>
                  <div
                    className={`bg-[var(--primary-color1)]  rounded-full cursor-pointer  ${
                      view === true ? "h-7 w-7 p-1.5" : "h-8 w-8 p-2"
                    } `}
                    onClick={() => handleFileClick(file)}
                  >
                    <MdRemoveRedEye
                      style={{ color: "white", fontSize: "16px" }}
                    />
                  </div>
                  <div
                    className={`bg-[var(--primary-color1)]  rounded-full cursor-pointer  ${
                      view === true ? "h-7 w-7 p-1.5" : "h-8 w-8 p-2"
                    } `}
                    onClick={() => dispatch(downloadFile(file.path))}
                  >
                    <FaDownload style={{ color: "white", fontSize: "16px" }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
      <FileViewer
        open={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        file={currentFile}
      />
    </Modal>
  );
}
