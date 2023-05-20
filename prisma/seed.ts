import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const card = await prisma.yuGiOhCard.create({
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
    },
  });
  console.log(card);
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
