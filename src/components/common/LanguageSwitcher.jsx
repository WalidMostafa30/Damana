import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../../store/languageSlice/languageSlice";
import DropDown from "../common/DropDown";
import { AnimatePresence } from "framer-motion";
import flagAR from "../../assets/icons/flag-ar.png";
import flagEN from "../../assets/icons/flag-en.png";
import LoadingModal from "../modals/LoadingModal";
import { IoMdArrowDropdown } from "react-icons/io";

const LanguageSwitcher = () => {
  const dispatch = useDispatch();
  const { lang } = useSelector((state) => state.language);

  const [openMenu, setOpenMenu] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const langBtnRef = useRef(null);

  // ⬅️ كل ما lang يتغير عدل الاتجاه
  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const handleChange = (selectedLang) => {
    dispatch(changeLanguage(selectedLang));
    setOpenMenu(false);
    setOpenLoading(true);
  };

  return (
    <div className="relative text-lg" ref={langBtnRef}>
      {/* الزرار */}
      <div
        onClick={() => setOpenMenu((prev) => !prev)}
        className="flex items-center gap-2 cursor-pointer px-3 py-1 rounded-md bg-white border-2 border-secondary"
      >
        <img
          src={lang === "ar" ? flagAR : flagEN}
          alt="flag"
          className="w-6"
        />
        <span>{lang === "ar" ? "العربية" : "English"}</span>
        <IoMdArrowDropdown className="text-2xl" />
      </div>

      {/* القائمة */}
      <AnimatePresence>
        {openMenu && (
          <DropDown onClose={() => setOpenMenu(false)} buttonRef={langBtnRef}>
            <div className="bg-white w-40 p-2 rounded-md shadow space-y-2">
              <button
                onClick={() => handleChange("ar")}
                className="flex items-center gap-2 w-full px-2 py-1 hover:bg-gray-100 rounded"
              >
                <img src={flagAR} alt="ar" className="w-6" />
                العربية
              </button>
              <button
                onClick={() => handleChange("en")}
                className="flex items-center gap-2 w-full px-2 py-1 hover:bg-gray-100 rounded"
              >
                <img src={flagEN} alt="en" className="w-6" />
                English
              </button>
            </div>
          </DropDown>
        )}
      </AnimatePresence>
      <LoadingModal openModal={openLoading} />
    </div>
  );
};

export default LanguageSwitcher;
