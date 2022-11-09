import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import router from "../../4.routes/0.index.js";

dotenv.config();

const app = express();
console.log("> [app] The app has been declared");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: process.env.CORS_URL_ORIGIN, credentials: true }));

router(app);

export default app;
