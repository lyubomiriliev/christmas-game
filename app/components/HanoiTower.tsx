"use client";

import React, { useState } from "react";

const INITIAL_DISKS = 5; // Number of disks

// Tower of Hanoi Component
const HanoiTower: React.FC = () => {
  const [towers, setTowers] = useState<number[][]>([
    Array.from({ length: INITIAL_DISKS }, (_, i) => INITIAL_DISKS - i), // Initialize disks on Tower 1
    [],
    [],
  ]);
  const [selectedTower, setSelectedTower] = useState<number | null>(null);
  const [moves, setMoves] = useState<number>(0);

  const handleTowerClick = (towerIndex: number) => {
    if (selectedTower === null) {
      // Select a tower to move a disk from
      if (towers[towerIndex].length > 0) {
        setSelectedTower(towerIndex);
      }
    } else {
      // Move the disk to the selected tower
      moveDisk(selectedTower, towerIndex);
      setSelectedTower(null);
    }
  };

  const moveDisk = (from: number, to: number) => {
    const newTowers = [...towers];
    const fromTower = [...newTowers[from]];
    const toTower = [...newTowers[to]];

    if (fromTower.length === 0) return;

    const diskToMove = fromTower[fromTower.length - 1];

    if (
      toTower.length === 0 || // Empty tower
      diskToMove < toTower[toTower.length - 1] // Smaller disk on larger one
    ) {
      fromTower.pop(); // Remove disk
      toTower.push(diskToMove); // Add disk to new tower
      newTowers[from] = fromTower;
      newTowers[to] = toTower;
      setTowers(newTowers);
      setMoves((prev) => prev + 1);
    }
  };

  const restartGame = () => {
    setTowers([[5, 4, 3, 2, 1], [], []]);
    setSelectedTower(null);
    setMoves(0);
  };

  const isGameComplete = towers[2].length === 5;

  return (
    <div className="w-full flex flex-col items-center justify-center rounded-xl p-4 bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Кулите на Ханой</h1>
      <h2 className="text-2xl mb-4">Движения: {moves}</h2>

      {isGameComplete && (
        <div className="text-green-500 text-3xl mb-4">
          🎉 Поздравления! Обърни се към леля Вяра за своя подарък! 🎉
        </div>
      )}

      <div className="flex gap-8">
        {towers.map((tower, towerIndex) => (
          <div
            key={towerIndex}
            className={`w-48 h-80 border-4 flex flex-col-reverse justify-start items-center cursor-pointer ${
              selectedTower === towerIndex
                ? "border-blue-500 rounded-xl"
                : "border-gray-400 rounded-xl"
            }`}
            onClick={() => handleTowerClick(towerIndex)}
          >
            {/* Render disks */}
            {tower.map((disk, diskIndex) => (
              <div
                key={diskIndex}
                className="h-8 z-10"
                style={{
                  width: `${disk * 34}px`,
                  backgroundColor: `hsl(${disk * 40}, 70%, 50%)`,
                  margin: "4px 0",
                  borderRadius: "10px",
                }}
              ></div>
            ))}
            <div className="w-3 h-[20%] bg-black absolute rounded-tr-lg rounded-tl-lg"></div>
          </div>
        ))}
      </div>

      <button
        onClick={restartGame}
        className="mt-6 px-6 py-2 bg-blue-500 text-white rounded uppercase hover:bg-blue-700"
      >
        Рестартирай играта
      </button>
    </div>
  );
};

export default HanoiTower;
