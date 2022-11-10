import GuestUser from "./2.GuestUser.js";
import errorHandling from "../../../2.service/errorHandling/errorHandling.js";
import chalk from "chalk";
import userService from "../../../2.service/busnessRoule/user/userService.js";
import groupAndCategoryValdiation from "../../valitadtion/groupAndCategory/groupAndCategoryValdiation.js";
import Event from "../Event/Event.js";

class AdmUser extends GuestUser {
  createEvent = async (reqBody,
    singularUserId) => {
    console.log("> [AdmUser.createEvent]");
    const event = new Event(reqBody);
    return event.add(reqBody);
  };

  // editEvent = async (reqBody) => {};

  // cancelEvent = async (reqBody) => {};

  // deleteEvent = async () => {};

  createGroup = async (reqBody,
    singularUserId) => {
    console.log(
      "> [AdmUser.createGroup");

    try {
      const dataValidation = await groupAndCategoryValdiation(reqBody,
        singularUserId);

      console.log(
        "> [AdmUser.createGroup] Data validation: " + dataValidation.status
      );

      if (dataValidation.status) {
        return await userService.createGroup(reqBody,
          singularUserId);
      }
      throw dataValidation;
    } catch (error) {
      return errorHandling(error);
    }
  };

  editGroup = async (reqBody,
    singularUserId) => {
    console.log("> [AdmUser.editGroup]");
    try {
      const dataValidation = await groupAndCategoryValdiation(reqBody,
        singularUserId);

      console.log(
        "> [AdmUser.editGroup] Data validation: " + dataValidation.status
      );

      if (dataValidation.status) {
        return await userService.editGroup(reqBody,
          singularUserId);
      }
      throw dataValidation;
    } catch (error) {
      return errorHandling(error);
    }
  };

  deleteGroup = async (reqBody) => {
    console.log("> [AdmUser.deleteGroup]");
    try {
      const dataValidation = await groupAndCategoryValdiation(reqBody);

      if (dataValidation.status) {


        return await userService.deleteGroup(reqBody);
      }
      throw dataValidation;
    } catch (error) {
      return errorHandling(error);
    }
  };

  createCategory = async (reqBody,
    singularUserId) => {
    console.log("> [AdmUser.createCategory]");
    try {
      const dataValidation = await groupAndCategoryValdiation(reqBody,
        singularUserId);
      console.log(
        "> [AdmUser.createCategory] Data validation: " + dataValidation.status
      );
      if (dataValidation.status) {
        return await userService.createCategory(reqBody,
          singularUserId);
      }
      throw dataValidation;
    } catch (error) {
      return errorHandling(error);
    }
  };

  editCategory = async (reqBody,
    singularUserId) => {
    console.log("> [AdmUser.editCategory]");
    try {
      const dataValidation = await groupAndCategoryValdiation(reqBody,
        singularUserId);
      console.log(
        "> [AdmUser.editCategory] Data validation: " + dataValidation.status
      );
      if (dataValidation.status) {
        return await userService.editCategory(reqBody,
          singularUserId);
      }
      throw dataValidation;
    } catch (error) {
      return errorHandling(error);
    }
  };

  deleteCategory = async (reqBody,
    singularUserId) => {
    console.log("> [AdmUser.deleteCategory]");
    try {
      const dataValidation = await groupAndCategoryValdiation(reqBody,
        singularUserId);

      if (dataValidation.status) {
        return await userService.deleteCategory(reqBody,
          singularUserId);
      }
      throw dataValidation;
    } catch (error) {
      return errorHandling(error);
    }
  };
}


export default AdmUser