import { ThemeContext } from "@/components/Pars/ThemeContext";
import { Minus, Plus } from "@rsuite/icons";
import { useContext, useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Modal } from "rsuite";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export default function PDFViewer({
  modalOpen,
  setModalOpen,
  fileSource,
}: {
  modalOpen: boolean;
  setModalOpen: any;
  fileSource: any;
}) {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(900);

  useEffect(() => {
    const handleResize = () => {
      setPageWidth(window.innerWidth * 0.75);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /* TMP */
  const [file, setFile] = useState(null);
  function onFileChange(event: any) {
    setFile(event.target.files[0]);
  }
  /* TMP */

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: {
    numPages: any;
  }) {
    setNumPages(nextNumPages);
  }

  return (
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      size="full"
      className={`${
        mode === "dark"
          ? "[&>div>*]:!bg-[var(--dark-bg-color)] [&>div>*]:text-[var(--dark-text-color)]"
          : "[&>div>*]:!bg-light [&>div>*]:text-[var(--light-text-color)]"
      }`}
    >
      <Modal.Header>
        <Modal.Title
          className={`${
            mode === "dark"
              ? "text-[var(--light-color)]"
              : "text-[var(--dark-color)]"
          }`}
        >
          Preview File
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        {/* TEMP */}
        <div className="flex flex-col gap-2 my-2">
          <label htmlFor="file">Load from file:</label>{" "}
          <input onChange={onFileChange} type="file" />
        </div>
        {/* TEMP */}

        <div className="flex justify-center items-center gap-2 m-4">
          <button
            type="button"
            className="p-1.5 element-center gap-2 bg-slate-200 hover:bg-slate-100 rounded-lg text-[#000] text-[12px] font-semibold"
            onClick={() => setPageWidth((prev) => prev + 50)}
          >
            <Plus />
            <p>Zoom in</p>
          </button>
          <button
            type="button"
            className="p-1.5 element-center gap-2 bg-slate-200 hover:bg-slate-100 rounded-lg text-[#000] text-[12px] font-semibold"
            onClick={() => setPageWidth((prev) => prev - 50)}
          >
            <Minus />
            <p>Zoom out</p>
          </button>
        </div>
        <div className="justify-center items-center flex">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            className="flex flex-col gap-2"
          >
            {Array.from({ length: numPages ?? 0 }, (_, index) => (
              <Page
                key={`page_${index + 1}`}
                width={pageWidth}
                pageNumber={index + 1}
                renderAnnotationLayer={false}
                renderTextLayer={false}
              />
            ))}
          </Document>
        </div>
      </Modal.Body>
    </Modal>
  );
}
