import { useContext, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  duplicateSession,
  getAllSessions,
} from "@/store/adminstore/slices/sessions/sessionsActions";
import { sessionType } from "@/types/adminTypes/sessions/sessionsTypes";
import { GlobalState } from "@/types/storeTypes";
import { ThemeContext } from "../Pars/ThemeContext";
import { Modal } from "rsuite";
import Session from "./Session";
import Loading from "../Pars/Loading";

const NewSessionModal = ({ modalOpen, setModalOpen }: any) => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedSession, setSelectedSession] = useState<null | number>(null);

  const { isLoading, allSessions } = useSelector((state: GlobalState) => {
    return state.sessions;
  });
  const dispatch: any = useDispatch();

  const handleClose = () => {
    setModalOpen(false);
    setSelectedSession(null);
    setSearchTerm("");
  };

  const sessions = useMemo(() => {
    if (searchTerm)
      return allSessions.filter((session: sessionType) =>
        session.title
          .toLocaleLowerCase()
          .includes(searchTerm.toLocaleLowerCase())
      );
    return allSessions;
  }, [allSessions, searchTerm]);

  useEffect(() => {
    dispatch(getAllSessions());
  }, [dispatch]);

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
            type="text"
            placeholder={`Search from ${allSessions.length} items`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-full py-2 px-3 w-[200px] sm:w-[300px] bg-white text-[#888] border-none outline-none"
          />
        </div>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-3 px-3">
            {sessions.map((session: any, index: number) => (
              <div
                key={index}
                onClick={() => setSelectedSession(session.id)}
                className={`cursor-pointer rounded-[16px] box-border ${
                  selectedSession && session.id === selectedSession
                    ? "border-[1px] border-[var(--primary-color1)] opacity-[.9]"
                    : ""
                }`}
              >
                <Session pickable session={session} />
              </div>
            ))}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <button
          disabled={!selectedSession}
          onClick={() => {
            if (selectedSession) dispatch(duplicateSession(selectedSession));
            handleClose();
          }}
          className={`colored-btn m-4 ${
            !selectedSession ? "opacity-[0.6]" : ""
          }`}
        >
          Add Session
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewSessionModal;
