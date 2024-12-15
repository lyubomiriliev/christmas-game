"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import { houses } from "./utils/constants";
import Modal from "./components/Modal";

export default function Home() {
  const Snowfall = dynamic(() => import("react-snowfall"), { ssr: false });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalNumber, setModalNumber] = useState("");

  const handleOpenModal = (content: string, id: string) => {
    setModalContent(content);
    setModalNumber(id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalContent("");
  };

  return (
    <section className="w-full h-full flex justify-center bg-slate-900 mx-auto relative">
      <Snowfall changeFrequency={600} snowflakeCount={1000} />

      <div className="w-full flex flex-col justify-center items-center absolute py-10">
        <h1 className="text-5xl max-w-screen-sm text-center text-white text-shadow-lg font-alice">
          КОЛЕДНАТА ИГРА НА
        </h1>
        <h1 className="text-7xl max-w-screen-sm text-center text-white text-shadow-lg font-alice">
          КРИС, МАРТИ КАРИ И МОНИ
        </h1>
        <h2 className="text-4xl max-w-screen-sm text-center text-white text-shadow-lg font-alice mt-20">
          Натиснете върху светещите къщи, за да получите вашите насоки.
        </h2>
      </div>
      <div className="w-full lg:w-2/4 h-full flex justify-center">
        <Image
          src="/christmasGameBG.png"
          alt="/"
          width={1920}
          height={1000}
          unoptimized
          className="w-full md:w-full h-full"
        />
      </div>
      {houses.map((house, index) => (
        <div
          key={index}
          className={`absolute cursor-pointer ${house.position}`}
          onClick={() => handleOpenModal(house.content, house.id)}
        >
          <Image
            src={house.src}
            alt={house.alt}
            width={600}
            height={400}
            className="hover:scale-110 duration-300 ease-in-out"
          />
        </div>
      ))}
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        content={modalContent}
        level={modalNumber}
      />
    </section>
  );
}
