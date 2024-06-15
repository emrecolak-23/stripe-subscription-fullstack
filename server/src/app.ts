import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import { readdirSync } from "fs";
import "express-async-errors";

import { errorHandler } from "./middleware/error-handler";

import { UserPayload } from "./types/user-payload";

dotenv.config();
const app = express();

// Middlewares
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.CLIENT_URL as string],
  })
);

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

const routesPath = path.join(__dirname, "routes");
readdirSync(routesPath).map((r) => {
  const routeModule = require(path.join(__dirname, "routes", r));
  if (routeModule.router && typeof routeModule.router === "function") {
    app.use("/api", routeModule.router);
  } else {
    console.error(`Invalid middleware in file ${r}`);
  }
});

// Routes
app.get("/healthcheck", (req: Request, res: Response) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
  };

  res.status(200).send(healthcheck);
});

app.all("*", (req: Request, res: Response) => {
  res.status(404).json([{ message: "Not Found Route" }]);
});

// Error handler
app.use(errorHandler);

export { app };
