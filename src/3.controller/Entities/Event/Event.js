import eventService from "../../../2.service/busnessRoule/event/eventService.js";
import errorHandling from "../../../2.service/errorHandling/errorHandling.js";
import eventCreateDataValidation from "../../valitadtion/event/eventCreateDataValidation.js";
import eventReadValidation from "../../valitadtion/event/eventReadValidation.js";

export default class Event {
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
    console.log("[Event.readEvents]");
    const { table, nameItenToSearch, valueItenToSearch, itenToReturn } =
      reqBody;

    return eventService.read(reqBody);
  };

  readSelected = (reqBody) => {
    const dataValidation = eventReadValidation(reqBody);

    return eventService.read(reqBody);
  };

  subscribe = async (reqBody) => {
    
  };
  
  edit = async (reqBody) => {};

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
