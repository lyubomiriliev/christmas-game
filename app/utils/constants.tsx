export const houses = [
  {
    id: "1",
    src: "/houses/house1x.png",
    player: "Terry",
    playerPic: "/terry.png",
    alt: "Level 1",
    content: "Къде е Мама?",
    position:
      "w-[255px] top-[315px] -right-[35px] md:w-[530px] md:top-[587px] md:-right-[106px] lg:w-[585px] lg:top-[695px] lg:right-[380px]",
    game: {
      type: "terry",
      questions: [
        { question: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
        {
          question: "What is the capital of France?",
          options: ["Paris", "Rome", "Berlin"],
          answer: "Paris",
        },
      ],
      mama: "/mama.png",
      hint: "Подаркът ти е зад теб!",
    },
  },
  {
    id: "2",
    src: "/houses/house2x.png",
    player: "Monnie & Carrie",
    playerPic: "/monnieCarrie.png",
    alt: "Level 2",
    content: "TikTok Challenge - Редувайте се! Камък ножица, хартия",
    position:
      "w-[300px] top-[403px] -left-[50px] md:w-[585px] md:top-[766px] md:-left-[106px] lg:w-[650px] lg:top-[900px] lg:left-[374px]",
    game: {
      type: "tikTok",
    },
  },
  {
    id: "3",
    src: "/houses/house3x.png",
    player: "Marti",
    playerPic: "/marti.png",
    alt: "Level 3",
    content:
      "Премести дисковете на последната кула подредени от голям към малък.",
    position:
      "w-[165px] top-[569px] -right-[13px] md:w-[340px] md:top-[1065px] md:-right-[44px] lg:w-[390px] lg:top-[1256px] lg:right-[450px]",
    game: {
      type: "hanoi",
    },
  },
  {
    id: "4",
    src: "/houses/house4x.png",
    player: "Chris",
    playerPic: "/chris.png",

    alt: "Level 4",
    content: "",
    position:
      "w-[250px] top-[643px] -left-[50px] md:w-[550px] md:top-[1200px] md:-left-[170px] lg:w-[550px] lg:top-[1435px] lg:left-[360px]",
    game: {
      type: "slidePuzzle",
      title: "Играеш за време! Натисни бутона, когато си готов.",
      obj: "Нареди пъзела: Числата трябва да са последователни като най-долното дясно поле трябва да остане празно.",
    },
  },
  {
    id: "5",
    src: "/houses/house5x.png",
    player: "Monnie",
    playerPic: "/monnie.png",
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
    player: "Carrie",
    playerPic: "/carrie.png",
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
    player: "Marti",
    playerPic: "/marti.png",

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
    player: "Chris",
    playerPic: "/chris.png",
    alt: "Level 8",
    content: "Реши задачата за да продължиш.",
    position:
      "w-[305px] top-[996px] -right-[50px] md:w-[500px] md:top-[2410px] md:-right-[20px] lg:w-[390px] lg:top-[1256px] lg:right-[450px]",
    game: {
      type: "chrisMath",
    },
  },
  {
    id: "ФИНАЛ",
    src: "/houses/finalx2.png",
    player: "ВСИЧКИ",
    playerPic: "/all.png",
    alt: "Final Level",
    content: "Congratulations! Claim your final prize.",
    position:
      "w-[250px] top-[908px] -left-[53px] md:w-[580px] md:top-[2961px] md:-left-[74px] lg:w-[550px] lg:top-[2015px] lg:left-[360px]",
    game: {
      type: "final",
      message: "Enjoy your special surprise!",
    },
  },
];
