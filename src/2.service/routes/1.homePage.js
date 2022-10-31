import express from "express";
import app from "../../0.config/server/app.js"

const homePage = express.Router();

homePage
    .get("/", (req, res) => {
        res.status(200)
            .json({return: "Welcome to Home Page"})
    })



export default homePage

