/*
  Warnings:

  - You are about to drop the column `modules` on the `Settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Settings` DROP COLUMN `modules`,
    ADD COLUMN `modulesData` JSON NOT NULL;
