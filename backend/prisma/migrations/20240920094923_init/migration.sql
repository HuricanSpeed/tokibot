/*
  Warnings:

  - You are about to alter the column `categoryId` on the `TicketPanel` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.
  - You are about to alter the column `channelId` on the `TicketPanel` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.

*/
-- AlterTable
ALTER TABLE `TicketPanel` MODIFY `categoryId` BIGINT NOT NULL,
    MODIFY `channelId` BIGINT NOT NULL;
