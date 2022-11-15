import GuestUser from "./2.GuestUser.js";
import errorHandling from "../../../2.service/errorHandling/errorHandling.js";
import chalk from "chalk";
import userService from "../../../2.service/busnessRoule/user/userService.js";
import groupAndCategoryValdiation from "../../valitadtion/groupAndCategory/groupAndCategoryValdiation.js";
import Event from "../Event/Event.js";

class AdmUser extends GuestUser {
  createEvent = async (reqBody) => {
    console.log("> [AdmUser.createEvent]");
    const event = new Event(reqBody);
    return event.add(reqBody);
  };

  editEvent = async (reqBody) => {
    console.log("> [AdmUser.editEvent]");
    const event = new Event(reqBody);
    return event.editEvent(reqBody);
  };

  cancelEvent = async (reqBody) => {
    console.log("> [AdmUser.cancelEvent]");
    const event = new Event(reqBody);
    return event.cancel(reqBody);
  };

  deleteEvent = async (reqBody) => {
    console.log("> [AdmUser.deleteEvent]");
    const event = new Event(reqBody);
    return event.delete(reqBody);
  };

  // editEvent = async (reqBody) => {};

  // cancelEvent = async (reqBody) => {};

  // deleteEvent = async () => {};

  createGroup = async (reqBody) => {
    console.log("> [AdmUser.createGroup");

    const dataValidation = await groupAndCategoryValdiation(reqBody);

    if (dataValidation.status) {
      return await userService.createGroup(reqBody);
    }
    throw dataValidation;
  };

  editGroup = async (reqBody, singularUserId) => {
    console.log("> [AdmUser.editGroup]");
    try {
      const dataValidation = await groupAndCategoryValdiation(reqBody, singularUserId);

      console.log("> [AdmUser.editGroup] Data validation: " + dataValidation.status);

      if (dataValidation.status) {
        return await userService.editGroup(reqBody, singularUserId);
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

  createCategory = async (reqBody, singularUserId) => {
    console.log("> [AdmUser.createCategory]");
    try {
      const dataValidation = await groupAndCategoryValdiation(reqBody, singularUserId);
      console.log("> [AdmUser.createCategory] Data validation: " + dataValidation.status);
      if (dataValidation.status) {
        return await userService.createCategory(reqBody, singularUserId);
      }
      throw dataValidation;
    } catch (error) {
      return errorHandling(error);
    }
  };

  editCategory = async (reqBody, singularUserId) => {
    console.log("> [AdmUser.editCategory]");
    try {
      const dataValidation = await groupAndCategoryValdiation(reqBody, singularUserId);
      console.log("> [AdmUser.editCategory] Data validation: " + dataValidation.status);
      if (dataValidation.status) {
        return await userService.editCategory(reqBody, singularUserId);
      }
      throw dataValidation;
    } catch (error) {
      return errorHandling(error);
    }
  };

  deleteCategory = async (reqBody, singularUserId) => {
    console.log("> [AdmUser.deleteCategory]");
    try {
      const dataValidation = await groupAndCategoryValdiation(reqBody, singularUserId);

      if (dataValidation.status) {
        return await userService.deleteCategory(reqBody, singularUserId);
      }
      throw dataValidation;
    } catch (error) {
      return errorHandling(error);
    }
  };
  readAllSubscribers = async (reqBody) => {
    console.log("> [MasterUser.readAllSubscribers]");
    try {
      const table = "subscribers";
      const itenToReturn = `"id","completeName","singularEvent", "subscriptionDate"`;
      const executeRead = userService.readAllFiltred(table, itenToReturn);

      return executeRead;
    } catch (error) {
      return errorHandling(error);
    }
  };
  readSubscribersEvent = async (reqBody) => {
    console.log("> [MasterUser.readSubscribersEvent]");
    try {
      let reqBodyTemporary = reqBody;
      reqBodyTemporary.table = "subscribers";
      reqBodyTemporary.nameItenToSearch = `"singularEventId"`;
      reqBodyTemporary.valueItenToSearch = [reqBody.singularEventId];
      reqBodyTemporary.itenToReturn = `*`;

      const reqBodyNew = reqBodyTemporary;

      const executeRead = userService.read(reqBodyNew);
      return executeRead;
    } catch (error) {
      return errorHandling(error);
    }
  };
}

export default AdmUser;
