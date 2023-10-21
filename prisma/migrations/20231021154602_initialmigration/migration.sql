-- CreateTable
CREATE TABLE `yugioh_card` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NOT NULL,
    `level` INTEGER NOT NULL,
    `atk` INTEGER NOT NULL,
    `def` INTEGER NOT NULL,
    `extraDeck` BOOLEAN NOT NULL DEFAULT false,
    `cardType` ENUM('MONSTER', 'SPELL', 'TRAP') NOT NULL,
    `monsterType` ENUM('Aqua', 'Beast', 'BeastWarrior', 'Cyberse', 'Dinosaur', 'DivineBeast', 'Dragon', 'Fairy', 'Fiend', 'Fish', 'Insect', 'Machine', 'Plant', 'Psychic', 'Pyro', 'Reptile', 'Rock', 'SeaSerpent', 'Spellcaster', 'Thunder', 'Warrior', 'WingedBeast', 'Wyrm', 'Zombie') NULL,
    `monsterSubType` ENUM('Normal', 'Effect', 'Flip', 'Gemini', 'Pendulum', 'Spirit', 'Toon', 'Tuner', 'Union', 'Fusion', 'Synchro', 'Xyz', 'Link') NULL,
    `monsterAttribute` ENUM('Dark', 'Divine', 'Earth', 'Fire', 'Light', 'Water', 'Wind') NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `s3_file_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `yugioh_card_name_key`(`name`),
    UNIQUE INDEX `yugioh_card_s3_file_id_key`(`s3_file_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `s3_file` (
    `id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `s3_file_key` VARCHAR(255) NOT NULL,
    `s3_bucket` VARCHAR(255) NOT NULL,
    `original_name` VARCHAR(255) NOT NULL,
    `mime_type` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `s3_file_s3_file_key_key`(`s3_file_key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `yugioh_card` ADD CONSTRAINT `yugioh_card_s3_file_id_fkey` FOREIGN KEY (`s3_file_id`) REFERENCES `s3_file`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
