"use client";

import React, { useEffect, useState } from "react";

interface SlidePuzzleProps {
  onComplete: () => void; // Callback when the puzzle is solved
}

const SlidePuzzle: React.FC<SlidePuzzleProps> = ({ onComplete }) => {
  const SIZE = 4; // 4x4 grid
  const TOTAL_TILES = SIZE * SIZE;
  const [tiles, setTiles] = useState<number[]>([]);
  const [showPuzzle, setShowPuzzle] = useState(false); // Controls whether the puzzle is shown
  const [timeElapsed, setTimeElapsed] = useState(0); // Timer in seconds
  const [timerRunning, setTimerRunning] = useState(false); // Timer state

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerRunning) {
      timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerRunning]);

  const initializePuzzle = () => {
    let shuffled = Array.from({ length: TOTAL_TILES - 1 }, (_, i) => i + 1); // [1..15]
    shuffled.push(0); // Add the empty tile
    shuffled = shuffle(shuffled);
    setTiles(shuffled);
    setShowPuzzle(true); // Show the puzzle
    setTimeElapsed(0); // Reset the timer
    setTimerRunning(true); // Start the timer
  };

  const shuffle = (array: number[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const moveTile = (index: number) => {
    const emptyIndex = tiles.indexOf(0);
    const row = Math.floor(index / SIZE);
    const col = index % SIZE;
    const emptyRow = Math.floor(emptyIndex / SIZE);
    const emptyCol = emptyIndex % SIZE;

    const isAdjacent =
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1);

    if (isAdjacent) {
      const newTiles = [...tiles];
      [newTiles[index], newTiles[emptyIndex]] = [
        newTiles[emptyIndex],
        newTiles[index],
      ];
      setTiles(newTiles);

      if (isSolved(newTiles)) {
        setTimerRunning(false); // Stop the timer
        setTimeout(() => onComplete(), 500); // Notify completion
      }
    }
  };

  const isSolved = (currentTiles: number[]) => {
    for (let i = 0; i < TOTAL_TILES - 1; i++) {
      if (currentTiles[i] !== i + 1) return false;
    }
    return currentTiles[TOTAL_TILES - 1] === 0;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {!showPuzzle ? (
        <button
          onClick={initializePuzzle}
          className="px-6 py-3 bg-red-500 text-white uppercase rounded-lg text-xl font-bold hover:bg-red-700 transition"
        >
          Започни играта
        </button>
      ) : (
        <>
          <div className="text-2xl font-medium mb-4 text-white">
            Време: {Math.floor(timeElapsed / 60)}мин и {timeElapsed % 60}сек.
          </div>
          <div className="grid grid-cols-4 gap-2 w-80 h-80">
            {tiles.map((tile, index) => (
              <div
                key={index}
                onClick={() => moveTile(index)}
                className={`flex items-center justify-center border bg-gray-200 text-2xl rounded-lg font-bold cursor-pointer ${
                  tile === 0 ? "bg-gray-400" : "hover:bg-gray-300"
                }`}
                style={{ visibility: tile === 0 ? "hidden" : "visible" }}
              >
                {tile !== 0 ? tile : ""}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SlidePuzzle;
