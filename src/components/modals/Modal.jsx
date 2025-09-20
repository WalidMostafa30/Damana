import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { backdropVariants, modalVariants } from "../../animations/modalV";

const Modal = ({
  openModal,
  setOpenModal,
  closeBtn = false,
  size,
  children,
}) => {
  return createPortal(
    <AnimatePresence>
      {openModal && (
        <motion.section
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed z-50 top-0 start-0 w-screen h-screen bg-black/80 flex items-center justify-center p-4"
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`w-full max-h-full p-4 pt-12 bg-white rounded-xl flex flex-col gap-4 relative overflow-y-auto ${
              size === "large"
                ? "max-w-6xl"
                : size === "small"
                ? "max-w-xl"
                : "max-w-2xl"
            } `}
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
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
