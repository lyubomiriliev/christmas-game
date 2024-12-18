"use client";

import Image from "next/image";
import React, { useState } from "react";
import SlidePuzzle from "./SlidePuzzle";
import HanoiTower from "./HanoiTower";

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
  player: string;
  playerPic: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  content,
  level,
  game,
  player,
  playerPic,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showHint, setShowHint] = useState("");
  const [gameFinish, setGameFinish] = useState(false);

  const [mathAnswer, setMathAnswer] = useState<string>(""); // State for the input value
  const correctAnswer = 2719 * 77; // Calculate the correct answer once

  const handleGameFinished = (hint: string) => {
    setGameFinish(!gameFinish);
    setShowHint(hint);
  };

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
      case "chrisMath":
        const handleMathSubmit = (e: React.FormEvent) => {
          e.preventDefault(); // Prevent the form from refreshing the page
          if (parseInt(mathAnswer) === correctAnswer) {
            alert("Поздравления! Отговорът е верен."); // Correct answer
            onClose();
            setMathAnswer("");
          } else {
            alert("Грешен отговор. Опитайте отново!"); // Incorrect answer
          }
        };

        return (
          <div className="w-full flex flex-col justify-center items-center text-shadow-DEFAULT">
            <h1 className="text-white text-5xl ">2719 * 77 = X</h1>
            <form
              onSubmit={handleMathSubmit}
              className="flex flex-col justify-center items-center gap-2"
            >
              <label className="text-white text-2xl" htmlFor="result">
                Отговор:
              </label>
              <input
                type="number"
                value={mathAnswer}
                onChange={(e) => setMathAnswer(e.target.value)}
                className="w-40 p-2 text-center rounded-md text-black font-bold"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-red-600 rounded-md text-white uppercase font-bold hover:bg-red-700 transition"
              >
                Потвърди
              </button>
            </form>
          </div>
        );
      case "terry":
        return (
          <div className="w-full flex justify-center items-center">
            <div
              onClick={() => handleGameFinished(game.hint)}
              className="w-full"
            >
              <Image
                src={game.mama}
                alt="/"
                width={600}
                height={300}
                className="w-[80%]"
              />
            </div>
            <div>
              {gameFinish && (
                <div className="absolute left-0 translate-x-24 max-w-screen-sm flex flex-col gap-5">
                  <h1 className="text-white uppercase font-alice text-5xl text-shadow-lg">
                    Поздравления! Премина нивото
                  </h1>
                  <h1 className="text-3xl font-light uppercase text-white text-shadow-lg">
                    Улика: {showHint}
                  </h1>
                </div>
              )}
            </div>
          </div>
        );
      case "slidePuzzle":
        return (
          <div className="w-full flex justify-center items-center scale-125">
            <SlidePuzzle
              onComplete={() => {
                alert("Пъзелът е решен. Браво! Твоята улика е:");
                onClose(); // Close the modal on completion
              }}
            />
          </div>
        );
      case "hanoi":
        return (
          <div className="w-full flex justify-center items-center">
            <HanoiTower />
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
    <div className="fixed inset-0 p-6 bg-black bg-opacity-75 flex flex-col justify-start items-start z-50">
      <div className="bg-black rounded-lg w-full h-full flex flex-col justify-center items-center p-8 relative overflow-hidden z-20">
        <Image
          src="/opencardBG.png"
          alt="/"
          width={1200}
          height={600}
          className="w-full h-full absolute inset-0 blur-sm opacity-70 z-0"
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-6 text-5xl text-white hover:text-black"
        >
          &times;
        </button>
        <div className="text-center z-10 flex flex-col justify-center gap-10">
          <div className="flex items-center justify-center gap-5">
            <Image
              src={playerPic}
              alt={player}
              width={120}
              height={120}
              className="object-cover rounded-full"
            />
            <h2 className="text-5xl text-left font-bold font-alice mb-4 uppercase text-white text-shadow-DEFAULT">
              Играч: {player}
            </h2>
          </div>
          <p className="text-white text-4xl text-shadow-DEFAULT uppercase mb-6">
            {content}
          </p>
          {renderGameContent()}
        </div>
      </div>
    </div>
  );
};

export default Modal;
