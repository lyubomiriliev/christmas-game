"use client";

import Image from "next/image";
import React, { useState } from "react";

interface Game {
  type: string;
  [key: string]: any; // Dynamic properties for different games
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  level: string;
  game?: Game;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  content,
  level,
  game,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  if (!isOpen) return null;

  // Render different game types
  const renderGameContent = () => {
    if (!game)
      return <p className="text-xl">No game available for this level.</p>;

    switch (game.type) {
      case "quiz":
        return (
          <div className="flex flex-col gap-10">
            {game.questions.map((q: any, index: number) => (
              <div key={index}>
                <p className="text-2xl">{q.question}</p>
                <div className="flex gap-4 mt-2">
                  {q.options.map((option: string, i: number) => (
                    <button
                      onClick={() => setSelectedAnswer(option)}
                      key={i}
                      className={`px-4 py-2 rounded hover:bg-gray-300 transition-colors ${
                        selectedAnswer === option
                          ? option === q.answer
                            ? "bg-green-400" // Correct answer
                            : "bg-red-400" // Incorrect answer
                          : "bg-gray-200"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case "puzzle":
        return (
          <div>
            <p className="text-2xl">{game.description}</p>
            <p className="italic text-sm mt-4">Hint: {game.answer}</p>
          </div>
        );
      case "memory":
        return (
          <div className="grid grid-cols-2 gap-4">
            {game.cards.map((card: string, index: number) => (
              <div
                key={index}
                className="bg-gray-200 w-20 h-20 flex items-center justify-center text-xl"
              >
                {card}
              </div>
            ))}
          </div>
        );
      default:
        return <p>Game type not supported.</p>;
    }
  };

  return (
    <div className="fixed inset-0 p-6 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full flex flex-col justify-center items-center h-full p-8 relative overflow-hidden z-20">
        <Image
          src="/modalBG.png"
          alt="/"
          width={1200}
          height={600}
          className="w-full absolute p-6 inset-0 opacity-20 blur-sm z-0"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-5xl text-gray-800 hover:text-black"
        >
          &times;
        </button>
        <div className="text-center">
          <h2 className="text-7xl font-bold mb-4 uppercase text-black">
            Ниво {Number(level) + 1}
          </h2>
          <p className="text-black text-3xl mb-6">{content}</p>
          {renderGameContent()}
        </div>
      </div>
    </div>
  );
};

export default Modal;
