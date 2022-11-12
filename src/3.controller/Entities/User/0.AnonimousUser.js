import errorHandling from "../../../2.service/errorHandling/errorHandling.js";
import eventService from "../../../2.service/busnessRoule/event/eventService.js";
import Event from "../../../2.service/busnessRoule/event/eventService.js";
import EventController from "../Event/Event.js";

import chalk from "chalk";

class AnonimousUser {
  readEvents = async (reqBody) => {
    console.log("> [AnonimousUser.readEvents]");

    const eventController = new EventController();
    let temporaryDataToFormat = reqBody;
    temporaryDataToFormat.itenToReturn = "*";
    temporaryDataToFormat.nameItenToSearch = `"${temporaryDataToFormat.nameItenToSearch}"`;
    temporaryDataToFormat.valueItenToSearch = [
      temporaryDataToFormat.valueItenToSearch,
    ];

    const reqBodyDataModified = temporaryDataToFormat;

    const dataFinded = await eventController[reqBodyDataModified.type](
      reqBodyDataModified
    );
  
    return await dataFinded;
  };
  subscribe = async () => {};

  unsubscribe = async () => {};
}

export default AnonimousUser;
