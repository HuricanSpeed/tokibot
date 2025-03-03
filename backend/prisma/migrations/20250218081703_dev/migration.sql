/*
  Warnings:

  - You are about to alter the column `challenge` on the `Challenges` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `Challenges` MODIFY `challenge` ENUM('REACTIONS', 'WORDS', 'MATHS', 'SCRAMBLE') NOT NULL;
