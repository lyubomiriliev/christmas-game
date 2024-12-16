"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { houses } from "./utils/constants";
import Modal from "./components/Modal";

export default function Home() {
  const Snowfall = dynamic(() => import("react-snowfall"), { ssr: false });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalNumber, setModalNumber] = useState("");

  const [currentHouse, setCurrentHouse] = useState(0); // Tracks the currently active house
  const [houseTimers, setHouseTimers] = useState<number[]>([]); // Stores the availability times for houses
  const [currentTime, setCurrentTime] = useState<number>(Date.now());
  const [timersStarted, setTimersStarted] = useState(false); // Controls when the timers should start

  const DELAY = 10 * 1000; // 15 minutes in milliseconds

  useEffect(() => {
    // Initialize timers for all houses but don't start them yet
    const initialTimers = houses.map(() => 0);
    setHouseTimers(initialTimers);
  }, []);

  // Update current time every second
  useEffect(() => {
    if (timersStarted) {
      const interval = setInterval(() => {
        setCurrentTime(Date.now());
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timersStarted]);

  const handleOpenModal = (content: string, id: string, houseIndex: number) => {
    if (currentTime >= houseTimers[houseIndex] && houseIndex === currentHouse) {
      setModalContent(content);
      setModalOpen(true);
      setModalNumber(id);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalContent("");

    if (!timersStarted) {
      setTimersStarted(true);
    }

    if (currentHouse + 1 < houses.length) {
      const updatedTimers = [...houseTimers];
      updatedTimers[currentHouse + 1] = currentTime + DELAY; // Set the timer for the next house
      setHouseTimers(updatedTimers);
      setCurrentHouse(currentHouse + 1); // Move to the next house
    }
  };

  const calculateCountdown = (targetTime: number) => {
    const remaining = targetTime - currentTime;
    const minutes = Math.floor((remaining / 1000 / 60) % 60);
    const seconds = Math.floor((remaining / 1000) % 60);
    return { minutes, seconds };
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
      {houses.map((house, index) => {
        const { minutes, seconds } = calculateCountdown(houseTimers[index]);
        const isAvailable = currentTime >= houseTimers[index] && timersStarted;

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
                !isAvailable ? " blur-sm pointer-events-none" : "cursor-pointer"
              }`}
            />

            {/* Timer */}
            {timersStarted && index === currentHouse + 1 && !isAvailable && (
              <div className="absolute top-0 left-10 bg-black bg-opacity-70 text-white text-sm p-2 rounded z-50">
                Unlocks in {minutes}m {seconds}s
              </div>
            )}
          </div>
        );
      })}
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        content={modalContent}
        level={modalNumber}
      />
    </section>
  );
}
