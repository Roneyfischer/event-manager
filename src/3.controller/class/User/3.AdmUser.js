import GuestUser from "./2.GuestUser.js";
import errorHandling from "../../../2.service/errorHandling/errorHandling.js";
import chalk from "chalk";
import userService from "../../../2.service/busnessRoule/user/userService.js";
import groupAndCategoryValdiation from "../../valitadtion/groupAndCategory/groupAndCategoryValdiation.js";
import Event from "../Event/Event.js";

class AdmUser extends GuestUser {
  createEvent = async (reqBody) => {
    const event = new Event(reqBody);
    return event.add(reqBody)
  };

  // editEvent = async (reqBody) => {};

  // cancelEvent = async (reqBody) => {};

  // deleteEvent = async () => {};

  createGroup = async (reqBody) => {
    try {
      console.log("Passando por: createGroup")
      const dataValidation = await groupAndCategoryValdiation(reqBody);
      console.log("O status é:" +dataValidation.status);
      if (dataValidation.status) {
        return await userService.createGroup(reqBody);
      }
      throw dataValidation;
    } catch (error) {
      return errorHandling(error);
    }
  };

  editGroup = async (reqBody) => {
    try {
      const dataValidation = groupAndCategoryValdiation(reqBody);
      if (dataValidation.status) {
        return await userService.editGroup(reqBody);
      }
      throw dataValidation;
    } catch (error) {
      return errorHandling(error);
    }
  };

  deleteGroup = async (reqBody) => {
    try {
      const dataValidation = groupAndCategoryValdiation(reqBody);
      if (dataValidation.status) {
        return await userService.deleteGroup();
      }
      throw dataValidation;
    } catch (error) {
      return errorHandling(error);
    }
  };

  createCategory = async (reqBody) => {
    try {
      const dataValidation = groupAndCategoryValdiation(reqBody);

      if (dataValidation.status) {
        return await userService.createCategory(reqBody);
      }
      throw dataValidation;
    } catch (error) {
      return errorHandling(error);
    }
  };

  editCategory = async (reqBody) => {
    try {
      const dataValidation = groupAndCategoryValdiation(reqBody);
      if (dataValidation.status) {
        return await userService.editCategory(reqBody);
      }
      throw dataValidation;
    } catch (error) {
      return errorHandling(error);
    }
  };

  deleteCategory = async (reqBody) => {
    try {
      const dataValidation = groupAndCategoryValdiation(reqBody);
      if (dataValidation.status) {
        return await userService.deleteCategory();
      }
      throw dataValidation;
    } catch (error) {
      return errorHandling(error);
    }
  };
}

export default AdmUser;
