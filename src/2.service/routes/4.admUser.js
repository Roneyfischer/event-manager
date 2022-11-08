import express from "express";

import Event from "../../3.controller/Entities/Event/Event.js";
import AdmUser from "../../3.controller/Entities/User/3.AdmUser.js";
import jwt from "jsonwebtoken";
const admUser = express.Router();

admUser.post("/", verifyJWT, async (req, res) => {
  console.log("> [route.admUser] user: " + req.userId);
  const event = new Event(req.body);
  const admUser = new AdmUser(req.body);

  const method = req.body.type;

  const executeRequisition = await admUser[method](req.body); //createEvent

  return res.status(200).json({ msg: executeRequisition });
});

function verifyJWT(req, res, next) {
  const token = req.headers["access_token"];
  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) return res.status(401).end();
    req.userId = decoded.userId;
    next();
  });
}

export default admUser;
