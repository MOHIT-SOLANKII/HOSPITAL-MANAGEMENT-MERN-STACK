import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import appointmentRouter from "./router/appointmentRouter.js";

// const baseUrl = process.env.BASE_URL;

/* Giving functionalities of express to the app variable */
const app = express();

/* Configuring the environment variables */
config({ path: ".env" });

/* Configuring the cross platform between frontend and backend */
app.use(
  cors({
    // // origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    // origin: "http://localhost:5173/",
    // methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: 'Content-Type,Authorization',
    // credentials: true,

    origin: "https://mscare.onrender.com", // Match the exact origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
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
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

/* Connecting to the database */
dbConnection();

app.use(errorMiddleware);
export default app;
