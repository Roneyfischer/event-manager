import express from "express";
import AdmUser from "../../3.controller/Entities/User/3.AdmUser.js";
import jwt from "jsonwebtoken";

const auth = express.Router();

auth.post("/", async (req, res) => {

  console.log("> [route.auth]");

  const user = new AdmUser();

const operation = await user[req.body.type](req.body, res);

    if(!operation.status) {
      return res.status(401).json({ return: operation.message });
    }

    if(operation.status) {
    return res
        .cookie("access_token", operation.token, {
          secure: true,
          sameSite: "none",
          expire: 500000,
        })
        .status(200)
        .json({ return: operation.status, message: operation.message, token: token });
    }
   

});

export default auth;
