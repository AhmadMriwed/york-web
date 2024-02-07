import { useContext } from "react";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import { useRouter } from "next/navigation";
import { Avatar, Dropdown, IconButton } from "rsuite";
import {
  Location,
  Peoples,
  Calendar,
  More,
  Edit,
  Trash,
  Detail,
} from "@rsuite/icons";
import { FaClock } from "react-icons/fa";
import { HiOutlineDuplicate } from "react-icons/hi";
import { IoToggleOutline } from "react-icons/io5";
import { Admin } from "@rsuite/icons"; // -- TEMP --
import image from "@/../public/register.png"; // -- TEMP --
import Image from "next/image";
import SessionListItem from "./SessionListItem";

const Session = () => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);
  const router = useRouter();

  const renderIconButton = (props: any, ref: any) => {
    return (
      <IconButton
        {...props}
        ref={ref}
        icon={<More />}
        size="lg"
        circle
        style={{
          color: `${
            mode === "dark" ? "var(--light-color)" : "var(--dark-color)"
          }`,
        }}
      />
    );
  };

  return (
    <article
      className={`relative w-full p-6 flex flex-col sm:flex-row gap-4
      rounded-[16px] ${mode === "dark" ? "bg-[#212A34]" : "bg-white"}`}
    >
      <div className="absolute top-3 right-3">
        <Dropdown renderToggle={renderIconButton} placement="bottomEnd">
          <Dropdown.Item
            icon={<Detail />}
            className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
            onClick={() => {
              router.push(
                "/admin-dashboard/courses/training-session/session-information"
              );
            }}
          >
            Show Details
          </Dropdown.Item>
          <Dropdown.Item
            icon={<Trash />}
            className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
          >
            Delete
          </Dropdown.Item>
          <Dropdown.Item
            icon={<Edit />}
            className="text-[var(--primary-color1)] hover:text-[var(--primary-color1)] hover:bg-slate-100"
          >
            Edit
          </Dropdown.Item>
          <Dropdown.Item
            icon={<HiOutlineDuplicate />}
            className="flex items-center gap-1 text-[var(--primary-color1)] hover:text-[var(--primary-color1)]
            hover:bg-slate-100"
          >
            Duplicate
          </Dropdown.Item>
          <Dropdown.Item
            icon={<IoToggleOutline />}
            className="flex items-center gap-1 text-[var(--primary-color1)] hover:text-[var(--primary-color1)]
            hover:bg-slate-100"
          >
            Active \ Deactive
          </Dropdown.Item>
        </Dropdown>
      </div>
      <div>
        <Image
          src={image}
          alt="Session Image"
          width={0}
          height={0}
          style={{
            width: "175px",
            height: "150px",
            objectFit: "cover",
            borderRadius: "16px",
          }}
        />
      </div>
      <div className="flex flex-1 justify-between items-end">
        <div className="h-full flex flex-col justify-between gap-6">
          <div className="flex flex-col">
            <h6 className="text-[20px] sm:text-[24px] font-bold">
              02. Data Mining
            </h6>
            <p className="text-[14px] sm:text-[16px] mt-2 sm:mt-2">
              Data Science Course, ID: #342
            </p>
            <span
              className="w-fit bg-[var(--primary-color1)] text-white text-[12px]
            text-center rounded-full px-3 py-1 mt-2 sm:mt-3"
            >
              Web Development
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Avatar alt="Trainer Picture" size="xs" circle>
              <Admin />
            </Avatar>
            <p className="text-[16px]">Trainer</p>
          </div>
        </div>
        <div className="flex items-end xl:items-center flex-col xl:flex-row gap-2 xl:gap-3">
          <div
            className={`${
              mode === "dark"
                ? "bg-[var(--light-color)] text-[var(--dark-color)]"
                : "bg-[var(--dark-color)] text-[var(--light-color)]"
            } w-fit px-[12px] py-[3px] flex justify-center items-center gap-1
        rounded-full`}
          >
            <Location />
            <p className="text-[12px]">Rome</p>
          </div>
          <SessionListItem icon={<FaClock />} text="6 hr" />
          <SessionListItem icon={<Peoples />} text="5600 Students" />
          <SessionListItem
            icon={<Calendar />}
            text="23 May, 2023 - 05 Oct, 2023"
          />
        </div>
      </div>
    </article>
  );
};

export default Session;
