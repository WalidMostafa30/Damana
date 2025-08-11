import { useEffect } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

const Modal = ({ openModal, setOpenModal, closeBtn = false, children }) => {
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

  return createPortal(
    <section
      className={`fixed z-50 top-0 start-0 w-screen h-screen bg-black/80 flex items-center justify-center transition-opacity duration-300 p-4 ${
        openModal ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      <div
        className={`w-full max-w-2xl p-4 pt-12 bg-white rounded-xl duration-300 flex flex-col gap-4 relative ${
          openModal ? "translate-y-0" : "translate-y-8"
        }`}
      >
        {closeBtn && (
          <span
            onClick={() => setOpenModal(false)}
            className="absolute top-4 right-4 text-2xl cursor-pointer"
          >
            <IoClose />
          </span>
        )}
        {children}
      </div>
    </section>,
    document.body
  );
};

export default Modal;
