import { useRouter } from "next/navigation";
import { IoArrowBackSharp } from "react-icons/io5";

type headerPropsType = {
  title: string;
  description?: string;
  btnTitle?: string;
  btnAction?: () => any;
};

const Header = ({
  title,
  description,
  btnTitle,
  btnAction,
}: headerPropsType) => {
  const router = useRouter();

  return (
    <div className="flex justify-between flex-col md:flex-row">
      <div className="flex items-center gap-5 sm:gap-7">
        <IoArrowBackSharp
          style={{
            fontSize: "28px",
            color: "var(--primary-color1)",
            cursor: "pointer",
          }}
          onClick={() => router.back()}
        />
        <div>
          <h3 className="font-[700] text-[24px] sm:text-[32px] text-[var(--primary-color1)]">
            {title}
          </h3>
          <p className="text-[16px] mt-2">{description}</p>
        </div>
      </div>
      {btnTitle && btnAction && (
        <div className="w-[60%] sm:w-fit">
          <button className="colored-btn" onClick={btnAction}>
            {btnTitle}
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
