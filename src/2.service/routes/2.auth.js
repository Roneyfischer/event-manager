import express from "express";
import User from "../../3.controller/class/User.js";

const auth = express.Router();

auth
.post("/", async (req, res) => {
    const user = new User();
    res.status(200).json({ return: await user[req.body.type](req.body) });
});


export default auth
