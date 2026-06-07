-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_recruiterId_fkey";

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_recruiterId_fkey" FOREIGN KEY ("recruiterId") REFERENCES "recruiters"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
