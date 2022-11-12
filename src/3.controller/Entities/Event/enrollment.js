import Event from "./Event.js";
import eventService from "../../../2.service/busnessRoule/event/eventService.js";

const enrollement = {
  ticketAvailability: async (reqBody) => {
    const event = new Event();

    let reqBodyNew = reqBody;
    reqBodyNew.table = "events";
    reqBodyNew.nameItenToSearch = "id";
    reqBodyNew.valueItenToSearch = [reqBody.singularEventId];
    reqBodyNew.itenToReturn = "*";

    const eventOnScreen = (await event.readEvents(reqBodyNew)).dataFinded[0];
    if (eventOnScreen.subscriberNumber < eventOnScreen.maxCapacityPerson) {
      return {
        status: true,
        dataFinded: eventOnScreen,
      };
    }

    return {
      status: false,
      message:
        "Erro ao realizar inscrição. Este evento já atingiu o número máximo de inscritos",
    };
  },

  add: async (reqBody, eventOnScreen) => {
    const event = new Event();
    let dataToGetUserName = {};
    dataToGetUserName.table = "users";
    dataToGetUserName.nameItenToSearch = "id";
    dataToGetUserName.valueItenToSearch = [reqBody.singularUserId];
    dataToGetUserName.itenToReturn = `"singularUser"`;

    const singularUserToEvent = (await event.readEvents(dataToGetUserName))
      .dataFinded.singularUser;

    const executeSubscribers = await eventService.subscribersAdd(
      reqBody,
      eventOnScreen,
      singularUserToEvent
    );
    return executeSubscribers;
  },

  delete: async (executeSubscribers) => {
    const table = "subscribers";
    const nameItenToDeleteLine = "id";
    const valueItenToDeleteLine = [executeSubscribers.id];

    return await eventService.subscribersDelete(
      table,
      nameItenToDeleteLine,
      valueItenToDeleteLine
    );
  },

  addInscriptionOnEvent: async (reqBody, eventOnScreen) => {
    const event = new Event();
    const subscriberNumber = parseInt(eventOnScreen.subscriberNumber);
    const table = "events";
    const nameItenToSearch = "id";
    const valueItenToSearch = reqBody.singularEventId;
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
};
export default enrollement;
