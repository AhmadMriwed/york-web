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
    <div className="flex justify-between items-center flex-wrap gap-4">
      <div>
        <div className="flex items-center gap-2">
          <IoArrowBackSharp
            style={{
              fontSize: "28px",
              color: "var(--primary-color1)",
              cursor: "pointer",
            }}
            onClick={() => router.back()}
          />
          <h3 className="font-bold text-[24px] sm:text-[32px] text-[var(--primary-color1)]">
            {title}
          </h3>
        </div>
        <p className="text-[14px] sm:text-[16px] mt-2">{description}</p>
      </div>
      {btnTitle && btnAction && (
        <button className="colored-btn" onClick={btnAction}>
          {btnTitle}
        </button>
      )}
    </div>
  );
};

export default Header;
