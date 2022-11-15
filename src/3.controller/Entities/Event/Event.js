import eventService from "../../../2.service/busnessRoule/event/eventService.js";
import errorHandling from "../../../2.service/errorHandling/errorHandling.js";
import eventCreateDataValidation from "../../valitadtion/event/eventCreateDataValidation.js";
import dbMethod from "../../../1.model/DAL/dbMethod.js";
import enrollement from "./enrollment.js";

import eventReadValidation from "../../valitadtion/event/eventReadValidation.js";

export default class Event {
  //alterar para EventController
  //alterar futuramente pra obj?

  //alterar para vários grupos no grupo do evento: ----- #123
  add = (reqBody) => {
    try {
      const reqBodyNew = reqBody;
      reqBodyNew.subscriberNumber = 0;
      reqBodyNew.createDate = new Date(Date.now());
      reqBodyNew.company = "company";

      const dataValidation = eventCreateDataValidation(reqBodyNew);
      if (dataValidation.status) {
        const returnAdd = eventService.add(reqBodyNew);

        return returnAdd;
      }
      throw erorr;
    } catch (error) {
      return errorHandling(error);
    }
  };

  readAllEvents = async () => {
    console.log("> [AnonimousUser.readAll]");

    return eventService.readAll("events");
  };

  readAllCategories = async () => {
    return eventService.readAll("categories");
  };

  //fim aqui --------  #123

  readAllGroups = async () => {
    return eventService.readAll("groups");
  };

  filterEvent = async (reqBody) => {
    console.log("[Event].filterEvent]");
    const reqBodyTemporario = reqBody;
    reqBodyTemporario.table = "events";
    const reqBodyNew = reqBodyTemporario;
    return eventService.read(reqBodyNew);
  };
  filterGroup = async (reqBody) => {
    const reqBodyTemporario = reqBody;
    reqBodyTemporario.table = "groups";
    const reqBodyNew = reqBodyTemporario;
    return eventService.read(reqBodyNew);
  };

  filterCategory = async (reqBody) => {
    const reqBodyTemporario = reqBody;
    reqBodyTemporario.table = "categories";
    const reqBodyNew = reqBodyTemporario;
    return eventService.read(reqBodyNew);
  };

  subscribe = async (reqBody) => {
    try {
      const ticketAvailability = async (reqBody) => {
        console.log(">[ticketAvailability]");

        const ticketAvailability = await enrollement.ticketAvailability(reqBody);

        const eventOnScreen = ticketAvailability.dataFinded;

        if (ticketAvailability.status) {
          const groupCompatibility = await enrollement.groupCompatibility(reqBody, eventOnScreen);
          console.log("::::::::::::::::::::::::::::::::::::::::" + groupCompatibility.status);
          if (groupCompatibility.status) {
            return enrollementAdd(reqBody, eventOnScreen);
          }

          return groupCompatibility;
        }
        return { status: ticketAvailability.status, message: ticketAvailability.message };
      };

      const enrollementAdd = async (reqBody, ticketAvailabilityData) => {
        console.log(">[enrollementAdd]");

        const enrollementAdd = await enrollement.add(reqBody, ticketAvailabilityData);

        if (enrollementAdd.status) {
          return addInscriptionOnEvent(reqBody, ticketAvailabilityData);
        }

        return fail();
      };

      const addInscriptionOnEvent = async (reqBody, ticketAvailabilityData) => {
        console.log(">[Event.addInscriptionOnEvent]");

        const addInscriptionOnEvent = await enrollement.addInscriptionOnEvent(reqBody, ticketAvailabilityData);

        if (addInscriptionOnEvent) {
          return succsses();
        }
        enrollementDelete(ticketAvailabilityData);
        return fail();
      };

      const enrollementDelete = async (enrollementAdd) => {
        console.log(">[enrollementDelete]");
        return await enrollement.delete(enrollementAdd);
      };

      const succsses = () => {
        console.log("SUCCSSESS");
        return { status: true, message: "Inscrição realizada com sucesso!" };
      };
      const fail = () => {
        console.log("FAIL");
        return { status: true, message: "Erro. Contate o adm!" };
      };
      return await ticketAvailability(reqBody);
    } catch (error) {
      errorHandling(error);
    }
  };

