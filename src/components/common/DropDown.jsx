import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { dropdownVariants } from "../../animations/dropdownV";

const DropDown = ({ onClose, buttonRef, children }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        buttonRef?.current &&
        !buttonRef.current.contains(e.target)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, buttonRef]);

  return (
    <motion.div
      ref={dropdownRef}
      variants={dropdownVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute top-[calc(100%+10px)] end-0 rounded-lg overflow-hidden shadow-lg z-30 origin-top"
    >
      {children}
    </motion.div>
  );
};

export default DropDown;
