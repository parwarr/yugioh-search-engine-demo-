-- CreateTable
CREATE TABLE `YuGiOhCard` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NOT NULL,
    `level` INTEGER NOT NULL,
    `atk` INTEGER NOT NULL,
    `def` INTEGER NOT NULL,
    `extraDeck` BOOLEAN NOT NULL DEFAULT false,
    `cardType` ENUM('MONSTER', 'SPELL', 'TRAP') NOT NULL,
    `monsterType` ENUM('Aqua', 'Beast', 'BeastWarrior', 'Cyberse', 'Dinosaur', 'DivineBeast', 'Dragon', 'Fairy', 'Fiend', 'Fish', 'Insect', 'Machine', 'Plant', 'Psychic', 'Pyro', 'Reptile', 'Rock', 'SeaSerpent', 'Spellcaster', 'Thunder', 'Warrior', 'WingedBeast', 'Wyrm', 'Zombie') NOT NULL,
    `monsterSubType` ENUM('Normal', 'Effect', 'Flip', 'Gemini', 'Pendulum', 'Spirit', 'Toon', 'Tuner', 'Union', 'Fusion', 'Synchro', 'Xyz', 'Link') NOT NULL,
    `monsterAttribute` ENUM('Dark', 'Divine', 'Earth', 'Fire', 'Light', 'Water', 'Wind') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `YuGiOhCard_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `YuGiOhCardImage` (
    `id` VARCHAR(191) NOT NULL,
    `cardNameId` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `YuGiOhCardImage` ADD CONSTRAINT `YuGiOhCardImage_cardNameId_fkey` FOREIGN KEY (`cardNameId`) REFERENCES `YuGiOhCard`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
