import { CiMail } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const TopHeader = () => {
  const { data: appConfig, error } = useSelector((state) => state.appConfig);

  if (error) return null;

  return (
    <header className="container py-4 hidden lg:flex flex-wrap items-center justify-center gap-4 lg:gap-10">
      <p className="text-lg text-neutral-500 flex items-center gap-2">
        {appConfig?.contacts.whatsapp}
        <FaWhatsapp className="text-2xl" />
      </p>

      <p className="text-lg text-neutral-500 flex items-center gap-2">
        {appConfig?.contacts.email}
        <CiMail className="text-2xl" />
      </p>

      <p className="text-lg text-neutral-500 flex items-center gap-2">
        {appConfig?.contacts.address}
        <IoLocationOutline className="text-2xl" />
      </p>
    </header>
  );
};

export default TopHeader;
