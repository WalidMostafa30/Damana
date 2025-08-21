import { useEffect, useRef } from "react";

const DropDown = ({ isOpen, onClose, buttonRef, children }) => {
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

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, buttonRef]);

  return (
    <div
      ref={dropdownRef}
      className={`absolute top-[calc(100%+10px)] end-0 rounded-lg overflow-hidden shadow-lg z-30 transition-all duration-300 ease-in-out
        transform origin-top
        ${
          isOpen
            ? "opacity-100 scale-100 max-h-[600px]"
            : "opacity-0 scale-95 max-h-0"
        }
      `}
      style={{ pointerEvents: isOpen ? "auto" : "none" }}
    >
      {children}
    </div>
  );
};

export default DropDown;
