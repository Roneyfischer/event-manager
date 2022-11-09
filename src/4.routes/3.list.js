import express from "express";
import eventList from "../2.service/busnessRoule/lists/eventList.js";

const list = express.Router();

list.get("/", async (req, res) => {
  res.status(200).json({ list: await eventList(req.body) });
});

export default list;
