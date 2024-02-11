import { Modal } from "rsuite";
import MiniSession from "./MiniSession";

// testing values
const values = {
  code: "",
  title: "",
  dateFrom: null,
  dateEnd: null,
  hours: 0,
  image: null,
  status: "",
  outline: "",
  description: "",
  files: [],
  training_sessions_type: "",
  url: "",
};

const NewSessionModal = ({
  mode,
  modalOpen,
  setModalOpen,
  submithandler,
}: any) => {
  const handleClose = () => setModalOpen(false);

  return (
    <Modal
      open={modalOpen}
      onClose={handleClose}
      size="lg"
      className={`${
        mode === "dark"
          ? "[&>div>*]:!bg-dark [&>div>*]:text-[var(--light-color)]"
          : "[&>div>*]:!bg-light [&>div>*]:text-[var(--dark-color)]"
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
          Select Session
        </Modal.Title>
        <div className="mt-4">
          <input
            placeholder="Search"
            className="rounded-[20px] py-2 px-3 w-[200px] sm:w-[300px] bg-white border-none outline-none"
          />
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-3 px-3">
          {[1, 2, 3].map((session: any, index: number) => (
            <div key={index} className="cursor-pointer">
              <MiniSession pickable />
            </div>
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => {
            submithandler(values);
            handleClose();
          }}
          className="colored-btn"
        >
          Add
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewSessionModal;
