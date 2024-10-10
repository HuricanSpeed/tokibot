/*
  Warnings:

  - Added the required column `channelId` to the `TicketPanel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TicketPanel` ADD COLUMN `channelId` VARCHAR(191) NOT NULL;
