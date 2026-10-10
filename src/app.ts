import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";

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

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

//not found middleware

app.use(notFound);

// global error handler
app.use(globalErrorHandler);

export default app;
