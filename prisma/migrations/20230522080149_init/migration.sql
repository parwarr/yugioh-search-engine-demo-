/*
  Warnings:

  - You are about to drop the column `image` on the `YuGiOhCardImage` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `YuGiOhCardImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `YuGiOhCardImage` DROP COLUMN `image`,
    ADD COLUMN `imageUrl` VARCHAR(191) NOT NULL;
