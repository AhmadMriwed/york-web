import { useContext, useEffect, useState } from "react";
import { Modal } from "rsuite";
import { ThemeContext } from "../Pars/ThemeContext";
import { FaCamera } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import profilePhoto from "../../../public/avatar.png";
import Image from "next/image";
import Loading from "../Pars/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProfile } from "@/store/adminstore/slices/authSlice";
import { GlobalState } from "@/types/storeTypes";
// import RecoverPassword from "../RecoverPassword/RecoverPassword";
import UpdatePasswordModal from "../UpdatePassModal/UpdatePasswordModal";

export default function Profile({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
}) {
  const handleClose = () => setOpen(false);
  const [changePassword, setChangePassword] = useState(false);
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const dispatch: any = useDispatch();
  const { adminProfile, profileLoading, profileError } = useSelector(
    (state: GlobalState) => state.authSlice
  );

  console.log("admin", adminProfile);
  // useEffect(() => {
  //    dispatch(getAdminProfile());
  // }, [open, dispatch]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        className={`${
          mode === "dark"
            ? "[&>div>*]:!bg-dark text-white"
            : "[&>div>*]:!bg-light text-black"
        }
   
   `}
        size={"lg"}
      >
        {profileLoading && <Loading />}
        {!profileLoading && adminProfile && (
          <Modal.Body
            className={`${mode === "dark" ? "text-light" : "text-dark"}`}
          >
            <header className="mt-5 ms-10 p-2 flex gap-7 items-center flex-col sm:flex-row">
              {adminProfile.image && (
                <div className="relative">
                  <Image
                    src={profilePhoto}
                    width={150}
                    height={150}
                    alt="photo"
                    className="rounded-[50%]"
                  />

                  <div className="absolute right-0 top-[75%] w-[30px] bg-[var(--primary-color1)] h-[30px] rounded-[50%] element-center">
                    <FaCamera className="text-white text-[14px]" />
                  </div>
                </div>
              )}

              <div className="text-center sm:text-left">
                <p className="mb-3 text-[28px] font-semibold">
                  {adminProfile.first_name + " " + adminProfile.last_name}
                </p>
                <p className="mb-3 text-[#777]">
                  <MdEmail className="text-[var(--primary-color2)] inline me-2" />
                  {adminProfile.email}
                </p>
                {adminProfile.job_type && (
                  <p className="mb-3 text-[#777]">
                    <MdPerson className="text-[var(--primary-color2)] inline me-2" />{" "}
                    {adminProfile.job_type}
                  </p>
                )}
                <p className="text-[var(--primary-color2)]">
                  {adminProfile.role?.name}
                </p>
              </div>
            </header>
            <div className="mt-5 ms-10 p-2">
              <div className="flex justify-between flex-wrap w-[80%] gap-3">
                <div className="flex gap-2">
                  {" "}
                  <p className="text-[#777]">Birthday :</p>{" "}
                  <span>{adminProfile.birth_date}</span>
                </div>
                <div className="flex gap-2">
                  {" "}
                  <p className="text-[#777]">Phone Number : </p>{" "}
                  <span>{adminProfile.phone_number}</span>
                </div>
              </div>
              <div className="mt-8">
                <p className="text-[#777]">About me :</p>
                <p className="text-wrap pe-5 leading-6 ">
                  {adminProfile.about_me}
                </p>
              </div>
            </div>
            <hr className="mt-8 mx-10 p-2 opacity-8 border-[#777]" />
            <div className="flex gap-2 mt-2 mx-auto p-2 justify-between w-[80%]">
              <button
                className="element-center bg-[var(--primary-color1)] text-white p-3 rounded-[10px] w-[150px] text-[16px] hover:bg-[var(--primary-color2)] transition-all duration-300"
                onClick={() => {
                  setChangePassword(true);
                  handleClose();
                }}
              >
                Change Password
              </button>

              <button className="element-center border border-[var(--primary-color1)] text-[var(--primary-color1)] p-3 rounded-[10px] text-[16px] w-[150px] hover:bg-[var(--primary-color2)] hover:text-white transition-all duration-300">
                Change Profile
              </button>
            </div>{" "}
          </Modal.Body>
        )}

        {!profileLoading && profileError && (
          <p className="text-red-400 text-center">{profileError}</p>
        )}
      </Modal>
      <UpdatePasswordModal
        isOpen={changePassword}
        onClose={() => setChangePassword(false)}
        onOpen={() => {
          setChangePassword(true);
          handleClose();
        }}
        type="admin"
      />
    </>
  );
}
