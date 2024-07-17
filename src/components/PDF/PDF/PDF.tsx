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
  fileSource,
}: {
  modalOpen: boolean;
  setModalOpen: any;
  fileSource: any;
}) {
  return (
    <PDFViewer
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      fileSource={fileSource}
    />
  );
}
