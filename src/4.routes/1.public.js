import express from "express";
import app from "../0.config/server/app.js";
import publicSend from "../2.service/busnessRoule/public/publicSend.js";
import AnonimousUser from "../3.controller/Entities/User/0.AnonimousUser.js";
const homePage = express.Router();

homePage.get("/", async (req, res) => {
  console.log("> [route.public]");

  console.log("> [route.admUser] user: ");
  const reqBody = req.body;

  const anonimousUser = new AnonimousUser(reqBody);


  const executeRequisition = await anonimousUser[reqBody.type](reqBody);

  return res.status(200).json({ msg: executeRequisition.message });



  res.status(200).json({ return: "await publicSend(req, res)" });
});

export default homePage;
