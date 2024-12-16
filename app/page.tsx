"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { houses } from "./utils/constants";
import Modal from "./components/Modal";
import SnowfallEffect from "./components/SnowfallEffect";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalNumber, setModalNumber] = useState<number | null>(null); // Track the index of the currently opened modal
  const [currentHouse, setCurrentHouse] = useState(0); // Tracks the currently active house
  const [houseTimers, setHouseTimers] = useState<(number | null)[]>([]); // Stores the availability times for houses
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  const DELAY = 10 * 1000; // Timer delay in milliseconds

  // Initialize timers for houses
  useEffect(() => {
    const initialTimers = houses.map((_, index) => {
      return index === 0 ? 0 : null; // House 1 is unlocked (0), others are locked (null)
    });
    setHouseTimers(initialTimers);
  }, []);

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate remaining countdown time for locked houses
  const calculateCountdown = (targetTime: number | null) => {
    if (targetTime === null) return { minutes: 0, seconds: 0 }; // No timer for locked houses
    const remaining = Math.max(targetTime - currentTime, 0);
    const minutes = Math.floor((remaining / 1000 / 60) % 60);
    const seconds = Math.floor((remaining / 1000) % 60);
    return { minutes, seconds };
  };

  // Open the modal for the current house
  const handleOpenModal = (content: string, id: string, houseIndex: number) => {
    if (
      houseTimers[houseIndex] !== null &&
      currentTime >= houseTimers[houseIndex]!
    ) {
      setModalContent(content);
      setModalOpen(true);
      setModalNumber(houseIndex); // Set the modalNumber to the index of the house
    }
  };

  // Close the modal and set the timer for the next house
  const handleCloseModal = () => {
    setModalOpen(false);
    setModalContent("");

    // Only trigger the next house's timer if the modal for the current house was closed
    if (modalNumber === currentHouse) {
      if (currentHouse + 1 < houses.length) {
        const updatedTimers = [...houseTimers];
        updatedTimers[currentHouse + 1] = currentTime + DELAY; // Set the timer for the next house
        setHouseTimers(updatedTimers);
        setCurrentHouse(currentHouse + 1); // Move to the next house
      }
    }
  };

  return (
    <section className="w-full h-full flex justify-center bg-slate-900 mx-auto relative">
      <SnowfallEffect />
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
          priority
          className="w-full md:w-full h-full"
        />
      </div>

      {houses.map((house, index) => {
        const { minutes, seconds } = calculateCountdown(houseTimers[index]);
        const isAvailable =
          houseTimers[index] !== null && currentTime >= houseTimers[index]!;

        return (
          <div
            key={index}
            className={`absolute cursor-pointer ${house.position}`}
            onClick={() => handleOpenModal(house.content, house.id, index)}
          >
            {/* House Image */}
            <Image
              src={house.src}
              alt={house.alt}
              width={600}
              height={400}
              className={`hover:scale-110 duration-300 ease-in-out ${
                !isAvailable ? "blur-sm pointer-events-none" : "cursor-pointer"
              }`}
            />

            {/* Timer */}
            {!isAvailable && houseTimers[index] !== null && (
              <div className="absolute w-40 top-0 left-40 bg-white text-center text-black font-alice text-lg p-2 rounded z-50">
                Отключване след {minutes}мин {seconds}секунди
              </div>
            )}
          </div>
        );
      })}

      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        content={modalContent}
        level={modalNumber?.toString() || ""}
      />
    </section>
  );
}
