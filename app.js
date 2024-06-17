import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

/* Giving functionalities of express to the app variable */
const app = express();

/* Configuring the environment variables */
config({ path: ".env" });

/* Configuring the cross platform between frontend and backend */
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

/* Configuring the cookie parser */
app.use(cookieParser());

/* Configuring the express to use json and urlencoded */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Configuring the express to use file upload */
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/message", messageRouter);

/* Connecting to the database */
dbConnection();

app.use(errorMiddleware);
export default app;
