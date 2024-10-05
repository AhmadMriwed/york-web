import { useContext } from "react";
import { ThemeContext } from "@/components/pars/ThemeContext";
import { useRouter } from "next/navigation";
import { PiArrowLineUpRightLight } from "react-icons/pi";

const MainStatistics = () => {
  const { mode }: { mode: "dark" | "light" } = useContext(ThemeContext);

  interface statistic {
    id: number;
    title: string;
    number: number;
  }

  const mainStatistics: statistic[] = [
    {
      id: 1,
      title: "courses",
      number: 569,
    },
    {
      id: 2,
      title: "participants",
      number: 2.569,
    },
    {
      id: 3,
      title: "Expired",
      number: 19,
    },
  ];

  const Statistic = ({ statistic }: { statistic: statistic }) => {
    return (
      <div
        className="before:absolute before:w-[100px] before:h-[100px] before:bg-[var(--primary-color1)]
         before:rounded-[50%] before:right-0 before:top-0 before:translate-y-[-15px] before:blur-[20px] before:opacity-[0.15]
         before:bg-gradient-to-b before:from-[var(--primary-color1)] before:to-transparent
         overflow-hidden
         grow
         cursor-pointer
         min-w-[222px] max-w-[300px]
         h-[120px] relative p-[15px] rounded-[10px] text-white bg-[#040B13] border-l-[6px]  border-l-[rgba(54,247,209,0.52)] "
      >
        <div className="w-[180px] h-[90%] flex flex-col justify-center border-l-[4px] border-l-[var(--primary-color1)] pl-2 rounded-lg">
          <p className="text-[22px] font-semibold m-0 mb-1 tracking-[1.8px] leading-[1.1]">
            Total
          </p>
          <p className="text-[18px] font-normal m-0 mb-1 leading-[1.1] capitalize">
            {statistic.title}
          </p>
          <p className="text-[10px] m-0 w-[calc(100%_-_46px)] leading-[1.1]">
            including all courses active and disactive{" "}
          </p>
        </div>
        <div className="bg-[#a7a7a70d] w-[25px] h-[25px] flex element-center rounded-[50%] absolute top-2 right-5">
          <PiArrowLineUpRightLight className="text-[14px] text-[]" />
        </div>
        <div className="text-[22px] font-bold absolute bottom-2 right-0 pr-3">
          {statistic.number}
        </div>
      </div>
    );
  };

  return (
    <div className=" flex items-center gap-[10px] flex-wrap justify-evenly">
      {mainStatistics.map((statistic: statistic) => {
        return <Statistic key={statistic.id} statistic={statistic} />;
      })}
    </div>
  );
};

export default MainStatistics;
