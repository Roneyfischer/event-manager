import express from "express";
import Event from "../../3.controller/Entities/Event/Event.js";
import AdmUser from "../../3.controller/Entities/User/3.AdmUser.js";
const admUser = express.Router();

admUser.post("/", async (req, res) => {
  console.log("> [route.admUser]")
  const event = new Event(req.body);
  const admUser = new AdmUser(req.body);

  const method = req.body.type;

  const executeRequisition = await admUser[method](req.body); //createEvent
  
  return res.status(200).json({ msg: executeRequisition });
});

export default admUser;
