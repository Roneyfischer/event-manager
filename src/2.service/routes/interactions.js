import express from "express";
import Event from "../../3.controller/class/Events.js";
const interactions = express.Router();

interactions.post("/", async (req, res) => {
  const event = new Event(req.body);
  const loginFunction = await event["firstSave"](req.body); //createEvent

  return res.status(200).json({ msg: loginFunction.message });
});

export default interactions;
