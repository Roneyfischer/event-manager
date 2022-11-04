import express from "express";
import Event from "../../3.controller/class/Event/Event.js";
const admUser = express.Router();

admUser.post("/", async (req, res) => {
  const event = new Event(req.body);
  const loginFunction = await event["add"](req.body); //createEvent

  return res.status(200).json({ msg: loginFunction.message });
});

export default admUser;
