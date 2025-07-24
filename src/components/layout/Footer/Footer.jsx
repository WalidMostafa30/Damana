import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-white relative">
      <div className="container py-8 flex items-center justify-between">
        <ul className="flex flex-wrap items-center justify-center gap-10 w-full">
          <Link to={"/"}>سياسة الخصوصية</Link>
          <Link to={"/"}>الشروط والاحكام</Link>
          <Link to={"/"}>من نحن</Link>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
