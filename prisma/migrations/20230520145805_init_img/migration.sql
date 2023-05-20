-- CreateTable
CREATE TABLE `YuGiOhCardImage` (
    `id` VARCHAR(191) NOT NULL,
    `cardNameId` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `YuGiOhCardImage` ADD CONSTRAINT `YuGiOhCardImage_cardNameId_fkey` FOREIGN KEY (`cardNameId`) REFERENCES `YuGiOhCard`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
