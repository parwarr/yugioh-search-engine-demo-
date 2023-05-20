-- DropForeignKey
ALTER TABLE `YuGiOhCardImage` DROP FOREIGN KEY `YuGiOhCardImage_cardNameId_fkey`;

-- AddForeignKey
ALTER TABLE `YuGiOhCardImage` ADD CONSTRAINT `YuGiOhCardImage_cardNameId_fkey` FOREIGN KEY (`cardNameId`) REFERENCES `YuGiOhCard`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
