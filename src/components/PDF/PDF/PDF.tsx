import { PDFType } from "@/types/adminTypes/courses/coursesTypes";
import dynamic from "next/dynamic";

const PDFViewer = dynamic(
  () => import("@/components/PDF/pdf-viewer/pdf-viewer"),
  {
    ssr: false,
  }
);

export default function PDF({
  modalOpen,
  setModalOpen,
  PDF,
}: {
  modalOpen: boolean;
  setModalOpen: any;
  PDF: PDFType;
}) {
  return (
    <PDFViewer modalOpen={modalOpen} setModalOpen={setModalOpen} PDF={PDF} />
  );
}
