import express from "express";
import homePage from "./1.homePage.js"
import auth from "./3.auth.js"
import list from "./4.list.js"
import userRegister from "./2.userRegister.js"


const router = (app) => {
    app
    .use("/", homePage)
    .use("/userRegister", userRegister)
    .use("/auth", auth)
    .use("/list", list)
}

export default router;