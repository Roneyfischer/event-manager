import express from "express";
import userRegister from "../busnessRoule/login/userRegister.js"

const userRegisterRouter = express.Router();

userRegisterRouter
    .post("/", async (req, res) => {
        res.status(200)
            .json({return: await userRegister(req.body)})
})


export default userRegisterRouter
