import { Queue } from "bullmq";
import { redisConfig } from "./config";

export const emailQueue = new Queue("emailQueue", { connection: redisConfig });
export const transactionalQueue = new Queue("transactionalQueue", { connection: redisConfig });
