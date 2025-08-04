import { useRef, useState } from "react";
import { SlBell } from "react-icons/sl";
import { IoIosArrowDown } from "react-icons/io";
import DropDown from "../../common/DropDown";
import { FaUserAlt } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Avatar from "../../common/Avatar";
import { useSelector } from "react-redux";

const HeaderActions = ({ setOpenNav }) => {
  const [openNotification, setOpenNotification] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);

  const notificationBtnRef = useRef(null);
  const profileBtnRef = useRef(null);

  const { profile } = useSelector((state) => state.profile);

  return (
    <div className="flex items-center gap-4">
      {/* notification */}
      <div className="relative" ref={notificationBtnRef}>
        <SlBell
          className="text-xl lg:text-2xl cursor-pointer"
          onClick={() => {
            setOpenNotification((prev) => !prev);
            setOpenProfileMenu(false);
            setOpenNav(false);
          }}
        />
        <span className="absolute -top-1 -left-1 w-3 h-3 bg-error-200 rounded-full" />
        <DropDown
          isOpen={openNotification}
          onClose={() => setOpenNotification(false)}
          buttonRef={notificationBtnRef}
        >
          <div className="bg-white w-80 lg:w-96">
            <h3 className="lg:text-lg text-neutral-800 font-bold p-4">
              الاشعارات
            </h3>
            <div className="flex gap-2 lg:gap-4 p-4 bg-secondary/20 cursor-pointer">
              <Avatar
                image={profile?.profile_image_full_path}
                name={profile?.name}
                size="lg"
              />
              <p className="text-sm text-neutral-800 line-clamp-3 flex-1">
                <span className="font-bold text-primary">
                  شركه مرسيدس للسيارات
                </span>{" "}
                ارسلت اليك طلب ضمانه لمتابعه عمليه البيع وعمليه نقل الملكيه
                لضمانه رقمها{" "}
                <span className="font-bold text-primary">#123</span>
              </p>
            </div>
            <Link
              onClick={() => setOpenNotification(false)}
              to="/notifications"
              className="text-primary text-sm font-bold p-4 flex items-center gap-1 cursor-pointer"
            >
              <SlBell className="text-2xl" />
              رؤيه كل الاشعارات
            </Link>
          </div>
        </DropDown>
      </div>

      {/* profile */}
      <div
        ref={profileBtnRef}
        onClick={() => {
          setOpenProfileMenu((prev) => !prev);
          setOpenNotification(false);
          setOpenNav(false);
        }}
        className="flex items-center gap-2 cursor-pointer relative"
      >
        <Avatar
          image={profile?.profile_image_full_path}
          name={profile?.name}
          size="md"
        />
        <p className="text-lg hidden lg:block">{profile?.name}</p>
        <IoIosArrowDown className="text-2xl hidden lg:block" />
        <DropDown
          isOpen={openProfileMenu}
          onClose={() => setOpenProfileMenu(false)}
          buttonRef={profileBtnRef}
        >
          <div className="bg-white w-48 lg:w-60 space-y-2 p-2">
            <Link
              to="/profile"
              className="flex items-center gap-2 font-bold p-2 lg:p-3 lg:text-lg border border-primary bg-primary/10 text-primary rounded-lg cursor-pointer"
            >
              <FaUserAlt className="text-lg lg:text-2xl" />
              الملف الشخصي
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-2 font-bold p-2 lg:p-3 lg:text-lg border border-error-200 bg-error-200/10 text-error-200 rounded-lg cursor-pointer"
            >
              <RiLogoutBoxRFill className="text-lg lg:text-2xl" />
              تسجيل الخروج
            </Link>
          </div>
        </DropDown>
      </div>
    </div>
  );
};

export default HeaderActions;
