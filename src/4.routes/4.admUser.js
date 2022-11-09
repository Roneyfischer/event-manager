import express from "express";
import AdmUser from "../3.controller/Entities/User/3.AdmUser.js";
import jwt from "jsonwebtoken";

import chalk from "chalk";

const admUser = express.Router();

admUser.post("/", verifyJWT, async (req, res) => {
  console.log("> [route.admUser] user: ");
  const reqBody = req.body
  const admUser = new AdmUser(req.body);

  const executeRequisition = await admUser[reqBody.type](
    reqBody,
    singularUserId
  );

  return res.status(200).json({ msg: executeRequisition.message });
});

function verifyJWT(req, res, next) {
  const token = req.headers["access_token"];
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) return res.status(401).end();

    Const singularUserId = decoded.singularUserId;
    Const secondUserId = decoded.secondUserId;
    Const role = decoded.role;

    if (decoded.role == "adm") {
      return next();
    }
    return res.status(401).json({
      status: false,
      message: `Your user is an ${req.role}, and this role don't haver permissions for the action`,
    });
  });
}

export default admUser;
