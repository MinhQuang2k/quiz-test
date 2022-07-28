import express, { json, urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import appRoute from "./routes/index.js";
import "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api", appRoute);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
