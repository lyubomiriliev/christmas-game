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
  game?: Game;
  player: string;
  playerPic: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  content,
  game,
  player,
  playerPic,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showHint, setShowHint] = useState("");
  const [gameFinish, setGameFinish] = useState(false);

  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const [mathAnswer, setMathAnswer] = useState<string>(""); // State for the input value
  const correctAnswer = 2719 * 77; // Calculate the correct answer once

  const handleGameFinished = (hint: string) => {
    setGameFinish(!gameFinish);
    setShowHint(hint);
  };

  const checkPassword = () => {
    const correctPassword = "1";
    if (passwordInput === correctPassword) {
      setShowPassword(!showPassword);
    } else {
      alert("Грешна парола. Опитайте отново.");
    }
  };

  const resetPasswordState = () => {
    setPasswordInput("");
    setShowPassword(true);
  };

  const handleClose = () => {
    onClose();
    resetPasswordState(); // Reset password input and state when modal closes
  };

  if (!isOpen) return null;

  // Render different game types
  const renderGameContent = () => {
    if (!game) return null;

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
                className="w-[95%]"
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
        const gameTitle = game.title;
        const gameObj = game.obj;
        return (
          <div className="w-full flex flex-col justify-center items-center scale-125">
            <SlidePuzzle
              gameTitle={gameTitle}
              gameObj={gameObj}
              onComplete={() => {
                alert(
                  "Пъзелът е решен. Браво! Обърни се към леля Вяра за подарък."
                );
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
      case "tikTok":
        return (
          <div>
            <h1 className="text-3xl text-white font-bold text-center my-4">
              TikTok Challenge
            </h1>
            <video
              width={340}
              height={200}
              controls
              className="rounded shadow-lg mx-auto mb-2"
              src="/FullSizeRender_1.mov"
            ></video>
            <a
              href="https://vm.tiktok.com/ZNeT7NnQo/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg">
                ЗАПОЧНИ ИГРАТА!
              </button>
            </a>
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
    }
  };

  return (
    <div className="fixed inset-0 p-6 bg-black bg-opacity-75 flex flex-col justify-start items-start z-50">
      {showPassword ? (
        <div className="w-full flex flex-col justify-center h-screen items-center">
          <h2 className="text-white text-2xl mb-4">Въведете парола:</h2>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="p-2 rounded border text-black"
          />
          <div className="flex items-center justify-center mt-4 gap-4">
            <button
              onClick={checkPassword}
              className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Потвърди
            </button>
            <button
              onClick={handleClose}
              className="bg-red-600 px-6 py-3 rounded text-white"
            >
              X
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-black rounded-lg w-full h-full flex flex-col justify-center items-center p-8 relative overflow-hidden z-20">
          <Image
            src="/opencardBG.png"
            alt="/"
            width={1200}
            height={600}
            className="w-full h-full absolute inset-0 blur-sm opacity-70 z-0"
          />
          <button
            onClick={handleClose}
            className="absolute top-4 right-6 text-5xl text-white hover:text-black"
          >
            &times;
          </button>
          <div className="text-center z-10 flex flex-col justify-center gap-10">
            <div className="flex items-center justify-center gap-5">
              <Image
                src={playerPic}
                alt={player}
                width={140}
                height={140}
                unoptimized
                className={`object-cover rounded-full ${
                  playerPic === "/all.png" ? "w-2/4" : "w-[125px]"
                }`}
              />
              <h2 className="text-4xl text-left font-bold font-alice mb-4 uppercase text-white text-shadow-DEFAULT">
                Играч: {player}
              </h2>
            </div>
            <p className="text-white text-4xl text-shadow-DEFAULT uppercase">
              {content}
            </p>
            {renderGameContent()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
