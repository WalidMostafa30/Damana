import { CiMail } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

const TopHeader = () => {
  return (
    <header className="container py-4 flex flex-wrap items-center justify-center gap-4 lg:gap-10">
      <p className="text-lg text-neutral-500 flex items-center gap-2">
        09879768675
        <FaWhatsapp className="text-2xl" />
      </p>

      <p className="text-lg text-neutral-500 flex items-center gap-2">
        read@gmail.com
        <CiMail className="text-2xl" />
      </p>

      <p className="text-lg text-neutral-500 flex items-center gap-2">
        Amman . 10 Street . Damana Building
        <IoLocationOutline className="text-2xl" />
      </p>
    </header>
  );
};

export default TopHeader;
