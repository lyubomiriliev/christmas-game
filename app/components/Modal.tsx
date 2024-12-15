import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  level: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, content, level }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 p-6 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full h-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-5xl text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            Ниво {level}
          </h2>
          <p className="text-gray-700">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
