import { useRef, useState } from "react";
import { SlBell } from "react-icons/sl";
import { IoIosArrowDown } from "react-icons/io";
import DropDown from "../../../common/DropDown";
import { FaUserAlt } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Avatar from "../../../common/Avatar";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchNotifications } from "../../../../services/notificationsService";
import Notifications from "./Notifications";
import { logoutUser } from "../../../../services/authService";

const HeaderActions = ({ setOpenNav }) => {
  const [openNotification, setOpenNotification] = useState(false);
  const [openProfileMenu, setOpenProfileMenu] = useState(false);

  const notificationBtnRef = useRef(null);
  const profileBtnRef = useRef(null);

  const { profile } = useSelector((state) => state.profile);

  // جلب الإشعارات
  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: fetchNotifications,
  });

  const logoutMutation = useMutation({
    mutationFn: () => logoutUser(),
    // onSuccess: () => window.location.reload(),
  });

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

            <Notifications
              notifications={notifications}
              isLoading={isLoading}
              onClose={() => setOpenNotification(false)}
            />
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
              to="/account"
              className="flex items-center gap-2 font-bold p-2 lg:p-3 lg:text-lg border border-primary bg-primary/10 text-primary rounded-lg cursor-pointer"
            >
              <FaUserAlt className="text-lg lg:text-2xl" />
              الملف الشخصي
            </Link>
            <Link
              to="/login"
              onClick={() => logoutMutation.mutate()}
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
