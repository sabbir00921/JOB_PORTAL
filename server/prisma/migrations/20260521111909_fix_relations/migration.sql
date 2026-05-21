/*
  Warnings:

  - The values [user,partners] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `address` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `fcmTokens` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `locationAddress` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `locationLat` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `locationLng` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `pointsBalance` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `profession` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `profileImagePublicId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `profileImageSecureUrl` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `rememberMe` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordOtp` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordOtpExpire` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordToken` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `resetPasswordTokenExpire` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `selfIntroduction` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `stripeCustomerId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `verificationOtp` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `verificationOtpExpire` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `_BlockedUsers` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `password` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "JobType" AS ENUM ('fullTime', 'partTime', 'contract', 'temporary', 'internship');

-- CreateEnum
CREATE TYPE "ExperienceLevel" AS ENUM ('entryLevel', 'midLevel', 'seniorLevel', 'leadLevel', 'executiveLevel');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('pending', 'review', 'shortlisted', 'interview', 'offered', 'rejected', 'withdrawn');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('application', 'interview', 'offer', 'rejection', 'other');

-- CreateEnum
CREATE TYPE "InterviewStatus" AS ENUM ('pending', 'scheduled', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "OfferStatus" AS ENUM ('pending', 'accepted', 'rejected', 'withdrawn');

-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('admin', 'jobSeeker', 'recruiter');
ALTER TABLE "public"."users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'jobSeeker';
COMMIT;

-- DropForeignKey
ALTER TABLE "_BlockedUsers" DROP CONSTRAINT "_BlockedUsers_A_fkey";

-- DropForeignKey
ALTER TABLE "_BlockedUsers" DROP CONSTRAINT "_BlockedUsers_B_fkey";

-- DropIndex
DROP INDEX "users_role_company_idx";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "address",
DROP COLUMN "company",
DROP COLUMN "fcmTokens",
DROP COLUMN "locationAddress",
DROP COLUMN "locationLat",
DROP COLUMN "locationLng",
DROP COLUMN "pointsBalance",
DROP COLUMN "profession",
DROP COLUMN "profileImagePublicId",
DROP COLUMN "profileImageSecureUrl",
DROP COLUMN "provider",
DROP COLUMN "rememberMe",
DROP COLUMN "resetPasswordOtp",
DROP COLUMN "resetPasswordOtpExpire",
DROP COLUMN "resetPasswordToken",
DROP COLUMN "resetPasswordTokenExpire",
DROP COLUMN "selfIntroduction",
DROP COLUMN "status",
DROP COLUMN "stripeCustomerId",
DROP COLUMN "verificationOtp",
DROP COLUMN "verificationOtpExpire",
DROP COLUMN "website",
ADD COLUMN     "forgetPasswordOtp" TEXT,
ADD COLUMN     "forgetPasswordToken" TEXT,
ADD COLUMN     "forgetPasswordTokenExpiry" TIMESTAMP(3),
ADD COLUMN     "image" JSONB,
ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "role" SET DEFAULT 'jobSeeker';

-- DropTable
DROP TABLE "_BlockedUsers";

-- DropEnum
DROP TYPE "AuthProvider";

-- DropEnum
DROP TYPE "UserStatus";

-- CreateTable
CREATE TABLE "jobSeekers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "resume" JSONB,
    "coverLetter" TEXT,
    "skills" TEXT[],
    "experience" INTEGER,
    "education" TEXT,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jobSeekers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recruiters" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyLogo" JSONB,
    "companyDescription" TEXT,
    "companyLocation" TEXT,
    "companyWebsite" TEXT,
    "companySize" TEXT,
    "companyIndustry" TEXT,
    "companyHeadquarters" TEXT,
    "companyFoundedYear" INTEGER,
    "companySocialLinks" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "recruiters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" TEXT NOT NULL,
    "recruiterId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "responsibilities" TEXT[],
    "qualifications" TEXT[],
    "salary" TEXT,
    "location" TEXT,
    "jobType" "JobType" NOT NULL DEFAULT 'fullTime',
    "experienceLevel" "ExperienceLevel" NOT NULL DEFAULT 'entryLevel',
    "skills" TEXT[],
    "benefits" TEXT[],
    "applicationDeadline" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applications" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "jobSeekerId" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'pending',
    "coverLetter" TEXT,
    "resume" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "applications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "savedJobs" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "jobSeekerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "savedJobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL DEFAULT 'other',
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "interviews" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "interviewDate" TIMESTAMP(3) NOT NULL,
    "interviewTime" TEXT NOT NULL,
    "interviewLocation" TEXT NOT NULL,
    "interviewStatus" "InterviewStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "interviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offers" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "offerDate" TIMESTAMP(3) NOT NULL,
    "offerLetter" TEXT,
    "offerStatus" "OfferStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "offers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "jobSeekers_userId_key" ON "jobSeekers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "recruiters_userId_key" ON "recruiters"("userId");

-- AddForeignKey
ALTER TABLE "jobSeekers" ADD CONSTRAINT "jobSeekers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recruiters" ADD CONSTRAINT "recruiters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "recruiters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applications" ADD CONSTRAINT "applications_jobSeekerId_fkey" FOREIGN KEY ("jobSeekerId") REFERENCES "jobSeekers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "savedJobs" ADD CONSTRAINT "savedJobs_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "savedJobs" ADD CONSTRAINT "savedJobs_jobSeekerId_fkey" FOREIGN KEY ("jobSeekerId") REFERENCES "jobSeekers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "interviews" ADD CONSTRAINT "interviews_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "offers" ADD CONSTRAINT "offers_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE;
