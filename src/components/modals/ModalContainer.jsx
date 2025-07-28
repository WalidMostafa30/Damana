import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const ModalContainer = ({ openModal, setOpenModal, children }) => {
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [openModal]);

  return (
    <section
      className={`fixed z-50 top-0 end-0 w-full h-screen bg-black/80 flex items-center justify-center transition-opacity duration-300 sectionPadding ${
        openModal ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={() => setOpenModal(false)}
    >
      <button
        className="text-2xl flex items-center justify-center w-8 h-8 rounded-full bg-light-red mb-4 cursor-pointer
          absolute top-4 start-4 z-50"
        onClick={() => setOpenModal(false)}
      >
        <IoClose />
      </button>

      <div
        className={`w-full max-w-7xl p-4 bg-white rounded-xl duration-300 flex flex-col gap-4 ${
          openModal ? "translate-y-0" : "translate-y-8"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </section>
  );
};

export default ModalContainer;
