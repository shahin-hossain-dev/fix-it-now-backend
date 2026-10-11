import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import globalErrorHandler from "./middlewares/globalErrorHandler";

import router from "./routes";
import notFoundRoute from "./middlewares/notFound";
import status from "http-status";

const app: Express = express();

// middlewares
app.use(
  cors({
    origin: ["http://localhost:3000"],
  }),
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get("/api/test", (req: Request, res: Response) => {
  res.status(status.OK).json({
    success: true,
    message: "Server is Running",
  });
});

// routes
app.use("/api", router);
//not found middleware

app.use(notFoundRoute);

// global error handler
app.use(globalErrorHandler);

export default app;
