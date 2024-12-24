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
    content:
      "Врмеме е за TikTok Challenge! Ще играете заедно, но ще се редувате - Играйте 'Камък ножица, хартия', за да решите кой ще играе първи.",
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
      "Целта на играта е да успееш да прехвърлиш всички дискове от най-лявата кула на най-дясната, като не поставяш по-голям диск върху по-малък. (Да са подредени по големина, отдолу нагоре)",
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
      obj: "Нареди пъзела! Подреди числата от 1 до 15 чрез разместване. Те трябва да са последователни и да вървят от ляво надясно и от долу нагоре като най-долното дясно поле трябва да остане празно.",
    },
  },
  {
    id: "5",
    src: "/houses/house5x.png",
    player: "Monnie",
    playerPic: "/monnie.png",
    alt: "Level 5",
    content:
      "Там листовете оживяват, думи върху тях остават. Ще намериш следващия знак, там, където се печата пак и пак.",
    position:
      "w-[250px] top-[908px] -left-[53px] md:w-[480px] md:top-[1735px] md:-left-[102px] lg:w-[550px] lg:top-[2015px] lg:left-[360px]",
  },
  {
    id: "6",
    src: "/houses/house6x.png",
    player: "Carrie",
    playerPic: "/carrie.png",
    alt: "Level 6",
    content:
      "Там, където всяка болка намира си лек, и шишенца и тайни отвари стоят подред. Сред тях те чака скрита следа, която ще те отведе до тайна игра.",
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
    content:
      "Тук пазители на камината седят, със стомана в пламъци горят. Щипки, лопатка, вечно на стража, тяхната мисия е жар да откажат. Задачата си търси сред тях, там е скрита със замах.",
    position:
      "w-[250px] top-[908px] -left-[53px] md:w-[450px] md:top-[2200px] md:-left-[140px] lg:w-[550px] lg:top-[2015px] lg:left-[360px]",
  },
  {
    id: "8",
    src: "/houses/house8x.png",
    player: "Chris",
    playerPic: "/chris.png",
    alt: "Level 8",
    content:
      "В стаята има тайно място, там, където не вижда се ясно. Сандък лежи, скрит от очи, със задачата, която те зове - потърси!",
    position:
      "w-[305px] top-[996px] -right-[50px] md:w-[500px] md:top-[2410px] md:-right-[20px] lg:w-[390px] lg:top-[1256px] lg:right-[450px]",
  },
  {
    id: "ФИНАЛ",
    src: "/houses/finalx2.png",
    player: "ВСИЧКИ",
    playerPic: "/all.png",
    alt: "Final Level",
    content:
      "Имате избор дали да правите тази задача заедно четиримата или по двойки. Когато сте напълно готови, идва голяма изненада.",
    position:
      "w-[250px] top-[908px] -left-[53px] md:w-[580px] md:top-[2961px] md:-left-[74px] lg:w-[550px] lg:top-[2015px] lg:left-[360px]",
  },
];
