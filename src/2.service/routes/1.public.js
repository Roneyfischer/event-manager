import express from "express";
import app from "../../0.config/server/app.js"
import publicSend from "../busnessRoule/public/publicSend.js";
const homePage = express.Router();

homePage
    .get("/", async (req, res) => {
        res.status(200)
            .json({return: await publicSend(req.body)})
    })



export default homePage

