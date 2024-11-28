import express from "express";
import mailerRoutes from "./routes/mailerRoutes";
import "./processors/emailProcessor"; // Start background job processor
import "./processors/transactionalEmailProcessor"; // Start background job processor

const app = express();

import {serverAdapter} from "./utils/bullMQUI";

// Import the middleware
import bullUIBasicAuthMiddleware from './middlewares/bullUIBasicAuthMiddleware';
app.use('/admin/queues', bullUIBasicAuthMiddleware, serverAdapter.getRouter());

app.use(express.json());
app.use("/api/v1", mailerRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
