import express, { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { emailQueue } from "../configs/jobQueue";
import { transactionalQueue } from "../configs/jobQueue";


const mailerRoutes = express.Router();

mailerRoutes.post("/send-email", asyncHandler(async (req: Request, res: Response) => {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
      return res.status(400).json({ error: "Missing required fields: to, subject, text" });
    }

    await emailQueue.add("sendEmail", { to, subject, text }, { priority: 1 }); // High priority
    return res.status(200).json({ message: "Email job queued successfully" });
  })
);

mailerRoutes.post("/send-transactional-email", asyncHandler(async (req: Request, res: Response) => {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
      return res.status(400).json({ error: "Missing required fields: to, subject, text" });
    }

    await transactionalQueue.add("sendEmail", { to, subject, text }, { priority: 3 }); // Low priority
    return res.status(200).json({ message: "Transactional Email job queued successfully" });
  })
);

export default mailerRoutes;
