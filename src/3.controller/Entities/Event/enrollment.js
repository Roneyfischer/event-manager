import Event from "./Event.js";
import eventService from "../../../2.service/busnessRoule/event/eventService.js";
import dbMethod from "../../../1.model/DAL/dbMethod.js";
import StandardUser from "../User/1.StandardUser.js";
import cookieParser from "cookie-parser";
const enrollement = {
  read: async (data) => {
    const { table, nameItenToSearch, valueItenToSearch, itenToReturn } = data;

    const dataFinded = await dbMethod.read(table, nameItenToSearch, valueItenToSearch, itenToReturn);

    return dataFinded;
  },

  ticketAvailability: async (reqBody) => {
    console.log("> [enrollment.ticketAvailability]");
    const event = new Event();

    let reqBodyNew = reqBody;
    reqBodyNew.table = "events";
    reqBodyNew.nameItenToSearch = "id";
    reqBodyNew.valueItenToSearch = [reqBody.singularEventId];
    reqBodyNew.itenToReturn = "*";

    const eventOnScreen = (await event.filterEvent(reqBodyNew)).dataFinded[0];
    if (eventOnScreen.subscriberNumber < eventOnScreen.maxCapacityPerson) {
      if (eventOnScreen.eventStatus == "aberto") {
        return {
          status: true,
          dataFinded: eventOnScreen,
          eventOnScreen: eventOnScreen,
        };
      }
      return {
        status: false,
        dataFinded: eventOnScreen,
        eventOnScreen: eventOnScreen,
        message: `Ops, o evento não está disponível para inscrição. Status atual: ${eventOnScreen.eventStatus}`,
      };
    }

    return {
      status: false,
      message: "Erro ao realizar inscrição. Este evento já atingiu o número máximo de inscritos",
    };
  },

  groupCompatibility: async (reqBody, eventOnScreen) => {
    const verifyGroupCompatibility = eventOnScreen.singularGroup.indexOf(reqBody.userGroup) > -1;

    if (verifyGroupCompatibility) {
      return { status: true, message: `Compatibilidade de Grupo: OK` };
    }
    return {
      status: false,
      message: `Ops, este evento é somente para usuários do(s) grupo(s) "${eventOnScreen.singularGroup}" e você pertence ao grupo "${reqBody.userGroup}". [DEV.ERR: EGC1]`,
    };
  },

  add: async (reqBody, eventOnScreen) => {
    console.log(">[enrollement.add]");
    const userControllerClass = new StandardUser();

    const userToEvent = (await userControllerClass.selfFilter(reqBody)).dataFinded[0];

    const executeSubscribers = await eventService.subscribersAdd(reqBody, eventOnScreen, userToEvent);
    return executeSubscribers;
  },

  delete: async (executeSubscribers) => {
    const table = "subscribers";
    const nameItenToDeleteLine = "id";
    const valueItenToDeleteLine = [executeSubscribers.id];

    return await eventService.subscribersDelete(table, nameItenToDeleteLine, valueItenToDeleteLine);
  },

  addInscriptionOnEvent: async (reqBody, eventOnScreen) => {
    const event = new Event();
    const subscriberNumber = parseInt(eventOnScreen.subscriberNumber);
    const table = "events";
    const nameItenToSearch = "id";
    const valueItenToSearch = [reqBody.singularEventId];
    const nameItenToUpdate = "subscriberNumber";
    const valueItenToUpdate = [subscriberNumber + 1];

    const subscribeExecuteUpdateOnEvent = await event.update(
      table,
      nameItenToSearch,
      valueItenToSearch,
      nameItenToUpdate,
      valueItenToUpdate
    );
    return subscribeExecuteUpdateOnEvent;
  },

  deleteInscriptionOnEvent: async (eventOnScreen) => {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>" + eventOnScreen.id);
    const event = new Event();
    const subscriberNumber = parseInt(eventOnScreen.subscriberNumber);
    const table = "events";
    const nameItenToSearch = "id";
    const valueItenToSearch = [eventOnScreen.id];
    const nameItenToUpdate = "subscriberNumber";
    const valueItenToUpdate = [subscriberNumber - 1];

    const subscribeExecuteUpdateOnEvent = await event.update(
      table,
      nameItenToSearch,
      valueItenToSearch,
      nameItenToUpdate,
      valueItenToUpdate
    );
    return subscribeExecuteUpdateOnEvent;
  },
};
export default enrollement;
