import express, { Application } from "express";
import router from "./routes";
import morgan from "morgan";
import cors from "cors";
import { NextFunction, Request, Response } from "express";
import { ErrorResponse, PostgresError } from "./interFaces/ErrorInterface";
const server: Application = express();

server.use(express.json());
server.use(morgan("dev"));
server.use(cors());
server.use(router);
server.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: unknown, req: Request, res: Response, next: NextFunction): void => {
    const error = err as PostgresError;

    const errorMessage: ErrorResponse = {
      message: "Error in server",
      details:
        err instanceof Error
          ? error.detail
            ? error.detail
            : err.message
          : "Error unknown",
      code: error.code,
    };
    if (error.code === 404)
      res
        .status(404)
        .json({ message: errorMessage, details: errorMessage.details });
    else res.status(400).json(errorMessage);
  }
);

export default server;
