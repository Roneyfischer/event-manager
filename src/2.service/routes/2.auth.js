import express from "express";
import User from "../../3.controller/class/User.js";

const auth = express.Router();

auth
.post("/", async (req, res) => {
    const user = new User();
    const loginStatus = await user[req.body.type](req.body, res)
    res.status(200).json({ return: await user[req.body.type](req.body, res) });
});


export default auth
