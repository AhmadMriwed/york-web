"use client";
import { useContext } from "react";
import { ThemeContext } from "@/components/Pars/ThemeContext";
import Image from "next/image";
import { Location, Peoples, Calendar } from "@rsuite/icons";
import {
  FaLanguage,
  FaClock,
  FaBookOpen,
  FaRegPlayCircle,
  FaRegFile,
  FaLink,
  FaEye,
  FaInfoCircle,
  FaChartLine,
  FaEdit,
  FaTrash,
  FaToggleOn,
} from "react-icons/fa";
import image from "@/../public/register.png"; // -- TEMP --
import SessionListItem from "@/components/sessions/SessionListItem";
import TrainerInfo from "@/components/sessions/TrainerInfo";
import MiniSession from "@/components/sessions/MiniSession";

const TrainingSessionInformation = () => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  return (
    <div className="px-6 py-4">
      <div className="flex justify-between items-center flex-wrap">
        <h3 className="text-[20px] font-bold">Actions:</h3>
        <div className="flex flex-wrap gap-2">
          <button
            className="colored-btn flex justify-center items-center gap-1"
            style={{ marginBlock: "1rem", width: "fit-content" }}
          >
            <FaEdit /> Edit
          </button>
          <button
            className="colored-btn flex justify-center items-center gap-1"
            style={{ marginBlock: "1rem", width: "fit-content" }}
          >
            <FaTrash /> Delete
          </button>
          <button
            className="colored-btn flex justify-center items-center gap-1"
            style={{ marginBlock: "1rem", width: "fit-content" }}
          >
            <FaToggleOn /> Activate / Deactivate
          </button>
        </div>
      </div>
      <div className="flex gap-3 items-center flex-wrap"></div>
      <div className="flex flex-col xl:flex-row gap-3">
        <div
          className={`xl:flex-1 flex justify-between items-center gap-8 flex-wrap sm:flex-nowrap p-6 rounded-[16px]
        ${mode === "dark" ? "bg-[#212A34]" : "bg-white"}`}
        >
          <div className="flex flex-col">
            <h3 className="font-bold text-[24px] sm:text-[28px]">
              02. Data Mining
            </h3>
            <p className="text-[14px] sm:text-[18px] text-[#888] mt-1">
              Data Science Course, ID: #111
            </p>
            <p className="max-w-md text-[10px] sm:text-[12px]">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa
              dolor cumque ipsam? Voluptatem inventore libero tenetur.
            </p>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1 bg-[var(--primary-color1)] text-white rounded-full w-fit mt-3">
                Status: Active
              </div>
              <div className="px-3 py-1 bg-[var(--primary-color1)] text-white rounded-full w-fit mt-3">
                Session: Current
              </div>
            </div>
            <div
              className={`${
                mode === "dark"
                  ? "bg-[var(--light-color)] text-[var(--dark-color)]"
                  : "bg-[var(--dark-color)] text-[var(--light-color)]"
              } w-fit px-[12px] py-[3px] flex justify-center items-center gap-1
            rounded-full mt-3 cursor-pointer`}
            >
              <Location />
              <p className="text-[12px]">Rome</p>
            </div>
            <div className="flex flex-wrap gap-3 items-center mt-3">
              <SessionListItem icon={<Peoples />} text="5600 Students" />
              <SessionListItem icon={<FaClock />} text="6 hr" />
              <SessionListItem icon={<FaLanguage />} text="En" />
              <SessionListItem
                icon={<Calendar />}
                text="23 May, 2023 - 05 Oct, 2023"
              />
            </div>
          </div>
          <Image
            src={image}
            alt="Session Picture"
            width={0}
            height={0}
            style={{
              height: "200px",
              width: "200px",
              objectFit: "cover",
              borderRadius: "16px",
            }}
          />
        </div>
        <div
          className={`flex flex-wrap justify-between items-center gap-8 lg:gap-16 p-4 rounded-[16px]
        ${mode === "dark" ? "bg-[#212A34]" : "bg-white"}`}
        >
          <div className="flex flex-col gap-3">
            <h6 className="w-fit text-[14px] px-2 py-1 rounded-full bg-[var(--primary-color2)]">
              Currently Available
            </h6>
            <p className="ml-3">Sessions Topics:</p>
            <div className="flex flex-col gap-3 ml-3">
              <SessionListItem
                gap={2}
                icon={<FaBookOpen />}
                text="Welcome to the course"
              />
              <SessionListItem
                gap={2}
                icon={<FaRegPlayCircle />}
                text="What is Data Mining ?"
              />
              <SessionListItem
                gap={2}
                icon={<FaRegPlayCircle />}
                text="Why “React” but not “JavaScript”?"
              />
              <SessionListItem
                gap={2}
                icon={<FaBookOpen />}
                text="Setting up Environment"
              />
            </div>
          </div>
          <div className="mt-3 flex flex-col justify-center gap-3">
            <div>
              <h6 className="text-[var(--primary-color1)] text-[16px] mb-1">
                Assignments:
              </h6>
              <SessionListItem gap={2} icon={<FaRegFile />} text="3 files" />
            </div>
            <div>
              <h6 className="text-[var(--primary-color1)] text-[16px] mb-1">
                Attached Files:
              </h6>
              <SessionListItem gap={2} icon={<FaRegFile />} text="3 files" />
            </div>
            <div
              className="text-[var(--primary-color1)] bg-[var(--dark-color)] flex items-center gap-2
            rounded-full py-1 px-2"
            >
              <FaLink />
              <a href="">Session URL</a>
            </div>
            <SessionListItem gap={2} icon={<FaEye />} text="120k viewed" />
          </div>
        </div>
      </div>
      {/* ROW2 */}
      <div className="mt-3 flex flex-col xl:flex-row gap-3">
        <div
          className={`flex-1 flex flex-col lg:flex-row p-6 rounded-[16px] ${
            mode === "dark" ? "bg-[#212A34]" : "bg-white"
          }`}
        >
          <div className="flex-1">
            <div className="w-fit px-6 py-3 rounded-[4px] bg-[var(--primary-color1)] text-white">
              Files
            </div>
            <div className="w-full h-[1px] bg-[var(--primary-color1)] my-1"></div>
          </div>
          <div className="w-[1px] h-full bg-[var(--primary-color1)] mx-6"></div>
          <div>
            <div className="flex items-center gap-1 text-[#888] text-[18px]">
              <FaInfoCircle />
              <h3>About The Course:</h3>
            </div>
            <p className="max-w-[300px] text-[12px]">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit,
              consequuntur voluptatum.
            </p>
            <p className="max-w-[300px] mt-3 text-[12px]">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Velit,
              consequuntur voluptatum vitae alias ad tenetur pariatur tempora
              iure magnam.
            </p>
            <div className="flex items-center gap-1 text-[#888] text-[18px] mt-3">
              <FaChartLine />
              <h3>Other Sessions:</h3>
            </div>
            <div className="flex flex-col gap-3">
              <MiniSession />
              <MiniSession />
            </div>
          </div>
        </div>
        <div
          className={`p-6 rounded-[16px] ${
            mode === "dark" ? "bg-[#212A34]" : "bg-white"
          }`}
        >
          <h3 className="text-[20px] text-[#888] mb-3">Trainers:</h3>
          <div className="flex flex-col sm:flex-row xl:flex-col gap-6">
            <TrainerInfo />
            <TrainerInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingSessionInformation;
