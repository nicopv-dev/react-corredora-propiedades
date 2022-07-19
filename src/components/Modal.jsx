import { motion, AnimatePresence } from "framer-motion";
import { XIcon as XIconSolid } from "@heroicons/react/solid";

export default function Modal({
  showModal,
  onChangeShowModal,
  title,
  children,
  size = "max-w-3xl",
}) {
  const backDrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modal = {
    hidden: {
      y: "0",
      opacity: 0,
    },
    visible: {
      y: "70px",
      opacity: 1,
      transition: { delay: 0.5 },
    },
  };

  const closeModal = () => {
    onChangeShowModal();
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          variants={backDrop}
          initial="hidden"
          animate="visible"
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-30"
        >
          <motion.div
            variants={modal}
            className={`bg-white shadow-lg rounded-lg p-4 mx-auto ${size}`}
          >
            {/* title */}
            <div className="flex items-center justify-between p-2">
              <p className="w-6" />
              <h2 className="text-xl font-medium">{title}</h2>
              <button type="button" onClick={closeModal}>
                <XIconSolid className="w-6 h-6 text-black" />
              </button>
            </div>
            <div className="p-2">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
