import { Worker } from "bullmq";
import { redisConfig } from "../configs/config";
import { sendEmail } from "../services//emailService";

new Worker("emailQueue", async (job) => {
    const { to, subject, text } = job.data;
    await sendEmail(to, subject, text);
  },
  { connection: redisConfig }
);
