import express from "express";
import AdmUser from "../3.controller/Entities/User/3.AdmUser.js";
import jwt from "jsonwebtoken";
import chalk from "chalk";
const auth = express.Router();

auth.post("/", async (req, res) => {
  const user = new AdmUser();
  console.log("> [route.auth] Open");
  console.log(req);
  const operation = await user[req.body.type](req.body, res);

  if (!operation.status) {
    return res.status(401).json({ status: operation.status, message: operation.message });
  }

  if (operation.status) {
    return res
      .cookie("access_token", operation.token, {
        secure: true,
        sameSite: "none",
        expire: 3000,
      })
      .status(200)
      .json({
        status: operation.status,
        message: operation.message,
        token: operation.token,
      });
  }
});

export default auth;
