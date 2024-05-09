import { ThemeContext } from "@/components/Pars/ThemeContext";
import { useContext, useState } from "react";
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

  const [file, setFile] = useState(null); //TMP
  function onFileChange(event: any) {
    //TMP
    setFile(event.target.files[0]);
  }

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
      size="lg"
      className={`${
        mode === "dark"
          ? "[&>div>*]:!bg-[var(--dark-bg-color)] [&>div>*]:text-[var(--dark-text-color)]"
          : "[&>div>*]:!bg-light [&>div>*]:text-[var(--light-text-color)]"
      }`}
    >
      <Modal.Header className="flex items-center mt-1">
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
        {/* TMP */}
        <div className="flex flex-col gap-2 my-2">
          <label htmlFor="file">Load from file:</label>{" "}
          <input onChange={onFileChange} type="file" />
        </div>

        <div className="justify-center items-center flex">
          <Document
            file={file}
            onLoadSuccess={onDocumentLoadSuccess}
            className="flex flex-col gap-2"
          >
            {Array.from({ length: numPages }, (_, index) => (
              <Page
                key={`page_${index + 1}`}
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
