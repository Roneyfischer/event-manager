import express from "express";
import eventList from "../2.service/busnessRoule/lists/eventList.js";
import AnonimousUser from "../3.controller/Entities/User/0.AnonimousUser.js";

const anonimousUserRoute = express.Router();

anonimousUserRoute.post("/", async (req, res) => {
  console.log("> [route.admUser] user: ");
  const reqBody = req.body;

  const anonimousUser = new AnonimousUser(reqBody);

  const executeRequisition = await anonimousUser[reqBody.type](reqBody);

  return res.status(200).json({ executeRequisition });
});

export default anonimousUserRoute;
