import express from "express";
import AdmUser from "../3.controller/Entities/User/3.AdmUser.js";
import GuestUser from "../3.controller/Entities/User/2.GuestUser.js";
import StandardUser from "../3.controller/Entities/User/1.StandardUser.js";
import authorization from "../3.controller/Entities/Authorization/authorization.js";

import jwt from "jsonwebtoken";

import chalk from "chalk";

const admUser = express.Router();

admUser.post("/", authorization.verifyJWT);

export default admUser;
