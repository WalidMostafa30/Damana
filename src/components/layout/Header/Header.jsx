import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/images/header-logo.png";
import { SlBell } from "react-icons/sl";
import { IoIosArrowDown } from "react-icons/io";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import DropDown from "../../common/DropDown";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);

  const notificationBtnRef = useRef(null);
  const profileBtnRef = useRef(null);

  return (
    <header className="bg-primary text-white relative">
      <div className="container py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={logo} alt="logo" loading="lazy" className="w-40" />
        </div>

        <nav
          className={`flex flex-col lg:items-center gap-4 lg:gap-8 p-4 bg-primary absolute z-50 w-full lg:max-h-[500px] top-full left-0
          overflow-hidden transition-all duration-500 ease-in-out
          lg:static lg:flex-row lg:w-auto lg:p-0 ${
            openNav ? "max-h-[500px]" : "max-h-0 py-0"
          }`}
        >
          <NavLink to="/" className="navLink">
            ضماناتي
          </NavLink>
          <NavLink to="/add-damana" className="navLink">
            بدء ضمانة
          </NavLink>
          <NavLink to="/payment" className="navLink">
            خيارات الدفع
          </NavLink>
          <NavLink to="/contact-us" className="navLink">
            اتصل بنا
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative" ref={notificationBtnRef}>
            <SlBell
              className="text-2xl cursor-pointer"
              onClick={() => setOpenNotification((prev) => !prev)}
            />
            <span className="absolute -top-1 -left-1 w-3 h-3 bg-error-200 rounded-full" />
            <DropDown
              isOpen={openNotification}
              onClose={() => setOpenNotification(false)}
              buttonRef={notificationBtnRef}
            >
              <div className="bg-white w-80">
                <h3 className="text-lg text-neutral-800 font-bold p-4">
                  الاشعارات
                </h3>
                <div className="flex gap-4 p-4 bg-secondary/20 cursor-pointer">
                  <div
                    dir="ltr"
                    className="w-12 h-12 text-2xl font-bold bg-white rounded-full flex items-center justify-center"
                  >
                    <span className="text-primary">R</span>
                    <span className="text-secondary">A</span>
                  </div>
                  <p className="text-sm text-neutral-800 flex-1">
                    <span className="font-bold text-primary">
                      شركه مرسيدس للسيارات
                    </span>{" "}
                    ارسلت اليك طلب ضمانه لمتابعه عمليه البيع وعمليه نقل الملكيه
                    لضمانه رقمها{" "}
                    <span className="font-bold text-primary">#123</span>
                  </p>
                </div>
              </div>
            </DropDown>
          </div>

          <div
            ref={profileBtnRef}
            onClick={() => setOpenProfileMenu((prev) => !prev)}
            className="flex items-center gap-2 cursor-pointer relative"
          >
            <div
              dir="ltr"
              className="w-12 h-12 text-2xl font-bold bg-white rounded-full flex items-center justify-center"
            >
              <span className="text-primary">Y</span>
              <span className="text-secondary">M</span>
            </div>
            <p className="text-lg hidden lg:block">ياسمين محمد</p>
            <IoIosArrowDown className="text-2xl" />
            <DropDown
              isOpen={openProfileMenu}
              onClose={() => setOpenProfileMenu(false)}
              buttonRef={profileBtnRef}
            >
              <div className="bg-white w-80">
                <div className="flex gap-4 p-4 bg-secondary/20 cursor-pointer">
                  Log Out
                </div>
              </div>
            </DropDown>
          </div>

          <span
            onClick={() => setOpenNav((prev) => !prev)}
            className="text-3xl cursor-pointer block lg:hidden"
          >
            {openNav ? <IoClose /> : <HiMenuAlt2 />}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
