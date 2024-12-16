export const houses = [
  {
    id: "1",
    src: "/houses/house1x.png",
    alt: "Level 1",
    content: "Welcome to the first level! Solve the following quiz.",
    position:
      "w-[255px] top-[315px] -right-[35px] md:w-[530px] md:top-[587px] md:-right-[106px] lg:w-[585px] lg:top-[695px] lg:right-[380px]",
    game: {
      type: "quiz",
      questions: [
        { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
        {
          question: "What is the capital of France?",
          options: ["Paris", "Rome", "Berlin"],
          answer: "Paris",
        },
      ],
    },
  },
  {
    id: "2",
    src: "/houses/house2x.png",
    alt: "Level 2",
    content: "Solve this riddle to proceed.",
    position:
      "w-[300px] top-[403px] -left-[50px] md:w-[585px] md:top-[766px] md:-left-[106px] lg:w-[650px] lg:top-[900px] lg:left-[374px]",
    game: {
      type: "puzzle",
      description: "I speak without a mouth and hear without ears. What am I?",
      answer: "An echo",
    },
  },
  {
    id: "3",
    src: "/houses/house3x.png",
    alt: "Level 3",
    content: "Match the cards to win this level.",
    position:
      "w-[165px] top-[569px] -right-[13px] md:w-[340px] md:top-[1065px] md:-right-[44px] lg:w-[390px] lg:top-[1256px] lg:right-[450px]",
    game: {
      type: "memory",
      cards: ["apple", "banana", "apple", "banana"], // Example card pairs
    },
  },
  {
    id: "4",
    src: "/houses/house4x.png",
    alt: "Level 4",
    content: "Complete this sequence to move forward.",
    position:
      "w-[250px] top-[643px] -left-[50px] md:w-[550px] md:top-[1200px] md:-left-[170px] lg:w-[550px] lg:top-[1435px] lg:left-[360px]",
    game: {
      type: "sequence",
      sequence: ["1", "2", "3", "4"], // Sequence to complete
      missing: "5", // Missing item
    },
  },
  {
    id: "5",
    src: "/houses/house5x.png",
    alt: "Level 5",
    content: "Answer this quiz to pass the level.",
    position:
      "w-[250px] top-[908px] -left-[53px] md:w-[480px] md:top-[1735px] md:-left-[102px] lg:w-[550px] lg:top-[2015px] lg:left-[360px]",
    game: {
      type: "quiz",
      questions: [
        { question: "What is 10 - 5?", options: ["3", "5", "7"], answer: "5" },
        {
          question: "Which planet is known as the Red Planet?",
          options: ["Earth", "Mars", "Venus"],
          answer: "Mars",
        },
      ],
    },
  },
  {
    id: "6",
    src: "/houses/house6x.png",
    alt: "Level 6",
    content: "Unscramble the word to win.",
    position:
      "w-[305px] top-[996px] -right-[50px] md:w-[600px] md:top-[1900px] md:-right-[108px] lg:w-[390px] lg:top-[1256px] lg:right-[450px]",
    game: {
      type: "unscramble",
      word: "TESNHCRIAMS", // Scrambled word
      answer: "CHRISTMAS",
    },
  },
  {
    id: "7",
    src: "/houses/house7x.png",
    alt: "Level 7",
    content: "Find the hidden word in the grid.",
    position:
      "w-[250px] top-[908px] -left-[53px] md:w-[450px] md:top-[2200px] md:-left-[140px] lg:w-[550px] lg:top-[2015px] lg:left-[360px]",
    game: {
      type: "wordSearch",
      grid: [
        ["C", "H", "R", "I", "S"],
        ["T", "M", "A", "S", "E"],
        ["G", "A", "M", "E", "S"],
        ["W", "I", "N", "T", "E"],
      ],
      word: "CHRISTMAS",
    },
  },
  {
    id: "8",
    src: "/houses/house8x.png",
    alt: "Level 8",
    content: "Complete the sentence.",
    position:
      "w-[305px] top-[996px] -right-[50px] md:w-[500px] md:top-[2410px] md:-right-[20px] lg:w-[390px] lg:top-[1256px] lg:right-[450px]",
    game: {
      type: "sentenceCompletion",
      sentence: "The holiday season is all about _____.",
      answer: "joy",
    },
  },
  {
    id: "ФИНАЛ",
    src: "/houses/finalx2.png",
    alt: "Final Level",
    content: "Congratulations! Claim your final prize.",
    position:
      "w-[250px] top-[908px] -left-[53px] md:w-[580px] md:top-[2975px] md:-left-[77px] lg:w-[550px] lg:top-[2015px] lg:left-[360px]",
    game: {
      type: "final",
      message: "Enjoy your special surprise!",
    },
  },
];
