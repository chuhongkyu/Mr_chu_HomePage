export const ModalVariant = {
  inital: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, type: "spring" },
  },
  exit: {
    scale: 0,
    transition: { duration: 0.5, type: "spring" },
  },
};