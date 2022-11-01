import express from "express";
import User from "../../3.controller/class/User.js";

import user from "../../3.controller/class/User.js";
const userRegisterRouter = express.Router();

userRegisterRouter.post("/", async (req, res) => {
    req
  const user = new User();

  res.status(200).json({ return: await user[req.body.type](req.body) });
});

export default userRegisterRouter;
