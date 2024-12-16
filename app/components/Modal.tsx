import Image from "next/image";
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
      <div className="bg-white rounded-lg w-full flex flex-col justify-center items-center h-full p-8 relative overflow-hidden z-20">
        <Image
          src="/modalBG.png"
          alt="/"
          width={1200}
          height={600}
          className="w-full absolute p-6 inset-0 opacity-15 z-0"
        />
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-5xl text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        <div className="text-center">
          <h2 className="text-7xl font-bold mb-4 text-black">
            Ниво {Number(level) + 1}
          </h2>
          <p className="text-black text-3xl">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
