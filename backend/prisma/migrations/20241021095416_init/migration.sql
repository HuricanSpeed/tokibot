/*
  Warnings:

  - You are about to drop the column `modulesData` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `welcomeSettings` on the `Settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Settings` DROP COLUMN `modulesData`,
    DROP COLUMN `welcomeSettings`,
    ADD COLUMN `modules` VARCHAR(191) NULL;
