import { ThemeContext } from "@/components/Pars/ThemeContext";
import { PDFType } from "@/types/adminTypes/courses/coursesTypes";
import { storageURL } from "@/utils/api";
import { Minus, Plus } from "@rsuite/icons";
import React, {
  PropsWithChildren,
  Ref,
  useContext,
  useEffect,
  useState,
} from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Modal } from "rsuite";
import HTMLFlipBook from "react-pageflip";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const Pages = React.forwardRef(
  (props: PropsWithChildren | any, ref: Ref<any>) => {
    return (
      <div className="demoPage" ref={ref}>
        {props.children}
      </div>
    );
  }
);

Pages.displayName = "Pages";

export default function PDFViewer({
  modalOpen,
  setModalOpen,
  PDF,
}: {
  modalOpen: boolean;
  setModalOpen: any;
  PDF: PDFType;
}) {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(900);
  const [bookPageWidth, setBookPageWidth] = useState(400);
  const [renderType, setRenderType] = useState<"normal" | "book">("normal");

  useEffect(() => {
    const handleResize = () => {
      setPageWidth(window.innerWidth * 0.75);

      if (window.innerWidth < 400) {
        setBookPageWidth(window.innerWidth * 0.85);
      } else {
        setBookPageWidth(400);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        <div className="flex flex-col justify-center items-center gap-6 wrap p-4">
          <div className="text-14">
            <p className="text-[12px] sm:text-[14px] font-bold break-all">
              {PDF && PDF.name && PDF.name}
            </p>
            <p className="text-[12px] sm:text-[14px] font-bold">
              File size: {PDF && PDF.size && (PDF.size / 1048576).toFixed(2)} MB
            </p>
          </div>
          <div className="flex justify-center items-center gap-1 p-1 rounded-lg border-[2px] border-[var(--primary-color1)]">
            {renderType === "normal" && (
              <>
                <button
                  type="button"
                  className="p-3 h-9 rounded-lg element-center bg-slate-200 hover:bg-slate-100 text-[#000] text-[12px] font-semibold"
                  onClick={() => setPageWidth((prev) => prev + 50)}
                >
                  <Plus />
                </button>
                <button
                  type="button"
                  className="p-3 h-9 rounded-lg element-center bg-slate-200 hover:bg-slate-100 text-[#000] text-[12px] font-semibold"
                  onClick={() => setPageWidth((prev) => prev - 50)}
                >
                  <Minus />
                </button>
              </>
            )}
            <button
              type="button"
              className="p-3 h-9 rounded-lg element-center bg-slate-200 hover:bg-slate-100 text-[#000] text-[12px] font-semibold"
              onClick={() =>
                renderType === "normal"
                  ? setRenderType("book")
                  : setRenderType("normal")
              }
            >
              {renderType === "normal"
                ? "Switch to Flipbook"
                : "Switch to Normal"}
            </button>
          </div>
        </div>

        {renderType === "normal" ? (
          <div className="justify-center items-center flex">
            <Document
              file={storageURL + PDF?.path}
              onLoadSuccess={onDocumentLoadSuccess}
              className="flex flex-col gap-2"
            >
              {Array.from({ length: numPages }, (_, index) => (
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
        ) : (
          <div className="flex flex-col justify-center items-center overflow-hidden">
            <HTMLFlipBook width={bookPageWidth} height={600}>
              {[...Array(numPages).keys()].map((pg) => (
                <Pages key={pg} number={pg + 1}>
                  <Document
                    file={storageURL + PDF?.path}
                    onLoadSuccess={onDocumentLoadSuccess}
                  >
                    <Page
                      pageNumber={pg}
                      width={bookPageWidth}
                      height={600}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  </Document>
                </Pages>
              ))}
            </HTMLFlipBook>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
