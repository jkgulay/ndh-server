import cors from "cors";
import "dotenv/config";
import express, { type Express } from "express";
import { UPLOADS_ROOT_DIR } from "./config/uploadStorage";
import { connectDatabase } from "./config/db";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";
import { apiRouter } from "./routes";

const DEFAULT_PORT = 5000;

function createApp(clientOrigin: string): Express {
  const app = express();
  app.use(cors({ origin: clientOrigin }));
  app.use(express.json());
  app.use("/uploads", express.static(UPLOADS_ROOT_DIR));
  app.use("/api", apiRouter);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}

async function startServer(): Promise<void> {
  const port = Number(process.env.PORT) || DEFAULT_PORT;
  const mongoUri = process.env.MONGO_URI;
  const clientOrigin = process.env.CLIENT_ORIGIN;

  if (!mongoUri) throw new Error("MONGO_URI is not set");
  if (!clientOrigin) throw new Error("CLIENT_ORIGIN is not set");

  await connectDatabase(mongoUri);
  console.log("Connected to MongoDB");

  const app = createApp(clientOrigin);
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer().catch((error: unknown) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
