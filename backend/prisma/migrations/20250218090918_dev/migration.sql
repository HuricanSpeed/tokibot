/*
  Warnings:

  - Added the required column `channelId` to the `Challenges` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Challenges` ADD COLUMN `channelId` VARCHAR(191) NOT NULL;
