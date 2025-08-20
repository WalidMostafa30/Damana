import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-white relative">
      <div className="container py-8 flex items-center justify-between">
        <ul className="flex flex-wrap items-center justify-center gap-5 lg:gap-10 w-full text-sm lg:text-base">
          <Link to={"/page/privacy_policy"}>سياسة الخصوصية</Link>
          <Link to={"/page/full_terms_and_conditions"}>الشروط والاحكام</Link>
          <Link to={"/page/about_us"}>من نحن</Link>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
