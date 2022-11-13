import eventService from "../../../2.service/busnessRoule/event/eventService.js";
import errorHandling from "../../../2.service/errorHandling/errorHandling.js";
import eventCreateDataValidation from "../../valitadtion/event/eventCreateDataValidation.js";
import eventReadValidation from "../../valitadtion/event/eventReadValidation.js";
import dbMethod from "../../../1.model/DAL/dbMethod.js";
import enrollement from "./enrollment.js";

export default class Event {
  //alterar para EventController
  constructor(reqBody) {}
  add = (reqBody) => {
    try {
      const {
        singularEvent,
        singularGroup,
        singularCategory,
        singularUserId,
        description,
        createDate,
        date,
        place,
        maxCapacityPerson,
      } = reqBody;

      this._id = null;
      this._singularEvent = singularEvent;
      this._singularGroup = singularGroup;
      this._singularCategory = singularCategory;
      this._description = description;
      this._createDate = createDate;
      this._date = date;
      this._singularUserId = singularUserId;
      this._place = place;
      this._maxCapacityPerson = maxCapacityPerson;
      this._subscriberNumber = 0;
      this._subscribers = 0;
      this._company = "company";

      const dataValidation = eventCreateDataValidation(this);
      if (dataValidation.status) {
        const returnAdd = eventService.add(this);

        return returnAdd;
      }
      throw erorr;
    } catch (error) {
      return errorHandling(error);
    }
  };

  readEvents = (reqBody) => {
    console.log("[Event.readEvents]" + reqBody);

    return eventService.read(reqBody);
  };

  subscribe = async (reqBody) => {
    try {
      const ticketAvailability = async (reqBody) => {
        console.log(">[ticketAvailability]");
        const ticketAvailability = await enrollement.ticketAvailability(
          reqBody
        );

        if (ticketAvailability.status) {
          return enrollementAdd(reqBody, ticketAvailability.dataFinded);
        }
        return ticketAvailability;
      };

      const enrollementAdd = async (reqBody, ticketAvailabilityData) => {
        console.log(">[enrollementAdd]");
        const enrollementAdd = await enrollement.add(
          reqBody,
          ticketAvailabilityData
        );

        if (enrollementAdd.status) {
          return addInscriptionOnEvent(reqBody, ticketAvailabilityData);
        }

        return fail();
      };

      const addInscriptionOnEvent = async (reqBody, ticketAvailabilityData) => {
        const addInscriptionOnEvent = await enrollement.addInscriptionOnEvent(
          reqBody,
          ticketAvailabilityData
        );

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

  update = async (
    table,
    nameItenToSearch,
    valueItenToSearch,
    nameItenToUpdate,
    valueItenToUpdate
  ) => {
    const executeUpdate = await eventService.update(
      table,
      nameItenToSearch,
      valueItenToSearch,
      nameItenToUpdate,
      valueItenToUpdate
    );
    return {
      message1: "Inscrição realizada com sucesso.",
      return: executeUpdate,
    };
  };

  // subscribre = (data) => {
  //   const { userCpf, pass } = data;
  // };

  // unsubscribre = (data) => {
  //   const { userCpf, pass } = data;
  // };

  cancel = (data) => {
    const { userCpf, pass } = data;
  };

  delete = (data) => {
    const { userCpf, pass } = data;
  };

  // get singularEvent() {
  //   return this._singularEvent;
  // }
  // get singularGroup() {
  //   return this._singularGroup;
  // }
  // get singularCategory() {
  //   return this._singularCategory;
  // }
  // get description() {
  //   return this._description;
  // }
  // get createDate() {
  //   return this._createDate;
  // }
  // get date() {
  //   return this._date;
  // }
  // get singularUser() {
  //   return this._singularUser;
  // }
  // get place() {
  //   return this._place;
  // }
  // get maxCapacityPerson() {
  //   return this._maxCapacityPerson;
  // }

  // set singularEvent(data) {
  //   this._singularEvent;
  // }
  // set singularGroup(data) {
  //   this._singularGroup;
  // }
  // set singularCategory(data) {
  //   this._singularCategory;
  // }
  // set description(data) {
  //   this._description;
  // }
  // set createDate(data) {
  //   this._createDate;
  // }
  // set date(data) {
  //   this._date;
  // }
  // set singularUser(data) {
  //   this._singularUser;
  // }
  // set place(data) {
  //   this._place;
  // }
  // set maxCapacityPerson(data) {
  //   this._maxCapacityPerson;
  // }
}
