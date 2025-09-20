import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../../store/languageSlice/languageSlice";
import LoadingModal from "../modals/LoadingModal";

const LanguageSwitcher = ({ header = false }) => {
  const dispatch = useDispatch();
  const { lang } = useSelector((state) => state.language);

  const [openLoading, setOpenLoading] = useState(false);

  // ⬅️ كل ما lang يتغير عدل الاتجاه وافتح المودال
  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const handleToggle = () => {
    dispatch(changeLanguage(lang === "ar" ? "en" : "ar"));
    setOpenLoading(true);
  };

  return (
    <div className="relative text-lg">
      {/* زرار واحد يبدل اللغة */}
      <button
        onClick={handleToggle}
        className={`cursor-pointer px-2 py-1 rounded-md border-2 border-secondary ${
          header ? "bg-transparent border-white text-sm lg:text-base" : "bg-white"
        }`}
      >
        <span className="font-semibold">
          {lang === "en" ? "العربية" : "English"}
        </span>
      </button>

      {/* المودال */}
      <LoadingModal openModal={openLoading} />
    </div>
  );
};

export default LanguageSwitcher;
