import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const Modal = ({ openModal, setOpenModal, children }) => {
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
      className={`fixed z-50 top-0 end-0 w-full h-screen bg-black/80 flex items-center justify-center transition-opacity duration-300 p-4 ${
        openModal ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={() => setOpenModal(false)}
    >
      <div
        className={`w-full max-w-2xl p-4 pt-12 bg-white rounded-xl duration-300 flex flex-col gap-4 space-y-4 ${
          openModal ? "translate-y-0" : "translate-y-8"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="text-3xl cursor-pointer absolute top-4 start-4 z-10"
          onClick={() => setOpenModal(false)}
        >
          <IoClose />
        </button>
        {children}
      </div>
    </section>
  );
};

export default Modal;
