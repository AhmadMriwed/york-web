"use client";
import Loading from "@/components/Pars/Loading";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { getSingleUser } from "@/store/adminstore/slices/accounts/singleUserSlice";
import { GlobalState } from "@/types/storeTypes";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "rsuite";

export default function ShowUserProfileModal({
  open,
  setOpen,
  id,
  userType,
}: {
  open: boolean;
  setOpen: any;
  id: number;
  userType: "user" | "trainer" | "supervisor";
}) {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  const dispatch: any = useDispatch();
  const { error, isLoading, singleUser } = useSelector(
    (state: GlobalState) => state.singleUser
  );

  console.log(singleUser);

  useEffect(() => {
    if (open) {
      if (userType === "user") {
        dispatch(getSingleUser(`admin/accounts/${id}`));
      } else if (userType === "trainer") {
        dispatch(getSingleUser(`admin/trainerAccountRequests/${id}`));
      } else if (userType === "supervisor") {
        dispatch(getSingleUser(`admin/superviosr/${id}`));
      }
    }
  }, [dispatch, id, open, userType]);

  const data: {
    key: number;
    title: string;
    value: string | number | null;
  }[][] = [
    [
      {
        key: 1,
        title: "ID : ",
        value: singleUser.id,
      },
      {
        key: 2,
        title: "User ID : ",
        value: singleUser.user_id,
      },
      {
        key: 3,
        title: "Name : ",
        value: singleUser.first_name + " " + singleUser.last_name,
      },
      {
        key: 4,
        title: "Email : ",
        value: singleUser.email,
      },
      {
        key: 5,
        title: "Phone : ",
        value: singleUser.phone_number,
      },
      {
        key: 6,
        title: "Username : ",
        value: singleUser.user_name,
      },
    ],
    [
      {
        key: 7,
        title: "Account Type : ",
        value: singleUser.account_type,
      },
      {
        key: 8,
        title: "Account Status : ",
        value: singleUser.account_status
          ? singleUser.account_status.status
          : "",
      },
      {
        key: 9,
        title: "Verified  : ",
        value: singleUser.is_verified ? "Yes" : "No",
      },
      {
        key: 10,
        title: "Role ID : ",
        value: singleUser.role?.id ? singleUser.role?.id : "No Role",
      },
      {
        key: 11,
        title: "Role Name : ",
        value: singleUser.role?.name ? singleUser.role?.name : "No Role",
      },
      {
        key: 12,
        title: "Status : ",
        value: singleUser.status?.status
          ? singleUser.status?.status
          : "No Status",
      },
      {
        key: 13,
        title: "Cause : ",
        value: singleUser.status?.cause
          ? singleUser.status?.cause
          : "No Reason",
      },
    ],
  ];

  return (
    <Modal
      backdrop={true}
      open={open}
      onClose={() => setOpen(false)}
      size="md"
      className={`rounded-[17px]  border-[2px] border-[#c1c1c1] [&>_.rs-modal-dialog_.rs-modal-content]:!rounded-[15px] h-auto ${
        mode === "dark" ? "[&>div>*]:!bg-dark" : "[&>div>*]:!bg-light"
      }`}
    >
      <Modal.Header>
        <Modal.Title
          className={`${
            mode === "dark" ? "text-light" : "text-dark"
          } font-bold`}
        >
          User Profile
        </Modal.Title>
      </Modal.Header>
      {isLoading && <Loading />}

      {!isLoading && singleUser && (
        <Modal.Body
          className={`${mode === "dark" ? "text-light" : "text-dark"} `}
        >
          <div className="element-center mb-7">
            {singleUser.image ? (
              <Image
                src={singleUser.image}
                alt="user photo"
                width={100}
                height={100}
              />
            ) : (
              " "
            )}
          </div>
          <div className="flex justify-between gap-x-4 flex-wrap px-5 my-7">
            {data.map((container, index) => {
              return (
                <div className="min-w-[200px]" key={index}>
                  {container.map((item) => {
                    return (
                      <div
                        key={item.key}
                        className="flex items-center gap-3 mb-5"
                      >
                        <p className="m-0">{item.title}</p>
                        <p className="m-0">{item.value}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </Modal.Body>
      )}
    </Modal>
  );
}
