

import GuestUser from "./2.GuestUser.js";
import errorHandling from "../../../2.service/errorHandling/errorHandling.js";
import chalk from "chalk";
import userService from "../../../2.service/busnessRoule/user/userService.js";

class AdmUser extends GuestUser {
  createEvent = async (reqBody) => {};

  cancelEvent = async (reqBody) => {};

  editEvent = async (reqBody) => {};

  deleteEvent = async () => {};

  createGroup = async (reqBody) => {};

  editGroup = async (reqBody) => {};

  deleteGroup = async () => {};
}

export default AdmUser;
