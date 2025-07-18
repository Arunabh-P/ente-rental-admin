import { FC, ReactNode, useEffect } from "react";

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  return (
    <>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50 transition-opacity"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 ">
            <div
              className="bg-white rounded-lg shadow-xl transform transition-all w-fit "
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "scale(1)" : "scale(0.95)",
              }}
            >
              <div className="p-6  w-fit ">
                  <button
                    onClick={onClose}
                    className="text-gray-600 hover:text-gray-900 cursor-pointer"
                  >
                    ✕
                  </button>
                <div>{children}</div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
