import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NavBar = ({ openNav, setOpenNav }) => {
  const { t } = useTranslation();
  const { profile } = useSelector((state) => state.profile);

  return (
    <nav
      className={`flex flex-col xl:items-center gap-4 xl:gap-8 p-4 bg-primary absolute z-50 w-full xl:max-h-[500px] top-full left-0
          overflow-hidden transition-all duration-500 ease-in-out
          xl:static xl:flex-row xl:w-auto xl:p-0 ${
            openNav ? "max-h-[500px]" : "max-h-0 py-0"
          }`}
    >
      <NavLink
        onClick={() => setOpenNav(false)}
        to="/damanaty"
        className="navLink"
      >
        {t("components.layout.navbar.myGuarantees")}
      </NavLink>

      {profile?.account_type === "company" && (
        <NavLink
          onClick={() => setOpenNav(false)}
          to="/dashboard"
          className="navLink"
        >
          {t("components.layout.navbar.dashboard")}
        </NavLink>
      )}

      <NavLink
        onClick={() => setOpenNav(false)}
        to="/add-damana"
        className="navLink"
      >
        {t("components.layout.navbar.startGuarantee")}
      </NavLink>

      <NavLink
        onClick={() => setOpenNav(false)}
        to="/payment-options"
        className="navLink"
      >
        {t("components.layout.navbar.paymentOptions")}
      </NavLink>

      <NavLink
        onClick={() => setOpenNav(false)}
        to="/contact-us"
        className="navLink"
      >
        {t("components.layout.navbar.contactUs")}
      </NavLink>
    </nav>
  );
};

export default NavBar;
