import express from "express";
import homePage from "./1.public.js";
import auth from "./2.auth.js";
import list from "./3.list.js";
import admUser from "./4.admUser.js";

const router = (app) => {
 console.log("> [route.index] Inicial route")
  app
    .use("/", homePage)
    .use("/auth", auth)
    .use("/list", list)
    .use("/admUser", admUser);
};

export default router;