  unsubscribe = async (reqBody) => {
    //recebe no reqBody:
    //verificar se a pessoa tá inscrita.
    try {
      const reqBodyNew = reqBody;
      reqBodyNew.table = "subscribers";
      reqBodyNew.nameItenToSearch = `"singularUserId", "singularEventId"`;
      reqBodyNew.valueItenToSearch = [reqBody.singularUserId, reqBody.singularEventId];
      reqBodyNew.itenToReturn = "*";

      const verifyUseExists = await enrollement.read(reqBodyNew);

      if (verifyUseExists.status) {
        const subscribeOnScreen = verifyUseExists.dataFinded[0];
        const reqBodyNew = reqBody;

        reqBodyNew.table = "events";
        reqBodyNew.nameItenToSearch = "id";
        reqBodyNew.valueItenToSearch = [reqBody.singularEventId];
        reqBodyNew.itenToReturn = "*";

        const enrollementDelete = await enrollement.delete(subscribeOnScreen);

        if (enrollementDelete.status) {
          console.log("está entrnadoooooooooo");
          const eventOnScreen = (await this.filterEvent(reqBodyNew)).dataFinded[0];
          await enrollement.deleteInscriptionOnEvent(eventOnScreen);
        }
        return enrollementDelete;
      }
      return verifyUseExists;

      //se tiver, remove ela do subscribers;
      //se a remoção for Ok, diminui um subscribesNumber no Event
      //se a "diminuição" for ok, return OK,.
      //caso contrário, adiciona a pessoa novamente:
      //return {
      // status: false, message: "Erro. Tente novamente.", data: enrollement.add(reqBody, ticketAvailabilityData)};
    } catch (error) {
      console.log(error);
    }
  };

  editEvent = async (reqBody) => {
    console.log(">[eventController.editEvent]");
    const { nameItenToSearch, valueItenToSearch, nameItenToUpdate, valueItenToUpdate } = reqBody;
    const valueItenToUpdateFormated = [`${valueItenToUpdate}`];
    const valueItenToSearchFormated = [valueItenToSearch];
    console.log(valueItenToUpdateFormated);
    if (
      nameItenToUpdate == "createDate" ||
      nameItenToUpdate == "company" ||
      nameItenToUpdate == "id" ||
      nameItenToUpdate == "subscriberNumber"
    ) {
      return { status: false, message: `${nameItenToUpdate} cannot be changed.` };
    }
    const table = "events";

    const executeEditEvent = eventService.update(
      table,
      nameItenToSearch,
      valueItenToSearchFormated,
      nameItenToUpdate,
      valueItenToUpdateFormated
    );
    return executeEditEvent;
  };

  cancel = async (reqBody) => {};

  delete = async (reqBody) => {
    const { table, nameItenToDeleteLine, valueItenToDeleteLine } = reqBody;
    const executeDelete = dbMethod.delete(table, nameItenToDeleteLine, valueItenToDeleteLine);
    return executeDelete;
  };

  //função que não pode ser direcionada para o user, pois permite alterar qualquer table. Deve ser utilizado somente internamente
  update = async (table, nameItenToSearch, valueItenToSearch, nameItenToUpdate, valueItenToUpdate) => {
    try {
      const executeUpdate = await eventService.update(table, nameItenToSearch, valueItenToSearch, nameItenToUpdate, valueItenToUpdate);
      return {
        status: true,
        message: "Inscrição realizada com sucesso.",
        return: executeUpdate,
      };
    } catch (error) {
      return {
        status: false,
        message: "Inscrição realizada com sucesso.",
        return: executeUpdate,
      };
    }
  };
}
