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

  alterStatusEvent = async (reqBody) => {
    console.log("> [AdmUser.cancelEvent]");

    let reqBodyTemporary = reqBody;
    reqBodyTemporary.table = "events";
    reqBodyTemporary.nameItenToSearch = "id";
    reqBodyTemporary.valueItenToSearch = [reqBody.singularEventId];
    reqBodyNew.nameItenToUpdate = "status";
    reqBodyNew.valueItenToUpdate = reqBody.newStatus;
    const reqBodyNew = reqBodyTemporary;

    const event = new Event();
    return event.cancel(reqBodyNew);
  };

  deleteEvent = async (reqBody) => {
    console.log("> [AdmUser.deleteEvent]");
    let reqBodyTemporary = reqBody;
    reqBodyTemporary.table = "events";
    reqBodyTemporary.nameItenToDeleteLine = "id";
    reqBodyTemporary.valueItenToDeleteLine = [reqBody.singularEventId];
    const reqBodyNew = reqBodyTemporary;

    const event = new Event();
    return event.delete(reqBodyNew);
  };

  createGroup = async (reqBody) => {
    console.log("> [AdmUser.createGroup");

    const dataValidation = await groupAndCategoryValdiation(reqBody);

    if (dataValidation.status) {
      return await userService.createGroup(reqBody);
    }
    throw dataValidation;
  };

  editGroup = async (reqBody) => {
    console.log("> [AdmUser.editGroup]");
    try {
      let reqBodyTemporary = reqBody;
      reqBodyTemporary.table = "groups";
      reqBodyTemporary.nameItenToSearch = "id";
      reqBodyTemporary.valueItenToSearch = [reqBody.groupId];
      reqBodyTemporary.nameItenToUpdate = "singularGroup";
      reqBodyTemporary.valueItenToUpdate = [reqBody.newGroupName];

      const reqBodyNew = reqBodyTemporary;

      return await userService.editItem(reqBodyNew);
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
      let reqBodyTemporary = reqBody;
      reqBodyTemporary.table = "categories";
      reqBodyTemporary.nameItenToSearch = "id";
      reqBodyTemporary.valueItenToSearch = [reqBody.categoryId];
      reqBodyTemporary.nameItenToUpdate = "singularCategory";
      reqBodyTemporary.valueItenToUpdate = [reqBody.newCategoryName];

      const reqBodyNew = reqBodyTemporary;

      return await userService.editItem(reqBodyNew);
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
