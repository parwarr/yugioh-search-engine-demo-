import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const DarkMagician = await prisma.yuGiOhCard.create({
    data: {
      name: 'Dark Magician',
      level: 7,
      desc: 'The ultimate wizard.',
      atk: 2500,
      def: 2100,
      extraDeck: false,
      cardType: 'MONSTER',
      monsterType: 'Spellcaster',
      monsterSubType: 'Normal',
      monsterAttribute: 'Dark',
      YuGiOhCardImage: {
        create: {
          imageUrl:
            '/Users/taapaha6/Documents/dev/Yu-Gi-Oh-searchEngine/search-engine/public/dark_magician.jpeg',
        },
      },
    },
  });

  const BlueEyesWhiteDragon = await prisma.yuGiOhCard.create({
    data: {
      name: 'Blue-Eyes White Dragon',
      level: 8,
      desc: 'This legendary dragon is a powerful engine of destruction.',
      atk: 3000,
      def: 2500,
      extraDeck: false,
      cardType: 'MONSTER',
      monsterType: 'Dragon',
      monsterSubType: 'Normal',
      monsterAttribute: 'Light',
      YuGiOhCardImage: {
        create: {
          imageUrl:
            '/Users/taapaha6/Documents/dev/Yu-Gi-Oh-searchEngine/search-engine/public/Blue_Eyes_White_Dragon.jpeg',
        },
      },
    },
  });

  const RedEyesBlackDragon = await prisma.yuGiOhCard.create({
    data: {
      name: 'Red-Eyes Black Dragon',
      level: 7,
      desc: 'A ferocious dragon with a deadly attack.',
      atk: 2400,
      def: 2000,
      extraDeck: false,
      cardType: 'MONSTER',
      monsterType: 'Dragon',
      monsterSubType: 'Normal',
      monsterAttribute: 'Dark',
      YuGiOhCardImage: {
        create: {
          imageUrl:
            'C:/Users/parwar/Documents/dev/yugioh-search-engine-demo-/public/red_eyes_black_dragon.jpeg',
        },
      },
    },
  });

  const OjamaYellow = await prisma.yuGiOhCard.create({
    data: {
      name: 'Ojama Yellow',
      level: 2,
      desc: 'A yellow Ojama, with a carefree personality. His shameless smile is his biggest weapon.',
      atk: 0,
      def: 1000,
      extraDeck: false,
      cardType: 'MONSTER',
      monsterType: 'Beast',
      monsterSubType: 'Normal',
      monsterAttribute: 'Light',
      YuGiOhCardImage: {
        create: {
          imageUrl:
            '/Users/taapaha6/Documents/dev/Yu-Gi-Oh-searchEngine/search-engine/public/ojama_yellow.webp',
        },
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
