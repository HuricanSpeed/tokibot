/*
  Warnings:

  - The primary key for the `Ticket` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `createdBy` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ticket` DROP PRIMARY KEY,
    ADD COLUMN `claimBy` VARCHAR(191) NULL,
    ADD COLUMN `closeReason` VARCHAR(191) NULL,
    ADD COLUMN `createdBy` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);
