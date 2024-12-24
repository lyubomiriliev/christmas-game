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
  const [currentTime, setCurrentTime] = useState<number | null>(null); // Set to `null` initially to avoid SSR mismatches

  //HOUSES DELAY TIME:
  const DELAY = 0; // Timer delay in milliseconds
  const FINAL_UNLOCK_TIME = 0;

  // Initialize timers for houses
  useEffect(() => {
    const savedTimers = localStorage.getItem("houseTimers");
    const savedCurrentHouse = localStorage.getItem("currentHouse");

    if (savedTimers && savedCurrentHouse) {
      // Load saved state from localStorage
      setHouseTimers(JSON.parse(savedTimers));
      setCurrentHouse(Number(savedCurrentHouse));
    } else {
      // Initialize state if no saved data exists
      const initialTimers = houses.map((_, index) => {
        return index === 0 ? 0 : null; // House 1 is unlocked (0), others are locked (null)
      });
      setHouseTimers(initialTimers);
    }
    // Set initial time after the component has mounted
    setCurrentTime(Date.now());
  }, []);

  // Update current time every second
  useEffect(() => {
    if (currentTime === null) return; // Ensure the timer starts only after the component has mounted

    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [currentTime]);

  // Save state to localStorage whenever timers or current house changes
  useEffect(() => {
    if (houseTimers.length > 0) {
      localStorage.setItem("houseTimers", JSON.stringify(houseTimers));
    }
    localStorage.setItem("currentHouse", String(currentHouse));
  }, [houseTimers, currentHouse]);

  // Calculate remaining countdown time for locked houses
  const calculateCountdown = (targetTime: number | null) => {
    if (targetTime === null || currentTime === null)
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }; // No timer for locked houses
    const remaining = Math.max(targetTime - currentTime, 0);
    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((remaining / 1000 / 60) % 60);
    const seconds = Math.floor((remaining / 1000) % 60);
    return { days, hours, minutes, seconds };
  };

  // Open the modal for the current house
  const handleOpenModal = (content: string, id: string, houseIndex: number) => {
    if (!currentTime) return; // Prevent interaction when currentTime is null

    if (houseIndex < 4) {
      // Logic for the first four houses with timers
      if (
        houseTimers[houseIndex] !== null &&
        currentTime >= houseTimers[houseIndex]!
      ) {
        setModalContent(content);
        setModalOpen(true);
        setModalNumber(houseIndex);
      }
    } else if (houseIndex === houses.length - 1) {
      // Final house logic
      if (currentTime >= FINAL_UNLOCK_TIME) {
        setModalContent(content);
        setModalOpen(true);
        setModalNumber(houseIndex);
      }
    } else {
      // Houses 5-8 require password
      setModalContent(content);
      setModalOpen(true);
      setModalNumber(houseIndex);
    }
  };

  // Close the modal and set the timer for the next house
  const handleCloseModal = () => {
    setModalOpen(false);
    setModalContent("");

    // Only trigger the next house's timer if the modal for the current house was closed
    if (modalNumber === currentHouse && currentHouse + 1 < houses.length - 1) {
      const updatedTimers = [...houseTimers];
      updatedTimers[currentHouse + 1] = (currentTime ?? 0) + DELAY; // Set the timer for the next house
      setHouseTimers(updatedTimers);
      setCurrentHouse(currentHouse + 1); // Move to the next house
    }
  };

  return (
    <section className="w-full h-full flex justify-center bg-slate-900 mx-auto relative">
      <SnowfallEffect />
      <div className="w-full flex flex-col justify-center items-center absolute py-10">
        <h1 className="text-5xl max-w-screen-sm text-center text-white text-shadow-lg ">
          КОЛЕДНАТА ИГРА НА
        </h1>
        <h1 className="text-7xl max-w-screen-sm text-center text-white text-shadow-lg ">
          КРИС, МАРТИ КАРИ И МОНИ
        </h1>
        <span className="text-white text-5xl text-shadow-lg uppercase">
          + Тери
        </span>
        <h2 className="text-4xl max-w-screen-sm text-center text-white text-shadow-lg  mt-20">
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
        const isFinalHouse = index === houses.length - 1; // Check if it's the final house
        const { days, hours, minutes, seconds } = calculateCountdown(
          isFinalHouse ? FINAL_UNLOCK_TIME : houseTimers[index]
        );
        const isAvailable = isFinalHouse
          ? currentTime && currentTime >= FINAL_UNLOCK_TIME
          : houseTimers[index] !== null &&
            currentTime &&
            currentTime >= houseTimers[index]!;

        // Default to non-available if currentTime is null

        const shouldShowTimer =
          isFinalHouse || (index < 4 && index === currentHouse);

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
              className={`hover-scale-110 duration-300 ease-in-out ${
                ((index >= 0 && index <= 3) || isFinalHouse) && !isAvailable
                  ? "pointer-events-none"
                  : "cursor-pointer"
              }`}
            />

            {/* Timer */}
            {!isAvailable && shouldShowTimer && (
              <div className="absolute w-40 top-0 left-32 bg-white text-center text-black  text-lg p-2 rounded z-50">
                {isFinalHouse
                  ? `Отключване след ${days}д, ${hours}ч, ${minutes}мин и ${seconds}сек`
                  : `Отключване след ${minutes}мин и ${seconds}сек`}
              </div>
            )}
          </div>
        );
      })}

      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        content={modalContent}
        game={modalNumber !== null ? houses[modalNumber]?.game : undefined}
        player={modalNumber !== null ? houses[modalNumber]?.player : ""}
        playerPic={modalNumber !== null ? houses[modalNumber]?.playerPic : ""}
      />
    </section>
  );
}
