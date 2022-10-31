import express from "express";
import authentication from "../busnessRoule/login/authentication.js"

const auth = express.Router();

auth
    .post("/", async (req, res) => {
        res.status(200)
            .json({return: await authentication(req.body)})
})


export default auth
