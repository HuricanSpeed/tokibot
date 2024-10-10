/*
  Warnings:

  - You are about to alter the column `closedCategoryId` on the `TicketPanel` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `BigInt`.

*/
-- AlterTable
ALTER TABLE `TicketPanel` MODIFY `closedCategoryId` BIGINT NOT NULL;
