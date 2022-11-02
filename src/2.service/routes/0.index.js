import express from "express";
import homePage from "./1.public.js";
import auth from "./2.auth.js";
import list from "./3.list.js";
import interactions from "./interactions.js";

const router = (app) => {
  app
    .use("/", homePage)
    .use("/auth", auth)
    .use("/list", list)
    .use("/interactions", interactions);
};

export default router;
