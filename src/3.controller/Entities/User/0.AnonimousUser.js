import errorHandling from "../../../2.service/errorHandling/errorHandling.js";
import eventService from "../../../2.service/busnessRoule/event/eventService.js";
import Event from "../../../2.service/busnessRoule/event/eventService.js";
import EventController from "../Event/Event.js";
import enrollement from "../Event/enrollment.js";
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

  filterEvent = async (reqBody) => {
    console.log("> [AnonimousUser.filter]");

    const eventController = new EventController();
    return await eventController[reqBody.type](reqBody);
  };

  filterGroup = async (reqBody) => {
    console.log("> [AnonimousUser.filter]");
    const eventController = new EventController();
    return await eventController[reqBody.type](reqBody);
  };
  filterCategory = async (reqBody) => {
    console.log("> [AnonimousUser.filter]");
    const eventController = new EventController();
    return await eventController[reqBody.type](reqBody);
  };

  subscribe = async (reqBody) => {
    console.log("> [AnonimousUser.subscribe]");

    const subscribeEnvent = await enrollement.ticketAvailability(reqBody);
    const eventOnScreen = subscribeEnvent.eventOnScreen;

    if (subscribeEnvent.status) {
      let reqBodyTemporary = reqBody;
      reqBodyTemporary.userGroup = "anonimo";
      const reqBodyNew = reqBodyTemporary;

      const groupCompatibility = await enrollement.groupCompatibility(reqBodyNew, eventOnScreen);

      if (groupCompatibility.status) {
        console.log(">>>>>>>>>>>>>>>>>>>>");
        return await enrollement.addInscriptionOnEvent(reqBody, eventOnScreen);
      }

      return {
        status: false,
        message: `Ops, este evento é exclusivo para pessoas do grupo "${eventOnScreen.singularGroup}", e você esta tentando se inscrever de modo anônimo.
        Conecte-se em sua conta e tente novamente pela sua área logada.`,
      };
    }

    return subscribeEnvent;
  };

  // read = async (reqBody) => {
  //   const anonimousUser = new AnonimousUser();

  //   //concatenar type e table pra gerar nome da função (subType)
  //   const functionName =
  //     reqBody.type + reqBody.table[0].toUpperCase() + reqBody.table.slice(1);
  //   const eventController = new EventController();

  //   return await eventController[functionName](reqBody);
  // };
}

export default AnonimousUser;
