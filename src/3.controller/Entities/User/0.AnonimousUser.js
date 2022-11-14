import errorHandling from "../../../2.service/errorHandling/errorHandling.js";
import eventService from "../../../2.service/busnessRoule/event/eventService.js";
import Event from "../../../2.service/busnessRoule/event/eventService.js";
import EventController from "../Event/Event.js";

import chalk from "chalk";

class AnonimousUser {
  readAllEvents = async (reqBody) => {
    console.log("> [AnonimousUser.readAll]");

    const eventController = new EventController();
    return await eventController[reqBody.type]();
  };
  readAllGroups = async (reqBody) => {
    console.log("> [AnonimousUser.readAll]");

    const eventController = new EventController();
    return await eventController[reqBody.type]();
  };
  readAllCategories = async (reqBody) => {
    console.log("> [AnonimousUser.readAll]");

    const eventController = new EventController();
    return await eventController[reqBody.type]();
  };


  read = async (reqBody) => {
    const anonimousUser = new AnonimousUser();

    //concatenar type e table pra gerar nome da função (subType)
    const functionName =
      reqBody.type + reqBody.table[0].toUpperCase() + reqBody.table.slice(1);
    const eventController = new EventController();

    return await eventController[functionName](reqBody);
  };

  subscribe = async () => {};

  unsubscribe = async () => {};
}

export default AnonimousUser;
