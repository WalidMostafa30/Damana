import { NavLink } from "react-router-dom";

const NavBar = ({ openNav, setOpenNav }) => {
  return (
    <nav
      className={`flex flex-col lg:items-center gap-4 lg:gap-8 p-4 bg-primary absolute z-50 w-full lg:max-h-[500px] top-full left-0
          overflow-hidden transition-all duration-500 ease-in-out
          lg:static lg:flex-row lg:w-auto lg:p-0 ${
            openNav ? "max-h-[500px]" : "max-h-0 py-0"
          }`}
    >
      <NavLink
        onClick={() => setOpenNav(false)}
        to="/damanaty"
        className="navLink"
      >
        ضماناتي
      </NavLink>
      <NavLink
        onClick={() => setOpenNav(false)}
        to="/add-damana"
        className="navLink"
      >
        بدء ضمانة
      </NavLink>
      <NavLink
        onClick={() => setOpenNav(false)}
        to="/payment-options"
        className="navLink"
      >
        خيارات الدفع
      </NavLink>
      <NavLink
        onClick={() => setOpenNav(false)}
        to="/payment-options"
        className="navLink"
      >
        اتصل بنا
      </NavLink>
    </nav>
  );
};

export default NavBar;
