import { useEffect, useState } from "react";
import logo from "../../../assets/images/header-logo.png";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import HeaderActions from "./HeaderActions/HeaderActions";
import NavBar from "./NavBar";
import { useDispatch } from "react-redux";
import { getProfileAct } from "../../../store/profile/profileAction";
import { Link } from "react-router-dom";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileAct());
  }, [dispatch]);

  return (
    <header className="bg-primary text-white relative">
      <div className="container py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            onClick={() => setOpenNav((prev) => !prev)}
            className="text-3xl cursor-pointer block lg:hidden"
          >
            {openNav ? <IoClose /> : <HiMenuAlt2 />}
          </span>
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              loading="lazy"
              className="w-32 lg:w-40"
            />
          </Link>
        </div>

        <NavBar openNav={openNav} setOpenNav={setOpenNav} />

        <HeaderActions setOpenNav={setOpenNav} />
      </div>
    </header>
  );
};

export default Header;
