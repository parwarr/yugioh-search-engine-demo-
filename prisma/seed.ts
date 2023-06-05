import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const cardOne = await prisma.yuGiOhCard.create({
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
  console.log(cardOne);

  const cardTwo = await prisma.yuGiOhCard.create({
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

  console.log(cardTwo);
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
