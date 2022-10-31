import express from "express"
import * as dotenv from "dotenv"
import cors from "cors"
import router from "../../2.service/routes/0.index.js"

dotenv.config();


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors({origin: process.env.CORS_URL_ORIGIN, credentials: true}))

router(app)

export default app;