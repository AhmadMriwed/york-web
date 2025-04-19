import React, { useContext } from "react";
import {
  FaChalkboardTeacher,
  FaUsers,
  FaUserGraduate,
  FaCalendarAlt,
} from "react-icons/fa";
import { ThemeContext } from "../Pars/ThemeContext";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";
import { PiExam } from "react-icons/pi";

type AddNewItemProps = {
  title: string;
  color: "blue" | "green" | "purple" | "orange";
  onClick?: any;
  icon?: "evaluation" | "exam";
};

const AddNewItem = ({
  title,
  onClick,
  color,
  icon = "evaluation",
}: AddNewItemProps) => {
  const { mode } = useContext(ThemeContext) as { mode: "dark" | "light" };

  const colorConfig = {
    blue: {
      bg: "bg-blue-100 dark:bg-blue-900/20",
      text: "text-blue-700 dark:text-blue-200",
      border: "border-blue-400 dark:border-blue-700/50",
      hover: "hover:bg-blue-100 dark:hover:bg-blue-900/30",
      active: "active:bg-blue-200 dark:active:bg-blue-900/40",
      icon: <FaChalkboardTeacher className="text-blue-500" />,
    },
    green: {
      bg: "bg-green-100 dark:bg-green-900/20",
      text: "text-green-700 dark:text-green-200",
      border: "border-green-400 dark:border-green-700/50",
      hover: "hover:bg-green-100 dark:hover:bg-green-900/30",
      active: "active:bg-green-200 dark:active:bg-green-900/40",
      icon: <FaUsers className="text-green-500" />,
    },
    purple: {
      bg: "bg-purple-100 dark:bg-purple-900/20",
      text: "text-purple-700 dark:text-purple-200",
      border: "border-purple-400 dark:border-purple-700/50",
      hover: "hover:bg-purple-100 dark:hover:bg-purple-900/30",
      active: "active:bg-purple-200 dark:active:bg-purple-900/40",
      icon: <FaUserGraduate className="text-purple-500" />,
    },
    orange: {
      bg: "bg-orange-100 dark:bg-orange-900/20",
      text: "text-orange-700 dark:text-orange-200",
      border: "border-orange-400 dark:border-orange-700/50",
      hover: "hover:bg-orange-100 dark:hover:bg-orange-900/30",
      active: "active:bg-orange-200 dark:active:bg-orange-900/40",
      icon: <FaCalendarAlt className="text-orange-500" />,
    },
  };

  const iconMap = {
    evaluation: <FaChalkboardTeacher />,
    exam: <PiExam />,
  };

  const currentColor = colorConfig[color];
  const currentIcon = iconMap[icon];

  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full h-full p-6 rounded-xl flex flex-col items-center justify-center gap-4 shadow-sm border-2 ${currentColor.border} ${currentColor.bg} ${currentColor.hover} ${currentColor.active} transition-all duration-200 cursor-pointer group`}
    >
      <div
        className={`p-4 rounded-full ${currentColor.bg} border border-${currentColor.border} group-hover:bg-white bg-white dark:group-hover:bg-gray-800 transition-colors duration-200 shadow-inner`}
      >
        <div className={`text-2xl ${currentColor.text}`}>{currentIcon}</div>
      </div>

      <div className="text-center">
        <h3 className={`font-bold ${currentColor.text}`}>{title}</h3>
      </div>

      <div
        className={`p-2 rounded-full ${currentColor.bg} group-hover:bg-white dark:group-hover:bg-gray-800 transition-colors duration-200`}
      >
        <Plus className={`w-5 h-5 ${currentColor.text}`} />
      </div>
    </motion.button>
  );
};

export default AddNewItem;
