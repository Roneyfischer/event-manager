import express from "express";
import User from "../../3.controller/class/User.js";
import jwt from "jsonwebtoken";

const auth = express.Router();

auth.post("/", async (req, res) => {
  const user = new User();
  const loginFunction = await user[req.body.type](req.body, res);
 
  if (loginFunction.status) {    
    const { cpf } = req.body;
    const token = jwt.sign({ id_user: cpf }, process.env.JWT_KEY);

    return res
      .cookie("access_token", token, {
        secure: true,
        sameSite: "none",
        expire: 500000,
      })
      .status(200)
      .json({ return: loginFunction.status });
  }
  res.status(401).json({ return: loginFunction });
});

export default auth;
