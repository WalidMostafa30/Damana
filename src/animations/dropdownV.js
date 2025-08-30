export const dropdownVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    maxHeight: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    maxHeight: 600,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    maxHeight: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};
